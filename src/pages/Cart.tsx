import { useState } from 'react'
import { Trash2, ShoppingBag, AlertTriangle, CreditCard, Tag, CheckCircle, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, totalPrice } = useCart()
  const [showError, setShowError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [userId, setUserId] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)

  const VALID_COUPON = 'UC360'
  const effectiveTotal = couponApplied ? 0 : totalPrice

  const handleApplyCoupon = () => {
    setCouponError(false)
    if (couponCode.trim().toUpperCase() === VALID_COUPON) {
      setCouponApplied(true)
      setCouponError(false)
    } else {
      setCouponApplied(false)
      setCouponError(true)
    }
  }

  const handleCheckout = () => {
    setProcessing(true)
    setShowError(false)

    // Simulate processing delay then always fail
    setTimeout(() => {
      setProcessing(false)
      setShowError(true)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-700 mb-4" size={64} />
          <h2 className="text-2xl font-black text-white mb-2">Sepetiniz Boş</h2>
          <p className="text-gray-500 font-bold">Ürünlere göz atın ve sepetinize ekleyin.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-white mb-8">
        Sepetim{' '}
        <span className="text-gray-500 text-lg font-bold">({items.length} ürün)</span>
      </h1>

      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-gray-900/80 border border-purple-900/30 rounded-xl p-4 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/200x200/1a1a2e/7c3aed?text=${encodeURIComponent(item.name)}&font=roboto`
              }}
            />
            <div className="flex-1">
              <h3 className="text-white font-extrabold">{item.name}</h3>
              <p className="text-gray-500 text-sm font-bold">Adet: {item.quantity}</p>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              {(item.price * item.quantity).toFixed(2)} TL
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-500 hover:text-red-400 transition-colors p-2"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Error Message - Always shown on checkout attempt */}
      {showError && (
        <div className="bg-red-950/60 border-2 border-red-600 rounded-xl p-6 mb-8 animate-shake">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={28} />
            <div>
              <h3 className="text-red-400 font-black text-lg mb-1">İşlem Başarısız!</h3>
              <p className="text-red-300 font-bold text-sm">
                                Hatalı hesap bilgisi veya sistem hatası. Lütfen daha sonra tekrar deneyin
                                veya farklı bir ödeme yöntemi kullanın.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Success Messages */}
      {couponApplied && (
        <div className="space-y-4 mb-8">
          <div className="bg-green-950/60 border-2 border-green-500 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={28} />
              <div>
                <h3 className="text-green-400 font-black text-lg mb-1">Kupon Uygulandı!</h3>
                <p className="text-green-300 font-bold text-sm">
                  Site kampanyasına ücretsiz katılındı
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-950/60 border-2 border-yellow-500 rounded-xl p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={32} />
              <div>
                <h3 className="text-yellow-300 font-black text-xl mb-2">Sistem şu an çok yoğun</h3>
                <p className="text-yellow-200 font-extrabold text-lg">
                  Lütfen bir moderatör ile iletişime geçin
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Section */}
      <div className="bg-gray-900/80 border border-purple-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-400 font-bold">Toplam</span>
          <div className="text-right">
            {couponApplied && (
              <span className="text-gray-500 line-through text-lg font-bold mr-3">
                {totalPrice.toFixed(2)} TL
              </span>
            )}
            <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              {effectiveTotal.toFixed(2)} TL
            </span>
          </div>
        </div>

        {/* ID and Coupon Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-extrabold text-purple-400 mb-2">ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Kullanıcı ID'nizi girin"
              className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-extrabold text-purple-400 mb-2">Kupon Kodu</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value)
                    setCouponError(false)
                    if (couponApplied) setCouponApplied(false)
                  }}
                  placeholder="Kupon kodunuzu girin"
                  className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-extrabold text-sm transition-all"
              >
                Uygula
              </button>
            </div>
            {couponApplied && (
              <p className="text-green-400 text-sm font-bold mt-2 flex items-center gap-1">
                <CheckCircle size={14} /> Kupon başarıyla uygulandı!
              </p>
            )}
            {couponError && (
              <p className="text-red-400 text-sm font-bold mt-2">
                Geçersiz kupon kodu. Lütfen tekrar deneyin.
              </p>
            )}
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-extrabold text-purple-400 mb-2">Kart Numarası</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-extrabold text-purple-400 mb-2">Son Kullanım</label>
              <input
                type="text"
                placeholder="AA/YY"
                maxLength={5}
                className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-extrabold text-purple-400 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                maxLength={3}
                className="w-full bg-gray-800/50 border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-bold text-sm transition-all"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={processing}
          className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              İşleniyor...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Ödemeyi Tamamla
            </>
          )}
        </button>
      </div>
    </div>
  )
}
