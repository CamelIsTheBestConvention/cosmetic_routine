import { Repository, DataSource } from "typeorm";
import { REPOSITORY_TOKENS } from "../config/constants";
import { UserService } from "../services/user.service";
import { injectable, inject } from "tsyringe";
import { kakaoClient } from "../config/kakao.config";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class KakaoService {
  constructor() {}

  async requestToken(code: any): Promise<any> {
    try {
      console.log("코드 받아와지는지", code);
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
    const response = await kakaoClient.get("/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}
