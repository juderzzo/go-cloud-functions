// Firebase Imports
import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'

// Custom Imports
import * as notificationFunctions from "../services/notifications/notifications_service";

// Data Collections
const database = admin.firestore();
const userRef = database.collection('users');
const notifRef = database.collection('notifications');

//Helper Functions
async function getUserMessageToken(uid: any){
    let messageToken;
    const snapshot = await userRef.doc(uid).get();
    if (snapshot.exists){
        const data = snapshot.data()!;
        if (data.messageToken !== undefined){
            messageToken = data.messageToken;
        }
    }
    return messageToken;
}

async function getNumberOfUnreadNotifications(uid: any){
    let num = 1;
    const querySnapshot = await notifRef.where('receiverUID', '==', uid).where('read', '==', false).get();
    if (!querySnapshot.empty){
        num = querySnapshot.docs.length;
    }
    return num;
}

// Exports
export const createNotificationTrigger = functions.firestore
	.document("notifications/{notification}")
	.onCreate(async (event) => {
        const data = event.data();
        const receiverUID = data.receiverUID;
        const title = data.header;
        const body = data.subHeader;
        const badgeCount = await getNumberOfUnreadNotifications(receiverUID);
        const type = data.type;
        const additionalData = data.additionalData.toString();
        const messageToken = await getUserMessageToken(receiverUID);
        if (messageToken !== undefined){
            await notificationFunctions.sendNotificationToSingleDevice(title, body, badgeCount.toString(), type, additionalData, messageToken);
        } else {
            console.log('no message token found');
        
        }

		return;
	});
