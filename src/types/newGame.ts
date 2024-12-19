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
    customEndGameSentence?: string
    gameEndType: string
    customRulesImage?: CustomImage
}

export type CustomImage = {
    imageBase64: string
    imageFileType: string
    imageFileExtension: string
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

export type NewGameTranslation = {
    name: string
    introDescription?: string
    descriptions: string[]
    customEndGameSentence?: string
    prompt?: string
    actionCardInputs?: string[]
}

export type NewGameTranslations = {
    [key: string]: NewGameTranslation
}
