import { hasMoreThan24HoursPassed } from './timeUtils'

/**
 * Determines whether data can be fetched based on the environment and last fetched time.
 */
export const canFetchData = (storageKey: string): boolean => {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const lastFetched = localStorage.getItem(storageKey)
    return !isDevelopment
        ? !lastFetched || hasMoreThan24HoursPassed(Number(lastFetched))
        : true
}
