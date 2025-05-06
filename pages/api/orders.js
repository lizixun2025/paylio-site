import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false }) // 最新的记录排前面

    if (error) {
      console.error('❌ Supabase query error:', error);
      return res.status(500).json({ message: 'Failed to fetch transactions' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('❌ API error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
