import { GenericType } from './genericType'

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
    player_group_type_id?: number
    game_audience_id?: number
    game_category: GenericType
    accessories: { id: number }[]
    game_types: { id: number }[]
    created_at: string
}

type GameInsertDto = {
    name: string
    intro_description?: string
    descriptions: string[]
    min_players?: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes?: number
    player_group_type_id?: number
    game_audience_id?: number
    game_category_id: number
    custom_end_game_sentence?: string
    game_end_type: string
}

export type { GameDto, GameInsertDto }
