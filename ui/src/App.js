import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const sendMessage = async () => {
    setIsLoading(true);  // Set loading to true when the request starts
    const response = await axios.post('http://localhost:8000/ask/', { question: input });
    const aiMessage = JSON.parse(response.data).choices[0].message.content;
    setMessages([...messages, { text: input, sender: 'user' }, { text: aiMessage, sender: 'ai' }]);
    setInput('');
    setIsLoading(false);  // Set loading to false when the request completes
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault();
    }
  };

  return (
    <div className="container">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <strong>{message.sender}:</strong> {message.text}
        </div>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}  // Disable input during loading
      />
      <button onClick={sendMessage} disabled={isLoading}>Send</button>
      {isLoading && <div className="spinner"></div>}

    </div>
  );
}

export default App;
