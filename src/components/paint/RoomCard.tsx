import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Room } from '../../data/rooms'
import { useLanguage } from '../../context/LanguageContext'

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  const { t } = useLanguage()
  return (
    <Link
      to={room.href}
      className="group relative block rounded-2xl overflow-hidden aspect-[4/3] bg-cream-100 hover:shadow-xl transition-all duration-300"
    >
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{room.name}</h3>
        <div className="flex items-center gap-1 text-cream-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {t.rooms.cta} <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}
