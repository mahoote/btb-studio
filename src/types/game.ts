import { GameCategory } from './gameCategory'

type GameDto = {
    id: number
    name: string
    intro_description?: string
    descriptions: string[]
    min_players: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes?: number
    game_type_id: number
    player_group_type_id?: number
    game_audience_id?: number
    game_category: GameCategory
    accessories: { id: number }[]
    created_at: string
}

type GameInsertDto = {
    name: string
    intro_description?: string
    descriptions: string[]
    min_players: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes?: number
    game_type_id: number
    player_group_type_id?: number
    game_audience_id?: number
    game_category_id: number
}

export type { GameDto, GameInsertDto }
