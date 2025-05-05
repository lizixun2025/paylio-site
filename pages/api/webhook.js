export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 获取 Moralis 推送的数据
    const data = req.body;

    // 你可以先打印出来确认收到数据
    console.log('✅ Received from Moralis:', JSON.stringify(data, null, 2));

    // 示例：记录到 JSON 文件（测试用）
    // 后续你可以换成写入数据库
    // const fs = require('fs');
    // fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    // 响应 200 告诉 Moralis：我收到了！
    res.status(200).json({ message: 'Webhook received' });
  } catch (error) {
    console.error('❌ Error in webhook handler:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
