import React, { useState, useRef, useEffect } from 'react';
import Miku from './assets/miku.png';
import Box from '../ChatBox/Box';
import Header from '../../Header/Header';
import axios from 'axios';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// Import speech synthesis objects
const speechSynthesis = window.speechSynthesis;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

function ChatImage() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [response, setResponse] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null); // State to store the selected voice

  // Function to handle TTS for Miku's responses
  const handleMikuTTS = (text) => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Select a female voice (modify this to match your desired voice)
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (message) {
      setResponse((prev) => [...prev, { message }]);
      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
      };

      axios
        .post(API_ENDPOINT, requestData, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const chatGptReply = res.data.choices[0].message.content;
          setResponse((prev) => [...prev, { response: chatGptReply }]);
          setMessage(null);
          handleMikuTTS(chatGptReply);
          console.log(res);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  }, [message]);

  const handleSent = () => {
    setMessage(inputRef.current.value);
    inputRef.current.value = null;
    console.log(inputRef.current);
  };

  const handleClear = () => {
    setMessage(null);
    setResponse([]);
  };

  // Function to handle voice selection
  const handleVoiceSelection = (event) => {
    const selectedVoiceId = event.target.value;
    const voice = speechSynthesis.getVoices().find((v) => v.voiceURI === selectedVoiceId);
    setSelectedVoice(voice);
  };

  return (
    <>
      <Header handleClear={handleClear} />
      <div className="grid grid-cols-3 gap-4 mt-5 p-6">
        <div className="col-span-1 text-black text-5xl text-center">
          Chat Log
          <div className="container">
            {response.length
              ? response.map(({ message, response }) => (
                  <>
                    <div className="text-2xl text-left mt-5">
                      {message ? (
                        <>
                          <span className="text-blue-500">User</span>: {message}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="text-2xl text-left mt-2">
                      {response ? (
                        <>
                          <span className="text-pink-500">Miku</span>: {response}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                ))
              : null}
          </div>
        </div>
        <div className="col-span-2 ">
          <img src={Miku} alt="Miku" />
        </div>
      </div>
      <div className='text-center'>
        <label className='text-2xl text-red-500'>Select a Voice: </label>
        <select className='text-1xl' onChange={handleVoiceSelection}>
          {speechSynthesis.getVoices().map((voice) => (
            <option  key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <Box handleSent={handleSent} ref={inputRef} />
    
    </>
  );
}

export default ChatImage;
