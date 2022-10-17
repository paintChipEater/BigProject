import { useState } from 'react'
import { useJournalsContext } from '../hooks/useJournalsContext'


// NESTED inside the home component below the details
const JournalForm = () => {
    // dispatch action
  const { dispatch } = useJournalsContext()
  const [title, setTitle] = useState('')
  const [journalData, setJournalData] = useState('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // const [imageFile, setImageFile] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const journal = {title, journalData}
    
    // send a POST request to the server to add the journal 
    const response = await fetch('/api/journal', {
      method: 'POST',
      body: JSON.stringify(journal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    // once response is made, set the form back to an empty string
    if (response.ok) {
      setError(null)
      setTitle('')
      setJournalData('')

      setEmptyFields([])
      console.log('new journal added:', json)
        // it's a json because it's the journal we just added so we can just perform this action -> adding it to the global ontext state
        // when it updates, it re-renders the journals

        // dispatch a create action to update the global context state
      dispatch({type: 'CREATE_RECIPE', payload: json})
    }

  }

  // UPLOAD IMAGE
  

  

  

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Journal</h3>

      <label>Journal Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        // look for title, if yes, give the class error, if not, then an empty string
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Write here:</label>
      <input 
        type="text" 
        onChange={(e) => setJournalData(e.target.value)} 
        value={journalData} 
        className={emptyFields.includes('type') ? 'error' : ''}
      />
      {/* BUtton to add journal */}
      <button>Add Journal</button>
      {error && <div className="error">{error}</div>}
    </form>
    
  )
}

export default JournalForm