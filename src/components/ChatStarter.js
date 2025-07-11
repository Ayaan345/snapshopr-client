import StartChatButton from './StartChatButton';

export default function ChatStarter({ sellerId }) {
  const sid = typeof sellerId === "string" ? sellerId : sellerId?.$oid || sellerId?.toString();
  return <StartChatButton receiverId={sid} />;
}