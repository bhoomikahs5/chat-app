import { useQuery, useMutation } from "@apollo/client";
import { GET_CHATS, CREATE_CHAT } from "../graphql/chat";

export default function ChatList({ activeChatId, onSelectChat }) {
  const { data, loading } = useQuery(GET_CHATS);
  const [createChat, { loading: creating }] = useMutation(CREATE_CHAT, {
    refetchQueries: [GET_CHATS],
  });

  const handleNewChat = async () => {
    try {
      const { data } = await createChat({
        variables: { title: "New Chat" }, // ✅ always pass title
      });
      if (data?.insert_chats_one?.id) {
        onSelectChat(data.insert_chats_one.id);
      }
    } catch (err) {
      console.error("Error creating chat:", err.message);
    }
  };

  return (
    <div className="w-64 border-r flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-semibold">Chats</h3>
        <button
          onClick={handleNewChat}
          disabled={creating}
          className="text-sm px-2 py-1 rounded bg-purple-600 text-white"
        >
          {creating ? "Creating..." : "New"}
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <p className="p-3 text-sm text-gray-500">Loading…</p>
        ) : (
          data?.chats?.map((c, index) => (
            <button
              key={c.id}
              onClick={() => onSelectChat(c.id)}
              className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                activeChatId === c.id ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {/* ✅ show title instead of raw id */}
              {c.title || `Chat ${index + 1}`}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
