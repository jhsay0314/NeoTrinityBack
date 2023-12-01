import { Controller, Get } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService:ReservationService){}

    @Get()
    getAllReservation(){
        return this.reservationService.getAllReservation();
    }
}
