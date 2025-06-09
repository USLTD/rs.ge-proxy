import { Test, TestingModule } from "@nestjs/testing";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { HealthController } from "./health.controller";
import { EServicesAPIHealthIndicator } from "./eapi.health";
import { ConfigModule } from "@nestjs/config";
import eapiConfiguration from "../config/eapi.configuration";

// TODO
describe("HealthController", () => {
    let controller: HealthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forFeature(eapiConfiguration),
                TerminusModule,
                HttpModule,
            ],
            controllers: [HealthController],
            providers: [EServicesAPIHealthIndicator],
        }).compile();

        controller = module.get<HealthController>(HealthController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should return health status", async () => {
        const result = await controller.check();
        expect(result).toHaveProperty("status");
        expect(result.status).toEqual("ok");
    });
});
