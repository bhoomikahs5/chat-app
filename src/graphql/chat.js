// src/graphql/chat.js
import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      created_at
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;


export const MESSAGES_SUB = gql`
  subscription MessagesByChat($chatId: uuid!) {
    messages(where: { chat_id: { _eq: $chatId } }, order_by: { created_at: asc }) {
      id
      role
      content
      sender_id
      created_at
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: uuid!, $content: String!) {
    insert_messages_one(object: {
      chat_id: $chatId,
      content: $content,
      role: "user"
    }) {
      id
    }
  }
`;

/** Hasura Action */
export const CHATBOT_RESPOND = gql`
  mutation ChatbotRespond($chatId: uuid!, $messageId: uuid!, $text: String!) {
    chatbot_respond(chat_id: $chatId, message_id: $messageId, text: $text) {
      ok
    }
  }
`;
