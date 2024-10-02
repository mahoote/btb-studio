import { GenericType } from '../genericType'

type GameOptionsDataContextType = {
    loading: boolean
    error: Error | null
    gameCategories: GenericType[]
    gameTypes: GenericType[]
    playerGroupTypes: GenericType[]
    accessories: GenericType[]
    gameAudience: GenericType[]
}

export type { GameOptionsDataContextType }
