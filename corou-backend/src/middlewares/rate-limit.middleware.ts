import rateLimit, { Options } from "express-rate-limit";

const createRateLimiter = (options: Partial<Options> & { trustProxy?: string[] } = {}): ReturnType<typeof rateLimit> => {
    const trustProxy: string[] = options.trustProxy || ['loopback', 'linklocal', 'uniquelocal'];

    const rateLimitOptions: Partial<Options> = {
        windowMs: 60 * 1000, // 1 분
        limit: options.limit || 100, // 1 분에 최대 100 요청, 기본값은 100
        message: "Too many requests, please try again later.",
        trustProxy,
        ...options
    };

    return rateLimit(rateLimitOptions);
};

export default createRateLimiter;