import { injectable } from 'tsyringe';
import { portoneClient } from '../config/portone.config';
import dotenv from 'dotenv';

dotenv.config()

const PORTONE_REST_API_KEY = process.env.PORTONE_REST_API_KEY;
const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

@injectable()
export class PortoneService {
    async fetchAccessToken(): Promise<string> {
        try {
            console.log('api key', process.env.PORTONE_REST_API_KEY)
            console.log('api secret', process.env.PORTONE_API_SECRET)
            const response = await portoneClient.post('/users/getToken', {
                imp_key: PORTONE_REST_API_KEY,
                imp_secret: PORTONE_API_SECRET
            });

            const accessToken = response.data.response.access_token;
            console.log('Access Token:', accessToken);
            return accessToken;
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw new Error('Failed to fetch access token');
        }
    }

    async createPayment(paymentData: any): Promise<string> {
        try {
            const accessToken = await this.fetchAccessToken();
            console.log('Access Token:', accessToken);

            console.log('Request URL:', `${portoneClient.defaults.baseURL}/payments/confirm`);
            console.log('Request Data:', paymentData);

            const response = await portoneClient.get('/payments', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const impUid = response.data.response.imp_uid;
            console.log('Payment created with imp_uid:', impUid);

            return impUid;
        } catch (error: any) {
            console.error('Error creating payment:', error.response?.data || error.message);
            throw new Error('Failed to create payment');
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

            console.log('Payment details:', response.data.response);
            return response.data.response;
        } catch (error) {
            console.error('Error querying payment:', error);
            throw new Error('Failed to query payment');
        }
    }
}