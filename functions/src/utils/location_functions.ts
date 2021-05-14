import * as admin from 'firebase-admin'

const appRef = admin.firestore().collection('app_info');

export async function reverseGeocodeLatLon(data: any, context: any){
  const NodeGeocoder = require('node-geocoder');
  const lat = data.lat;
  const lon = data.lon;
  const googleDocRef = await appRef.doc('google').get();
  const googleApiKey = googleDocRef.data()!.generalKey;
  const options = {
    provider: 'google',
    apiKey: googleApiKey,
  };
  const geocoder = NodeGeocoder(options);
  const res = await geocoder.reverse({ lat: lat, lon: lon});
  console.log(res);
  return {'data': res};
}
