import { GenericType } from '../types/genericType'
import { NewGameFormData } from '../types/formData'

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
export const drunkLevels: GenericType[] = [
    { id: '0', name: 'Tipsy' },
    { id: '1', name: 'Drunk' },
    { id: '2', name: 'Wasted' },
]
export const activityLevels: GenericType[] = [
    { id: '0', name: 'Low' },
    { id: '1', name: 'Medium' },
    { id: '2', name: 'High' },
]
