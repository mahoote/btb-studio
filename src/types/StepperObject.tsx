import React from 'react'

type StepperObject = {
    content: React.ReactNode
    label: string
    isOptional?: boolean
    customValidation?: () => string | undefined
}

export type { StepperObject }
