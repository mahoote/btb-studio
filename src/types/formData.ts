export type NewGameFormData = {
    activityLevel: number
    categoryId: number
    descriptions: string[]
    drunkLevel: number
    minPlayers: number
    minutes: number
    name: string
    maxPlayers?: number
    playerGroupTypeId?: number
    introDescription?: string
    gameAudienceId?: number
}

export type ActionCardSettingsData = {
    stateId: number
    contentId: number
    cardLimit?: number
    cardSeconds?: number
    autoNext?: boolean
    promptText?: string
}
