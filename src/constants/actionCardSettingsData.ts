import { ActionCardSettingsData } from '../types/formData'
import { GenericType } from '../types/genericType'

export const initialActionCardSettingsData: ActionCardSettingsData = {
    stateId: 1,
    contentId: 1,
    prompt: '',
}

export const initialActionCardInputs: string[] = ['']

export const actionCardContentTypes: GenericType[] = [
    { id: 1, name: 'Word' },
    { id: 2, name: 'Sentence' },
]
