import React, {useState, useEffect} from "react";

function useFirestore() {
    const [value, setValue] = useState();

    useEffect(() => {
        //firestore stuff
        //setValue(something);
    })

    return [value, setValue];
}

export default useFirestore;