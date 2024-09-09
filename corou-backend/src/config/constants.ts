export const REPOSITORY_TOKENS = {
    UserRepository: Symbol('UserRepository'),
    AddressRepository: Symbol('AddressRepository'),
    RoutineRepository: Symbol('RoutineRepository'),
    ItemRepository: Symbol('ItemRepository'),
    SkinAttributeRepository: Symbol('SkinAttributeRepository'),
    UserSkinRelationRepository: Symbol('UserSkinRelationRepository'),
    ItemOrderRepository: Symbol('ItemOrderRepository'),
    OrderDetailRepository: Symbol('OrderDetailRepository'),
    ReviewRepository: Symbol('ReviewRepository'),
    RoutineDetailRepository: Symbol('RoutineDetailRepository'),
} as const;