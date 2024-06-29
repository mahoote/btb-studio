import { useState, useEffect } from 'react'

const useFetch = <T,>(fetchData: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            try {
                const result = await fetchData()
                setData(result)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error('An unknown error occurred'))
                }
            } finally {
                setLoading(false)
            }
        }

        fetchDataAsync().catch(err => {
            if (err instanceof Error) {
                setError(err)
            } else {
                setError(new Error('An unknown error occurred'))
            }
        })
    }, [fetchData])

    return { data, loading, error }
}

export default useFetch
