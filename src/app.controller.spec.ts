import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { GracefulShutdownModule } from "nestjs-graceful-shutdown";
import { ResilienceModule } from "nestjs-resilience";
import { LoggerModule } from "nestjs-pino";
import configuration from "./config/configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { EServicesAPIModule } from "./eapi/eapi.module";

// TODO
describe("AppController", () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
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
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe("Hello World!");
        });
    });
});
