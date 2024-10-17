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
    gameEndType: string
}

export type ActionCardSettings = {
    stateId: number
    contentId: number
    cardLimit?: number
    cardSeconds?: number
    isAutoNext?: boolean
    prompt?: string
    isPlayerCreative?: boolean
    hasBuzzer?: boolean
}
export type WritingSettings = {
    writesAmount: number
    writeSeconds: number
}
