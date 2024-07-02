export type NewGameFormData = {
    name: string
    categoryId: number
    introDescription?: string
    descriptions: string[]
    minPlayers: number
    maxPlayers?: number
    activityLevel?: number
    minutes?: number
    gameTypeId: number
    playerGroupTypeId?: number
    gameAudienceId?: number
    drunkLevel?: number
}
