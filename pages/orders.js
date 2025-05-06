import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:px-12">
      <h1 className="text-3xl font-bold text-[#003366] mb-6">交易记录</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.txHash} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
            <CardContent>
              <p className="text-gray-600 text-sm mb-1">
                <strong className="text-[#003366]">状态：</strong>
                {order.confirmed ? "✅ 已确认" : "⏳ 待确认"}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong className="text-[#003366]">链：</strong>
                {order.chainId}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong className="text-[#003366]">发送方：</strong>
                {order.from}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong className="text-[#003366]">接收方：</strong>
                {order.to}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong className="text-[#003366]">金额：</strong>
                {Number(order.value) / 1e18} {order.tokenSymbol}
              </p>
              <p className="text-gray-500 text-xs break-all mt-2">
                TX Hash: {order.txHash}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
