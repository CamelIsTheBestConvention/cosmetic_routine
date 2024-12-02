import { RoutineController } from '../../src/controllers/routine.controller';
import { RoutineService } from '../../src/services/routine.service';
import { RoutineDetailService } from '../../src/services/routine-detail.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

describe('RoutineController', () => {
    let routineController: RoutineController;
    let routineService: RoutineService;
    let routineDetailService: RoutineDetailService;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        routineService = {
            getAllRoutines: jest.fn(),
            getRoutineByKey: jest.fn(),
            createRoutine: jest.fn(),
            updateRoutine: jest.fn(),
            deleteRoutine: jest.fn(),
        } as unknown as RoutineService;

        routineDetailService = {
            updateRoutineDetail: jest.fn(),
            deleteRoutineDetail: jest.fn(),
        } as unknown as RoutineDetailService;

        container.registerInstance(RoutineService, routineService);
        container.registerInstance(RoutineDetailService, routineDetailService);

        routineController = container.resolve(RoutineController);

        req = {
            params: {},
            body: {},
            headers: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return all routines', async () => {
        const routines = [{ routine_key: 1, routine_name: 'Routine 1' }];
        (routineService.getAllRoutines as jest.Mock).mockResolvedValue(routines);

        await routineController.getRoutines(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(routines);
    });

    it('should return a routine by key', async () => {
        const routine = { routine_key: 1, routine_name: 'Routine 1' };
        (routineService.getRoutineByKey as jest.Mock).mockResolvedValue(routine);
        req.params = { routine_key: '1' };

        await routineController.getRoutineByKey(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(routine);
    });

    it('should throw an error if routine not found', async () => {
        (routineService.getRoutineByKey as jest.Mock).mockRejectedValue(new Error('해당 루틴을 찾을 수 없습니다.'));
        req.params = { routine_key: '1' };

        await routineController.getRoutineByKey(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: '루틴 조회에 실패했습니다.' });
    });

    // 추가적인 테스트 케이스를 여기에 작성합니다.
});