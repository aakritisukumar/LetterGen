# 📨 LetterGen - Smart Letter Generation App

LetterGen is a full-stack web application that enables users to automatically generate professional letters such as Resignation, Recommendation, Offer, Complaint, and Appreciation letters. With tone customization (Formal, Friendly, Apologetic, etc.) and descriptive prompts, the app generates structured, contextually rich letters ready for download.

## 🚀 Features
- 🔐 User Authentication with JWT
- 🧠 AI-powered letter generation (via Hugging Face API)
- 🎯 Supports multiple letter types and tones
- 📄 Download letters as PDF using `jsPDF` and `html2canvas`
- 🎨 Responsive UI using React
- 📦 MongoDB Integration for user and letter storage
- 🌐 **Deployed** on Vercel & Render
  
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Authentication**: JWT-based login system
- **PDF Generation**: jsPDF, html2canvas

## 📌 How It Works
1. Users sign in using their credentials.
2. Fill in the form with sender/recipient info, select letter type and tone.
3. Add description for letter context.
4. Click “Generate” → get an AI-crafted letter.
5. Option to download the letter as a PDF.

## 🚀 Deployment Links
[![Vercel](https://vercelbadge.vercel.app/api/aakritisukumar/LetterGen)](https://letter-gen-neon.vercel.app/home)

## Screenshots

 1. Sign Up Page

![Screenshot 2025-06-13 203312](https://github.com/user-attachments/assets/ce1d5c7a-8dff-40ea-9b92-6303bb04890c)

2. Log In Page

![Screenshot 2025-06-21 020943](https://github.com/user-attachments/assets/456506a6-c00d-4037-a127-09e95a8fd5a0)

3. Home Page

![Screenshot 2025-06-21 020913](https://github.com/user-attachments/assets/e7fb1138-3a2e-4478-9bb3-9aedfd893462)


## 🔐 Environment Variables (Sample)

Add the following `.env` in your backend (not pushed to GitHub):

```env
MONGO_URI=your_mongodb_connection_string
HF_API_KEY=your_huggingface_token
JWT_SECRET=your_jwt_secret

