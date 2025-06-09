import { Transform } from "class-transformer";
import { DateTime } from "luxon";

export const FromEServicesAPIDate = () =>
    Transform(
        ({ value }) => {
            if (value instanceof Date || typeof value === "string") {
                return DateTime.fromFormat(
                    value.toString(),
                    "DD-MM-YYYY HH:mm:ss",
                ).toJSDate();
            }
            return undefined;
        },
        { toClassOnly: true },
    );
