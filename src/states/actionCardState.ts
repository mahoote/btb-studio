import { GenericType } from '../types/genericType'
import { ApiState } from './apiState'

export interface ActionCardState extends ApiState {
    actionCardStates: GenericType[]
    setActionCardStates: (actionCardStates: GenericType[]) => void
}
