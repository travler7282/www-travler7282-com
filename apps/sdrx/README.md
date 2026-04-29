# SDRx Frontend

Angular 19 + Angular Material frontend for SDRx software-defined radio.

## What It Does
- Provides a UI for SDR state, tuning, and visualization
- Connects to the SDRx backend for radio control

## Scripts
- `npm run start` - start local dev server
- `npm run build` - build production assets
- `npm run watch` - build in watch mode
- `npm run test` - run unit tests

## Deployment
This app is deployed under the `/sdrx/` route by the repository deployment workflows.

## Backend Domain Configuration
Set the API domain in `public/runtime-config.js` before deployment if needed.
