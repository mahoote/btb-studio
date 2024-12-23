import { ActionCardSettings } from '../types/newGame'
import { GenericType } from '../types/genericType'

export const initialActionCardSettingsData: ActionCardSettings = {
    stateId: 1,
    contentId: 1,
}

export const initialActionCardInputs: string[] = ['']

export const actionCardContentTypes: GenericType[] = [
    { id: 1, name: 'Word' },
    { id: 2, name: 'Sentence' },
]
