import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
    getAllReservation(){
        const reservation : string[] = ['0xaFe59e93DA9967089995656f8756f96F19734fe5','0x6983ACCAF7D0dC8e3d0856acA8395fc96Bf976A4','0xd5E9AE102A3dD23f7723D93E75dd03D59d5C28Dc']
        return reservation;
    }
}
