// import { useEffect, useState } from 'react';
// import { io } from "socket.io-client";

// const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000");

// export default function ChatWindow({ currentUserId, sellerId }) {
//   const [msg, setMsg] = useState('');
//   const [messages, setMessages] = useState([]);
//   const roomId = [currentUserId, sellerId].sort().join('-');

//   useEffect(() => {
//     socket.emit('joinRoom', roomId);

//     socket.on('receiveMessage', (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);

//   const sendMessage = () => {
//     const newMsg = { senderId: currentUserId, text: msg, roomId };
//     socket.emit('sendMessage', newMsg);
//     setMessages((prev) => [...prev, newMsg]);
//     setMsg('');
//   };

//   return (
//     <div className="chat-box">
//       <div className="chat-history">
//         {messages.map((m, i) => (
//           <p key={i} style={{ textAlign: m.senderId === currentUserId ? 'right' : 'left' }}>
//             {m.text}
//           </p>
//         ))}
//       </div>
//       <input value={msg} onChange={(e) => setMsg(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

// Assuming you have Tailwind CSS configured in your Next.js project.
// If not, you'll need to install it: https://tailwindcss.com/docs/installation

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000");

export default function ChatWindow({ currentUserId, sellerId }) {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const roomId = [currentUserId, sellerId].sort().join('-');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (msg.trim() === '') return; // Prevent sending empty messages
    const newMsg = { senderId: currentUserId, text: msg, roomId };
    socket.emit('sendMessage', newMsg);
    setMsg('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#ffffff] text-[#ececf1] font-sans border-none">
      {/* Chat History Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            // Message container for alignment
            className={`flex ${m.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {/* Message bubble */}
            <div
              className={`max-w-[70%] p-3 rounded-xl break-words ${
                m.senderId === currentUserId
                  ? 'bg-[#cacacb] text-black' // Sent message background
                  : 'bg-[#cacacb] text-black' // Received message background
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-[#ffffff] p-4  flex items-center shadow-lg">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Send a message..."
          className="flex-grow p-3 rounded-xl border-none bg-[#a3a3a3] text-[#ececf1] mr-4 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
        />
        <button
          onClick={sendMessage}
          className="bg-[#1a73e8] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#155bb5] transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}