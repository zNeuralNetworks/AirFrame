# Firebase Setup Instructions

This application is prepared to store user feedback in **Google Firebase Firestore**. Since the automated setup was bypassed, you need to connect your own Firebase project.

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the prompts (e.g., name it "Airframe").
3. (Optional) Disable Google Analytics if you don't need it for this project.

## 2. Enable Firestore Database
1. In the left sidebar, click **Build** > **Firestore Database**.
2. Click **Create database**.
3. Choose a location (e.g., `us-central1`).
4. Select **Start in test mode** (this allows initial development, but you should deploy the rules provided in this repo later).
5. Click **Enable**.

## 3. Register a Web App
1. Go to **Project Overview** (top of the left sidebar).
2. Click the **Web** icon (`</>`) to add an app.
3. Enter an app nickname (e.g., "Airframe Web").
4. Click **Register app**.
5. You will see a `firebaseConfig` object. It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

## 4. Update the Application Configuration
1. Open the file `firebase-applet-config.json` in this project.
2. Replace the placeholder values with the values from your `firebaseConfig` object.
3. Save the file.

## 5. Deploy Security Rules (Recommended)
To keep your database secure, you should use the rules defined in `firestore.rules`.
1. In the Firebase Console, go to **Firestore Database** > **Rules**.
2. Copy the contents of the `firestore.rules` file from this project.
3. Paste them into the Firebase Rules editor.
4. Click **Publish**.

## 6. Verify the Connection
1. Refresh the Airframe application.
2. Open the **Feedback** modal.
3. Submit a test feedback.
4. Check your **Firestore Database** > **Data** tab in the Firebase Console. You should see a new document in the `feedback` collection!

---
**Note:** If your Firebase project is on a different GCP account, simply ensure you are logged into that account in your browser when visiting the Firebase Console. The application only needs the configuration keys to communicate with the database.
