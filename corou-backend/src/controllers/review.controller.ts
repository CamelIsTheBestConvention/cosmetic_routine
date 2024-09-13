import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ReviewService } from '../services/review.service';
import { verifyToken } from '../utils/jwt.utils';

@injectable()
export class ReviewController {
    constructor(
        private reviewService: ReviewService
    ) { }

    async createRoutineReview(req: Request, res: Response): Promise<void> {
        const { routine_key } = req.params;
        const { review_content, rating } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const review_type = 'R';
        try {
            const review = await this.reviewService.createReview(user_key, Number(routine_key), review_type, review_content, rating);
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: '리뷰 등록에 실패했습니다.' });
        }
    }

    async createItemReview(req: Request, res: Response): Promise<void> {
        const { item_key } = req.params;
        const { review_content, rating } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const review_type = 'I';
        try {
            const review = await this.reviewService.createReview(user_key, Number(item_key), review_type, review_content, rating);
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: '리뷰 등록에 실패했습니다.' });
        }
    }

    async getReviewByRoutine(req: Request, res: Response): Promise<void> {
        const { routine_key } = req.params;
        const lastPolled = req.query.lastPolled ? new Date(req.query.lastPolled as string) : new Date(0);
        try {
            const reviews = await this.reviewService.getReviewByRoutine(Number(routine_key), lastPolled);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: '리뷰 조회에 실패했습니다.' });
        }
    }

    async getReviewByItem(req: Request, res: Response): Promise<void> {
        const { item_key } = req.params;
        const lastPolled = req.query.lastPolled ? new Date(req.query.lastPolled as string) : new Date(0);
        try {
            const reviews = await this.reviewService.getReviewByItem(Number(item_key), lastPolled);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: '리뷰 조회에 실패했습니다.' });
        }
    }

    async deleteReview(req: Request, res: Response): Promise<void> {
        const { review_key } = req.params;
        try {
            await this.reviewService.deleteReview(Number(review_key));
            res.status(200).json({ message: '리뷰 삭제에 성공했습니다.' });
        } catch (error) {
            res.status(500).json({ message: '리뷰 삭제에 실패했습니다.' });
        }
    }
}