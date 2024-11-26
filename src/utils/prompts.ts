import { NewGameTranslations } from '../types/newGame'

/**
 * Example:
 * Translate to Norwegian, German in one object in the format:
 * "{
 *     Norwegian:{...},
 * }"
 *
 * Here is the data:
 * {
 *   "English": {
 *     ...
 *   }
 * }
 * @param languages
 * @param data
 */
export const generateTranslationPrompt = (languages: string[], data: NewGameTranslations) => {
    const jsonString = JSON.stringify(data, null, 2)

    return `Translate to ${languages.join(', ')} in one object in the format:
            "{
                ${languages.map(language => `${language}:{...}`).join(',\n')}
            }"
            Here is the data:
            ${jsonString}`
}
