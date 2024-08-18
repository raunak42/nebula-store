const BASE_URL_DEV = "http://localhost:3000"
const BASE_URL_PROD = "https://nebula.raunak42.in"

export const BASE_URL = (process.env.NODE_ENV === "production" ? BASE_URL_PROD : BASE_URL_DEV)