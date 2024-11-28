import {
    createGame,
    createGameHasAccessory,
    createGameHasGameType,
} from '../services/gameService'
import { GameDto } from '../types/gameDto'
import { GenericType } from '../types/genericType'
import { AdvancedSettings, NewGame } from '../types/newGame'

type SubmitNewGameFormType = {
    createdGame: GameDto | null
}

type AddToGameType = {
    errorMessage: string | null
}

/**
 * Creates a new game as well as the accessories and game types associated with it.
 * @param newGameData
 * @param selectedAccessories
 * @param selectedGameTypes
 * @param accessories
 * @param gameTypes
 * @param advancedDefaultSettings
 */
export async function createNewGame(
    newGameData: NewGame,
    selectedAccessories: string[],
    selectedGameTypes: string[],
    accessories: GenericType[] | null,
    gameTypes: GenericType[] | null,
    advancedDefaultSettings: AdvancedSettings
): Promise<SubmitNewGameFormType> {
    let createdGame: GameDto | null = null

    newGameData.descriptions = getValidDescriptions(newGameData.descriptions)

    const newGame = await createGame({
        name: newGameData.name,
        intro_description: newGameData.introDescription,
        descriptions: newGameData.descriptions,
        min_players: newGameData.minPlayers,
        max_players: newGameData.maxPlayers,
        activity_level: newGameData.activityLevel,
        drunk_level: newGameData.drunkLevel,
        minutes: newGameData.minutes,
        player_group_type_id: newGameData.playerGroupTypeId,
        game_audience_id: newGameData.gameAudienceId,
        game_category_id: newGameData.categoryId,
        custom_end_game_sentence: advancedDefaultSettings.customEndGameSentence,
        game_end_type: advancedDefaultSettings.gameEndType,
    })
        .then((response: GameDto | null) => {
            if (!response) {
                console.error('Could not fetch game from database.')
                return
            }
            createdGame = response
            return createdGame
        })
        .catch(error => {
            console.error('Error creating game:', error)
            alert('Error creating game')
        })

    if (!newGame) {
        return { createdGame }
    }

    const { errorMessage: accessoryErrorMessage } = await addAccessoriesToGame(
        selectedAccessories,
        accessories,
        newGame
    )
    if (accessoryErrorMessage) alert('Error adding accessory to game')

    const { errorMessage: gameTypeErrorMessage } = await addGameTypesToGame(
        selectedGameTypes,
        gameTypes,
        newGame
    )
    if (gameTypeErrorMessage) alert('Error adding game type to game')

    // TODO: Make logic to delete game if an error occurs adding the accessories or game types.

    return { createdGame }
}

/**
 * Iterates through the selected accessories and adds them to the new game.
 * @param selectedAccessories
 * @param accessories
 * @param newGame
 */
export async function addAccessoriesToGame(
    selectedAccessories: string[],
    accessories: GenericType[] | null,
    newGame: GameDto
): Promise<AddToGameType> {
    let errorMessage: string | null = null

    for (const accessory of selectedAccessories) {
        const accessoryId =
            accessories?.find(accessoryItem => accessoryItem.name === accessory)?.id ?? 0

        await createGameHasAccessory(newGame.id, accessoryId).catch((error: Error) => {
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
 * @param newGame
 */
export async function addGameTypesToGame(
    selectedGameTypes: string[],
    gameTypes: GenericType[] | null,
    newGame: GameDto
): Promise<AddToGameType> {
    let errorMessage: string | null = null

    for (const gameType of selectedGameTypes) {
        const gameTypeId =
            gameTypes?.find(gameTypeItem => gameTypeItem.name === gameType)?.id ?? 0

        await createGameHasGameType(newGame.id, gameTypeId).catch((error: Error) => {
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
