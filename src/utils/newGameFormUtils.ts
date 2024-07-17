import {
    createGame,
    createGameHasAccessory,
    createGameHasGameType,
} from '../services/gameService'
import { GameDto } from '../types/game'
import { GenericType } from '../types/genericType'
import { NewGameFormData } from '../types/formData'

type SubmitNewGameFormType = {
    createdGame: GameDto | null
}

type AddToGameType = {
    errorMessage: string | null
}

export async function submitNewGameForm(
    newGameData: NewGameFormData,
    selectedAccessories: string[],
    selectedGameTypes: string[],
    accessories: GenericType[] | null,
    gameTypes: GenericType[] | null
): Promise<SubmitNewGameFormType> {
    let createdGame: GameDto | null = null

    newGameData.descriptions = newGameData.descriptions.filter(
        description => description !== ''
    )

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
