import { supabase } from '../supabaseClient'
import { PlayerGroupType } from '../types/playerGroupType'

export async function getPlayerGroupTypes(): Promise<PlayerGroupType[]> {
    const { data, error } = await supabase.from('player_group_type').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as PlayerGroupType[]
}
