import { create } from 'zustand'
import { NewGameState } from '../states/newGameState'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../constants/NEW_GAME_FORM_DATA'
import { initialWritingSettingsData } from '../constants/WRITING_SETTINGS_DATA'
import { initialAdvancedSettingsData } from '../constants/ADVANCED_SETTINGS_DATA'
import { persist } from 'zustand/middleware'

export const useNewGameStore = create<NewGameState>()(
    persist(
        set => ({
            createdGame: null,
            setCreatedGame: game => set({ createdGame: game }),

            descriptions: initialNewGameData.descriptions,
            setDescriptions: descriptions => set({ descriptions }),

            selectedAccessories: initialAccessoriesData,
            setSelectedAccessories: accessories => set({ selectedAccessories: accessories }),

            selectedGameTypes: initialGameTypesData,
            setSelectedGameTypes: gameTypes => set({ selectedGameTypes: gameTypes }),

            actionCardSettingsData: undefined,
            setActionCardSettingsData: settings => set({ actionCardSettingsData: settings }),

            actionCardInputs: undefined,
            setActionCardInputs: inputs => set({ actionCardInputs: inputs }),

            activeFormRef: null,
            setActiveFormRef: ref => set({ activeFormRef: ref }),

            writingSettingsData: initialWritingSettingsData,
            setWritingSettingsData: settings => set({ writingSettingsData: settings }),

            advancedSettingsData: initialAdvancedSettingsData,
            setAdvancedSettingsData: settings => set({ advancedSettingsData: settings }),
        }),
        {
            name: 'newGameStorage',
            partialize: state => ({
                ...state,
                activeFormRef: undefined, // Exclude non-serializable values like refs
            }),
        }
    )
)
