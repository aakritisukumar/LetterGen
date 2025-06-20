// routes/letter.js
import express from 'express';
import axios from 'axios';
import Letter from '../models/letter.model.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/letter/generate (protected)
router.post('/generate', verifyToken, async (req, res) => {
  const { name, designation, recipient,
  recipientDesignation, company,
  letterType, tone, description } = req.body;
  
  const prompt = `Write a ${letterType} letter from ${name}, ${designation} at ${company}, addressed to ${recipient}, ${recipientDesignation}. Tone: ${tone}. Description: ${description}.`;
  
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let letterContent = '';
    if (response.data.generated_text) {
      letterContent = response.data.generated_text;
    } else if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      letterContent = response.data[0].generated_text;
    } else {
      letterContent = 'No generated text found in response.';
    }

    //Save to MongoDB with the userId from the JWT
    const newLetter = new Letter({
      userId: req.user.id,   
      letterType,
      content: letterContent
    });
    await newLetter.save();

    res.status(200).json({ letter: letterContent, message: 'Letter generated and saved successfully.' });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);

    res.status(500).json({ error: 'Failed to generate letter' });
  }
  
});

export default router;
