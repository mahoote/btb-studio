import { supabaseGame } from '../supabaseClient'
import { GenericType } from '../types/genericType'
import { SupabaseResponse } from '../types/supabaseResponse'

async function getAccessories(): Promise<GenericType[]> {
    const { data, error }: SupabaseResponse<GenericType[]> = await supabaseGame
        .from('accessory')
        .select('*')

    if (error) {
        throw new Error(error.message)
    }
    if (!data) {
        return []
    }

    return data
}

async function createAccessory(name: string): Promise<GenericType> {
    const { data, error }: SupabaseResponse<GenericType> = await supabaseGame
        .from('accessory')
        .insert({ name })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }
    if (!data) {
        throw new Error('Error creating accessory')
    }

    return data
}

export { getAccessories, createAccessory }
