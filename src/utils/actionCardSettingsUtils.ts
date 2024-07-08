export function isCardInputMultiline(currentValue: number, values: number[]) {
    return values.some(value => value === currentValue)
}
