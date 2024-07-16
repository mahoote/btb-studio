import { supabase } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getAccessories(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('accessory').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
