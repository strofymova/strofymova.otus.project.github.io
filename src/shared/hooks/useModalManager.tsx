import { useCallback, useState } from 'react';

interface ModalManagerState {
  isModalOpen: boolean;
}

export const useModalManager = () => {
  const [state, setState] = useState<ModalManagerState>({
    isModalOpen: false,
  });

  const openModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: true }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  return {
    ...state,
    openModal,
    closeModal,
  };
};
