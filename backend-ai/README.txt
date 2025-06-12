
Untuk menjalankan Virtual Environment supaya tidak bentrok 
    python -m venv env
    env\Scripts\activate

Setelah itu baru menginstall library yang dibutuhkan
Perlu di install 
    python.exe -m pip install --upgrade pip
    pip install -r requirements.txt


Untuk menjalankan backend
    uvicorn main_chat:app --reload