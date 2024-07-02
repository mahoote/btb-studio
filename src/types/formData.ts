export type NewGameFormData = {
    activityLevel: number
    categoryId: number
    descriptions: string[]
    drunkLevel: number
    gameTypeId: number
    minPlayers: number
    minutes: number
    name: string
    maxPlayers?: number
    playerGroupTypeId?: number
    introDescription?: string
    gameAudienceId?: number
}
