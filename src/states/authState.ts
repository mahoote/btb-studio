import { User } from '@supabase/supabase-js'

export interface AuthState {
    loading: boolean
    setLoading: (loading: boolean) => void

    error: Error | null
    setError: (error: Error | null) => void

    user: User | null
    setUser: (user: User | null) => void

    initializeAuth: () => void
}
