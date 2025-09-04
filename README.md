# Chatbot Gemini

## Setup dan Menjalankan Aplikasi

### Backend
1. Masuk ke folder backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   - Copy `.env.example` ke `.env`
   - Isi `GOOGLE_API_KEY` dengan API key Gemini Anda

4. Jalankan server:
   ```bash
   npm start
   ```
   Server akan berjalan di http://localhost:3001

### Frontend
1. Masuk ke folder frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di http://localhost:3000

## API Endpoints

### POST /api/chat
- **URL**: `http://localhost:3001/api/chat`
- **Method**: POST
- **Body**: 
  ```json
  {
    "message": "Pesan dari user"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Respons dari Gemini AI"
  }
  ```

## Fitur Frontend

- ✅ Integrasi dengan API backend Gemini
- ✅ Loading state saat menunggu respons
- ✅ Error handling untuk koneksi gagal
- ✅ UI responsif dengan Tailwind CSS
- ✅ Dark mode support
- ✅ Auto scroll ke pesan terbaru