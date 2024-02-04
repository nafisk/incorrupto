# Incorrupto

## Inspiration
2024 is the first election cycle where voter deception and large language models are huge threats.  Political articles, speeches, and videos contain jargon, implicit bias, and hidden context that many people have trouble understanding. Also, the use of LLMs is widespread and it is often difficult for people to distinguish between human and AI generated content. So, we wanted to build a tool that can leverage LLMs to help voters stay informed


## What it does
Incorrupto empowers users to submit an article or video link on our website and receive an extensive analysis of the content. This includes evaluations from models that assess political bias, differentiate between facts and opinions, identify toxicity, and flag inappropriate content. Additionally, our tool provides sentiment analysis, readability scores, and utilizes a political cartoon generator API to offer a comprehensive understanding of the material.

## How we built it
The frontend is crafted with Next.js, ensuring a responsive and interactive user experience. For the backend, we implemented Flask, which interfaces with Gemini for text parsing and information gathering. Hugging Face's machine learning models are utilized for content analysis, including political bias detection and toxicity measurement. The persistent storage is handled by GCP Bigtable, ensuring scalability and performance. We also integrated a political cartoon generator API and leveraged GPT to pinpoint individuals and organizations within the text.

## Challenges we ran into
Our journey wasn't without hiccups; we encountered and resolved git conflicts. We took a step back and communicated with each other immediately during any major conflicts to ensure we were on the same page. This helped resolve conflicts swiftly. Another struggle we faced was choosing the best database for our project since GCP has so many different databases available. We wanted to use something simple while utilizing GCP because we already had a project set up to query Gemini. So, we researched the pros and cons of using different databases including Cloud Datastore, AlamoDB, and BigTable. Taking some time to do research paid off in the long run as we settled on BigTable to take advantage of NoSql, easy connection, and low latency. Despite the hurdles, we managed to deliver a seamless product.

## Accomplishments that we're proud of
Our backend architecture is robust, and our frontend design is sleek and user-friendly. We take pride in our dedication to voter education and awareness, culminating in a versatile tool that provides valuable insights into political content. Our effective use of GCP has been instrumental in achieving a scalable and efficient database and analytics platform.

## What we learned
Each team member has gained valuable experience, with specific learnings in GCP operations and the nuanced handling of political content analysis.

## What's next for Incorrupto
The immediate step is to deploy the tool for public use. Beyond that, we are exploring the development of a Chrome extension to bring our analytical capabilities directly into users' browsers for real-time content assessment.
