import React, {useEffect, useState} from 'react';
import {onSnapshot, doc} from 'firebase/firestore';
import {firestore} from '../utils/firebase/firebase';
import {GAMES_COLLECTION} from '../utils/contants';
import {NormalGame} from '../shared/models/game';


function useGame(docId: string) {
    const [game, setGame] = useState < NormalGame | any > ();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, GAMES_COLLECTION, docId), (data) => {
            setGame(data.data());
        });
        return() => {
            unsubscribe();
        }
    }, []);

    return game;
}

export default useGame;
