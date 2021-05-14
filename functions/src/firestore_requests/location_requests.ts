import * as functions from 'firebase-functions'

import * as locationFunctions from '../utils/location_functions';

export const reverseGeocodeLatLon = functions.https.onCall((data, context) => {
    return locationFunctions.reverseGeocodeLatLon(data, context);
});