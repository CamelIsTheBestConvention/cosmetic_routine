import axios from 'axios';

const PORTONE_API_BASE_URL = 'api.iamport.kr';
const PORTONE_API_KEY = process.env.PORTONE_REST_API_KEY;
const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export const portoneClient = axios.create({
    baseURL: PORTONE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PORTONE_API_KEY}:${PORTONE_API_SECRET}`
    }
});