// pages/api/audio.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, AudioService } from '../../lib/mongodb';

interface AudioData {
  [key: string]: {
    audioUrl: string;
    language: string;
    duration: number;
  };
}

// Fallback data for demo purposes if MongoDB is not configured
const fallbackAudioDatabase: AudioData = {
  english: {
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    language: 'English',
    duration: 30
  },
  arabic: {
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav',
    language: 'Arabic',
    duration: 32
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { language } = req.query;

  if (!language || typeof language !== 'string') {
    return res.status(400).json({ message: 'Language parameter is required' });
  }

  try {
    // Try to connect to MongoDB
    const { db } = await connectToDatabase();
    const audioService = new AudioService(db);
    
    // Fetch audio from database
    const audioData = await audioService.getAudioByLanguage(language.toLowerCase());
    
    if (audioData) {
      return res.status(200).json({
        success: true,
        audioUrl: audioData.audioUrl,
        language: audioData.language,
        duration: audioData.duration
      });
    }

    // If no data found in database, return 404
    return res.status(404).json({ message: 'Audio not found for the specified language' });

  } catch (error) {
    console.error('Database connection failed, using fallback data:', error);
    
    // Fallback to mock data if database connection fails
    const audioData = fallbackAudioDatabase[language.toLowerCase()];
    
    if (!audioData) {
      return res.status(404).json({ message: 'Audio not found for the specified language' });
    }

    return res.status(200).json({
      success: true,
      audioUrl: audioData.audioUrl,
      language: audioData.language,
      duration: audioData.duration
    });
  }
}