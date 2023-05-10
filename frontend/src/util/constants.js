export const defaultUrl = "http://localhost:4020";

export const postJournalReq = defaultUrl + "/journal/create-journal";

export const getJournalReq = defaultUrl + "/journal/get-journals";
export const deleteJournalReq = defaultUrl + "/journal/delete-journal";

export const options = {
	headers: {
		"Content-Type": "application/json",
	},
};
export const deleteOptions = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE'
}