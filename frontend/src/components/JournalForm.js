import { useState } from "react";
import { useJournalsContext } from "../hooks/useJournalsContext";
import axios from "axios";
import { options, postJournalReq } from "../util/constants";

// NESTED inside the home component below the details
const JournalForm = () => {
	// dispatch action
	const { dispatch } = useJournalsContext();
	const [title, setTitle] = useState("");
	const [journal, setJournal] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]); // Alert the user which fields are empty

	const handleSubmit = async (e) => {
		e.preventDefault();
		const journalPayload = { title, journal };
		// send a POST request to the server to add the journal
		const response = axios.post(
			postJournalReq,
			journalPayload,
			options.headers
		);

		if (!response.status === 200) {
			setError(response.error);
			setEmptyFields(response);
		}
		// once response is made, set the form back to an empty string
		if (response.status === 200) {
			setError(null);
			setTitle("");
			setJournal("");

			setEmptyFields([]);
			console.log("new journal added:", response);
			// it's a json because it's the journal we just added so we can just perform this action -> adding it to the global ontext state
			// when it updates, it re-renders the journals

			// dispatch a create action to update the global context state
			dispatch({ type: "CREATE_RECIPE", payload: json });
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Journal</h3>

			<label>Journal Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				// look for title, if yes, give the class error, if not, then an empty string
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label>Write here:</label>
			<input
				type="text"
				onChange={(e) => setJournal(e.target.value)}
				value={journal}
				className={emptyFields.includes("journal") ? "error" : ""}
			/>
			{/* BUtton to add journal */}
			<button>Add Journal</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default JournalForm;
