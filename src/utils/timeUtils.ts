export const hasMoreThan24HoursPassed = (lastFetchedTime: number): boolean => {
    const now = new Date().getTime()
    return now - lastFetchedTime > 24 * 60 * 60 * 1000
}
