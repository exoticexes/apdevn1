import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  description: string
  featured?: boolean
  onAddToCart: () => void
}

export default function ProductCard({ name, price, image, description, featured, onAddToCart }: ProductCardProps) {
  return (
    <div
      className={`group relative bg-gray-900/80 border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-48'}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://placehold.co/${featured ? '800x400' : '400x300'}/1a1a2e/7c3aed?text=${encodeURIComponent(name)}&font=roboto`
          }}
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-3 py-1 rounded-full text-xs font-extrabold">
            EN ÇOK SATAN
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-extrabold text-white ${featured ? 'text-2xl' : 'text-lg'} mb-1`}>
          {name}
        </h3>
        <p className="text-gray-400 text-sm font-bold mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            {price.toFixed(2)} TL
          </span>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-4 py-2.5 rounded-xl transition-all font-extrabold text-sm active:scale-95"
          >
            <ShoppingCart size={16} />
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}
