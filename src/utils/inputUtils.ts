import { ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { NewGameFormData } from '../types/formData'

/**
 * Updates the form data with the new value of the input field
 * @param event
 * @param formData
 * @param setFormData
 */
export const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formData: NewGameFormData,
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
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
    formData: NewGameFormData,
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
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
    formData: NewGameFormData,
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
) => {
    const { name, value } = event.target
    setFormData({
        ...formData,
        [name]: value,
    })
}
