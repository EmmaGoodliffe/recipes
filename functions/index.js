/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// ---

// from svelte-adapter-firebase

import { logger, region } from "firebase-functions";
import ssrFunctionServer from "./ssrFunction";

export const ssrFunction = region("europe-west1").https.onRequest(
  async (request, response) => {
    logger.info("Requested resource: " + request.originalUrl);
    return ssrFunctionServer(request, response);
  },
);
