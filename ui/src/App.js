import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await axios.post('http://localhost:8000/ask/', { question: input });
    const aiMessage = JSON.parse(response.data).choices[0].message.content;
    setMessages([...messages, { text: input, sender: 'user' }, { text: aiMessage, sender: 'ai' }]);
    setInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); // Prevent form submission
    }
  };

  return (
    <div className="container">
      {messages.map((message, index) => (
        <pre key={index} className={`message ${message.sender}`}>
          <strong>{message.sender}:</strong> {message.text}
        </pre>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;