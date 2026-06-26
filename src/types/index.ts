export interface Activity {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  category: 'activity'
  price: number | null
  price_label: string
  duration: string
  cover_image_url: string
  gallery: string[]
  featured: boolean
  order_rank: number
  highlights: string[]
  included: string[]
  created_at: string
}

export interface Excursion {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  category: 'excursion'
  price: number | null
  price_label: string
  duration: string
  cover_image_url: string
  gallery: string[]
  featured: boolean
  order_rank: number
  highlights: string[]
  included: string[]
  created_at: string
}

export interface TransportRoute {
  id: string
  type: 'airport_transfer' | 'one_way' | 'round_trip' | 'point_to_point'
  origin: string
  destination: string
  price: number | null
  price_label: string
  notes: string
  duration: string
}

export interface Review {
  id: string
  author_name: string
  rating: number
  text: string
  source: 'site' | 'google' | 'tripadvisor'
  approved: boolean
  avatar_url?: string
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  related_item_id?: string
  related_item_title?: string
  created_at: string
}

export interface MediaItem {
  id: string
  url: string
  category: 'activity' | 'excursion' | 'home'
  linked_item_id?: string
  order_rank: number
  alt_text: string
}

