import { ActionCardSettings, NewGameTranslations } from '../types/newGame'
import { createActionCard, createActionCardSettings } from '../services/actionCardService'
import {
    ActionCardSettingsInsertDto,
    ActionCardSettingsTranslationInsertDto,
    ActionCardTranslationInsertDto,
} from '../types/actionCardDto'

/**
 * Creates the Action Card Settings and Action Cards.
 * They will be used for one specific game.
 * @param gameId
 * @param actionCardSettingsData
 * @param actionCardInputs
 * @param newGameTranslations
 */
export async function createActionCardData(
    gameId: number,
    actionCardSettingsData: ActionCardSettings,
    actionCardInputs: string[],
    newGameTranslations: NewGameTranslations
) {
    const actionCardSettingsInsertDto: ActionCardSettingsInsertDto = {
        game_id: gameId,
        state_id: actionCardSettingsData.stateId,
        card_limit: actionCardSettingsData.cardLimit,
        card_seconds: actionCardSettingsData.cardSeconds,
        is_auto_next: actionCardSettingsData.isAutoNext,
        is_player_creative: actionCardSettingsData.isPlayerCreative,
        has_buzzer: actionCardSettingsData.hasBuzzer,
    }

    const actionCardSettingsTranslationInsertDtos: ActionCardSettingsTranslationInsertDto[] =
        []

    const actionCardSettingsTranslationInsertDto: ActionCardSettingsTranslationInsertDto = {
        language: 'en',
        prompt: actionCardSettingsData.prompt,
    }

    actionCardSettingsTranslationInsertDtos.push(actionCardSettingsTranslationInsertDto)

    Object.entries(newGameTranslations).forEach(([key, translation]) => {
        actionCardSettingsTranslationInsertDtos.push({
            action_card_settings_id: settings.id,
            language: key,
            prompt: translation.prompt,
        } as ActionCardSettingsTranslationInsertDto)
    })

    const settings = await createActionCardSettings(
        actionCardSettingsInsertDto,
        actionCardSettingsTranslationInsertDtos
    )

    for (const [key, translation] of Object.entries(newGameTranslations)) {
        for (let i = 0; i < actionCardInputs.length; i++) {
            const input = actionCardInputs[i]
            const inputTranslated = translation.actionCardInputs?.[i] ?? ''

            const actionCardTranslationInsertDtos = [
                {
                    language: 'en',
                    value: input,
                } as ActionCardTranslationInsertDto,
                {
                    language: key,
                    value: inputTranslated,
                },
            ]

            await createActionCard(input, settings.id, actionCardTranslationInsertDtos)
        }
    }
}

/**
 * Checks if the current value is in the list of values.
 * Then the input is multiline.
 * @param currentValue
 * @param values
 */
export function isCardInputMultiline(currentValue: number, values: number[]) {
    return values.some(value => value === currentValue)
}

/**
 * Validates the Action Card Settings data with the following rules:
 * - If the content type is "Word" then only one word per card is allowed.
 * Returns an error message if the data is invalid.
 * @param data
 * @param inputs
 */
export function isActionCardSettingsDataValid(
    data: ActionCardSettings | undefined,
    inputs: string[] | undefined
): string | undefined {
    if (!data || !inputs) return undefined

    if (data.contentId === 1) {
        const moreThanOneWord = inputs.some(input => input.split(' ').length > 1)
        return moreThanOneWord
            ? 'Only one word per card is allowed.\nUpdate the Content Type to "Sentence" to allow multiple.'
            : undefined
    }

    return undefined
}
