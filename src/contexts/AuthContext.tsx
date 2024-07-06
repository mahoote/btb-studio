import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType } from '../types/contexts/authContext'
import { supabase } from '../supabaseClient'
import { User } from '@supabase/supabase-js'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Check for session on initial load
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            setUser(data.session?.user ?? null)
            setLoading(false)
        }

        checkSession().catch(error => {
            console.error('Failed to check session: ', error)
            setLoading(false)
        })

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}
