// Firebase Imports
import * as functions from "firebase-functions";

// Custom Imports
import * as algoliaUserFunctions from "../algolia/users";

export const createUserTrigger = functions.firestore
	.document("users/{user}")
	.onCreate(async (event) => {
		const data = event.data();
		return algoliaUserFunctions.saveUserToSearchIndex(data);
	});

export const updateUserTrigger = functions.firestore
	.document("users/{user}")
	.onUpdate(async (event) => {
		const data = event.after.data();
		return algoliaUserFunctions.saveUserToSearchIndex(data);
	});

export const deleteUserTrigger = functions.firestore
	.document("users/{user}")
	.onDelete(async (event) => {
		const data = event.data();
		return algoliaUserFunctions.deleteUserFromSearchIndex(data);
	});
