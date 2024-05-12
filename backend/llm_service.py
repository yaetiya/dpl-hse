
from io import BytesIO
from PIL import Image as PIL_Image
import http
import typing
import urllib3
import json
import os
import vertexai
from vertexai.preview.generative_models import GenerativeModel, Part
from pathlib import Path
import google.generativeai as genai
import requests
from openai import OpenAI
import cohere
co = cohere.Client(os.environ['COHERE_API_KEY'])

genai.configure(api_key=os.environ['GEMINI_KEY'])

# Set up the model
generation_config = {
  "temperature": 0.1,
  # "top_p": 1,
  # "top_k": 32,
  # "max_output_tokens": 4096,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model_vision = genai.GenerativeModel(model_name="gemini-pro-vision",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

def call_llm(gpt_assistant_prompt, gpt_user_prompt):
  #MODEL: cohere
  # response = co.chat(
  #   chat_history = [{"role": "SYSTEM", "message": gpt_assistant_prompt}],
  #   message=gpt_user_prompt,
  #   model='command-r-plus',
  #   temperature=0,
  #   # connectors=[{"id": "web-search"}],
  # )
  # print(response.text)
  # return response.text

  # MODEL: GPT
  print("--> A")
  print(gpt_assistant_prompt)
  print("--> U")
  print(gpt_user_prompt)
  message = [{"role": "system", "content": gpt_assistant_prompt}, {"role": "user", "content": gpt_user_prompt}]
  temperature = 0.0
  response = client.chat.completions.create(
      model="gpt-4-turbo",
      # model="gpt-3.5-turbo",
      messages = message,
      temperature=temperature,
      # max_tokens=max_tokens,
      # frequency_penalty=frequency_penalty
      # presence_penalty=-1.8
  )
  return response.choices[0].message.content

  # MODEL: GEMINI
  # response = model.generate_content(
  #     [gpt_system_prompt, gpt_user_prompt]
  # )
  # return response.candidates[0].content.parts[0].text
