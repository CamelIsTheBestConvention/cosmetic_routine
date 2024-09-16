import { RoutineService } from '../../src/services/routine.service';
import { RoutineSkinRelationService } from '../../src/services/routine-skin-relation.service';
import { Routine } from '../../src/entities/routine.entity';
import { RoutineSkinRelation } from '../../src/entities/routine-skin-relation.entity';
import { Repository } from 'typeorm';
import { REPOSITORY_TOKENS } from '../../src/config/constants';
import { container } from 'tsyringe';


describe('RoutineService', () => {
    let routineService: RoutineService;
    let routineRepository: Repository<Routine>;
    let routineSkinRelationService: RoutineSkinRelationService;
    let routineSkinRelationRepository: Repository<RoutineSkinRelation>;

    beforeEach(() => {
        routineRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
        } as unknown as Repository<Routine>;

        routineSkinRelationRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
        } as unknown as Repository<RoutineSkinRelation>;

        routineSkinRelationService = {
            getRoutineSkinRelationByAttrKey: jest.fn(),
        } as unknown as RoutineSkinRelationService;

        container.registerInstance(REPOSITORY_TOKENS.RoutineRepository, routineRepository);
        container.registerInstance(REPOSITORY_TOKENS.RoutineSkinRelationRepository, routineSkinRelationRepository);
        container.registerInstance(RoutineSkinRelationService, routineSkinRelationService);
        routineService = container.resolve(RoutineService);
    });

    it('should return all routines', async () => {
        const routines = [{ routine_key: 1, routine_name: 'Routine 1' }] as Routine[];
        (routineRepository.find as jest.Mock).mockResolvedValue(routines);

        const result = await routineService.getAllRoutines();
        expect(result).toEqual(routines);
        expect(routineRepository.find).toHaveBeenCalled();
    });

    it('should return a routine by key', async () => {
        const routine = { routine_key: 1, routine_name: 'Routine 1' } as Routine;
        (routineRepository.findOneBy as jest.Mock).mockResolvedValue(routine);

        const result = await routineService.getRoutineByKey(1);
        expect(result).toEqual(routine);
        expect(routineRepository.findOneBy).toHaveBeenCalledWith({ routine_key: 1 });
    });

    it('should throw an error if routine not found', async () => {
        (routineRepository.findOneBy as jest.Mock).mockResolvedValue(null);

        await expect(routineService.getRoutineByKey(1)).rejects.toThrow('해당 루틴을 찾을 수 없습니다.');
    });

    // Test Driven Development

});