// routes
import { PATH_PAGE } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.NEXT_PUBLIC_HOST_API_URL || 'https://api.l-s-s.org/api';

export const FIREBASE_API = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAP_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_PAGE.home.root; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 56,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 0,
  H_TABLET: 68,
  H_TABLET_OFFSET: 74,
  H_MOBILE_OFFSET: 56,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 353,
  W_SIDEBAR: 390,
  W_DASHBOARD_MINI: 112,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const SUB_NAV = {
  W_NOTIFICATION: 360,
  W_ORDER: 360,
};

export const ICON = {
  NAV_ITEM: 32,
  NAV_ITEM_HORIZONTAL: 32,
  NAV_ITEM_MINI: 32,
};

export const ACCEPT_INVIT_DIALOG = {
  XS_PADDING_BOTTOM: 294,
  SM_PADDING_BOTTOM: 114,
  MD_PADDING_BOTTOM: 146,
  LG_PADDING_BOTTOM: 146,
};

export const LOGIN_STEPS = {
  SIGN_IN: 'signin',
  OTP: 'otp',
  VERIFY_OTP: 'verifyingOTP',
  CONFIRM_PASSWORD: 'confirmPassword',
  CONFIRM: 'confirm',
  SIGN_UP: 'signup',
  MAIL_VERIFYING: 'mailVerifying',
  MAIL_VERIFIED: 'mailVerified',
  UPLOAD_PHOTO: 'uploadPhoto',
  UPLOAD_ID_FRONT: 'uploadID-front',
  UPLOAD_ID_BACK: 'uploadID-back',
  COMPLETE: 'complete',
};

export const AUTH_STATUS = {
  WAIT_MAIL_VERIFYING: 0,
  MAIL_VERIFIED: 1,
  AVATAR_UPLOADED: 2,
  ID_VERIFIED: 3,
  PREPARED: 4,
  SUBMITTED: 5,
  DENIED: 6,
  ACCEPTED: 7,
  USER_ACCEPTED: 8,
  SUBSCRIBED: 9,
};
