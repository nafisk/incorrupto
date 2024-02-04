from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

# from test.tanim_module import get_fact_or_opinion, get_toxicity, detect_implicit_hate
from gemini import evaluate, getArticleInfo, getVideoInfo
from amir import analyze_text
from amir_dalle_3 import generate_image

app = Flask(__name__)
CORS(app)


@app.route("/submit-article-link", methods=["POST"])
def handle_article_link():
    try:
        data = request.json
        article_link = data.get("articleLink")

        # Fetch the HTML content of the article
        response = requests.get(article_link)

        # Check if the request was successful
        if response.status_code == 200:
            try:
                # Parse the HTML content
                soup = BeautifulSoup(response.text, "html.parser")
                articleInfo = getArticleInfo(soup.text)
            except Exception as e:
                return jsonify({"error": f"Failed to parse article content: {e}"}), 500

            try:
                cleaned_article = evaluate("Your evaluation call for cleaned_article here")
            except Exception as e:
                return jsonify({"error": f"Failed during article cleaning: {e}"}), 500

            try:
                article_summary = evaluate("Your evaluation call for article_summary here")
            except Exception as e:
                return jsonify({"error": f"Failed during article summarization: {e}"}), 500

            try:
                important_people = evaluate("Your evaluation call for important_people here")
            except Exception as e:
                return jsonify({"error": f"Failed to identify important people: {e}"}), 500

            try:
                dalle_image_link = generate_image(article_summary)
            except Exception as e:
                return jsonify({"error": f"Failed to generate image with DALL-E: {e}"}), 500

            try:
                analytics_metrics = analyze_text(cleaned_article)
            except Exception as e:
                return jsonify({"error": f"Failed during text analysis: {e}"}), 500

            # If all operations are successful, return the combined results
            return jsonify({
                "articleInfo": articleInfo,
                "cleanedArticleText": article_summary,
                "important_people": important_people,
                "dalle_image_link": dalle_image_link,
                "analytics_metrics": analytics_metrics  # converting a python dict
            })
        else:
            return jsonify({"message": "Failed to fetch page", "error": "Could not retrieve the page from the "
                                                                        "provided link"}), 400

    except Exception as e:
        # Catch any other exception that was not handled
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500


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
