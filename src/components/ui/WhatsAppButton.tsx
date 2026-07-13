'use client'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.553 4.195 1.605 6.015L.178 23.364l5.485-1.44c1.785.966 3.791 1.474 5.86 1.474 6.646 0 12.031-5.384 12.031-12.031S18.677 0 12.031 0zm.006 21.365c-1.802 0-3.568-.484-5.116-1.403l-.367-.217-3.799.997.999-3.705-.238-.378a10.024 10.024 0 01-1.531-5.32c0-5.541 4.509-10.05 10.05-10.05 5.54 0 10.05 4.51 10.05 10.05s-4.51 10.05-10.05 10.05zm5.518-7.535c-.302-.152-1.792-.885-2.07-.986-.277-.1-.479-.152-.68.152-.202.302-.782.986-.958 1.188-.176.202-.353.227-.655.076-1.543-.78-2.617-1.396-3.626-2.585-.26-.307-.027-.472.124-.623.136-.135.302-.353.453-.53.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.53-.076-.151-.68-1.64-.932-2.245-.246-.59-.496-.51-.68-.52-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.807.378-.277.302-1.059 1.034-1.059 2.52 0 1.488 1.084 2.924 1.235 3.126.151.202 2.13 3.253 5.158 4.56.72.31 1.282.496 1.721.635.723.23 1.38.197 1.897.12.576-.086 1.792-.731 2.044-1.437.252-.706.252-1.31.176-1.437-.076-.126-.277-.202-.58-.353z" />
  </svg>
)

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212766908381"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-black text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  )
}
