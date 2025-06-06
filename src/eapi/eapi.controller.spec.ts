import { Test, TestingModule } from "@nestjs/testing";
import { EServicesAPIController } from "./eapi.controller";

// TODO
describe("E-Services API Controller", () => {
    let controller: EServicesAPIController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EServicesAPIController],
        }).compile();

        controller = module.get<EServicesAPIController>(EServicesAPIController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
