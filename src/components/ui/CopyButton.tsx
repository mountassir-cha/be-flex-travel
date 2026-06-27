'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  textToCopy: string
  label?: string
  successText?: string
}

export function CopyButton({
  textToCopy,
  label = 'Copy Link',
  successText = 'Copied!',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 border-white/20 text-white hover:bg-white/5 transition-all text-xs font-semibold select-none ${
        copied ? 'text-[var(--brand-gold)] border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/5' : ''
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[var(--brand-gold)] animate-in fade-in zoom-in duration-300" />
          <span>{successText}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </Button>
  )
}
