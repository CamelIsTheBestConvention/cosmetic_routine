import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { RoutineService } from '../services/routine.service';
import { RoutineDetailService } from '../services/routine-detail.service';
import { RoutineSkinRelationService } from '../services/routine-skin-relation.service';
import { verifyToken } from '../utils/jwt.utils';

@injectable()
export class RoutineController {
    constructor(
        private routineService: RoutineService,
        private routineDetailService: RoutineDetailService,
        private routineSkinRelationService: RoutineSkinRelationService
    ) { }

    async createRoutine(req: Request, res: Response): Promise<void> {
        const { routine_name, steps, for_gender, for_skin, for_age, for_problem } = req.body.main;
        const details = req.body.details;
        const tags = req.body.tags;

        // body = {
        //     main: {
        //         routine_name: 'Routine Name',
        //         steps: 3,
        //         for_gender: 'M',
        //         for_skin: 1~5 사이의 수,
        //         for_age: '20',
        //         for_problem: ['10', '11'],
        //     },
        //     details: [{
        //         step_number: 1,
        //         item_key: 1,
        //         step_name: 'Step Name',
        //         description: 'Step Description'
        //     }, {
        //         step_number: 2,
        //         item_key: 2,
        //         step_name: 'Step Name',
        //         description: 'Step Description'
        //     }]
        //     tags: []
        // }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        try {
            const routine = await this.routineService.createRoutine(user_key, routine_name, steps, for_gender, for_skin, for_age, for_problem, details, tags);
            res.status(201).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 생성에 실패했습니다.' });
        }
    }

    async getAllRoutines(req: Request, res: Response): Promise<void> {
        try {
            const { sort, order, page, size, ...filter } = req.query;

            Object.keys(filter).forEach(key => {
                if (!Array.isArray(filter[key])) {
                    filter[key] = [filter[key] as string];
                }
            });

            const routines = await this.routineService.getAllRoutines(
                sort as string,
                order as 'ASC' | 'DESC',
                page ? parseInt(page as string) : undefined,
                size ? parseInt(size as string) : undefined,
                filter as { [key: string]: any }
            );
            res.status(200).json(routines);
        } catch (error) {
            res.status(500).json({ message: '루틴 조회에 실패했습니다.' });
        }
    }

    async getRoutineByKey(req: Request, res: Response): Promise<void> {
        const routine_key = req.params.routine_key;
        try {
            const routine = await this.routineService.getRoutineByKey(Number(routine_key));
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 조회에 실패했습니다.' });
        }
    }

    async updateRoutine(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;

        const { routine_name, steps } = req.body;
        const routine_key = req.params.routine_key;
        try {
            const routine = await this.routineService.updateRoutine(Number(user_key), Number(routine_key), routine_name, steps);
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 수정에 실패했습니다.' });
        }
    }

    async deleteRoutine(req: Request, res: Response): Promise<void> {
        const routine_key = req.params.routine_key;
        try {
            await this.routineService.deleteRoutine(Number(routine_key));
            res.status(200).json({ message: '루틴 삭제에 성공했습니다.' });
        } catch (error) {
            res.status(500).json({ message: '루틴 삭제에 실패했습니다.' });
        }
    }

    async updateRoutineDetail(req: Request, res: Response): Promise<void> {
        const { step_number, item_key, step_name, description } = req.body;
        const routine_key = req.params.routine_key;
        try {
            const routineDetail = await this.routineDetailService.updateRoutineDetail(Number(routine_key), step_number, item_key, step_name, description);
            res.status(200).json(routineDetail);
        } catch (error) {
            res.status(500).json({ message: '루틴 단계 수정에 실패했습니다.' });
        }
    }

    async deleteRoutineDetail(req: Request, res: Response): Promise<void> {
        const { step_number } = req.body;
        const routine_key = req.params.routine_key;
        try {
            const routineDetail = await this.routineDetailService.deleteRoutineDetail(Number(routine_key), step_number);
            res.status(200).json(routineDetail);
        } catch (error) {
            res.status(500).json({ message: '루틴 단계 삭제에 실패했습니다.' });
        }
    }
}