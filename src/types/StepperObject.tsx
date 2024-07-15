import React from 'react'

type StepperObject = {
    content: React.ReactNode
    label: string
    isOptional?: boolean
    customValidation?: () => boolean
}

export type { StepperObject }
