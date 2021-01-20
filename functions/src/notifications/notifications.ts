import * as admin from 'firebase-admin'

const messagingAdmin = admin.messaging();

export async function sendNotificationToSingleDevice(title: any, body: any, badgeCount: any, type: any, data: any, messageToken: any) {
    const payload = {
        notification: {
            title: title,
            body: body,
            badge: badgeCount,
        },
        data: {
            "TYPE": type,
            "DATA": data
        }
    };
    return messagingAdmin.sendToDevice(messageToken, payload);
}

export async function sendNotificationToMultipleDevices(title: any, body: any, badgeCount: any, type: any, data: any, messageTokens: any) {
    const payload = {
        notification: {
            title: title,
            body: body,
            badge: badgeCount,
        },
        data: {
            "TYPE": type,
            "DATA": data
        }
    };
    return messagingAdmin.sendToDevice(messageTokens, payload);
}
