'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface FlagProps {
  className?: string
}

export function FlagEN({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block object-cover", className)}
      viewBox="0 0 60 30"
      aria-hidden="true"
    >
      <clipPath id="flag-gb-clip">
        <rect width="60" height="30" rx="2" />
      </clipPath>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function FlagFR({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block", className)}
      viewBox="0 0 3 2"
      aria-hidden="true"
    >
      <rect width="1" height="2" x="0" fill="#002395" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#ED2939" />
    </svg>
  )
}

export function FlagES({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block", className)}
      viewBox="0 0 750 500"
      aria-hidden="true"
    >
      <rect width="750" height="500" fill="#c60b1e" />
      <rect y="125" width="750" height="250" fill="#ffc400" />
    </svg>
  )
}

export function FlagIT({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block", className)}
      viewBox="0 0 3 2"
      aria-hidden="true"
    >
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#CE2B37" />
    </svg>
  )
}

export function FlagDE({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block", className)}
      viewBox="0 0 5 3"
      aria-hidden="true"
    >
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  )
}

export function FlagZGH({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg
      className={cn("rounded-[2px] shadow-sm shrink-0 inline-block", className)}
      viewBox="0 0 900 600"
      aria-hidden="true"
    >
      <rect width="900" height="600" fill="#c1272d" />
      <path
        d="M450 180 L538.1 451.3 L307.4 283.6 L592.6 283.6 L361.9 451.3 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="18"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LanguageFlag({ code, className = "w-5 h-3.5" }: { code: string; className?: string }) {
  switch (code.toLowerCase()) {
    case 'en':
      return <FlagEN className={className} />
    case 'fr':
      return <FlagFR className={className} />
    case 'es':
      return <FlagES className={className} />
    case 'it':
      return <FlagIT className={className} />
    case 'de':
      return <FlagDE className={className} />
    case 'zgh':
      return <FlagZGH className={className} />
    default:
      return <FlagEN className={className} />
  }
}
