import { Express } from 'express';
import { setupUserRouter } from './user.router';
import { setupItemRouter } from './item.router';
import { setupRoutineRouter } from './routine.router';
import { setupReviewRouter } from './review.router';
import { setupOrderRouter } from './order.router';
import { setupTagRouter } from './tag.router';
import { setupKakaoRouter } from './kakao.router';
import { setupPaymentRouter } from './payment.router';

export function setupRoutes(app: Express) {
    app.use('/api/user', setupUserRouter());
    app.use('/api/routine', setupRoutineRouter());
    app.use('/api/item', setupItemRouter());
    app.use('/api/review', setupReviewRouter());
    app.use('/api/order', setupOrderRouter());
    app.use('/api/tag', setupTagRouter());
    app.use('/api/kakao', setupKakaoRouter());
    app.use('/api/payments', setupPaymentRouter());
}