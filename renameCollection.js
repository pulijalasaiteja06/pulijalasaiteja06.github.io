const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK with your project configuration
admin.initializeApp({
  credential: admin.credential.cert({
    // Add your service account key configuration here
    type: 'service_account',
    project_id: 'disneyplus-clone-461a9',
    private_key_id: '8c2d9c2c839b9c53a32a4049037dc4c22b953130',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+BaKCagVt1vQS\n/x0VSbGY7U+lSm/hRwrUVEvyYKAP8W0GZ54X6A9Vd0INnT3+6L37y4fULaYoUQzQ\nhsc8Cq6muuPFaIjUmpUD3iLeGWWXOfFTrcRHjPZhW9+x/L863A1MxRlgCoL/eCbc\nPGBZtqpIKxhk7v9qh7dy9D3T/aI+3QE1skYkiaoyrS3ZUNLF/x/UbYYUUrrKQz2D\nc9t9Fn+SiDrXkKWpCfSpTtK9wuBPH1qGBpQ0j4CiYiIcployiG+w5KEUdO1iYX0O\n43n2aUZyqOxwiIzCJj6F2XdigcKg2/jdHqGubYnncQGzkK4nwN8pDKr+0qEe9l/H\nJ0X2CgNBAgMBAAECggEACfboWLJlP9H1JpyI0o70vdzj6k+xojyZeBzw2/BD3yd9\nMh1zkDQJFHrr1HmZwKjvyCkaIamV0ai+ZUj2taf8afMu8oZ9dmNMy9EgPvP8pyYm\nCN9PME6stNpJLAo29PKJIqzLRzAF7TjzFhAhyqfmMgv10YUpkP/g7NRF/Gc2f4P8\nFf4wotlSl4DmGFKHw+ikTBlBkTN0VEBFpcUK8/H70uC3E5VHu++qP+v6td5/dfbX\nHSNrvi2gL5uwFXRZ2ZIrDFndKmkbF0MLPkWHXKliEahk1o0m66OB/vbg8IZLhPDV\n3f57g3gGfwCVsb2Xk8zCso68VUXqnBLmaUB9dC07YQKBgQD2M2iUWQAs8Id1Ezcy\nietInvPynvWVRv+HVeZVHTrGYitUvoLxnWEpOPZUX/85FISoqva8HaPR69gNIcc5\n+hfxSYerNvmLmpWS2l7Wq0cazKW1joinbt1mWfbtTl7cLG7EuENTGqDHwpFOVHCs\nyZks2sKCPjNzeGici+mJV8oj1QKBgQDFlc8JK3v5P7PH4QTpM/PYDDDMb0dhbN9a\n8s17xddFamzxTIZhK7wytr9LIL2lAmpxmLmqx4LFtpkzon49hqdF2fYZjPZHe46+\nwOaLyjV70oYIbfGVUB/AskzrW8EQ0o53OSRLgIQoRNMI9kuPC36qKaH98cRh/lcm\nSvdQtLHTvQKBgFW6KNwe8XS0fDZD7qBmbcrnrkH5H8JO6oMRYhaZCvIxFK15eNbw\n2fgkoYFXu+MARgEFJszx9S0PVjecX2bMsrGNzPPNPK9jsFlmOEe/dA7c24aQjvze\nGbGd+eE/vMAlqJxPHQI+72UfVsFTnbhMqk14DuqTBg9bCfIYtcThEL3RAoGAT6+W\new1Fh4VwfTk8IM0qF8T63Ug30ov1HJn102g75KwCWeLSA1h/Izjet27x7R2nTj8Z\nCk5CaHi3GsL7BNdMmPhJr45ROQ0UycvEbzZTEagbFEU6/Ev/Mlj2eqlbmOxCNsUd\n5TFkm1T+g4vJd1xcbkYyJdeeqyLHhRMQ4USuv0UCgYEAgpSvsvI37KPqXnAfdzKm\n03bkQWCs9pDCwN9pSjCvgAcx9i81NqYaXnJ0SmQkAgc0dN8N2bA1kAoddTJkKpEh\nY/5rPcRQnJBXtWHTX97k7sGaEOcfIqlISHbsmF0/nbhPhr4/L91J8zOx91kAnBOG\nw1mg+CkvJQ/y67vTcvmgp20=\n-----END PRIVATE KEY-----\n",
    client_email: 'firebase-adminsdk-5dwyf@disneyplus-clone-461a9.iam.gserviceaccount.com',
    client_id: '106091668217074258612',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5dwyf%40disneyplus-clone-461a9.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  })
});

// Get a reference to the Firestore database
const firestore = admin.firestore();

// Define the current and new collection names
const currentCollectionName = 'current_collection';
const newCollectionName = 'new_collection';

// Function to delete a collection
const deleteCollection = async (collectionRef) => {
  const query = collectionRef.limit(500);

  while (true) {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
      return;
    }

    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
};

// Get a reference to the current collection
const currentCollectionRef = firestore.collection(currentCollectionName);

// Get all documents from the current collection and copy them to the new collection
currentCollectionRef
  .get()
  .then(async (snapshot) => {
    const batch = firestore.batch();

    // For each document, create a copy in the new collection
    snapshot.forEach((doc) => {
      const data = doc.data();
      const newDocRef = firestore.collection(newCollectionName).doc(doc.id);
      batch.set(newDocRef, data);
    });

    // Commit the batch write to create the new documents
    await batch.commit();

    // Delete all documents in the current collection
    await deleteCollection(currentCollectionRef);

    console.log('Collection renamed successfully.');
  })
  .catch((error) => {
    console.error('Error renaming collection:', error);
  });

