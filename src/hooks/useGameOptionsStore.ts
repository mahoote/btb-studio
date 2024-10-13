import { create } from 'zustand'
import { GameOptionsState } from '../states/gameOptionsState'
import { GenericType } from '../types/genericType'
import { persist } from 'zustand/middleware'
import { getGameCategories } from '../services/gameCategoryService'
import { getGameTypes } from '../services/gameTypeService'
import { getPlayerGroupTypes } from '../services/playerGroupTypeService'
import { getAccessories } from '../services/accessoryService'
import { getGameAudience } from '../services/gameAudienceService'
import { hasMoreThan24HoursPassed } from '../utils/timeUtils'

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

            playerGroupTypes: [],
            setPlayerGroupTypes: (playerGroupTypes: GenericType[]) =>
                set({ playerGroupTypes }),

            accessories: [],
            setAccessories: (accessories: GenericType[]) => set({ accessories }),

            gameAudience: [],
            setGameAudience: (gameAudience: GenericType[]) => set({ gameAudience }),

            fetchApi: () => {
                const lastFetched = localStorage.getItem('gameOptionsLastFetched')

                if (!lastFetched || hasMoreThan24HoursPassed(Number(lastFetched))) {
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
        const [gameCategories, gameTypes, playerGroupTypes, accessories, gameAudience] =
            await Promise.all([
                getGameCategories(),
                getGameTypes(),
                getPlayerGroupTypes(),
                getAccessories(),
                getGameAudience(),
            ])

        set({
            gameCategories,
            gameTypes,
            playerGroupTypes,
            accessories,
            gameAudience,
        })

        localStorage.setItem('gameOptionsLastFetched', new Date().getTime().toString())
    } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error('Unknown error')
        set({ error: errorInstance })
    }
}
