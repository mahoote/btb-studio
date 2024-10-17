import { ActionCardSettings, AdvancedSettings } from '../types/newGame'
import { GameDto } from '../types/gameDto'
import { createActionCardData } from './actionCardSettingsUtils'
import { uploadImageFile } from '../services/imageService'
import { base64ToJpegFile } from './fileUtils'

/**
 * Creates the advanced settings data based on what the user has input.
 * @param createdNewGame
 * @param advancedSettingsData
 * @param actionCardSettingsData
 * @param actionCardInputs
 */
export async function createAdvancedSettingsData(
    createdNewGame: GameDto,
    advancedSettingsData: AdvancedSettings,
    actionCardSettingsData?: ActionCardSettings,
    actionCardInputs?: string[]
) {
    if (advancedSettingsData.customRulesImageBase64) {
        const imageFile = base64ToJpegFile(
            advancedSettingsData.customRulesImageBase64,
            `game_${createdNewGame.id}_custom_rules_image.jpg`
        )
        await uploadImageFile(imageFile, 'custom-rules-images', 'game', createdNewGame.id)
    }

    if (actionCardSettingsData && actionCardInputs) {
        await createActionCardData(createdNewGame.id, actionCardSettingsData, actionCardInputs)
    }
}
