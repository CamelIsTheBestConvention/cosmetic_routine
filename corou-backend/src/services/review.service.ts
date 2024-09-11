import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { Review } from '../entities/review.entity';
import { UserService } from './user.service';
import { ItemService } from './item.service';
import { RoutineService } from './routine.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ReviewService {
    constructor(
        private reviewRepository: Repository<Review>,
        private userService: UserService,
        private itemService: ItemService,
        private routineService: RoutineService
    ) { }

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
        if (!newReview) {
            throw new Error('리뷰를 등록할 수 없습니다.');
        }
        return await this.reviewRepository.save(newReview);
    }
    // 루틴 별 리뷰 조회
    async getReviewByRoutine(routine_key: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({ where: { routine_key } });
        if (!reviews) {
            throw new Error('해당 루틴의 리뷰를 찾을 수 없습니다.');
        }
        return reviews;
    }
    // 상품 별 리뷰 조회
    async getReviewByItem(item_key: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({ where: { item_key } });
        if (!reviews) {
            throw new Error('해당 상품의 리뷰를 찾을 수 없습니다.');
        }
        return reviews;
    }

    async deleteReview(review_key: number): Promise<void> {
        const review = await this.reviewRepository.findOneBy({ review_key });
        if (!review) {
            throw new Error('해당 리뷰를 찾을 수 없습니다.');
        }
        await this.reviewRepository.delete(review_key);
    }
}

// declare const userService: UserService;
// declare const itemService: ItemService;
// declare const routineService: RoutineService;

// const reviewRepository = AppDataSource.getRepository(Review);
// const reviewService = new ReviewService(reviewRepository, userService, itemService, routineService);
