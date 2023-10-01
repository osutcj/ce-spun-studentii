declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            API_KEY_FIREBASE: string;
            MESSAGE_SENDER_ID: string;
            APP_ID: string;
            // add more environment variables and their types here
        }
    }

}