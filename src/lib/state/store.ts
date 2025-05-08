import { reducer as game } from "&/state/game";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as selector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function create() {
  const reducer = persistReducer(
    {
      key: "quattuor",
      version: 0,
      storage,
    },
    combineReducers({
      game,
    }),
  );

  return configureStore<ReturnType<typeof reducer>>({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
    },
  });
}

export type Store = ReturnType<typeof create>;

export const useSelector: TypedUseSelectorHook<ReturnType<Store["getState"]>> = selector;
