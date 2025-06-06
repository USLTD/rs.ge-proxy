import { Controller, Post } from "@nestjs/common";
import { TypedBody, TypedHeaders } from "@nestia/core";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { EServicesAPIService } from "./eapi.service";
import type { EServicesAPI } from "./types";

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
        @TypedBody()
        body: EServicesAPI.Users.Authenticate.RequestBody,
    ) {
        const response = await this.eServicesAPIService.usersAuthenticate(body);

        if ("PIN_TOKEN" in response.DATA) {
            this.logger.info(response, "Detected Two-Factor Authentication");
        } else {
            this.logger.info(response, "User authenticated successfully");
        }

        return response;
    }

    @Post("Users/AuthenticatePin")
    public async usersAuthenticatePin(
        @TypedBody()
        body: EServicesAPI.Users.AuthenticatePin.RequestBody,
    ) {
        const response = await this.eServicesAPIService.usersAuthenticatePin(body);
        this.logger.info(response, "User authenticated with PIN successfully");
        return response;
    }

    @Post("Users/SignOut")
    public async usersSignOut(
        @TypedHeaders() headers: { Authorization: `Bearer ${string}` },
    ) {
        await this.eServicesAPIService.usersSignOut(headers.Authorization.substring(7));
        this.logger.info({}, "User signed out successfully");
    }
}
