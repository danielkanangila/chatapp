export const NODE_ENV = process.env.NODE_ENV | "development";
export const SERVER_URL = "";
export const WS_BASE_URL = NODE_ENV === "production" ? SERVER_URL : window.location.origin;