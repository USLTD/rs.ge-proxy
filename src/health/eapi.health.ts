import { Inject, Injectable } from "@nestjs/common";
import { HealthIndicatorService } from "@nestjs/terminus";
import { HttpService } from "@nestjs/axios";
import type { ConfigType } from "@nestjs/config";
import eapiConfiguration from "../config/eapi.configuration";
import { firstValueFrom } from "rxjs";

@Injectable()
export class EServicesAPIHealthIndicator {
    constructor(
        @Inject(eapiConfiguration.KEY)
        private config: ConfigType<typeof eapiConfiguration>,
        private health: HealthIndicatorService,
        private http: HttpService,
    ) {}

    public async isHealthy(key?: string) {
        const indicator = this.health.check(key || "eapi");

        if (!this.config.http.baseURL) {
            throw new Error("Base URL is not configured for E-Services API");
        }

        const response = await firstValueFrom(
            this.http.head(this.config.http.baseURL),
        );

        if (
            response.status === 200 ||
            response.status === 204 ||
            response.status === 403 // Assuming 403 is a valid status for health check
        ) {
            return indicator.up({ status: response.status });
        }

        return indicator.down({ status: response.status });
    }
}
