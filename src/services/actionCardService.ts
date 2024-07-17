import { GenericType } from '../types/genericType'
import { supabase } from '../supabaseClient'

export async function getActionCardStates(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('action_card_state').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
