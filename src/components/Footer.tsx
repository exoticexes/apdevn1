export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-purple-900/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
              EPINFY
            </h3>
            <p className="text-gray-500 text-sm font-bold">
              Guvenilir e-pin platformu. Aninda teslimat, uygun fiyatlar.
            </p>
          </div>
          <div>
            <h4 className="text-white font-extrabold mb-3">Hizli Linkler</h4>
            <ul className="space-y-2 text-gray-500 text-sm font-bold">
              <li>Hakkimizda</li>
              <li>SSS</li>
              <li>Iletisim</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-extrabold mb-3">Destek</h4>
            <ul className="space-y-2 text-gray-500 text-sm font-bold">
              <li>destek@epinfy.com</li>
              <li>Canli Destek</li>
              <li>Kullanim Sartlari</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-900/30 mt-6 pt-6 text-center text-gray-600 text-xs font-bold">
          &copy; 2026 Epinfy - Tum haklari saklidir. (Bu bir UX test prototipidir)
        </div>
      </div>
    </footer>
  )
}
