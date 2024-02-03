# import os
# import requests
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Get API keys from environment variables
# HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')

# # Headers using the API keys from environment variables
# headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

# def query_huggingface(model_api_url, payload):
#     response = requests.post(model_api_url, headers=headers, json=payload)
#     return response.json()

# def get_fact_or_opinion(text):
#     fact_or_opinion_API_URL = "https://api-inference.huggingface.co/models/lighteternal/fact-or-opinion-xlmr-el"
#     output = query_huggingface(fact_or_opinion_API_URL, {"inputs": text})
#     return output

# def get_toxicity(text):
#     toxic_API_URL = "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta"
#     output = query_huggingface(toxic_API_URL, {"inputs": text})
#     return output

# def detect_implicit_hate(text):
#     implicit_hate_API_URL = "https://api-inference.huggingface.co/models/tomh/toxigen_roberta"
#     output = query_huggingface(implicit_hate_API_URL, {"inputs": text})
#     return output




# async version:


import asyncio
import aiohttp
from dotenv import load_dotenv

load_dotenv()
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
async def query_huggingface_async(session, model_api_url, payload, headers):
    async with session.post(model_api_url, headers=headers, json=payload) as response:
        return await response.json()

async def analyze_text(text, headers):
    async with aiohttp.ClientSession() as session:
        fact_opinion_future = query_huggingface_async(session, "https://api-inference.huggingface.co/models/lighteternal/fact-or-opinion-xlmr-el", {"inputs": text}, headers)
        toxicity_future = query_huggingface_async(session, "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta", {"inputs": text}, headers)
        implicit_hate_future = query_huggingface_async(session, "https://api-inference.huggingface.co/models/tomh/toxigen_roberta", {"inputs": text}, headers)
        
        results = await asyncio.gather(fact_opinion_future, toxicity_future, implicit_hate_future)
        return results

# Example usage
async def main():
    text = "Islamabad, Pakistan Jailed Pakistani former Prime Minister Imran Khan and his wife Bushra Bibi have been sentenced to seven years in prison after a district court ruled their 2018 marriage violated the law. This is the third sentence for Khan and the second for his wife this week. A short order issued by the court and obtained by CNN states that both respondents were found guilty of “a marriage ceremony fraudulently gone through without lawful marriage.”Bibi’s former husband, Khawar Farid Maneka, had filed a case against Khan and Bibi almost six years after his divorce and accused them of marrying without completing the Iddat — a compulsory waiting period in Islam after divorce — and committing adultery."   
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}   
    results = await analyze_text(text, headers)
    print(results)

if __name__ == "__main__":
    asyncio.run(main())
