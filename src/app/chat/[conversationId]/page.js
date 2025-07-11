'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ChatWindow = dynamic(
  () => import('@/components/ChatWindow'),
  { ssr: false, loading: () => <p>Loading chat…</p> }
);

export default function ConversationPage() {
  const { conversationId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load current user
  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(stored);
    setCurrentUserId(user.id || user._id);
  }, [router]);

  // Fetch conversation participants
  useEffect(() => {
    if (!conversationId) return;

    const controller = new AbortController();
    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/conversation/${conversationId}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.participants)) {
          setParticipants(data.participants);
        } else {
          console.error('Bad data:', data);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load conversation:', err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [conversationId]);

  // Compute otherUserId before any early returns
  const otherUserId = useMemo(() => {
    if (participants.length !== 2 || !currentUserId) return null;
    return participants[0] === currentUserId
      ? participants[1]
      : participants[0];
  }, [participants, currentUserId]);

  if (loading) {
    return <p>Loading chat…</p>;
  }

  if (!currentUserId || !otherUserId) {
    return <p>Unable to load chat.</p>;
  }

  return (
    <main className="h-full flex flex-col p-4">
      <h1 className="text-xl font-semibold mb-4">Chat with Seller</h1>
      <div className="flex-1 rounded-lg p-2 bg-white shadow-sm">
        <ChatWindow
          currentUserId={currentUserId}
          sellerId={otherUserId}
          roomId={conversationId}
        />
      </div>
    </main>
  );
}
