export type ActionCardSettingsDto = {
    id: number
    game_id: number
    state_id: number
    card_limit?: number
    card_seconds?: number
    is_auto_next?: boolean
    is_player_creative?: boolean
    prompt?: string
}

export type ActionCardSettingsInsertDto = {
    game_id: number
    state_id: number
    card_limit?: number
    card_seconds?: number
    is_auto_next?: boolean
    is_player_creative?: boolean
    prompt?: string
}
