import { createAction } from '@reduxjs/toolkit'
import { RootState } from '../store.types'

interface IChangeThemePayload {
  payload: any
}

export default {
  initialState: {},
  action: createAction('theme/changeTheme'),
  reducers(state: RootState, { payload }: IChangeThemePayload) {
    if (typeof payload.theme !== 'undefined') {
      state.theme = payload.theme
    }
    if (typeof payload.darkMode !== 'undefined') {
      state.darkMode = payload.darkMode
    }
  },
}
