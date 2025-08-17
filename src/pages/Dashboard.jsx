import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../graphql/chat";
import ChatList from "../components/ChatList";
import MessageView from "../components/MessageView";
import MessageInput from "../components/MessageInput";

export default function Dashboard() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [createChat] = useMutation(CREATE_CHAT);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const handleNewChat = async () => {
  try {
    const { data } = await createChat({
      variables: { 
        title: "New Chat", 
        userId: user.id   // 👈 pass logged-in user id
      },
    });
    if (data?.insert_chats_one?.id) {
      setActiveChatId(data.insert_chats_one.id);
    }
  } catch (err) {
    console.error("Error creating chat:", err.message);
  }
};


  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white flex flex-col shadow-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 border-b">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
            U
          </div>
          <button
            className="mt-4 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            onClick={handleNewChat}
          >
            + Start New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <ChatList activeChatId={activeChatId} onSelectChat={setActiveChatId} />
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-100 text-white rounded-lg hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <MessageView chatId={activeChatId} />
        <MessageInput chatId={activeChatId} />
      </div>
    </div>
  );
}
