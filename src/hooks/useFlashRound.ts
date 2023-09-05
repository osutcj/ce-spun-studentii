import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlashRound } from '../shared/types/flashRound';
import { FLASH_ROUND_COLLECTION } from '../utils/contants'; 
import { firestore } from '../utils/firebase/firebase';

function useFlashRound(docId: string) {
  const [flashAnswers, setFlashAnswers] = useState<FlashRound | undefined>();

  useEffect(() => {
    let unsubscribe: () => void;

    if (docId) {
      const docRef = doc(firestore, FLASH_ROUND_COLLECTION, docId);
      unsubscribe = onSnapshot(docRef, (data) => {
        const flashData = data.data() as FlashRound;
        setFlashAnswers(flashData);
      });
    }

    return () => {
      if (!unsubscribe) {
        return;
      }
      unsubscribe();
    };
  }, [docId]);

  return flashAnswers;
}

export default useFlashRound;
