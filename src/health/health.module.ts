import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { HealthController } from "./health.controller";
import { EServicesAPIHealthIndicator } from "./eapi.health";

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthController],
    providers: [EServicesAPIHealthIndicator],
})
export class HealthModule {}
