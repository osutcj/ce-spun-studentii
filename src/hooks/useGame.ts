import React, { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { GAMES_COLLECTION } from '../utils/contants';
import { NormalGame } from '../types/game';
import { EmptyGame } from '../models/game';

function useGame(docId: string) {
  const [game, setGame] = useState<NormalGame | any>(EmptyGame);

  useEffect(() => {
    const unsubscribe = docId
      ? onSnapshot(doc(firestore, GAMES_COLLECTION, docId), (data) => {
          setGame(data.data());
        })
      : () => {};
    return () => {
      unsubscribe();
    };
  }, [docId]);

  return game;
}

export default useGame;
