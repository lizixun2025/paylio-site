import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 清理非法字符（如 \u0000）
function sanitize(input) {
  return typeof input === 'string' ? input.replace(/\u0000/g, '') : input;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    console.log('✅ Received from Moralis:', JSON.stringify(data, null, 2));

    const transfer = data.erc20Transfers?.[0];
    if (!transfer) {
      return res.status(200).json({ message: 'No erc20 transfer found' });
    }

    const { chainId, tag, confirmed } = data;
    const { from, to, value, tokenSymbol, transactionHash } = transfer;

    const { error } = await supabase.from('transactions').insert([
      {
        chainId,
        tag: sanitize(tag),
        confirmed,
        from: sanitize(from),
        to: sanitize(to),
        value,
        tokenSymbol,
        txHash: transactionHash,
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return res.status(500).json({ message: 'Insert failed' });
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('❌ Error in webhook handler:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
