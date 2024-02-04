from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

# from test.tanim_module import get_fact_or_opinion, get_toxicity, detect_implicit_hate
from gemini import evaluate, getArticleInfo, getVideoInfo
from huggingFaceModels import analyze_text
from dalle3 import generate_image
from db import authUser, addUser, addArticle, getArticles

# from test.amir import analyze_text
# from test.amir_dalle_3 import generate_image

app = Flask(__name__)
CORS(app)


@app.route("/submit-article-link", methods=["POST"])
def handle_article_link():
    data = request.json
    article_link = data.get("articleLink")

    # Fetch the HTML content of the article
    response = requests.get(article_link)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, "html.parser")
        articleInfo = getArticleInfo(soup.text)
        cleaned_article = evaluate(f"Given the HTML content extracted from a webpage, please provide a cleaned "
                                   f"version that contains only the main article text, free from any HTML tags, "
                                   f"advertisements, navigation elements, and extraneous information. Here is the "
                                   f"HTML content: {soup.text}")
        print("cleaned_article" ,len(cleaned_article),cleaned_article)
        article_summary = evaluate(f"Please provide a concise summary of the following article text in 5 to 10 "
                                   f"sentences, capturing the essential points and main themes: {cleaned_article}")
        important_people = evaluate(f"From the article provided, identify and list the names of key individuals "
                                    f"mentioned. Please format the output as a Python list, like this: ['person_1', "
                                    f"'person_2', 'person_3']. Here is the article text: {cleaned_article}")
        Sub_500_token=evaluate(cleaned_article+"This is an article that is gonna be fed into smalle NLP models which have a 500 token limit can you extract the important parts of this article and return an output so that the output represents the article but it is less than around 400 ")
        analytics_metrics = analyze_text(Sub_500_token,cleaned_article)
        return jsonify(
            {
                "articleInfo": articleInfo,
                "cleanedArticleText": article_summary,
                "important_people": important_people,
                # "dalle_image_link": dalle_image_link,
                "analytics_metrics": analytics_metrics  # converting a python dict

            }
        )
    else:
        return (
            jsonify(
                {
                    "message": "Failed to fetch page",
                    "error": "Could not retrieve the page from the provided link",
                }
            ),
            400,
        )


@app.route("/submit-video-link", methods=["POST"])
def handle_video_link():
    data = request.json
    video_link = data.get("videoLink")
    videoInfo = getVideoInfo(video_link)
    return jsonify(
        {
            "videoInfo": videoInfo,
        }
    )


@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    user = addUser(
        {
            "cf1:name": name,
            "cf1:email": email,
            "cf1:password": password,
        },
    )
    return jsonify(
        {
            "message": "User created successfully",
        }
    )


@app.route("/get-user", methods=["GET"])
def get_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = authUser(email, password)
    if authUser:
        return jsonify(
            {
                "user": user,
            }
        )
    else:
        return (
            jsonify(
                {
                    "message": "Failed to authenticate user",
                    "error": "Could not authenticate user",
                }
            ),
            400,
        )


@app.route("/create-article", methods=["POST"])
def create_article():
    data = request.json
    userID = data.get("userID")
    url = data.get("url")
    data = data.get("data")
    article = addArticle(
        {
            "cf1:userID": userID,
            "cf1:url": url,
            "cf1:data": data,
        },
    )
    return jsonify(
        {
            "message": "Article created successfully",
        }
    )


@app.route("/get-articles", methods=["GET"])
def get_articles():
    data = request.json
    userID = data.get("userID")

    articles = getArticles(userID)
    if authUser:
        return jsonify(
            {
                "articles": articles,
            }
        )
    else:
        return (
            jsonify(
                {
                    "message": "Failed to get articles",
                    "error": "No articles found",
                }
            ),
            400,
        )


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/gemini", methods=["GET", "POST"])
def gemini():
    return evaluate(request.json["prompt"])


@app.route("/analyze/implicit-hate", methods=["POST"])
def implicit_hate_route():
    text = request.json.get("text", "")
    result = detect_implicit_hate(text)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
