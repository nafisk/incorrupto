from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI()

def generate_image(prompt):
    prompt = prompt + " Based on this political article, can you create a satirical political cartoon that highlights the main points with a humorous or ironic twist?"

    # Generate an image using the DALL-E model with the provided prompt
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    # Retrieve the URL of the generated image
    image_url = response.data[0].url
    return image_url

# Example usage:
prompt = "a white siamese cat"
image_url = generate_image(prompt)
print("Generated image URL:", image_url)
