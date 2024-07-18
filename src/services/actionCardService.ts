import { GenericType } from '../types/genericType'
import { supabase } from '../supabaseClient'
import { SupabaseResponse } from '../types/supabaseResponse'
import { ActionCardSettingsDto, ActionCardSettingsInsertDto } from '../types/actionCard'

export async function getActionCardStates(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('action_card_state').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}

export async function createActionCardSettings(
    dto: ActionCardSettingsInsertDto
): Promise<ActionCardSettingsDto | null> {
    const { data, error }: SupabaseResponse<ActionCardSettingsDto> = await supabase
        .from('action_card_settings')
        .insert([dto])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data as ActionCardSettingsDto
}
