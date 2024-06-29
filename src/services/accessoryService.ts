import { supabase } from '../supabaseClient'
import { Accessory } from '../types/accessory'

export async function getAccessories(): Promise<Accessory[]> {
    const { data, error } = await supabase.from('accessory').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as Accessory[]
}
