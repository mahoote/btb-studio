import { GenericType } from '../types/genericType'
import { supabase } from '../supabaseClient'
import { SupabaseResponse } from '../types/supabaseResponse'
import {
    ActionCardDto,
    ActionCardSettingsDto,
    ActionCardSettingsInsertDto,
} from '../types/actionCardDto'

/**
 * Fetches all the action card states.
 */
export async function getActionCardStates(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('action_card_state').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}

/**
 * Creates action card settings and will be used for
 * one specific game that requires action cards.
 * @param dto
 */
export async function createActionCardSettings(
    dto: ActionCardSettingsInsertDto
): Promise<ActionCardSettingsDto> {
    const { data, error }: SupabaseResponse<ActionCardSettingsDto> = await supabase
        .from('action_card_settings')
        .insert([dto])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Error creating action card settings')
    }

    return data
}

/**
 * Creates an action card and adds a many-to-many relationship with the settings regarding the card.
 * @param cardValue
 * @param settingsId
 */
export async function createActionCard(cardValue: string, settingsId: number): Promise<void> {
    const { data: actionCardData, error: actionCardError }: SupabaseResponse<ActionCardDto> =
        await supabase
            .from('action_card')
            .insert([{ value: cardValue }])
            .select()
            .single()

    if (actionCardError) {
        throw new Error(actionCardError.message)
    }

    if (!actionCardData) {
        throw new Error('Error creating action card')
    }

    // Add many-to-many relationship
    const { error: mtmError } = await supabase
        .from('action_card_settings_has_action_card')
        .insert([
            {
                action_card_id: actionCardData.id,
                action_card_settings_id: settingsId,
            },
        ])

    if (mtmError) {
        throw new Error(mtmError.message)
    }
}
