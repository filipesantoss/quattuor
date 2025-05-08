"use client";

import { create } from "&/state/store";
import React from "react";
import { Provider } from "react-redux";

import type { Store } from "&/state/store";
import type { Persistor } from "redux-persist";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reference = React.useRef<{ store: Store; persistor: Persistor } | null>(null);

  if (!reference.current) {
    const store = create();
    const persistor = persistStore(store);
    reference.current = { store, persistor };
  }

  return (
    <Provider store={reference.current.store}>
      <PersistGate loading={null} persistor={reference.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
