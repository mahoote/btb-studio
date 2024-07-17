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

/**
 * Validates the Action Card Settings data with the following rules:
 * - If the content type is "Word" then only one word per card is allowed.
 * Returns an error message if the data is invalid.
 * @param data
 * @param inputs
 */
export function isActionCardSettingsDataValid(
    data: ActionCardSettingsData | undefined,
    inputs: string[] | undefined
): string | undefined {
    if (!data || !inputs) return undefined

    if (data.contentId === 1) {
        const moreThanOneWord = inputs.some(input => input.split(' ').length > 1)
        return moreThanOneWord
            ? 'Only one word per card is allowed.\nUpdate the Content Type to "Sentence" to allow multiple.'
            : undefined
    }

    return undefined
}
