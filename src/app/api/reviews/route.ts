import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { author_name, text, rating, source } = body

    if (!author_name || !text || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Insert into Supabase (or simulate in development)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co' || supabaseUrl.includes('placeholder')

    if (isPlaceholder) {
      console.log('Development mode: Simulating Supabase insert for review:')
      console.log(`Author: ${author_name}\nRating: ${rating}\nText: ${text}\nSource: ${source || 'site'}`)
      return NextResponse.json({ success: true, simulated: true })
    }

    const { error: dbError } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          author_name,
          text,
          rating,
          source: source || 'site', // Default source
          approved: false, // Must be approved by admin
        },
      ])

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
