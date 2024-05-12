import os
import requests

import json5

from llm_service import call_llm

def handle_node(pb, nodeId, context):
    nodes =  pb.collection('nodes').get_first_list_item(f"agent = '{os.environ['AGENT_ID']}'").description

    target_node: dict = {}
    for n in nodes:
        if nodeId == None:
            if n["type"] == "start":
                target_node = n
                break
        if n["id"] == nodeId:
            target_node = n
            break

    print(target_node["type"])
    if (target_node["type"] == "external_request"):
        print(target_node["data"]) # req

        response = requests.get(target_node["data"]["url"])
        if response.status_code == 200:
            context += "\n" + response.text
        else:
            context += "\nError: Failed to fetch data from the URL."
        return handle_node(pb, target_node["nextID"], context)

    if (target_node["type"] == "respond"):
        return {"nextID": target_node["nextID"], "msg": target_node["data"]["response"], "isCoherent": True}
    if (target_node["type"] == "classify"):
        categories =  ", ".join(map(lambda x: x["name"], target_node["data"]["classes"]))
        classify_assistant_prompt = f"""
Тебе надо понять к какой категории относится пользователь, исходя из контекста диалога с ним.
Список категорий – [{categories}]
Выведи только название категории, без пояснений.
Если ты сомневаешься, к какой категории отнести пользователя, выведи одно слово большими буквами без ковычек "NO"
"""
        assistant_prompt = target_node["data"]["context"]
#         """
# Твоя задача ответить на последний вопрос или сообщение пользователя, используй весь контекст, который тебе дает пользователь. Не выводи ничего кроме ответа на вопрос пользователя.
# Выведи только ответ на сообщение пользователя
# """
        msg_resp = call_llm(assistant_prompt, context)
        out_class = call_llm(classify_assistant_prompt, context + "\nAgent: " + msg_resp)

        # print(target_node)
        # print(msg_resp)
        nextId = target_node["nextID"]
        isCoherent = True
        if out_class == "NO":
            out_class = None
            isCoherent = False
            nextId = target_node["id"]

        return {"nextID": nextId, "msg": msg_resp, "class": out_class, "isCoherent": isCoherent }
    if (target_node["type"] == "listen"):
        # return handle_node(pb, target_node["nextID"], context)
        return {"nextID": target_node["nextID"], "msg": None}

    if (target_node["type"] == "finish"):
        return None
    return handle_node(pb, target_node["nextID"], context)
