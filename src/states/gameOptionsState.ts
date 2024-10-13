import { GenericType } from '../types/genericType'
import { ApiState } from './apiState'

export interface GameOptionsState extends ApiState {
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
}
