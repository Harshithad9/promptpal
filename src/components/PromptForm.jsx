// src/components/PromptForm.jsx
import React, { useState } from 'react';

const PromptForm = () => {
  const [platform, setPlatform] = useState('ChatGPT');
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');

  const generatePrompt = () => {
    const prompt = `Generate a ${platform} prompt to discuss: "${topic}"`;
    setOutput(prompt);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-purple-700">PromptPal 🎯</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose Platform</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>ChatGPT</option>
          <option>Bard</option>
          <option>Claude</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Enter Topic</label>
        <input
          type="text"
          placeholder="e.g. social media addiction, interview questions..."
          className="w-full border px-3 py-2 rounded"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <button
        onClick={generatePrompt}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Generate Prompt
      </button>

      {output && (
        <div className="bg-gray-100 p-4 rounded text-gray-800">
          <strong>Generated Prompt:</strong>
          <p className="mt-2">{output}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
