import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)

# Load Gemini Pro
model = genai.GenerativeModel("gemini-pro")


def evaluate(prompt):
    # ...
    model_response = model.generate_content(prompt)
    return model_response.text
