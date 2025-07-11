// client/src/components/ChatStarter.js
import StartChatButton from './StartChatButton';

export default function ChatStarter({ sellerId }) {
  // Ensure it’s a string
  const sid = typeof sellerId === "string" ? sellerId : sellerId?.$oid || sellerId?.toString();
  return <StartChatButton receiverId={sid} />;
}