"use client";

import { Board } from "%/@game/(board)/board";
import { ongoing } from "&/entity/game";
import { actions } from "&/state/game";
import { useDispatch, useSelector } from "&/state/store";
import { useEffect } from "react";

export default function Game() {
  const wait = useSelector((state) => !ongoing.call(state.game));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  if (wait) {
    return null;
  }

  return <Board />;
}
