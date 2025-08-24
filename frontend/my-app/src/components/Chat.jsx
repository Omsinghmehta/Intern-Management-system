import { backendUrl } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setActiveChat, clearActiveChat } from "../redux/chatSlice";


export default function Chat({socket}) {
  const { internId, managerId } = useParams();
  const { user } = useSelector((state) => state.auth);

const roomId = `manager_${managerId}_intern_${internId}`;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {
  dispatch(setActiveChat(roomId));

  const fetchChats = async () => {
    const { data } = await axios.get(`${backendUrl}/api/auth/${roomId}`);
    setMessages(data);
  };
  fetchChats();

  // ✅ join room
  socket.emit("joinRoom", roomId);

  // ✅ listen for messages of this room only
  socket.on("receiveMessage", (data) => {
    if (data.roomId === roomId) {   // important check
      setMessages((prev) => [...prev, data]);
    }
  });

  return () => {
    socket.off("receiveMessage");
    socket.emit("leaveRoom", roomId);   // ✅ leave old room
    dispatch(clearActiveChat());
  };
}, [roomId, socket, dispatch]);

 const sendMessage = () => {
  if (message.trim() !== "") {
    socket.emit("sendMessage", { roomId, senderId: user._id, sender: user.name, message });
    setMessage("");
  }
};

  return (
    <div className="flex flex-col h-[80vh] w-full my-8 max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 font-semibold text-lg">
         Chat Room
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.sender === user.name ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow ${
                msg.sender === user.name
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <span className="block text-xs opacity-70 mt-1">
                {msg.sender}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 border-t bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
