import type { HttpModuleOptions } from "@nestjs/axios";
import { registerAs } from "@nestjs/config";

export default registerAs(
    "eapi",
    (): {
        http: HttpModuleOptions;
    } => ({
        http: {
            baseURL: "https://eapi.rs.ge",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        },
    }),
);
