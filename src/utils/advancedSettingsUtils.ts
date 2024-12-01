import { ActionCardSettings, AdvancedSettings, NewGameTranslations } from '../types/newGame'
import { createActionCardData } from './actionCardSettingsUtils'
import { uploadImageFile } from '../services/imageService'
import { base64ToJpegFile } from './fileUtils'

/**
 * Creates the advanced settings data based on what the user has input.
 * @param gameId
 * @param newGameTranslations
 * @param advancedSettingsData
 * @param actionCardSettingsData
 * @param actionCardInputs
 */
export async function createAdvancedSettingsData(
    gameId: number,
    newGameTranslations: NewGameTranslations,
    advancedSettingsData: AdvancedSettings,
    actionCardSettingsData?: ActionCardSettings,
    actionCardInputs?: string[]
) {
    if (advancedSettingsData.customRulesImageBase64) {
        const imageFile = base64ToJpegFile(
            advancedSettingsData.customRulesImageBase64,
            `game_${gameId}_custom_rules_image.jpg`
        )
        await uploadImageFile(imageFile, 'custom-rules-images', 'game', gameId)
    }

    if (actionCardSettingsData && actionCardInputs) {
        await createActionCardData(
            gameId,
            actionCardSettingsData,
            actionCardInputs,
            newGameTranslations
        )
    }
}
