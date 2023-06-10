import React, { useState } from 'react';
import axios from 'axios';


const API_KEY = "YOUR_API_KEY";
const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Merhaba, Ben ChatGPT! Bana istediğiniz soruyu sorabilirsiniz!",
      date: "şimdi",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        message: inputText,
        date: new Date().toLocaleString(),
        sender: "user"
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputText('');
      setIsTyping(true);

      await processMessageToChatGPT(newMessages);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const data = response.data;
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          date: new Date().toLocaleString(),
          sender: "ChatGPT"
        }]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsTyping(false);
  }

  return (
    <div className="container chatBotContainer">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="chat-about">
                  <h6 className="m-b-0">ChatBot</h6>
                  <small>Last seen: {messages[messages.length - 1].date}</small>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {messages.map((message, index) => (
                    <li className={`clearfix ${message.sender === 'user' ? 'me' : ''}`} key={index}>
                      <div className="message-data">
                        <span className="message-data-time">{message.date}</span>
                      </div>
                      <div className={`message ${message.sender === 'user' ? 'my-message float-right' : 'other-message'}`}>
                        {message.message}
                      </div>
                    </li>
                  ))}
                  {isTyping && (
                    <li>
                      <div className="message-data align-right">
                        <span className="message-data-time">...</span>
                      </div>
                      <div className="message other-message float-right typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <textarea
                  name="message-to-send"
                  id="message-to-send"
                  placeholder="Mesajınızı buraya yazın..."
                  rows="5"
                  value={inputText}
                  onChange={handleInputChange}
                ></textarea>
                <button className="chatsend-button" onClick={handleSendMessage}>
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;