import { AuthState } from '../states/authState'
import { create } from 'zustand'
import { supabase } from '../supabaseClient'

export const useAuthStore = create<AuthState>(set => ({
    loading: true,
    setLoading: (loading: boolean) => set({ loading }),

    error: null,
    setError: (error: Error | null) => set({ error }),

    user: null,
    setUser: user => set({ user }),

    initializeAuth: () => {
        set({ loading: true })

        void fetchAuthSessionAsync(set).finally(() => {
            set({ loading: false })
        })

        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            set({ user: session?.user ?? null, loading: false })
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    },
}))

/**
 * Fetches the auth session and sets the user in the store.
 * @param set
 */
const fetchAuthSessionAsync = async (set: (partial: Partial<AuthState>) => void) => {
    try {
        const { data } = await supabase.auth.getSession()
        set({ user: data.session?.user ?? null })
    } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error('Unknown error')
        set({ error: errorInstance })
    }
}
