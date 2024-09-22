import React, { ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material'

/**
 * Updates the form data with the new value of the input field
 * @param event
 * @param formData
 * @param setFormData
 */
export const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
    /* eslint-enable @typescript-eslint/no-explicit-any */
) => {
    const { name, value } = event.target
    setFormData({
        ...formData,
        [name]: value,
    })
}

/**
 * Updates the form data with the new value of the input field
 * Converts the value to a number
 * @param event
 * @param formData
 * @param setFormData
 */
export const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
    /* eslint-enable @typescript-eslint/no-explicit-any */
) => {
    const { name, value } = event.target
    const numericValue = value === '' ? '' : Number(value)
    setFormData({
        ...formData,
        [name]: numericValue,
    })
}

/**
 * Updates the form data with the new value of the select field
 * @param event
 * @param formData
 * @param setFormData
 */
export const handleSelectChange = (
    event: SelectChangeEvent<number> | SelectChangeEvent,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
    /* eslint-enable @typescript-eslint/no-explicit-any */
) => {
    const { name, value } = event.target
    setFormData({
        ...formData,
        [name]: value,
    })
}

/**
 * Removes all white spaces from the input
 * @param input
 */
export const noWhiteSpaceInput = (input: string) => {
    return input.replace(/\s/g, '')
}
