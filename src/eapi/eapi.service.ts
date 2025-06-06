import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { catchError, firstValueFrom } from "rxjs";
import type { AxiosError } from "axios";
import type { EmptyObject } from "type-fest";
import type { EServicesAPI } from "./types";

// TODO
@Injectable()
export class EServicesAPIService {
    constructor(
        @InjectPinoLogger(EServicesAPIService.name)
        private readonly logger: PinoLogger,
        private readonly httpService: HttpService,
    ) {}

    public async usersAuthenticate(body: EServicesAPI.Users.Authenticate.RequestBody) {
        const { data } = await firstValueFrom(
            this.httpService
                .post<EServicesAPI.Users.Authenticate.Response>(
                    "/Users/Authenticate",
                    body,
                )
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response?.data);
                        throw err;
                    }),
                ),
        );

        return data;
    }

    public async usersAuthenticatePin(
        body: EServicesAPI.Users.AuthenticatePin.RequestBody,
    ) {
        const { data } = await firstValueFrom(
            this.httpService
                .post<EServicesAPI.Users.AuthenticatePin.Response>(
                    "/Users/AuthenticatePin",
                    body,
                )
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response?.data);
                        throw err;
                    }),
                ),
        );

        return data;
    }

    public async usersSignOut(token: string) {
        await firstValueFrom(
            this.httpService
                .post<EServicesAPI.Response<EmptyObject>>(
                    "/Users/SignOut",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response?.data);
                        throw err;
                    }),
                ),
        );
    }
}
