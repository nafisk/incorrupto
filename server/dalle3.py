from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI()


def generate_image(prompt):
    prompt = ("This is for a comic website. Use the following prompt and understand the main topic and create a funny relevant image in a comic/cartoony fashion") + prompt

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
# prompt = "a white siamese cat"
# image_url = generate_image(prompt)
# print("Generated image URL:", image_url)
