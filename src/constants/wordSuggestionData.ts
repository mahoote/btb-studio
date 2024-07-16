export const actionCardSuggestionData: string[] = [
    '$ALL$',
    '$PLAYER$',
    '$SELF$',
    '$PLAYERS{NUM}$',
]

type WordSuggestionsObject = {
    values: string[]
    key: string
}

export const actionCardSuggestions: WordSuggestionsObject[] = [
    {
        values: actionCardSuggestionData,
        key: '$',
    },
]
