import { AnyAction } from '@reduxjs/toolkit'

export const isPendingAction = (action: AnyAction) =>
  action.type.endsWith('pending')
export const isFulfilledAction = (action: AnyAction) =>
  action.type.endsWith('fulfilled')
export const isRejectedAction = (action: AnyAction) =>
  action.type.endsWith('rejected')
