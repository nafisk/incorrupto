from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
from bs4 import BeautifulSoup
from gemini import evaluate

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
        print("Textrwerwe", soup.text)
        return jsonify(
            {"message": "Text extracted successfully", "bodyText": soup.text}
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


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/gemini", methods=["GET", "POST"])
def gemini():
    return evaluate(request.json["prompt"])


if __name__ == "__main__":
    app.run(debug=True)
