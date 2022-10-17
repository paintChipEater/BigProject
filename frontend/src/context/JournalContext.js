// the journal context provider returns the actual provider of the context


import { createContext, useReducer } from "react"

export const JournalsContext = createContext()

// updates the STATE when we dispatch an Action -> like in Home component
export const journalsReducer = (state, action) => {
    switch (action.type) {
        // recieve workout
        case 'SET_RECIPES':
            return {
                // payload on the action would be an array of all the journals
                journals: action.payload
            }
        // create a workout
        case 'CREATE_RECIPE':
            return {
                // adding journal to array
                // ... spreads current state / pre-existing journal objets
                journals: [action.payload, ...state.journals]
            }
            // delete a workout
        case 'DELETE_RECIPE':
            return {
                journals: state.journals.filter((w) => w._id !== action.payload._id)
            }
        default: 
            return state
    }

}

// REACT COMPONENT  to wrap the app
// children -> represents the app component that was wrapped in index.js
export const JournalsContextProvider = ({children}) => {
    // use reducer hook works like useState
    // the way to update the state is different -> call dispatch function

    // starts as null
    const [state, dispatch] = useReducer(journalsReducer, {
        journals: null
    })

    // payload property represents data needed to make the change
    
    // when the dispatch is passed -> reducer function is invoked
    // dispatch({type: 'SET_RECIPES', payload: [{}, {}]})


    // component that needs to wrap to parts that need access to context so every component has access to context
    return (

        // This JournalsContext wraps the entire app so we could access 
        <JournalsContext.Provider value={{...state, dispatch}}>
            { children }
        </JournalsContext.Provider>
    )
}

