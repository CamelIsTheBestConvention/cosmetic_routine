import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { RoutineService } from '../services/routine.service';
import { RoutineDetailService } from '../services/routine-detail.service';
import { verifyToken } from '../utils/jwt.utils';

@injectable()
export class RoutineController {
    constructor(
        private routineService: RoutineService,
        private routineDetailService: RoutineDetailService
    ) { }

    async createRoutine(req: Request, res: Response): Promise<void> {
        const { routine_name, steps } = req.body.main;
        const details = req.body.detail;

        // body = {
        //     main: {
        //         routine_name: '',
        //         steps: 3
        //         skin_attributes: []
        //     },
        //     details: [{}, {}, {}]
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
            const routine = await this.routineService.createRoutine(user_key, routine_name, steps);
            for (const detail of details) {
                await this.routineDetailService.createRoutineDetail(routine.routine_key, detail.item_key, detail.step_name, detail.description);
            }
            res.status(201).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 생성에 실패했습니다.' });
        }
    }

    async getRoutines(req: Request, res: Response): Promise<void> {
        try {
            const routines = await this.routineService.getAllRoutines();
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
        const { routine_name, steps } = req.body;
        const routine_key = req.params.routine_key;
        try {
            const routine = await this.routineService.updateRoutine(Number(routine_key), routine_name, steps);
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 수정에 실패했습니다.' });
        }
    }

    async deleteRoutine(req: Request, res: Response): Promise<void> {
        const routine_key = req.params.routine_key;
        try {
            const routine = await this.routineService.deleteRoutine(Number(routine_key));
            res.status(200).json(routine);
        } catch (error) {
            res.status(500).json({ message: '루틴 삭제에 실패했습니다.' });
        }
    }
}