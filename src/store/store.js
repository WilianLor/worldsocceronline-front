import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {userReducer} from './userReducer'

const persistConfig = {
    key: 'WorldSoccerOnline',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

