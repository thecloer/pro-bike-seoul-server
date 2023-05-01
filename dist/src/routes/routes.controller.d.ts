import { RoutesService } from './routes.service';
import { GetDirectionsDto } from './dto/getDirections-body.dto';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    getDirections({ origin, destination }: GetDirectionsDto): Promise<import("./types/routes.type").Route>;
}
