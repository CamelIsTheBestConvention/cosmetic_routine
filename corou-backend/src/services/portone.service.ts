import { injectable } from 'tsyringe';
import { portoneClient } from '../config/portone.config';

@injectable()
export class PortoneService {
    async fetchAccessToken(): Promise<string> {
        try {
            const response = await portoneClient.post('/users/getToken', {
                imp_key: process.env.PORTONE_API_KEY,
                imp_secret: process.env.PORTONE_API_SECRET
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

            const response = await portoneClient.post('/payments', paymentData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const impUid = response.data.response.imp_uid;
            console.log('Payment created with imp_uid:', impUid);

            return impUid;
        } catch (error) {
            console.error('Error creating payment:', error);
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