import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

///Firebase Initialization
admin.initializeApp(functions.config().firebase);

//Exports
export * from "./firestore_triggers/_export";
export * from "./firestore_requests/_export";