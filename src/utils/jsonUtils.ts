/**
 * Ensure that the input is a valid JSON string array.
 * Format: ['string1', 'string2', 'string3']
 * @param input
 */
export function isJSONStringArray(input: string): boolean {
    try {
        const parsed = JSON.parse(input) as string[]
        return Array.isArray(parsed) && parsed.every(item => typeof item === 'string')
    } catch {
        return false
    }
}
