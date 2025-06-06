import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, type ConfigType } from "@nestjs/config";
import { EServicesAPIController } from "./eapi.controller";
import { EServicesAPIService } from "./eapi.service";
import eapiConfiguration from "../config/eapi.configuration";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule.forFeature(eapiConfiguration)],
            useFactory: ({ http }: ConfigType<typeof eapiConfiguration>) => ({
                ...http,
            }),
            inject: [eapiConfiguration.KEY],
        }),
    ],
    controllers: [EServicesAPIController],
    providers: [EServicesAPIService],
})
export class EServicesAPIModule {}
