import { useJournalsContext } from '../hooks/useJournalsContext'


// date FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from 'axios'
import { deleteJournalReq, deleteOptions } from '../util/constants'

const JournalDetails = ({ journal }) => {
  const { dispatch } = useJournalsContext()

  // function that sends a delete request
  const handleClick = async () => {
    // fetchiing through the url with the id

    // Grabbing the delete request that was already parsed to json 
    const response = await axios.delete(deleteJournalReq + "/" +journal._id, deleteOptions);

    
    // filter through journals until it finds the delete
    // does an action to update the global state as well
    if (response.status === 200) {
      dispatch({type: 'DELETE_RECIPE', payload: response})
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