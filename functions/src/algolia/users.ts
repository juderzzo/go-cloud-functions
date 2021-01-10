import * as algoliaInit from "./algolia_init";

export async function saveUserToSearchIndex(data: any) {
	const objectData = data;
	const objectID = data.id;
	const algoliaClient = await algoliaInit.getAlgoliaClient();
	const causesIndex = algoliaClient.initIndex("users");
	await causesIndex
		.saveObject({ ...objectData, objectID })
		.catch((error: any) => {
			console.log(error);
		});
}

export async function deleteUserFromSearchIndex(data: any) {
	const objectID = data.id;
	const algoliaClient = await algoliaInit.getAlgoliaClient();
	const causesIndex = algoliaClient.initIndex("users");
	await causesIndex.deleteObject(objectID).catch((error: any) => {
		console.log(error);
	});
}
