import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { EServicesAPIService } from "./eapi.service";
import { LoggerModule } from "nestjs-pino";
import type { EServicesAPI } from "./types";

describe("E-Services API Service", () => {
    let eapiService: EServicesAPIService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [EServicesAPIService],
            imports: [
                LoggerModule.forRoot(),
                HttpModule.register({
                    baseURL: "https://eapi.rs.ge",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }),
            ],
        }).compile();

        eapiService = moduleRef.get<EServicesAPIService>(EServicesAPIService);
    });

    it("should be defined", () => {
        expect(eapiService).toBeDefined();
    });

    describe("Testing E-Services API Service Methods", () => {
        describe("Testing authentication with two-step verification", () => {
            it("should authenticate successfully", async () => {
                const request: EServicesAPI.Users.Authenticate.RequestBody = {
                    USERNAME: "tbilisi",
                    PASSWORD: "123456",
                    DEVICE_CODE: null,
                };

                const response = (await eapiService.usersAuthenticate(
                    request,
                )) as EServicesAPI.Users.Authenticate.ResponseOneStep;

                expect(response).toBeDefined();

                expect(response).toHaveProperty("DATA");
                expect(response.DATA).toHaveProperty("ACCESS_TOKEN");
                expect(response.DATA).toHaveProperty("EXPIRES_IN");
                expect(response.DATA).toHaveProperty("MASKED_MOBILE");

                expect(response).toHaveProperty("STATUS");
                expect(response.STATUS).toHaveProperty("ID");
                expect(response.STATUS).toHaveProperty("TEXT");

                expect(response.STATUS.ID).toEqual(0);
                expect(response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );
            });
        });

        describe("Testing authentication with two-step verification", () => {
            it("should authenticate succesfully and enter second step", async () => {
                const request: EServicesAPI.Users.Authenticate.RequestBody = {
                    USERNAME: "satesto2",
                    PASSWORD: "123456",
                    DEVICE_CODE: null,
                };

                const response = (await eapiService.usersAuthenticate(
                    request,
                )) as EServicesAPI.Users.Authenticate.ResponseTwoStep;

                expect(response).toBeDefined();

                expect(response).toHaveProperty("DATA");
                expect(response.DATA).toHaveProperty("PIN_TOKEN");
                expect(response.DATA).toHaveProperty("MASKED_MOBILE");

                expect(response).toHaveProperty("STATUS");
                expect(response.STATUS).toHaveProperty("ID");
                expect(response.STATUS).toHaveProperty("TEXT");

                expect(response.STATUS.ID).toEqual(0);
                expect(response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                it("should pass authentication's second step succesfully", async () => {
                    const request: EServicesAPI.Users.AuthenticatePin.RequestBody =
                        {
                            PIN_TOKEN: response.DATA.PIN_TOKEN,
                            PIN: "7542",
                            DEVICE_CODE: null,
                            ADDRESS: null,
                            BROWSER: null,
                            OPER_SYSTEM: null,
                        };

                    const pinResponse =
                        await eapiService.usersAuthenticatePin(request);

                    expect(pinResponse).toBeDefined();

                    expect(pinResponse).toHaveProperty("DATA");
                    expect(pinResponse.DATA).toHaveProperty("ACCESS_TOKEN");
                    expect(pinResponse.DATA).toHaveProperty("EXPIRES_IN");

                    expect(pinResponse).toHaveProperty("STATUS");
                    expect(pinResponse.STATUS).toHaveProperty("ID");
                    expect(pinResponse.STATUS).toHaveProperty("TEXT");

                    expect(pinResponse.STATUS.ID).toEqual(0);
                    expect(pinResponse.STATUS.TEXT).toEqual(
                        "ოპერაცია წარმატებით დასრულდა",
                    );
                });
            });
        });
    });
});
