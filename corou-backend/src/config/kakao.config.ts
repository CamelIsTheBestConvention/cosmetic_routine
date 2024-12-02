import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const KAKAO_URL = "https://kauth.kakao.com/";
const KAKAO_KEY = process.env.KAKAO_REST_API_KEY;

export const kakaoClient = axios.create({
  baseURL: KAKAO_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${KAKAO_KEY}`,
  },
});
