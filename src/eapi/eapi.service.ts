import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { catchError, firstValueFrom } from "rxjs";
import type { AxiosError } from "axios";
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
@Injectable()
export class EServicesAPIService {
    constructor(
        @InjectPinoLogger(EServicesAPIService.name)
        private readonly logger: PinoLogger,
        private readonly httpService: HttpService,
    ) {}

    public async usersAuthenticate(body: UsersAuthenticateRequestDto) {
        const payload = instanceToPlain(body);

        const { data } = await firstValueFrom(
            this.httpService
                .post<
                    EServicesAPIResponse<UsersAuthenticateResponseDto>
                >("/Users/Authenticate", payload)
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response?.data);
                        throw err;
                    }),
                ),
        );

        return plainToInstance(
            EServicesAPIResponse<UsersAuthenticateResponseDto>,
            data,
        );
    }

    public async usersAuthenticatePin(body: UsersAuthenticatePinRequestDto) {
        const payload = instanceToPlain(body);

        const { data } = await firstValueFrom(
            this.httpService
                .post<
                    EServicesAPIResponse<UsersAuthenticatePinResponseDto>
                >("/Users/AuthenticatePin", payload)
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response?.data);
                        throw err;
                    }),
                ),
        );

        return plainToInstance(
            EServicesAPIResponse<UsersAuthenticatePinResponseDto>,
            data,
        );
    }

    public async usersSignOut(token: string) {
        const { data } = await firstValueFrom(
            this.httpService
                .post<EServicesAPIResponse<UsersSignOutResponseDto>>(
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

        return plainToInstance(
            EServicesAPIResponse<UsersSignOutResponseDto>,
            data,
        );
    }

    // TODO
    public async orgGetVatPayerStatus(token: string) {
        return;
    }
}
