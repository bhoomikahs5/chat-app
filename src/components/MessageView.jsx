// src/components/MessageView.jsx
import { useSubscription } from "@apollo/client";
import { MESSAGES_SUB } from "../graphql/chat";

export default function MessageView({ chatId }) {
  const { data, loading } = useSubscription(MESSAGES_SUB, {
    variables: { chatId },
    skip: !chatId,
  });

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select or create a chat
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50">
      {loading && <p className="text-sm text-gray-500">Loading messages…</p>}
      {data?.messages?.map((m) => (
        <div
          key={m.id}
          className={`flex ${
            m.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`rounded-xl px-4 py-2 shadow-sm ${
              m.role === "user"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            style={{
              maxWidth: "50%", // messages won’t exceed half width
              width: "fit-content", // short messages stay compact
              wordBreak: "break-word", // prevent overflow on long words
            }}
          >
            <div className="text-xs opacity-70 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
