export const ENV = {
    GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
    GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
    GOOGLE_CALLBACK_URL: 'GOOGLE_CALLBACK_URL',
} as const;

export type EnvKeys = keyof typeof ENV;
