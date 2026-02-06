import GroupReduser from '../features/group/group.slice'
import ContactReduser from '../features/contacts/contact.slice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, type PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const combineAllReduser = combineReducers({
    contact: ContactReduser,
    group: GroupReduser
})

export type RootStateReduser = ReturnType<typeof combineAllReduser>

export const configPersist: PersistConfig<RootStateReduser> = {
    key: 'root',
    storage,
    whitelist: ['contact', 'group'],
    blacklist: []
}

export const persistedRedusers = persistReducer(configPersist, combineAllReduser)