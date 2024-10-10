import { useState } from "react";
import { jsPDF } from "jspdf";
import { formatRupiah } from "@/common/utils/format_price";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const result = await response.json();
      const formattedOrders = result.data.map((order: any) => ({
        product: order.products,
        quantity: order.quantity,
      }));
      setOrders(formattedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const addToOrder = async (product: Product) => {
    const existingOrder = orders.find(order => order.product.id === product.id);

    if (existingOrder) {
      const updatedOrders = orders.map(order =>
        order.product.id === product.id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      );
      setOrders(updatedOrders);
      await updateOrder(product.id, existingOrder.quantity + 1);
    } else {
      const newOrderItem = { product, quantity: 1 };
      setOrders([...orders, newOrderItem]);
      await createOrder(product.id, 1);
    }
  };

  const removeOrder = async (productId: number) => {
    const updatedOrders = orders.filter(order => order.product.id !== productId);
    setOrders(updatedOrders);
    await deleteOrder(productId);
  };

  const saveTransaction = async () => {
    const totalAmount = orders.reduce((total, order) => total + order.product.price * order.quantity, 0);
    const newTransaction = { id: Date.now(), items: orders, total: totalAmount };
    setTransactionHistory([...transactionHistory, newTransaction]);
    await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });
    await Promise.all(orders.map(order => deleteOrder(order.product.id)));
    generatePDF(newTransaction.items, totalAmount);
    setOrders([]);
  };

  const generatePDF = (items: OrderItem[], total: number) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a6' });
    const storeName = "Terima Kasih";
    const date = new Date().toLocaleString();

    doc.setFontSize(10);
    doc.text(storeName, 5, 10);
    doc.setFontSize(8);
    doc.text(`Tanggal: ${date}`, 5, 15);
    doc.text("==========================================================", 5, 20);
    doc.text("Item", 5, 25);
    doc.text("Qty", 50, 25);
    doc.text("Harga", 80, 25);
    doc.text("Total", 110, 25);
    doc.text("==========================================================", 5, 30);

    items.forEach((order, index) => {
      const itemTotal = order.product.price * order.quantity;
      const yPosition = 35 + (8 * index);
      doc.text(order.product.name, 5, yPosition);
      doc.text(order.quantity.toString(), 50, yPosition);
      doc.text(formatRupiah(order.product.price), 80, yPosition);
      doc.text(formatRupiah(itemTotal), 110, yPosition);
    });

    doc.text("==========================================================", 5, 35 + (8 * items.length));
    doc.text(`Total: ${formatRupiah(total)}`, 5, 40 + (8 * items.length));
    const pdfOutput = doc.output('datauristring');
    const pdfWindow = window.open('');

    if (pdfWindow) {
      pdfWindow.document.write(`<iframe width='100%' height='100%' src='${pdfOutput}'></iframe>`);
      pdfWindow.document.close();
    } else {
      console.error("Gagal membuka jendela baru untuk preview PDF.");
    }
  };

  const createOrder = async (productId: number, quantity: number) => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  };

  const updateOrder = async (productId: number, quantity: number) => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  };

  const deleteOrder = async (productId: number) => {
    await fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId }),
    });
  };

  return {
    orders,
    fetchOrders,
    addToOrder,
    removeOrder,
    saveTransaction,
  };
};
