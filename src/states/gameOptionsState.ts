import { GenericType } from '../types/genericType'

export interface GameOptionsState {
    loading: boolean
    setLoading: (loading: boolean) => void

    error: Error | null
    setError: (error: Error | null) => void

    gameCategories: GenericType[]
    setGameCategories: (gameCategories: GenericType[]) => void

    gameTypes: GenericType[]
    setGameTypes: (gameTypes: GenericType[]) => void

    playerGroupTypes: GenericType[]
    setPlayerGroupTypes: (playerGroupTypes: GenericType[]) => void

    accessories: GenericType[]
    setAccessories: (accessories: GenericType[]) => void

    gameAudience: GenericType[]
    setGameAudience: (gameAudience: GenericType[]) => void

    fetchGameOptions: () => void
}
