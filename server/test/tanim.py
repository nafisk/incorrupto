# import requests


# # fact or opinion model
# fact_or_opinion_API_URL = "https://api-inference.huggingface.co/models/lighteternal/fact-or-opinion-xlmr-el"
# headers1 = {"Authorization": "Bearer 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"}


# def query_fact_opinion(payload):
# 	response = requests.post(fact_or_opinion_API_URL, headers=headers1, json=payload)
# 	return response.json()
	
# def get_fact_or_opinion(text):
#     output = query_fact_opinion({
#         "inputs": text,
#     })

#     return output



# # toxicity report
# toxic_API_URL = "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta"
# headers2 = {"Authorization": "Bearer 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"}

# def toxic_query(payload):
# 	response = requests.post(toxic_API_URL, headers=headers2, json=payload)
# 	return response.json()
	


# def get_toxicity(text):
#     output = toxic_query({
#         "inputs": text,
#     })

#     return output



# implicit_hate_API_URL = "https://api-inference.huggingface.co/models/tomh/toxigen_roberta"
# headers3 = {"Authorization": "Bearer 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"}

# def implicit_hate_query(payload):
# 	response = requests.post(implicit_hate_API_URL, headers=headers3, json=payload)
# 	return response.json()
	

# def detect_implicit_hate(text):
#     output = implicit_hate_query({
#         "inputs": text,
#     })

#     return output


from flask import Flask, request, jsonify
from flask_cors import CORS

# Import your functions here
from tanim_module import analyze_text

app = Flask(__name__)
CORS(app)  # Enables CORS for all domains on all routes

@app.route('/analyze/fact-or-opinion', methods=['POST'])
def fact_or_opinion_route():
    text = request.json.get('text', '')
    result = get_fact_or_opinion(text)
    return jsonify(result)

@app.route('/analyze/toxicity', methods=['POST'])
def toxicity_route():
    text = request.json.get('text', '')
    result = get_toxicity(text)
    return jsonify(result)

@app.route('/analyze/implicit-hate', methods=['POST'])
def implicit_hate_route():
    text = request.json.get('text', '')
    result = detect_implicit_hate(text)
    return jsonify(result)





if __name__ == '__main__':
    app.run(debug=True)
