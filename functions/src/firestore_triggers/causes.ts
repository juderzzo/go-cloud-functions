// Firebase Imports
import * as functions from "firebase-functions";

// Custom Imports
import * as algoliaCauseFunctions from "../algolia/causes";

export const createCauseTrigger = functions.firestore
	.document("causes/{cause}")
	.onCreate(async (event) => {
		const data = event.data();
		return algoliaCauseFunctions.saveCauseToSearchIndex(data);
	});

export const updateCauseTrigger = functions.firestore
	.document("causes/{cause}")
	.onUpdate(async (event) => {
		const data = event.after.data();
		return algoliaCauseFunctions.saveCauseToSearchIndex(data);
	});

export const deleteCauseTrigger = functions.firestore
	.document("causes/{cause}")
	.onDelete(async (event) => {
		const data = event.data();
		return algoliaCauseFunctions.deleteCauseFromSearchIndex(data);
	});
