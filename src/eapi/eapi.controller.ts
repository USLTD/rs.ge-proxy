import { Controller, Post, Body, Headers } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { EServicesAPIService } from "./eapi.service";
import { EServicesAPIResponse } from "$/dto/eapi/$response";
import {
    UsersAuthenticateRequestDto,
    UsersAuthenticateResponseDto,
} from "$/dto/eapi/users/authenticate";
import {
    UsersAuthenticatePinRequestDto,
    UsersAuthenticatePinResponseDto,
} from "$/dto/eapi/users/authenticate-pin";
import { UsersSignOutResponseDto } from "$/dto/eapi/users/sign-out";

// TODO
@Controller("eapi")
export class EServicesAPIController {
    constructor(
        @InjectPinoLogger(EServicesAPIController.name)
        private readonly logger: PinoLogger,
        private eServicesAPIService: EServicesAPIService,
    ) {}

    @Post("Users/Authenticate")
    public async usersAuthenticate(
        @Body()
        body: UsersAuthenticateRequestDto,
    ) {
        const response: EServicesAPIResponse<UsersAuthenticateResponseDto> =
            await this.eServicesAPIService.usersAuthenticate(body);

        if ("PIN_TOKEN" in response.DATA) {
            this.logger.debug(response, "Detected Two-Factor Authentication");
        } else {
            this.logger.debug(response, "User authenticated successfully");
        }

        return response;
    }

    @Post("Users/AuthenticatePin")
    public async usersAuthenticatePin(
        @Body()
        body: UsersAuthenticatePinRequestDto,
    ) {
        const response: EServicesAPIResponse<UsersAuthenticatePinResponseDto> =
            await this.eServicesAPIService.usersAuthenticatePin(body);
        this.logger.debug(response, "User authenticated with PIN successfully");
        return response;
    }

    @Post("Users/SignOut")
    public async usersSignOut(
        @Headers() headers: { Authorization: `Bearer ${string}` },
    ) {
        const response: EServicesAPIResponse<UsersSignOutResponseDto> =
            await this.eServicesAPIService.usersSignOut(
                headers.Authorization.substring(7),
            );
        this.logger.debug(response, "User signed out successfully");
        return response;
    }
}
