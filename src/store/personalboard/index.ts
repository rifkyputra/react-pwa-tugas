import { atom, useRecoilState } from 'recoil';

import type { personalboardAction } from './types';
import { useCallback, useMemo } from 'react';
import { AtomEffectParams } from '../types';
import useSnackbarManager from '../snackbar';

const personalboardState = atom<SymbolData[]>({
  key: 'personalboard-state',
  default: [],
  effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedPersonalboard = localStorage.getItem('personalboard');
  storedPersonalboard && setSelf(JSON.parse(storedPersonalboard));
  onSet((value: SymbolData[]) => localStorage.setItem('personalboard', JSON.stringify(value)));
}

function usePersonalboard(): [SymbolData[], personalboardAction] {
  const [personalboard, setpersonalboard] = useRecoilState(personalboardState);
  const [_, { closeSnackbar, openSnackbar }] = useSnackbarManager();

  const addToBoard = useCallback(
    (value: SymbolData) => {
      if (personalboard.some((item) => item.name.includes(value.name))) {
        openSnackbar({
          message: 'Sudah ada di board',
        });
      } else {
        setpersonalboard((personalboard: SymbolData[]) => [...personalboard, value]);
        openSnackbar({
          message: 'Berhasil ditambahkan ke board',
        });
      }
    },

    [setpersonalboard, personalboard],
  );

  const deleteFromBoard = useCallback(
    (value: SymbolData) => {
      setpersonalboard((personalboard: SymbolData[]) =>
        personalboard.filter((personalboard) => personalboard.id !== value.id),
      );
      closeSnackbar();
    },
    [setpersonalboard],
  );

  const useMemoizedActions = useMemo(
    () => ({ addToBoard, deleteFromBoard, personalboard }),
    [addToBoard, deleteFromBoard, personalboard],
  );

  return [personalboard, useMemoizedActions];
}

export default usePersonalboard;
