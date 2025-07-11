// client/src/app/api/items/route.js
import dbConnect from '../../../lib/db';     // adjust path to your mongoose helper
import Item from '../../../models/item';     // adjust path to your Item model

export async function GET(req) {
  try {
    await dbConnect();
    const { search = '', limit = '5' } = Object.fromEntries(req.nextUrl.searchParams);
    const filter = search.trim()
      ? { name: { $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), $options: 'i' } }
      : {};
    const items = await Item.find(filter).limit(Number(limit));
    return new Response(JSON.stringify({ items }), { status: 200 });
  } catch (err) {
    console.error('[api/items] error', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
