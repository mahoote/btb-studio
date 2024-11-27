import {
    ActionCardSettings,
    AdvancedSettings,
    NewGame,
    NewGameTranslations,
    WritingSettings,
} from '../types/newGame'
import { RefObject } from 'react'

export interface NewGameState {
    newGame: NewGame
    setNewGame: (game: NewGame) => void

    descriptions: string[]
    setDescriptions: (descriptions: string[]) => void

    selectedAccessories: string[]
    setSelectedAccessories: (accessories: string[]) => void

    selectedGameTypes: string[]
    setSelectedGameTypes: (gameTypes: string[]) => void

    actionCardSettingsData: ActionCardSettings | undefined
    setActionCardSettingsData: (settings: ActionCardSettings | undefined) => void

    actionCardInputs: string[] | undefined
    setActionCardInputs: (inputs: string[] | undefined) => void

    activeFormRef: RefObject<HTMLFormElement> | null
    setActiveFormRef: (ref: RefObject<HTMLFormElement>) => void

    writingSettingsData: WritingSettings | undefined
    setWritingSettingsData: (settings: WritingSettings | undefined) => void

    advancedSettingsData: AdvancedSettings
    setAdvancedSettingsData: (settings: AdvancedSettings) => void

    newGameTranslations: NewGameTranslations
    setNewGameTranslations: (translations: NewGameTranslations) => void

    formStepIndex: number
    setFormStepIndex: (step: number) => void
}
