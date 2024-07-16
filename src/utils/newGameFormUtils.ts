import { createGameHasAccessory, createGameHasGameType } from '../services/gameService'
import { GameDto } from '../types/game'
import { GenericType } from '../types/genericType'

export async function addAccessoriesToGame(
    selectedAccessories: string[],
    accessories: GenericType[] | null,
    newGame: GameDto
) {
    let errorMessage: null | string = null

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
) {
    let errorMessage: null | string = null

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
