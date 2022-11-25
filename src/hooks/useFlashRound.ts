import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlashRound } from '../shared/types/flashRound';
import { FLASH_ROUND_COLLECTION } from '../utils/contants';
import { firestore } from '../utils/firebase/firebase';

function useFlashRound(docId: string) {
  const [flashAnswers, setFlashAnswers] = useState<FlashRound>();

  useEffect(() => {
    const unsubscribe = docId
      ? onSnapshot(doc(firestore, FLASH_ROUND_COLLECTION, docId), (data) => {
          const flashData = data.data() as FlashRound;
          setFlashAnswers(flashData);
        })
      : () => {};

    return () => {
      unsubscribe();
    };
  }, [docId]);

  return flashAnswers;
}

export default useFlashRound;
