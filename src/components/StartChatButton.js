// // client/src/components/StartChatButton.js
// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function StartChatButton({ sellerId }) {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("currentUser");
//     if (stored) {
//       try {
//         setCurrentUser(JSON.parse(stored));
//       } catch {
//         console.error("Invalid currentUser in localStorage");
//       }
//     }
//   }, []);

//   const startChat = async () => {
//     if (!currentUser) {
//       router.push("/login");
//       return;
//     }

//     const userId1 = currentUser.id || currentUser._id;

//     // 🔁 This is where your fetch should be
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/conversation`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId1, userId2: sellerId }),
//       }
//     );

//     if (!res.ok) {
//       console.error("Failed to start chat:", await res.text());
//       return;
//     }

//     const { conversationId } = await res.json();
//     router.push(`/chat/${conversationId}`);
//   };

//   return (
//     <button
//       onClick={startChat}
//       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//     >
//       Chat with Seller
//     </button>
//   );
// }

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