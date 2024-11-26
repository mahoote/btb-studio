import { GenericType } from '../types/genericType'
import { NewGame } from '../types/newGame'

export const initialNewGameData: NewGame = {
    activityLevel: 0,
    categoryId: 1,
    descriptions: [],
    drunkLevel: 0,
    gameAudienceId: undefined,
    introDescription: '',
    maxPlayers: undefined,
    minPlayers: undefined,
    minutes: undefined,
    name: '',
    playerGroupTypeId: undefined,
}

export const initialAccessoriesData: string[] = []

export const initialGameTypesData: string[] = []

export const drunkLevels: GenericType[] = [
    { id: 0, name: 'Tipsy' },
    { id: 1, name: 'Drunk' },
    { id: 2, name: 'Wasted' },
]
export const activityLevels: GenericType[] = [
    { id: 0, name: 'Low' },
    { id: 1, name: 'Medium' },
    { id: 2, name: 'High' },
]

export const initialNewGameTranslations = {
    Norwegian: {
        name: '',
        introDescription: undefined,
        descriptions: [],
        customEndGameSentence: undefined,
        prompt: undefined,
        actionCardInputs: [],
    },
}
