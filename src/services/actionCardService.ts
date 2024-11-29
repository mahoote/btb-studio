import { GenericType } from '../types/genericType'
import { supabase } from '../supabaseClient'
import { SupabaseResponse } from '../types/supabaseResponse'
import {
    ActionCardDto,
    ActionCardSettingsDto,
    ActionCardSettingsInsertDto,
    ActionCardSettingsTranslationInsertDto,
    ActionCardTranslationInsertDto,
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
 * @param actionCardSettingsInsertDto
 * @param actionCardSettingsTranslationInsertDtos
 */
export async function createActionCardSettings(
    actionCardSettingsInsertDto: ActionCardSettingsInsertDto,
    actionCardSettingsTranslationInsertDtos: ActionCardSettingsTranslationInsertDto[]
): Promise<ActionCardSettingsDto> {
    const { data, error }: SupabaseResponse<ActionCardSettingsDto> = await supabase
        .from('action_card_settings')
        .insert([actionCardSettingsInsertDto])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Error creating action card settings')
    }

    for (const actionCardSettingsTranslationInsertDto of actionCardSettingsTranslationInsertDtos) {
        await createActionCardSettingsTranslation(actionCardSettingsTranslationInsertDto)
    }

    return data
}

/**
 * Creates the translation for the action card settings.
 * @param actionCardSettingsTranslationInsertDto
 */
export async function createActionCardSettingsTranslation(
    actionCardSettingsTranslationInsertDto: ActionCardSettingsTranslationInsertDto
): Promise<void> {
    const { error } = await supabase
        .from('action_card_settings_translation')
        .insert([actionCardSettingsTranslationInsertDto])

    if (error) {
        throw new Error(error.message)
    }
}

/**
 * Creates an action card and adds a many-to-many relationship with the settings regarding the card.
 * @param cardValue
 * @param settingsId
 * @param actionCardTranslationInsertDtos
 */
export async function createActionCard(
    cardValue: string,
    settingsId: number,
    actionCardTranslationInsertDtos: ActionCardTranslationInsertDto[]
): Promise<void> {
    const { data: actionCardData, error: actionCardError }: SupabaseResponse<ActionCardDto> =
        await supabase.from('action_card').insert([{}]).select().single()

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

    for (const actionCardTranslationInsertDto of actionCardTranslationInsertDtos) {
        await createActionCardTranslation(actionCardTranslationInsertDto)
    }
}

export async function createActionCardTranslation(
    actionCardTranslationInsertDto: ActionCardTranslationInsertDto
): Promise<void> {
    const { error } = await supabase
        .from('action_card_translation')
        .insert([actionCardTranslationInsertDto])

    if (error) {
        throw new Error(error.message)
    }
}
