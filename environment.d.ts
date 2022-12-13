declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_URL?: string;

    PORT?: string;

    DB_HOST?: string;
    DB_NAME?: string;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;

    ORIGIN?: string;

    GOOGLE_CLIENT_ID?: string;
    GOOGLE_SECRET?: string;
  }
}
