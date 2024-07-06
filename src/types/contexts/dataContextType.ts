export type DataContextType<T> = {
    data: T | null
    loading: boolean
    error: Error | null
}
