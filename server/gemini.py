import os
from dotenv import load_dotenv
import google.generativeai as genai
import re
from youtube_transcript_api import YouTubeTranscriptApi

load_dotenv()
GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 0,
    "top_p": 1,
    "top_k": 1,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_DANGEROUS",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

# Load Gemini Pro
model = genai.GenerativeModel(
    model_name="gemini-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


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


def getTranscript(video_id):
    data = YouTubeTranscriptApi.get_transcript(video_id)
    print(data)
    transcript = ""
    for entry in data:
        transcript += entry["text"] + " "
    return transcript.strip()


def getArticleInfo(html):
    INFO = {}
    INFO["text"] = getText(html)
    INFO["summary"] = getSummary(INFO["text"])
    INFO["ofInterest"] = getOfInterest(INFO["text"])
    return INFO


def getVideoInfo(video_link):
    idx = video_link.find("v=") + 2
    video_id = video_link[idx:]
    transcript = getTranscript(video_id)

    INFO = {}
    INFO["text"] = transcript
    INFO["summary"] = getSummary(transcript)
    INFO["ofInterest"] = getOfInterest(transcript)
    return INFO
