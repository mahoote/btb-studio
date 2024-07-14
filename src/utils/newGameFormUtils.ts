import { createGameHasAccessory, createGameHasGameType } from '../services/gameService'
import { Accessory } from '../types/accessory'
import { GameDto } from '../types/game'
import { GameType } from '../types/gameType'
import { NewGameFormData } from '../types/formData'

export async function addAccessoriesToGame(
    selectedAccessories: string[],
    accessories: Accessory[] | null,
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
    gameTypes: GameType[] | null,
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

export const initialNewGameData: NewGameFormData = {
    activityLevel: 0,
    categoryId: 1,
    descriptions: [],
    drunkLevel: 0,
    gameAudienceId: 0,
    introDescription: '',
    maxPlayers: 0,
    minPlayers: 2,
    minutes: 0,
    name: '',
    playerGroupTypeId: 0,
}
