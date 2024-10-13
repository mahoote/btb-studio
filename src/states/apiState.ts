export interface ApiState {
    loading: boolean
    setLoading: (loading: boolean) => void

    error: Error | null
    setError: (error: Error | null) => void

    fetchApi: () => void
}
