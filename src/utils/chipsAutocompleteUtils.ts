/**
 * Will not disable if there is no selected values or the option is selected.
 * Flattens the optionCombinations array and checks if the option is in the flattened array.
 * @param option
 * @param selectedValues
 * @param optionCombinations
 */
export function isOptionDisabled(
    option: string,
    selectedValues: string[],
    optionCombinations?: string[][]
) {
    if (!optionCombinations) return false
    if (selectedValues.length <= 0) return false
    if (selectedValues.includes(option)) return false

    const combinationsWithSelectedValues: string[][] = optionCombinations.filter(combination =>
        selectedValues.every(value => combination.includes(value))
    )

    const flattenedCombinations: string[] = combinationsWithSelectedValues.flat()
    const optionInCombination = flattenedCombinations.includes(option)

    return !optionInCombination
}
