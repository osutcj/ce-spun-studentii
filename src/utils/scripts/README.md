# Seeding script usage
In order to use the seeding script, there are a few pre-requisites.
1. NPM - https://nodejs.org/en/
2. ts-node: `npm install -g typescript`
3. Admin rights and permissions

Also, the project needs to be set-up
1. Navigate in the project's root directory
2. Run the command: `npm install`
3. Run `npm run dev`
4. Verify `https://localhost:3000/admin` if the application is working

After all these steps have been made, you can run the seeding script
1. Make sure that the `questions` and `answers` arrays are wrote correctly
2. Pop-up Firebase, and under `OSUT-Divertisment` => `Firebase Firestore`, click on the `questions` collection, click on the 3 dots and select `Delete colelction`
3. Open a terminal in the project's root directory and run the command `npm run seed:firestore`

### Note: This process will permanently change the database' content, so proceed with caution