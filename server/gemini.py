import os
from dotenv import load_dotenv
import google.generativeai as genai
import re

load_dotenv()
GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)

# Load Gemini Pro
model = genai.GenerativeModel("gemini-pro")


def evaluate(prompt):
    model_response = model.generate_content(prompt)
    return model_response.text


def getText(html):
    prompt = (
        "Given the HTML below, delimited by ```, extract all the text from the artcle. Extract exact text, do not summarize it.\n\n"
        + html
    )
    return evaluate(prompt)


def getSummary(text):
    prompt = "Given the text below, delimited by ```, summarize the article.\n\n" + text
    return evaluate(prompt)


def getOfInterest(text):
    prompt = (
        "Given the text below, delimited by ```, list all persons and organizations mentioned.\n\n"
        + text
    )
    response = evaluate(prompt)
    pattern = re.compile(r"-\s([\w\s\(\)]+)")
    matches = pattern.findall(response)
    names = [match.strip() for match in matches]

    return names


def getArticleInfo(html):
    INFO = {}
    INFO["text"] = getText(html)
    INFO["summary"] = getSummary(html)
    INFO["ofInterest"] = getOfInterest(html)
    return INFO
