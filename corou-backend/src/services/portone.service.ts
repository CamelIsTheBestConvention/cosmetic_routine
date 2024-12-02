import { injectable, inject } from 'tsyringe';
import { portoneClient } from '../config/portone.config';
import dotenv from 'dotenv';

dotenv.config()

const PORTONE_REST_API_KEY = process.env.PORTONE_REST_API_KEY;
const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

@injectable()
export class PortoneService {
    constructor(
    ) { }

    async fetchAccessToken(): Promise<string> {
        try {
            const response = await portoneClient.post('/users/getToken', {
                imp_key: PORTONE_REST_API_KEY,
                imp_secret: PORTONE_API_SECRET
            });

            const accessToken = response.data.response.access_token;
            return accessToken;
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw new Error('Failed to fetch access token');
        }
    }


    async getPayment(impUid: string): Promise<any> {
        try {
            const accessToken = await this.fetchAccessToken();

            const response = await portoneClient.get(`/payments/${impUid}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.response;
        } catch (error) {
            console.error('Error querying payment:', error);
            throw new Error('Failed to query payment');
        }
    }
}