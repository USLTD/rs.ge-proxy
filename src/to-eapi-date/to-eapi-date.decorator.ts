import { Transform } from "class-transformer";
import { DateTime } from "luxon";

export const ToEServicesAPIDate = () =>
    Transform(
        ({ value }) => {
            return (
                ((value) => {
                    if (value instanceof Date) {
                        return DateTime.fromJSDate(value);
                    } else if (typeof value === "string") {
                        return DateTime.fromISO(value);
                    } else if (typeof value === "number") {
                        return DateTime.fromMillis(value);
                    }
                })(value)?.toFormat("DD-MM-YYYY HH:mm:ss") ?? undefined
            );
        },
        { toPlainOnly: true },
    );
