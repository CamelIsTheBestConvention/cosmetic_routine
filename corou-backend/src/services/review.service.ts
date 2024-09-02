import { AppDataSource } from '../config/ormconfig';
import { Review } from '../entities/review.entity';

export class ReviewService {
    private reviewRepository = AppDataSource.getRepository(Review);

    // 리뷰 등록
    async createReview(user_key: number, key: number, review_type: 'I' | 'R', review_content: string, rating: number): Promise<Review> {
        const newReview = this.reviewRepository.create({
            user_key,
            item_key: review_type === 'I' ? key : undefined,
            routine_key: review_type === 'R' ? key : undefined,
            review_type,
            review_content,
            rating,
            review_at: new Date()
        });
        return await this.reviewRepository.save(newReview);
    }
    // 루틴 별 리뷰 조회
    async getReviewByRoutine(routine_key: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({ where: { routine_key } });

        return reviews;
    }
    // 상품 별 리뷰 조회
    async getReviewByItem(item_key: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({ where: { item_key } });

        return reviews;
    }
}


