import { ActionCardSettingsData } from '../types/formData'
import { GameDto } from '../types/game'
import { createActionCardData } from './actionCardSettingsUtils'

/**
 * Creates the advanced settings data based on what the user has input.
 * @param createdNewGame
 * @param actionCardSettingsData
 * @param actionCardInputs
 */
export async function createAdvancedSettingsData(
    createdNewGame: GameDto,
    actionCardSettingsData?: ActionCardSettingsData,
    actionCardInputs?: string[]
) {
    if (actionCardSettingsData && actionCardInputs) {
        const actionCardData = await createActionCardData(
            createdNewGame.id,
            actionCardSettingsData,
            actionCardInputs
        )
        if (!actionCardData) {
            alert('Failed to create action card data')
        }
    }
}
