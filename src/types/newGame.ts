export type NewGame = {
    activityLevel: number
    categoryId: number
    descriptions: string[]
    drunkLevel: number
    minPlayers?: number
    minutes?: number
    name: string
    maxPlayers?: number
    playerGroupTypeId?: number
    introDescription?: string
    gameAudienceId?: number
}

export type AdvancedSettings = {
    customEndGameSentence: string
}

export type ActionCardSettings = {
    stateId: number
    contentId: number
    cardLimit?: number
    cardSeconds?: number
    autoNext?: boolean
    prompt?: string
    playerCreative?: boolean
}
export type WritingSettings = {
    writesAmount: number
    writeSeconds: number
}
