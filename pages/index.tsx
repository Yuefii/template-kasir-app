import Card from "@/components/Card";
import Category from "@/components/Category";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  product_id: number;
  quantity: number;
  products: Product;
}


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      setProducts(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    if (categoryId === 0) {
      await fetchAllProducts();
      return;
    }

    try {
      const response = await fetch(`/api/products?category_id=${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      setProducts(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const result = await response.json();
      const formattedOrders = result.data.map((order: Order) => ({
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
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: existingOrder.quantity + 1,
        }),
      });
    } else {
      const newOrderItem = {
        product,
        quantity: 1,
      };
      
      setOrders([...orders, newOrderItem]);
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchOrders();
  }, []);

  return (
    <div className='flex'>
      <div className="mt-16 flex-1 p-4 h-[878px] overflow-auto">
        <Category onCategoryClick={fetchProductsByCategory} />
        <div className="grid grid-cols-3 gap-3">
          {products.map(product => (
            <div key={product.id} onClick={() => addToOrder(product)}>
              <Card
                title={product.name}
                image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 w-1/3 p-4">
        <h2 className="text-3xl">Daftar Pesanan</h2>
        <ul className="mt-2 h-[668px] overflow-auto space-y-3">
          {orders.map(order => (
            <li key={order.product.id} className="border-b border-black py-4 pr-3 flex justify-between items-center">
              <div className="flex gap-x-4">
                <span>{order.product.name}</span>
                <span className="text-teal-600 font-bold">x{order.quantity}</span>
              </div>
              <div className="flex gap-x-4 items-center">
                <span>Rp.{order.product.price * order.quantity}</span>
                <span className="rounded-md py-2 px-3 text-xs text-white bg-red-600">X</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="">
          <div className="flex justify-between items-center py-3 border-b border-black mb-4">
            <span className="text-xl text-center">Total Bayar :</span>
            <span>Rp.{orders.reduce((total, order) => total + order.product.price * order.quantity, 0)}</span>
          </div>
          <button className="bg-teal-600 p-3 rounded-md text-white w-full">Bayar Sekarang</button>
        </div>
      </div>
    </div>
  );
}
