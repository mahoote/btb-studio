import { PostgrestError } from '@supabase/supabase-js'

export type SupabaseResponse<T> = {
    data: T | null
    error: PostgrestError | null
}
