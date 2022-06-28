import React, {useEffect, useState} from 'react';
import {onSnapshot, doc} from 'firebase/firestore';
import {firestore} from '../utils/firebase/firebase';
import {GAMES_COLLECTION} from '../utils/contants';


function useGamesService(docId: string) {
    const [games, setGames] = useState();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, GAMES_COLLECTION, docId), (data) => {
            setGames(data.data());
        });
        return() => {
            unsubscribe();
        }
    }, []);

    return games;
}

export default useGamesService;
