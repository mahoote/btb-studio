import { create } from 'zustand'
import { GameOptionsState } from '../states/gameOptionsState'
import { GenericType } from '../types/genericType'
import { persist } from 'zustand/middleware'
import { getGameCategories } from '../services/gameCategoryService'
import { getGameTypes } from '../services/gameTypeService'
import { getAccessories } from '../services/accessoryService'
import { getGameAudience } from '../services/gameAudienceService'
import { canFetchData } from '../utils/apiUtils'

export const useGameOptionsStore = create<GameOptionsState>()(
    persist(
        set => ({
            loading: false,
            setLoading: (loading: boolean) => set({ loading }),

            error: null,
            setError: (error: Error | null) => set({ error }),

            gameCategories: [],
            setGameCategories: (gameCategories: GenericType[]) => set({ gameCategories }),

            gameTypes: [],
            setGameTypes: (gameTypes: GenericType[]) => set({ gameTypes }),

            accessories: [],
            setAccessories: (accessories: GenericType[]) => set({ accessories }),

            gameAudience: [],
            setGameAudience: (gameAudience: GenericType[]) => set({ gameAudience }),

            fetchApi: () => {
                if (canFetchData('gameOptionsLastFetched')) {
                    set({ loading: true })

                    void fetchGameOptionsAsync(set).finally(() => {
                        set({ loading: false })
                    })
                }
            },
        }),
        {
            name: 'gameOptionsStorage',
        }
    )
)

/**
 * Fetches game options from the API and stores them in the store.
 */
const fetchGameOptionsAsync = async (set: (partial: Partial<GameOptionsState>) => void) => {
    try {
        const [gameCategories, gameTypes, accessories, gameAudience] = await Promise.all([
            getGameCategories(),
            getGameTypes(),
            getAccessories(),
            getGameAudience(),
        ])

        set({
            gameCategories,
            gameTypes,
            accessories,
            gameAudience,
        })

        localStorage.setItem('gameOptionsLastFetched', new Date().getTime().toString())
    } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error('Unknown error')
        set({ error: errorInstance })
    }
}
