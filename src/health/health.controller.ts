import { Controller, Get } from "@nestjs/common";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    public check() {
        return this.health.check([
            () =>
                this.http.responseCheck(
                    "eapi",
                    "https://eapi.rs.ge",
                    (response) =>
                        response.status === 403 || response.status === 200,
                ),
        ]);
    }
}
