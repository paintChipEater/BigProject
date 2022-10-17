

import { JournalsContext } from "../context/JournalContext";
import { useContext } from "react";


// hook function
export const useJournalsContext = () => {
    // using hook -> pass journal context
    // it's the object with dispatch and state object
    const context = useContext(JournalsContext)

    // if no value, throw error
    if (!context) {
        throw Error('useJournalsContext must be used inside an JournalsContextProvider')
    }

    // everytime we want to use the data, invoke the useJournalsContext and get the context value back
    // returns the context value -> if we invoke the UseJournalsContext hook, we could use the context anywhere
    return context
}