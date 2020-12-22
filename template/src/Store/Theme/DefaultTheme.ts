import { createAction } from '@reduxjs/toolkit'
import { RootState } from '../store.types'

interface IChangeThemePayload {
  payload: any
}

export default {
  initialState: {},
  action: createAction('theme/setDefaultTheme'),
  reducers(state: RootState, { payload }: IChangeThemePayload) {
    if (!state.theme) {
      state.theme = payload.theme
      state.darkMode = payload.darkMode
    }
  },
}
