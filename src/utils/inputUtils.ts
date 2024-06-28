import { ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { NewGameFormData } from '../types/formData'

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
