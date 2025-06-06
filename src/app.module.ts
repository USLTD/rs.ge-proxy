import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { GracefulShutdownModule } from "nestjs-graceful-shutdown";
import { ResilienceModule } from "nestjs-resilience";
import configuration from "./config/configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { EServicesAPIModule } from "./eapi/eapi.module";

@Module({
    imports: [
        GracefulShutdownModule.forRoot(),
        ResilienceModule.forRoot({}),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        LoggerModule.forRoot(),
        HealthModule,
        EServicesAPIModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
