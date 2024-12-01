import { AppAlert } from '../components/appAlertComponent'

export interface AlertState {
    alert: AppAlert
    setAlert: (alert: AppAlert) => void
}
