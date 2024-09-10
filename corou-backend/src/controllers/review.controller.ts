import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ReviewService } from '../services/review.service';

// @injectable()
// export class ReviewController {
//     constructor(
//         private reviewService: ReviewService
//     ) { }

//     async createRoutineReview(req: Request, res: Response): Promise<void> {
//         const { routine_key, review } = req.body;
//     }