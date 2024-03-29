import { atom, useRecoilState } from 'recoil';
import { toggleEditActions } from './types';
import { useCallback } from 'react';

const toggleEditState = atom({
  key: 'toggle-edit-state',
  default: false,
});

function useToggleEdit(): [boolean, toggleEditActions] {
  const [isEdit, setIsEdit] = useRecoilState(toggleEditState);

  const toggleEdit = useCallback(
    (open?: boolean) => {
      setIsEdit((isEdit: boolean) => open ?? !isEdit);
    },
    [setIsEdit],
  );

  return [isEdit, { toggleEdit }];
}

export default useToggleEdit;
