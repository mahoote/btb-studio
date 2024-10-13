import { AuthError, User } from '@supabase/supabase-js'

export interface AuthState {
    loading: boolean
    setLoading: (loading: boolean) => void

    error: AuthError | null
    setError: (error: AuthError | null) => void

    user: User | null
    setUser: (user: User | null) => void

    initializeAuth: () => void
}
