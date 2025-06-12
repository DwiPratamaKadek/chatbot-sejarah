# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()


def generate():
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY"),
    )
    model = "gemini-1.5-flash"
    while True:
        user_input = input ("You : ")
        if user_input.lower() == "quit":
            print ("good bye")
            break

        
        contents = [    
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=user_input),
                ],
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            response_mime_type="text/plain",
        )
        print ("Bot :", end="")
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            print(chunk.text, end="")
        print()

if __name__ == "__main__":
    generate()
