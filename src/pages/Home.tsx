import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'PUBG Mobile 660 UC',
    price: 109.90,
    image: 'https://placehold.co/800x400/1a1a2e/7c3aed?text=PUBG+660+UC&font=roboto',
    description: 'PUBG Mobile 660 UC - Aninda hesabiniza tanimlanir.',
    featured: true,
  },
  {
    id: 2,
    name: 'Valorant 1000 VP',
    price: 179.90,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Valorant+1000+VP&font=roboto',
    description: 'Valorant Points - Hemen kullanima hazir.',
    featured: false,
  },
  {
    id: 3,
    name: 'Steam 50 TL',
    price: 50.00,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Steam+50+TL&font=roboto',
    description: 'Steam Cuzdan Kodu - Turkiye bolgesine ozel.',
    featured: false,
  },
  {
    id: 4,
    name: 'Spotify Premium 1 Ay',
    price: 59.99,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Spotify+Premium&font=roboto',
    description: 'Spotify Premium bireysel uyelik - 1 aylik.',
    featured: false,
  },
  {
    id: 5,
    name: 'Netflix Hediye Karti 100 TL',
    price: 100.00,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Netflix+100+TL&font=roboto',
    description: 'Netflix hediye karti - Turkiye hesaplari icin.',
    featured: false,
  },
  {
    id: 6,
    name: 'PUBG Mobile 325 UC',
    price: 59.90,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=PUBG+325+UC&font=roboto',
    description: 'PUBG Mobile 325 UC - Hizli ve guvenli.',
    featured: false,
  },
  {
    id: 7,
    name: 'Razer Gold 100 TL',
    price: 100.00,
    image: 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Razer+Gold+100+TL&font=roboto',
    description: 'Razer Gold Pin - Tum oyunlarda gecerli.',
    featured: false,
  },
]

export default function Home() {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = (product: typeof products[0]) => {
    if (!isAuthenticated) {
      setShowToast(true)
      setTimeout(() => {
        navigate('/register')
      }, 1500)
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="min-h-screen">
      <Toast
        message="Sepete eklemek icin once kayit olmaniz gerekiyor! Yonlendiriliyorsunuz..."
        type="warning"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-fuchsia-900/20" />
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                Oyun Kodlarin
              </span>
              <br />
              <span className="text-white">Bir Tik Uzaginda</span>
            </h1>
            <p className="text-gray-400 text-lg font-bold max-w-2xl mx-auto">
              PUBG UC, Valorant VP, Steam ve daha fazlasi. Aninda teslimat, en uygun fiyatlar.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-black text-white mb-8">
          Populer <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Urunler</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
