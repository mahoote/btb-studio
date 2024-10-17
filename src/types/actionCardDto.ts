export type ActionCardSettingsDto = {
    id: number
    game_id: number
    state_id: number
    card_limit?: number
    card_seconds?: number
    is_auto_next?: boolean
    is_player_creative?: boolean
    prompt?: string
    has_buzzer?: boolean
}

export type ActionCardSettingsInsertDto = {
    game_id: number
    state_id: number
    card_limit?: number
    card_seconds?: number
    is_auto_next?: boolean
    is_player_creative?: boolean
    prompt?: string
    has_buzzer?: boolean
}

export type ActionCardDto = {
    id: number
    value: string
}
