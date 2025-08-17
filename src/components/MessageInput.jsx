// src/components/MessageInput.jsx
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SEND_MESSAGE, CHATBOT_RESPOND } from "../graphql/chat";

export default function MessageInput({ chatId }) {
  const [text, setText] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [chatbotRespond] = useMutation(CHATBOT_RESPOND);

  const onSend = async (e) => {
    e.preventDefault();
    if (!chatId || !text.trim()) return;

    // 1) Insert the user message
    const { data } = await sendMessage({
      variables: { chatId, content: text.trim() },
      // optimistic UI (optional)
      optimisticResponse: {
        insert_messages_one: { id: "optimistic-" + Date.now(), __typename: "messages" },
      },
    });

    const messageId = data?.insert_messages_one?.id;

    // 2) Trigger the chatbot via Hasura Action
    chatbotRespond({
      variables: { chatId, messageId, text: text.trim() },
    }).catch(() => {
      // optional: show toast
    });

    // 3) Clear input. Assistant reply will arrive via subscription.
    setText("");
  };

  if (!chatId) return null;

  return (
    <form onSubmit={onSend} className="p-3 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
        className="flex-1 border rounded px-3 py-2"
      />
      <button className="px-4 py-2 rounded bg-purple-100 hover:bg-purple-500 text-white">Send</button>
    </form>
  );
}
