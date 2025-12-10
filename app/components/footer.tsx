import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-lg">Delizia Kitchen</div>
          <div className="text-sm text-gray-300 mt-2">123 Palm Avenue, Enugu</div>
          <div className="text-sm text-gray-300">Open daily 9am — 10pm</div>
        </div>

        <div>
          <div className="font-semibold">Quick Links</div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
            <a href="#menu" className="hover:text-themeColor">Menu</a>
            <a href="#gallery" className="hover:text-themeColor">Gallery</a>
            <a href="#reserve" className="hover:text-themeColor">Reserve</a>
          </div>
        </div>

        <div>
          <div className="font-semibold">Follow Us</div>
          <div className="mt-3 flex gap-3">
            <a aria-label="facebook" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700"><SiFacebook className="w-4 h-4" /></a>
            <a aria-label="instagram" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-linear-to-br hover:from-[#f58529] hover:via-[#dd2a7b] to-[#8134af]"><SiInstagram className="w-4 h-4" /></a>
            <a aria-label="twitter" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-black"><SiX className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">© 2025 Delizia Kitchen — crafted with ❤️ by Blue Circle</div>
    </footer>
  );
}