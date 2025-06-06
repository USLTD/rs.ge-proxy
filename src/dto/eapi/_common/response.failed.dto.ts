import { ApiProperty, PickType } from "@nestjs/swagger";
import { EServicesAPIResponse } from "./EServicesAPIResponse";
import { IsEmpty } from "class-validator";

/**
 * Data Transfer Object (DTO) representing a failed response from the E-Services API.
 */
export class EServicesAPIFailedResponse extends PickType(EServicesAPIResponse, [
    "STATUS",
] as const) {
    /**
     * Empty response data, as failed responses do not contain any data.
     */
    @ApiProperty({ type: () => ({}), description: "Empty Response Data" })
    @IsEmpty({ message: "Response data must be empty" })
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    DATA: {};
}