"use client";

import { Board } from "%/@game/(board)/board";
import { Menu } from "%/@game/(menu)/menu";
import { ongoing } from "&/entity/game";
import { actions } from "&/state/game";
import { useDispatch, useSelector } from "&/state/store";
import { useEffect } from "react";

export default function Game() {
  const wait = useSelector((state) => !ongoing.call(state.game));
  const dispatch = useDispatch();

  useEffect(() => {
    if (wait) {
      dispatch(actions.init());
    }
  }, [wait, dispatch]);

  if (wait) {
    return null;
  }

  return (
    <>
      <Board />
      <Menu />
    </>
  );
}
