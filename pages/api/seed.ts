// pages/api/seed.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, AudioService } from '../../lib/mongodb';

const initialAudioData = [
  {
    language: 'english',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with actual English TTS audio
    text: 'In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros.',
    duration: 30
  },
  {
    language: 'arabic',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav', // Replace with actual Arabic TTS audio
    text: 'في أرض إلدوريا القديمة، حيث تلمع السماء والغابات، تهمس الأسرار للريح، عاش تنين يدعى زفيروس.',
    duration: 32
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST to seed database.' });
  }

  try {
    const { db } = await connectToDatabase();
    const audioService = new AudioService(db);
    
    const results = [];
    
    for (const audioData of initialAudioData) {
      // Check if audio already exists
      const existing = await audioService.getAudioByLanguage(audioData.language);
      
      if (existing) {
        // Update existing record
        const updated = await audioService.updateAudio(audioData.language, audioData);
        results.push({ action: 'updated', data: updated });
      } else {
        // Create new record
        const created = await audioService.createAudio(audioData);
        results.push({ action: 'created', data: created });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      results
    });

  } catch (error) {
    console.error('Database seeding failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}