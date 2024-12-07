import { supabaseGame } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getAccessories(): Promise<GenericType[]> {
    const { data, error } = await supabaseGame.from('accessory').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
