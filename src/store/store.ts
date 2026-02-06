import { configureStore } from "@reduxjs/toolkit";
import { persistedRedusers } from "./combine.redusers";
import { persistStore, FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";

export const store = configureStore({
    reducer: persistedRedusers,
    devTools: import.meta.env.MODE !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],         
            }, 
        }),
})

export const persister = persistStore(store)

export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch

export type RootStateStore = ReturnType<AppStore['getState']>