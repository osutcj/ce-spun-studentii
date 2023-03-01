# App configuration

```
AUTH_DOMAIN = 'osut-divertisment.firebaseapp.com'
DATABASEURL = 'https://osut-divertisment-default-rtdb.europe-west1.firebasedatabase.app'
PROJECT_ID = 'osut-divertisment'
```

# Server Configuration

In order to start the application, run the following commands to generate the node_modules folder:

```
npm install
npm start
```

if npm build fails with 
node_modules/use-sound/dist/types.d.ts:21:12 - error TS2304: Cannot find name 'Howl'.
the quick fix is to go to  node_modules/use-sound/dist/types.d.ts
and add import { Howl } from "howler";
