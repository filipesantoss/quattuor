import { assert } from "&/assert";
import { decode } from "&/encoding";
import type { Game } from "&/entity/game";
import * as game from "&/state/game";
import * as timeline from "&/state/timeline";
import { combineReducers, configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";
import { useDispatch as useReduxDispacth, useSelector as useReduxSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type State = {
  game: ReturnType<typeof game.reducer>;
  timeline: ReturnType<typeof timeline.reducer>;
};

export function create() {
  const reducer = persistReducer(
    {
      key: "quattuor",
      version: 0,
      storage,
    },
    combineReducers({
      game: game.reducer,
      timeline: timeline.reducer,
    }),
  );

  const listener = createListenerMiddleware<State>();

  listener.startListening({
    actionCreator: game.actions.sprawl,
    effect: async (_, api) => {
      const state = api.getState();
      api.dispatch(timeline.actions.reset(state.game));
    },
  });

  listener.startListening({
    actionCreator: game.actions.move,
    effect: async (_, api) => {
      const state = api.getState();
      api.dispatch(timeline.actions.add(state.game));
    },
  });

  listener.startListening({
    actionCreator: timeline.actions.rewind,
    effect: async (_, api) => {
      const state = api.getState();
      const entry = state.timeline.at(-1);
      assert(entry !== undefined);
      api.dispatch(game.actions.load(decode<Game>(entry)));
    },
  });

  return configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).prepend(listener.middleware);
    },
  });
}

export type Store = ReturnType<typeof create>;

export const useDispatch: () => Store["dispatch"] = useReduxDispacth;

export function useSelector<T>(selector: (state: ReturnType<Store["getState"]>) => T) {
  return useReduxSelector(selector, equal);
}
