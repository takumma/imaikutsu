/// <reference types="firebase-functions" />

import * as firebase from "firebase-admin";
declare function config(): config.Config;

declare namespace config {
  /**
   * The Functions configuration interface.
   *
   * Access via `functions.config()`.
   */
  interface Config {
    functions: {
      bearer: string;
    };
  }
  /** @hidden */
  let singleton: config.Config;
}

/** @hidden */
export declare function firebaseConfig(): firebase.AppOptions | null;
