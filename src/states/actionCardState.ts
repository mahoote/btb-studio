import { GenericType } from '../types/genericType'

export interface ActionCardState {
    loading: boolean
    setLoading: (loading: boolean) => void

    error: Error | null
    setError: (error: Error | null) => void

    actionCardStates: GenericType[]
    setActionCardStates: (actionCardStates: GenericType[]) => void

    fetchActionCardOptions: () => void
}
