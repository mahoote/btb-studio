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

    return `Can you translate this English text into ${languages.join(', ')} in a casual and natural way? 
The translation should sound like something a person from that/those countries would say in a 
relaxed conversation, without being too stiff or formal. Keep the essence and humor, 
but adjust the language to make it feel typically for that/those languages.
Translate to one object in the format:
"{
    ${languages.map(language => `${language}:{...}`).join(',\n')}
}"
Here is the data:
${jsonString}`
}
