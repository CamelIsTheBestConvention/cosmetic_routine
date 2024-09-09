import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { Address } from '../entities/address.entity';
import { UserService } from './user.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class AddressService {
    constructor(
        @inject('UserService') private userService: UserService,
        @inject('AddressRepository') private addressRepository: Repository<Address>
    ) { }

    // 사용자 주소 추가 
    async addAddress(user_key: number, name: string, addr: string, addr_detail: string, zip: string, tel: string, request: string, is_default: 'Y' | 'N'): Promise<Address> {
        const user = await this.userService.getUserByKey(user_key);
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        const newAddress = this.addressRepository.create({
            user,
            name,
            addr,
            addr_detail,
            zip,
            tel,
            request,
            is_default
        });
        return await this.addressRepository.save(newAddress);
    }

    // 사용자 주소록 조회 
    async getAllAddress(user_key: number): Promise<Address[]> {
        const addresses = await this.addressRepository.find({ where: { user: { user_key } } });
        if (!addresses.length) {
            throw new Error('해당 유저의 주소록을 찾을 수 없습니다.');
        }
        return addresses;
    }

    // 사용자 주소 조회
    async getAddress(address_key: number): Promise<Address> {
        const address = await this.addressRepository.findOneBy({ address_key });
        if (!address) {
            throw new Error('해당 주소를 찾을 수 없습니다.');
        }
        return address;
    }

    // 사용자 주소 수정
    async updateAddress(address_key: number, name: string, addr: string, addr_detail: string, zip: string, tel: string, request: string, is_default: 'Y' | 'N'): Promise<Address> {
        const address = await this.addressRepository.findOneBy({ address_key });
        if (!address) {
            throw new Error('해당 주소를 찾을 수 없습니다.');
        }
        address.name = name;
        address.addr = addr;
        address.addr_detail = addr_detail;
        address.zip = zip;
        address.tel = tel;
        address.request = request;
        address.is_default = is_default;
        return await this.addressRepository.save(address);
    }

    // 사용자 주소 삭제
    async deleteAddress(address_key: number): Promise<Address> {
        const address = await this.addressRepository.findOneBy({ address_key });
        if (!address) {
            throw new Error('해당 주소를 찾을 수 없습니다.');
        }
        return await this.addressRepository.remove(address);
    }
}

declare const userService: UserService;
