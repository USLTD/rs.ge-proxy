// noinspection DuplicatedCode

import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { LoggerModule } from "nestjs-pino";
import { EServicesAPIService } from "./eapi.service";
import { EServicesAPIResponse } from "$/dto/eapi/$response";
import {
    UsersAuthenticateRequestDto,
    UsersAuthenticateResponseOneStepDto,
    UsersAuthenticateResponseTwoStepDto,
} from "$/dto/eapi/users/authenticate";
import {
    UsersAuthenticatePinRequestDto,
    UsersAuthenticatePinResponseDto,
} from "$/dto/eapi/users/authenticate-pin";

const requestBodies: {
    not_2fa: UsersAuthenticateRequestDto;
    "2fa": UsersAuthenticateRequestDto;
    "2fa_pin": Omit<UsersAuthenticatePinRequestDto, "PIN_TOKEN">;
} = {
    not_2fa: {
        USERNAME: "tbilisi",
        PASSWORD: "123456",
        DEVICE_CODE: null,
    },
    "2fa": {
        USERNAME: "satesto2",
        PASSWORD: "123456",
        DEVICE_CODE: null,
    },
    "2fa_pin": {
        PIN: "7542",
        DEVICE_CODE: null,
        ADDRESS: null,
        BROWSER: null,
        OPER_SYSTEM: null,
    },
};

describe("E-Services API Service", () => {
    let eapiService: EServicesAPIService;
    let response: EServicesAPIResponse<unknown> | null;

    beforeAll(async () => {
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
        response = null;
    });

    test("should be defined", () => {
        expect(eapiService).toBeDefined();
    });

    describe("Testing E-Services API Service Authentication Methods", () => {
        describe("Testing authentication without two-step verification", () => {
            beforeAll(() => {
                response = null;
            });

            test.failing(
                "should fail authentication with invalid credentials",
                async () => {
                    const _response = await eapiService.usersAuthenticate({
                        ...requestBodies.not_2fa,
                        PASSWORD: "INVALID_PASSWORD",
                    });

                    expect(_response).toBeDefined();

                    expect(_response).toHaveProperty("DATA");
                    expect(_response.DATA).toHaveProperty("ACCESS_TOKEN");
                    expect(_response.DATA).toHaveProperty("EXPIRES_IN");
                    expect(_response.DATA).toHaveProperty("MASKED_MOBILE");

                    expect(_response).toHaveProperty("STATUS");
                    expect(_response.STATUS).toHaveProperty("ID");
                    expect(_response.STATUS).toHaveProperty("TEXT");

                    expect(_response.STATUS.ID).toEqual(0);
                    expect(_response.STATUS.TEXT).toEqual(
                        "ოპერაცია წარმატებით დასრულდა",
                    );

                    response = _response;
                },
            );

            test("should authenticate successfully", async () => {
                const _response = await eapiService.usersAuthenticate(
                    requestBodies.not_2fa,
                );

                expect(_response).toBeDefined();

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toHaveProperty("ACCESS_TOKEN");
                expect(_response.DATA).toHaveProperty("EXPIRES_IN");
                expect(_response.DATA).toHaveProperty("MASKED_MOBILE");

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            test.failing("should fail sign out", async () => {
                const _response =
                    await eapiService.usersSignOut("INVALID_TOKEN");

                expect(_response).toBeDefined();

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toStrictEqual({});

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            test("should sign out succesfully", async () => {
                const ACCESS_TOKEN = (
                    response as EServicesAPIResponse<UsersAuthenticateResponseOneStepDto>
                ).DATA.ACCESS_TOKEN;

                const _response = await eapiService.usersSignOut(ACCESS_TOKEN);

                expect(_response).toBeDefined();

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toStrictEqual({});

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            afterAll(() => {
                response = null;
            });
        });

        // Skipping since the test account does not require 2FA
        describe.skip("Testing authentication with two-step verification", () => {
            beforeAll(() => {
                response = null;
            });

            test.failing(
                "should fail authentication with invalid credentials",
                async () => {
                    const _response = await eapiService.usersAuthenticate({
                        ...requestBodies["2fa"],
                        PASSWORD: "INVALID_PASSWORD",
                    });

                    expect(_response).toBeDefined();

                    expect(_response).toHaveProperty("DATA");
                    expect(_response.DATA).toHaveProperty("ACCESS_TOKEN");
                    expect(_response.DATA).toHaveProperty("EXPIRES_IN");
                    expect(_response.DATA).toHaveProperty("MASKED_MOBILE");

                    expect(_response).toHaveProperty("STATUS");
                    expect(_response.STATUS).toHaveProperty("ID");
                    expect(_response.STATUS).toHaveProperty("TEXT");

                    expect(_response.STATUS.ID).toEqual(0);
                    expect(_response.STATUS.TEXT).toEqual(
                        "ოპერაცია წარმატებით დასრულდა",
                    );

                    response = _response;
                },
            );
            test("should pass authentication's first step succesfully and enter second step", async () => {
                const _response = await eapiService.usersAuthenticate(
                    requestBodies["2fa"],
                );

                expect(_response).toBeDefined();

                // Dirty hack to bypass RS.GE's dynamic 2FA configuration on test account
                if (_response.DATA.ACCESS_TOKEN) {
                    throw new Error(
                        "This test account does not require 2FA, please use another account for testing.",
                    );
                }

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toHaveProperty("PIN_TOKEN");
                expect(_response.DATA).toHaveProperty("MASKED_MOBILE");

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            test("should pass authentication's second step succesfully", async () => {
                const PIN_TOKEN = (
                    response as EServicesAPIResponse<UsersAuthenticateResponseTwoStepDto>
                ).DATA.PIN_TOKEN;

                const _response = await eapiService.usersAuthenticatePin({
                    PIN_TOKEN: PIN_TOKEN,
                    ...requestBodies["2fa_pin"],
                });

                expect(_response).toBeDefined();

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toHaveProperty("ACCESS_TOKEN");
                expect(_response.DATA).toHaveProperty("EXPIRES_IN");

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            test("should sign out succesfully", async () => {
                const ACCESS_TOKEN = (
                    response as EServicesAPIResponse<UsersAuthenticatePinResponseDto>
                ).DATA.ACCESS_TOKEN;

                const _response = await eapiService.usersSignOut(ACCESS_TOKEN);

                expect(_response).toBeDefined();

                expect(_response).toHaveProperty("DATA");
                expect(_response.DATA).toStrictEqual({});

                expect(_response).toHaveProperty("STATUS");
                expect(_response.STATUS).toHaveProperty("ID");
                expect(_response.STATUS).toHaveProperty("TEXT");

                expect(_response.STATUS.ID).toEqual(0);
                expect(_response.STATUS.TEXT).toEqual(
                    "ოპერაცია წარმატებით დასრულდა",
                );

                response = _response;
            });

            afterAll(() => {
                response = null;
            });
        });
    });
});
