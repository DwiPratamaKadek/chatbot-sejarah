from fastapi import FastAPI #framework dari python untuk membuat API secara cepat dan efisien 
from fastapi.middleware.cors import CORSMiddleware #Middleware untuk mengatur CORS (Cross-Origin Resource Sharing) agar API bisa diakses dari frontend (misalnya React, Vue).
from pydantic import BaseModel #Digunakan untuk validasi dan parsing data masuk (request) menggunakan Pydantic.
import google.generativeai as genai #Library dari Google Generative AI (Gemini).
from google.generativeai import types #Library dari Google Generative AI (Gemini).
from dotenv import load_dotenv #untuk mengambil variable lingkungan dari .env 
import os #untuk mengakses variable lingkungan di OS

from langchain.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import CharacterTextSplitter

load_dotenv() #memuat variable dari file .env ke lingkungan python agar bisa diakses di "os.getenv()""

 
app = FastAPI()
history = []
genai.configure(api_key=os.getenv("GEMINI_API_KEY")) # untuk mengakses API key Gemini 
model = genai.GenerativeModel("gemini-1.5-flash") # menentukan model dari gemini
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

class Message(BaseModel): # membuat type input dengan type data str yang digunakan untuk menerima data dari request POST 
    user_input: str

# untuk membuat inisialisasi FastAPI dan Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
    
)

# Membuat fungsi untuk mengambil data dari sraped_data 
def load_scraped_text(folder="scraped_data", max_chars=10000):
    combined_text = ""
    for file_name in os.listdir(folder):
        if file_name.endswith(".txt"):
            file_path = os.path.join(folder, file_name)
            with open(file_path, "r", encoding="utf-8") as f:
                combined_text += f.read() + "\n\n"
                if len(combined_text) > max_chars:
                    break
    return combined_text[:max_chars].strip()




@app.post("/api/chat")  # endpoint untuk menerima request POST
async def chat(message: Message): # yang menerima input message 
    global history # membuat variable global history

    user_input = message.user_input

    history.append({"role": "user", "content": message.user_input}) #menambahkan history dari inputan user 
    scraped_knowledge = load_scraped_text()

    prompt = (
        "Gunakan informasi berikut untuk menjawab pertanyaan di bawah ini.\n\n"
        f"{scraped_knowledge}\n\n"
        f"Pertanyaan: {user_input}"
    )


    # MENGHASILKAN RESPOND DARI MODEL AI 
    try:
        response = model.generate_content(prompt)
        bot_reply = response.text # semua variable disimpan ke variable response lalu dikembalikan dalam format JSON 
        history.append({"role" : "bot", "content" : bot_reply}) # menambahkan history dari respond AI ke dalam list history
        return {"response": bot_reply, "history": history} # mengembalikan respond dan history dalam format JSON
    #PENANGAN EROR
    except Exception as e:
        return {"error": str(e)} 
