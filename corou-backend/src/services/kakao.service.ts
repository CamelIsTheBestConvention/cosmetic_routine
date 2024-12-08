import { Repository, DataSource } from "typeorm";
import { REPOSITORY_TOKENS } from "../config/constants";
import { UserService } from "./user.service";
import { injectable, inject } from "tsyringe";
import { kakaoClient } from "../config/kakao.config";
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class KakaoService {
    constructor() { }

    async requestToken(code: any): Promise<any> {
        try {
            const response = await kakaoClient.post(`/oauth/token`, null, {
                params: {
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_REST_API_KEY,
                    redirect_uri: process.env.KAKAO_REDIRECT_URI,
                    code,
                },
            });
            const token = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
            };
            console.log(token);
            return token;
        } catch (error: any) {
            if (error.response) {
                console.error("Error response from Kakao: ", error.response.data);
            } else {
                console.error(
                    "Error fetching data from Kakao: ",
                    error.message || error
                );
            }
            throw new Error("Failed to fetch access token from Kakao");
        }
    }

    async getUserInfo(accessToken: string): Promise<any> {
        console.log('access:', accessToken);
        const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('response:', response);
        return response.data;
    }
}
