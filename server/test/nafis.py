import os
from openai import AsyncOpenAI
import requests
import json

def generate_image(prompt, api_key):
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    json_data = {
        'prompt': prompt,
        'n': 1,  # number of images to generate
        'size': '1024x1024'  # image size
    }
    
    response = requests.post('https://api.openai.com/v1/images/generations', headers=headers, json=json_data)
    
    if response.status_code == 200:
        print("Image generated successfully.")
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return response.text

# Replace 'your_api_key_here' with your actual DALL-E API key
api_key = os.environ.get("OPENAI_API_KEY")

# # Replace 'your_prompt_here' with the desired text prompt
# prompt = 'president photo as cartoon'

# result = generate_image(prompt, api_key)
# print(result)

# # Saving the result as a JSON file
# with open('dalle_result.json', 'w') as file:
#     json.dump(result, file)
