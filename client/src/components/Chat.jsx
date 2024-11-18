import  { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        messages: updatedMessages,
      });

      const botMessage = response.data; // Bot's response from the backend
      setMessages((prev) => [...prev, botMessage]);
      console.log('Backend response: ', response.data);
    } catch (error) {
      console.error("Error communicating with the backend:", error);
    }
  };

  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {/* Header */}
        <h2 className="text-center mb-4">ChatGPT</h2>
  
        {/* Chat Window */}
        <div
          className="border rounded shadow p-3 mb-4"
          style={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`p-2 rounded ${msg.role === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                style={{ maxWidth: "75%" }}
              >
                <strong>{msg.role === "user" ? "You:" : "ChatGPT:"}</strong>
                <p className="mb-0">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Input Area */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChatGPT;
