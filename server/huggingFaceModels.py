import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')


def analyze_text(text,normal_text):
    # Headers using the API key from environment variables
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

    # Define API URLs
    api_urls = {
        "fact_or_opinion": "https://api-inference.huggingface.co/models/lighteternal/fact-or-opinion-xlmr-el",
        "toxicity": "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta",
        "implicit_hate": "https://api-inference.huggingface.co/models/tomh/toxigen_roberta",
        "politicalBiasBERT": "https://api-inference.huggingface.co/models/bucketresearch/politicalBiasBERT",
        "inappropriate_text_classifier": "https://api-inference.huggingface.co/models/michellejieli"
                                         "/inappropriate_text_classifier",
        "AI detector": "https://api-inference.huggingface.co/models/andreas122001/roberta-academic-detector"
    }

    results = {}
    # Iterate over each API URL and make a request
    for analysis_type, model_api_url in api_urls.items():
        response=None
        if analysis_type == "AI detector":
            # If the length of normal_text is greater than 1500 characters,
            # slice the string to get the first 1500 characters only
            text_to_analyze = normal_text[:1500] if len(normal_text) > 1500 else normal_text
            response = requests.post(model_api_url, headers=headers, json={"inputs": text_to_analyze})
        else:
            response = requests.post(model_api_url, headers=headers, json={"inputs": text})
        if response.status_code == 200:
            results[analysis_type] = response.json()
        else:
            results[analysis_type] = f"Error: {response.status_code} - {response.text}"
    print('Results:', results)
    return results


# text = "Islamabad, Pakistan Jailed Pakistani former Prime Minister Imran Khan and his wife Bushra Bibi have been sentenced to seven years in prison after a district court ruled their 2018 marriage violated the law. This is the third sentence for Khan and the second for his wife this week. A short order issued by the court and obtained by CNN states that both respondents were found guilty of “a marriage ceremony fraudulently gone through without lawful marriage.”Bibi’s former husband, Khawar Farid Maneka, had filed a case against Khan and Bibi almost six years after his divorce and accused them of marrying without completing the Iddat — a compulsory waiting period in Islam after divorce — and committing adultery."
# results = analyze_text(text)
# print('Results:', results)
