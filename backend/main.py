import traceback
import sys
import requests
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Header
import json5
import asyncio
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler
from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup
import os
from pocketbase import PocketBase  # Client also works the same
from pocketbase.utils import ClientResponseError
from dotenv import load_dotenv
from telegram.utils.helpers import escape_markdown
load_dotenv()
import threading
from queue import Queue, Empty
from datetime import datetime, timezone, timedelta
from llm_service import call_llm
from node_handler import handle_node

# min intro count to start replying
MIN_INTRO_COUNT = 15

import string
import random
def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# This queue will hold tasks to run
task_queue = Queue()

def loop_in_thread():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    def run_forever():
        while True:
            try:
                # Wait for a new task
                coro = task_queue.get_nowait()
                if coro is None:
                    break  # None is a signal to stop the loop
                loop.create_task(coro)
            except Empty:
                pass
            finally:
                # Run pending tasks and sleep a bit
                loop.run_until_complete(asyncio.sleep(0.1))
    run_forever()
    loop.close()

# Start the loop in a background thread
thread = threading.Thread(target=loop_in_thread, daemon=True)
thread.start()

def start_async_task(coro):
    task_queue.put_nowait(coro)

pb = PocketBase(os.environ['PB_URL'])
# pb.admins.auth_with_password(os.environ['PB_ADMIN_EMAIL'], os.environ['PB_ADMIN_PASS'])

app = FastAPI()
# vertexai.init()

def createNewDialog(name, userId):
    record = pb.collection('dialogs').create({
        "name": name,
        "description": "User: Start",
        "agent": os.environ['AGENT_ID'],
        "customer_external_id": userId
    });
    return record

def setupDialog(update, context):
    try:
        user = update.message.from_user
        return pb.collection('dialogs').get_first_list_item(f"customer_external_id = '{user.id}' && agent = '{os.environ['AGENT_ID']}'")
    except:
        user = update.message.from_user
        return createNewDialog(f'{user.first_name} {user.last_name}', user.id)

def handle_node_operation(update, context, dialog):
    print("[!] handle_node_operation")
    current_node_id = dialog.stage_id
    if current_node_id == "":
        current_node_id = None
    node_exec_res = handle_node(pb, current_node_id, dialog.description)
    print(node_exec_res)
    if node_exec_res is None:
        dialog = pb.collection('dialogs').update(dialog.id, {
            "description": dialog.description + "\nFinished",
            "stage_id": None
        })
        update.message.reply_text("Процесс завершен. Можете написать сообщение вновь, чтобы открыть процесс")
        return
    updatedDialog = {
        "stage_id": node_exec_res["nextID"],
        "description": dialog.description
    }
    if node_exec_res["msg"] != None:
        updatedDialog["description"] += "\nAgent: " + node_exec_res["msg"]
        update.message.reply_text(node_exec_res["msg"])

    if "class" in node_exec_res and node_exec_res["class"] != None:
        updatedDialog["description"] += f"\n[classified]: " + node_exec_res["class"]

    if "badge" in node_exec_res and node_exec_res["badge"] != None:
        updatedDialog["badgeText"] = node_exec_res["badge"]

    dialog = pb.collection('dialogs').update(dialog.id, updatedDialog)
    if "isCoherent" in node_exec_res and node_exec_res["isCoherent"] == True:
        print("!@!")
        handle_node_operation(update, context, dialog)

def handle_message(update, context):
    dialog = setupDialog(update, context)
    user_message = update.message.text
    print(user_message)
    dialog.description += f"\nUser: {user_message}"
    handle_node_operation(update, context, dialog)


def start_telegram_bot():
    try:
        updater = Updater(os.environ['MAIN_BOT_TOKEN'], use_context=True)
        dp = updater.dispatcher
        if (dp == None):
            return
        dp.add_handler(CommandHandler("start", handle_message, run_async=True))

        dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message, run_async=True))

        updater.start_polling()

        # Run the bot until you press Ctrl-C or the process receives SIGINT,
        # SIGTERM or SIGABRT. This should be used most of the time, since
        # start_polling() is non-blocking and will stop the bot gracefully.
        # updater.idle()
        return {"status": "OK"}
    except Exception as e:
        print(e)
        return {"status": "error", "message": "Unexpected Error. Maybe Bot is already started"}

start_telegram_bot()
@app.get("/")
def read_root():
    return {"Hello": "World"}
