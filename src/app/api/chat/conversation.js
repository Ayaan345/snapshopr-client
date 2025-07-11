export default async function handler(req, res) {
    if (req.method === 'POST') {
      const body = req.body;
      const response = await fetch('http://localhost:4000/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }