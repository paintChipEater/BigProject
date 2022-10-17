import { useJournalsContext } from '../hooks/useJournalsContext'


// date FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JournalDetails = ({ journal }) => {
  const { dispatch } = useJournalsContext()

  // function that sends a delete request
  const handleClick = async () => {
    // fetchiing through the url with the id

    // Grabbing the delete request 
    const response = await fetch('/api/journal/' + journal._id, {
      method: 'DELETE'
    })
    const json = await response.json()
    
    // filter through journals until it finds the delete
    // does an action to update the global state as well
    if (response.ok) {
      dispatch({type: 'DELETE_RECIPE', payload: json})
    }
  }

  return (
    <div className="journal-details">
      {/* Output journal details */}
      <h4>{journal.title}</h4>

      
      <p><strong>Journal: </strong><br></br> {journal.journalData}</p>
      <p>{formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true})}</p>

      {/* FINDS A FUNCTION BEING HANDLECLICK */}
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default JournalDetails