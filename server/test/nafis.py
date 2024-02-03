import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_text(prompt):
    try:
        response = openai.Completion.create(
          engine="text-davinci-003",
          prompt=prompt,
          max_tokens=150
        )
        print(response.choices[0].text.strip())
    except Exception as e:
        print(f"An error occurred: {e}")

generate_text("Translate the following English text to French: 'Hello, how are you?'")
