import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API keys from environment variables
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')

# Headers using the API keys from environment variables
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

def query_huggingface(model_api_url, payload):
    response = requests.post(model_api_url, headers=headers, json=payload)
    return response.json()

def get_fact_or_opinion(text):
    fact_or_opinion_API_URL = "https://api-inference.huggingface.co/models/lighteternal/fact-or-opinion-xlmr-el"
    output = query_huggingface(fact_or_opinion_API_URL, {"inputs": text})
    return output

def get_toxicity(text):
    toxic_API_URL = "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta"
    output = query_huggingface(toxic_API_URL, {"inputs": text})
    return output

def detect_implicit_hate(text):
    implicit_hate_API_URL = "https://api-inference.huggingface.co/models/tomh/toxigen_roberta"
    output = query_huggingface(implicit_hate_API_URL, {"inputs": text})
    return output
