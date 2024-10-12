import { ActionCardState } from '../states/actionCardState'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { hasMoreThan24HoursPassed } from '../utils/timeUtils'
import { getActionCardStates } from '../services/actionCardService'

export const useActionCardStore = create<ActionCardState>()(
    persist(
        set => ({
            loading: false,
            setLoading: (loading: boolean) => set({ loading }),

            error: null,
            setError: (error: Error | null) => set({ error }),

            actionCardStates: [],
            setActionCardStates: actionCardStates => set({ actionCardStates }),

            fetchActionCardOptions: () => {
                const lastFetched = localStorage.getItem('actionCardOptionsLastFetched')
                if (!lastFetched || hasMoreThan24HoursPassed(Number(lastFetched))) {
                    set({ loading: true })
                    void fetchActionCardOptionsAsync(set).finally(() => {
                        set({ loading: false })
                    })
                }
            },
        }),
        {
            name: 'actionCardStorage',
        }
    )
)

/**
 * Fetches action card options from the API and stores them in the store.
 */
const fetchActionCardOptionsAsync = async (
    set: (partial: Partial<ActionCardState>) => void
) => {
    try {
        const [actionCardStates] = await Promise.all([getActionCardStates()])

        set({ actionCardStates })

        localStorage.setItem('actionCardOptionsLastFetched', new Date().getTime().toString())
    } catch (error) {
        const errorInstance = error instanceof Error ? error : new Error('Unknown error')
        set({ error: errorInstance })
    }
}
