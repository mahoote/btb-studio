import { ActionCardSettingsData } from '../types/formData'

/**
 * Checks if the current value is in the list of values.
 * Then the input is multiline.
 * @param currentValue
 * @param values
 */
export function isCardInputMultiline(currentValue: number, values: number[]) {
    return values.some(value => value === currentValue)
}
export const initialActionCardSettingsData: ActionCardSettingsData = {
    stateId: 0,
    contentId: 0,
    cardLimit: 0,
    cardSeconds: 0,
    autoNext: false,
    prompt: '',
}
