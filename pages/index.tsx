import { formatRupiah } from "@/common/utils/format_price";
import Card from "@/components/Card";
import Category from "@/components/Category";
import Navbar from "@/components/Navbar";
import { useOrders } from "@/hooks/use_orders";
import { useProducts } from "@/hooks/use_products";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, searchResults, fetchProductsByCategory, handleSearchResults } = useProducts();
  const { orders, fetchOrders, addToOrder, removeOrder, saveTransaction } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBayarSekarang = () => {
    setIsModalOpen(true);
  };

  const handleLanjutkan = () => {
    saveTransaction();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearchResults} />
      <div className='flex'>
        <div className="mt-16 flex-1 p-4 h-[878px] overflow-auto">
          <Category onCategoryClick={fetchProductsByCategory} />
          <div className="grid grid-cols-3 gap-3">
            {(searchResults.length > 0 ? searchResults : products).map(product => (
              <div key={product.id} onClick={() => addToOrder(product)}>
                <Card
                  title={product.name}
                  formattedPrice={formatRupiah(product.price)}
                  image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90" price={0} />
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
                  <span>{formatRupiah(order.product.price * order.quantity)}</span>
                  <span onClick={() => removeOrder(order.product.id)} className="rounded-md py-2 px-3 text-xs text-white bg-red-600">X</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="">
            <div className="flex justify-between items-center py-3 border-b border-black mb-4">
              <span className="text-xl text-center">Total Bayar :</span>
              <span>{formatRupiah(orders.reduce((total, order) => total + order.product.price * order.quantity, 0))}</span>
            </div>
            <button onClick={handleBayarSekarang} className="bg-teal-600 p-3 rounded-md text-white w-full">Bayar Sekarang</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl mb-5 font-semibold text-teal-600">Konfirmasi Pembayaran</h2>
            <p className="text-lg text-neutral-700">Apakah Anda yakin ingin melanjutkan pembayaran?</p>
            <div className="flex justify-between mt-10 gap-x-5">
              <button
                onClick={handleLanjutkan}
                className="w-full bg-teal-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
              >
                Lanjutkan
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-gray-300 text-gray-800 font-semibold p-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
