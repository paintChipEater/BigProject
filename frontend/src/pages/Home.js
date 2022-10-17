import { useEffect } from "react"
import { useJournalsContext } from "../hooks/useJournalsContext"

// components
import JournalDetails from "../components/JournalDetails"
import JournalForm from "../components/JournalForm"


const Home = () => {
  // invoke the hook -> grab the journals and dispatch FUNCTIONS
  const { journals, dispatch } = useJournalsContext()

  useEffect(() => {
    // fetch backend data using the useEffect / Fetch function -> runs once when component renders
    const fetchJournals = async () => {
      const response = await fetch('/api/journal')
      
      const json = await response.json()

      if (response.ok) {
        // dispatch to update the global journal context
        // created in Journal Contex
        // The journals function / hook updates then
        dispatch({type: 'SET_RECIPES', payload: json})
        
      }
      
    }
    fetchJournals()
    // remember to add dispatch
  }, [dispatch])

  return (
    <div className="home">
      <div className="journals">
        {journals && journals.map(journal => (
          // Cycle through journals on the template using a .map 
          // for each journal, output a JournalDetails component which is found inside the component folder
          <JournalDetails journal={journal} key={journal._id} />
        ))}
      </div>
      <JournalForm />
      
    </div>
  )
}

export default Home