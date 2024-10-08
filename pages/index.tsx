import Image from "next/image";
import localFont from "next/font/local";
import Card from "@/components/Card";
import Category from "@/components/Category";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex`}>

      {/* Konten Utama */}
      <div className="mt-16 flex-1 p-4 h-[878px] overflow-auto">
        <Category />
        <div className="grid grid-cols-3 gap-3">
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
          <Card
            title="Soto Ayam"
            image="https://akcdn.detik.net.id/visual/2024/05/20/soto-ayam_43.jpeg?w=720&q=90"
          />
        </div>
      </div>
      {/* Sidebar */}
      <div className="mt-16 w-1/3 p-4">
        <h2 className="text-3xl">Daftar Pesanan</h2>
        <ul className="mt-2 h-[668px] overflow-auto space-y-3">
          <li className="border-b border-black py-4 pr-3 flex justify-between items-center">
            <div className="flex gap-x-4">
              <span>Soto Ayam</span>
              <span className="text-teal-600 font-bold">x3</span>
            </div>
            <div className="flex gap-x-4 items-center">
              <span>Rp.200.000</span>
              <span className="rounded-md py-2 px-3 text-xs text-white bg-red-600">X</span>
            </div>
          </li>
          <li className="border-b border-black py-4 pr-3 flex justify-between items-center">
            <div className="flex gap-x-4">
              <span>Soto Ayam</span>
              <span className="text-teal-600 font-bold">x3</span>
            </div>
            <div className="flex gap-x-4 items-center">
              <span>Rp.200.000</span>
              <span className="rounded-md py-2 px-3 text-xs text-white bg-red-600">X</span>
            </div>
          </li>
        </ul>
        <div className="">
          <div className="flex justify-between items-center py-3 border-b border-black mb-4">
            <span className="text-xl text-center">Total Bayar :</span>
            <span>Rp.200.000</span>
          </div>
          <button className="bg-teal-600 p-3 rounded-md text-white w-full">Bayar Sekarang</button>
        </div>
      </div>
    </div>
  );
}
