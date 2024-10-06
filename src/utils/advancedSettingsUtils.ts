import { ActionCardSettings } from '../types/newGame'
import { GameDto } from '../types/gameDto'
import { createActionCardData } from './actionCardSettingsUtils'

/**
 * Creates the advanced settings data based on what the user has input.
 * @param createdNewGame
 * @param actionCardSettingsData
 * @param actionCardInputs
 */
export async function createAdvancedSettingsData(
    createdNewGame: GameDto,
    actionCardSettingsData?: ActionCardSettings,
    actionCardInputs?: string[]
) {
    if (actionCardSettingsData && actionCardInputs) {
        await createActionCardData(createdNewGame.id, actionCardSettingsData, actionCardInputs)
    }
}
