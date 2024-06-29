import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvinsypeiprpjmofuamy.supabase.co'
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2aW5zeXBlaXBycGptb2Z1YW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjA0NDUsImV4cCI6MjAzMTY5NjQ0NX0.GgnMKr14AohEyMKXAkk1dKyT9nFgdYHxjkbAbZhJroE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
