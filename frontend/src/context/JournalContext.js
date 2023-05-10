// the journal context provider returns the actual provider of the context


import { createContext, useReducer } from "react"

export const JournalsContext = createContext()

// Our reducers are responsible for setting up the context provider with data that is received 
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
// @params: Using app as the child to access the state throughout all the app
export const JournalsContextProvider = ({children}) => {
    const initialState = {
        journals: null
    }
   
    // Initial state is null as we don't have any data in the state and set different reducer actions for updating the state
    const [state, dispatch] = useReducer(journalsReducer, initialState)
    return (

        // This JournalsContext wraps the entire app so we could access both the journals state and the reducers across all components of the application
        <JournalsContext.Provider value={{...state, dispatch}}>
            { children }
        </JournalsContext.Provider>
    )
}

