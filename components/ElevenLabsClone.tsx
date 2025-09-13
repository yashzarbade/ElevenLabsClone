// components/ElevenLabsClone.tsx
import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  Play, 
  Download, 
  Mic, 
  Music, 
  MessageSquare, 
  Volume2, 
  Copy, 
  Sparkles 
} from 'lucide-react';

const ElevenLabsClone = () => {
  const [activeTab, setActiveTab] = useState('text-to-speech');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [textContent, setTextContent] = useState(`In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const languages = [
    { code: 'english', label: 'ENGLISH', flag: '🇺🇸' },
    { code: 'arabic', label: 'ARABIC', flag: '🇸🇦' }
  ];

  const tabs = [
    { id: 'text-to-speech', label: 'TEXT TO SPEECH', icon: Mic, active: true },
    { id: 'agents', label: 'AGENTS', icon: MessageSquare, active: false },
    { id: 'music', label: 'MUSIC', icon: Music, active: false },
    { id: 'speech-to-text', label: 'SPEECH TO TEXT', icon: Volume2, active: false },
    { id: 'dubbing', label: 'DUBBING', icon: Copy, active: false },
    { id: 'voice-cloning', label: 'VOICE CLONING', icon: Sparkles, active: false },
    { id: 'elevenreader', label: 'ELEVENREADER', icon: Volume2, active: false },
  ];

  const speakers = [
    { name: 'Samara', task: 'Narrate a story', color: 'bg-teal-500' },
    { name: '2 speakers', task: 'Create a dialogue', color: 'bg-pink-500' },
    { name: 'Announcer', task: 'Voiceover a game', color: 'bg-teal-500' },
    { name: 'Sergeant', task: 'Play a drill sergeant', color: 'bg-purple-500' },
    { name: 'Spuds', task: 'Recount an old story', color: 'bg-teal-500' },
    { name: 'Jessica', task: 'Provide customer support', color: 'bg-pink-500' }
  ];

  const playAudio = async () => {
    try {
      setIsPlaying(true);
      const response = await fetch(`/api/audio?language=${selectedLanguage}`);
      const data = await response.json();
      
      if (data.success && audioRef.current) {
        audioRef.current.src = data.audioUrl;
        await audioRef.current.play();
      } else {
        throw new Error('Failed to fetch audio');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
      alert('Audio playback failed. Please try again.');
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const downloadAudio = async () => {
    try {
      const response = await fetch(`/api/audio?language=${selectedLanguage}`);
      const data = await response.json();
      
      if (data.success) {
        // Create download link
        const link = document.createElement('a');
        link.href = data.audioUrl;
        link.download = `${selectedLanguage}-audio.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold">ElevenLabs</div>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span>Creative Platform</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span>Agents Platform</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span>Developers</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Enterprise</span>
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Pricing</span>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900">Log in</button>
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The most realistic voice AI platform
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12">
          AI voice models and products powering millions of developers, creators, and enterprises. From 
          low-latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors btn-hover">
            SIGN UP
          </button>
          <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-200 transition-colors btn-hover">
            CONTACT SALES
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-1 bg-gray-100 rounded-full p-1 max-w-fit mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        {activeTab === 'text-to-speech' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm">
            {/* Text Editor */}
            <div className="mb-8">
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="w-full h-48 md:h-64 p-4 md:p-6 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 leading-relaxed text-sm md:text-base"
                placeholder="Enter your text here..."
              />
            </div>

            {/* Speaker Tags */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${speaker.color}`}></div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{speaker.name}</div>
                    <div className="text-gray-600 text-xs">{speaker.task}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div 
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  >
                    <span className="text-lg">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                    <span className="font-medium text-gray-900 text-sm md:text-base">
                      {languages.find(lang => lang.code === selectedLanguage)?.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>
                  {showLanguageDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-full">
                      {languages.map((language) => (
                        <div
                          key={language.code}
                          className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedLanguage(language.code);
                            setShowLanguageDropdown(false);
                          }}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className={`font-medium text-sm md:text-base ${
                            selectedLanguage === language.code ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {language.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="flex items-center space-x-2 bg-black text-white px-4 md:px-6 py-3 rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors btn-hover"
                >
                  <Play className="w-4 md:w-5 h-4 md:h-5" />
                  <span className="text-sm md:text-base">{isPlaying ? 'PLAYING...' : 'PLAY'}</span>
                </button>
                <button 
                  onClick={downloadAudio}
                  className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors btn-hover"
                >
                  <Download className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty content for other tabs */}
        {activeTab !== 'text-to-speech' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 md:p-20 text-center shadow-sm">
            <div className="text-gray-500 text-lg md:text-xl">
              {tabs.find(tab => tab.id === activeTab)?.label} content will be implemented here
            </div>
            <div className="text-gray-400 text-sm mt-2">
              This section is currently under development
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="text-center py-16 md:py-20 mt-20">
        <div className="text-gray-600 mb-4 text-sm">Powered by Eleven v3 (alpha)</div>
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-2xl p-1 max-w-fit mx-auto">
          <div className="bg-white rounded-xl px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <span className="text-gray-900 font-medium text-sm md:text-base text-center">
              EXPERIENCE THE FULL AUDIO AI PLATFORM
            </span>
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors btn-hover">
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Audio element for playback */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      {/* Click outside to close dropdown */}
      {showLanguageDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </div>
  );
};

export default ElevenLabsClone;