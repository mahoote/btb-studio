import {
    createGame,
    createGameHasAccessory,
    createGameHasGameType,
} from '../services/gameService'
import { GameDto, GameInsertDto, GameTranslationInsertDto } from '../types/gameDto'
import { GenericType } from '../types/genericType'
import { AdvancedSettings, NewGame, NewGameTranslations } from '../types/newGame'

type SubmitNewGameFormType = {
    createdGame: GameDto | null
}

type AddToGameType = {
    errorMessage: string | null
}

/**
 * Creates a new game as well as the accessories and game types associated with it.
 * @param newGameData
 * @param advancedDefaultSettings
 * @param newGameTranslations
 */
export async function createNewGame(
    newGameData: NewGame,
    advancedDefaultSettings: AdvancedSettings,
    newGameTranslations: NewGameTranslations
): Promise<SubmitNewGameFormType> {
    // New Game
    const gameInsertDto: GameInsertDto = {
        min_players: newGameData.minPlayers,
        max_players: newGameData.maxPlayers,
        activity_level: newGameData.activityLevel,
        drunk_level: newGameData.drunkLevel,
        minutes: newGameData.minutes,
        player_group_type_id: newGameData.playerGroupTypeId,
        game_audience_id: newGameData.gameAudienceId,
        game_category_id: newGameData.categoryId,
        game_end_type: advancedDefaultSettings.gameEndType,
    }

    // New Game Translations
    const newGameTranslationInsertDtos: GameTranslationInsertDto[] = []

    newGameTranslationInsertDtos.push({
        language: 'en',
        name: newGameData.name,
        intro_description: newGameData.introDescription,
        descriptions: getValidDescriptions(newGameData.descriptions),
        custom_end_game_sentence: advancedDefaultSettings.customEndGameSentence,
    } as GameTranslationInsertDto)

    Object.entries(newGameTranslations).forEach(([key, translation]) => {
        newGameTranslationInsertDtos.push({
            language: key,
            name: translation.name,
            intro_description: translation.introDescription,
            descriptions: getValidDescriptions(translation.descriptions),
            custom_end_game_sentence: translation.customEndGameSentence,
        } as GameTranslationInsertDto)
    })

    // Create new game
    const createdGame = await createGame(gameInsertDto, newGameTranslationInsertDtos)
        .then((response: GameDto | null) => {
            if (!response) {
                console.error('Could not fetch game from database.')
                return null
            }
            return response
        })
        .catch(error => {
            console.error('Error creating game:', error)
            alert('Error creating game')
            return null
        })

    return { createdGame }
}

/**
 * Iterates through the selected accessories and adds them to the new game.
 * @param selectedAccessories
 * @param accessories
 * @param newGameId
 */
export async function addAccessoriesToGame(
    selectedAccessories: string[],
    accessories: GenericType[] | null,
    newGameId: number
): Promise<AddToGameType> {
    let errorMessage: string | null = null

    for (const accessory of selectedAccessories) {
        const accessoryId =
            accessories?.find(accessoryItem => accessoryItem.name === accessory)?.id ?? 0

        if (accessoryId === 0) {
            console.error('Could not find accessory:', accessory)
            errorMessage = 'Could not find accessory.'
            return { errorMessage }
        }

        await createGameHasAccessory(newGameId, accessoryId).catch((error: Error) => {
            console.error('Error adding accessory to game:', error)
            errorMessage = error.message
        })
    }

    return { errorMessage }
}

/**
 * Iterates through the selected game types and adds them to the new game.
 * @param selectedGameTypes
 * @param gameTypes
 * @param newGameId
 */
export async function addGameTypesToGame(
    selectedGameTypes: string[],
    gameTypes: GenericType[] | null,
    newGameId: number
): Promise<AddToGameType> {
    let errorMessage: string | null = null

    for (const gameType of selectedGameTypes) {
        const gameTypeId =
            gameTypes?.find(gameTypeItem => gameTypeItem.name === gameType)?.id ?? 0

        if (gameTypeId === 0) {
            console.error('Could not find game type:', gameType)
            errorMessage = 'Could not find game type.'
            return { errorMessage }
        }

        await createGameHasGameType(newGameId, gameTypeId).catch((error: Error) => {
            console.error('Error adding game type to game:', error)
            errorMessage = error.message
        })
    }

    return { errorMessage }
}

/**
 * Filters out empty descriptions.
 * @param descriptions
 */
export const getValidDescriptions = (descriptions: string[]): string[] => {
    return descriptions.filter(description => description !== '')
}
