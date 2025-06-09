import { Controller, Get } from "@nestjs/common";
import {
    HealthCheckService,
    // HttpHealthIndicator,
    HealthCheck,
} from "@nestjs/terminus";
import { EServicesAPIHealthIndicator } from "./eapi.health";

@Controller("health")
export class HealthController {
    constructor(
        private health: HealthCheckService,
        // private http: HttpHealthIndicator,
        private eapiHealthIndicator: EServicesAPIHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    public check() {
        return this.health.check([() => this.eapiHealthIndicator.isHealthy()]);
    }
}
