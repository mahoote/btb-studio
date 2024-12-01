import { create } from 'zustand'
import { AlertState } from '../states/alertState'

export const useAlertStore = create<AlertState>()(set => ({
    alert: {
        open: false,
        message: '',
        severity: 'success',
    },
    setAlert: alert => set({ alert }),
}))
