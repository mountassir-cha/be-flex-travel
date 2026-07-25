import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) ? rawUrl : 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'

// Supabase client with Service Role Key for server-side API routes only
// Bypasses RLS to insert records directly
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
