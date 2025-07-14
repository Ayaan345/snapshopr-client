"use client";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function StartChatButton({ receiverId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const senderId = session?.user?.id;

  console.log("session:", session);
  console.log("senderId:", senderId, "receiverId:", receiverId);
  console.log("receiverId in StartChatButton:", receiverId);

  const startChat = async () => {
    if (!session) {
      alert("User is not logined in. Please log in to start a chat.");
      return;
    }
    if (!senderId || !receiverId) {
      console.error("Missing senderId or receiverId");
      return;
    }

    const res = await fetch("/chat/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participants: [senderId, receiverId] }),
    });
    const data = await res.json();
    if (data.conversationId) {
      router.push(`/chat/${data.conversationId}`);
    } else {
      console.error("Missing conversationId!", data);
    }
  };

  return <button className="bg-orange-500 text-white py-3 px-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors" onClick={startChat}>Chat With Seller</button>;
}