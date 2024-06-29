import React, { createContext, ReactNode } from 'react'
import useFetch from '../hooks/useFetch'

export type DataContextType<T> = {
    data: T | null
    loading: boolean
    error: Error | null
}

export function createDataContext<T>(fetchData: () => Promise<T>) {
    const DataContext = createContext<DataContextType<T> | undefined>(undefined)

    const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const { data, loading, error } = useFetch(fetchData)

        return (
            <DataContext.Provider value={{ data, loading, error }}>
                {children}
            </DataContext.Provider>
        )
    }

    return { DataProvider, DataContext }
}
