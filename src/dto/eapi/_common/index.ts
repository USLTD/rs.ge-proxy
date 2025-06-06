/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type, Exclude } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsEmpty } from "class-validator";

/**
 * Data Transfer Object (DTO) representing the status of a response from the E-Services API.
 */
export class EServicesAPIResponseStatus {
    /**
     * Response status ID
     */
    @ApiProperty({ type: "number", description: "Response status ID" })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: "Response status ID required" },
    )
    ID: number;

    /**
     * Response status text
     */
    @ApiProperty({ type: "string", description: "Response status text" })
    @IsString({ message: "Response status text must be a string" })
    @IsNotEmpty({ message: "Response status text must not be empty" })
    TEXT: string;
}

/**
 * Data Transfer Object (DTO) representing a generic response from the E-Services API.
 */
export class EServicesAPIResponse<T> {
    /**
     * Type of the response data
     * Used for class-transformer to correctly transform the DATA property
     *
     * @private
     */
    @Exclude()
    private type: Function;

    /**
     * Response data
     * The type of this property is determined by the type parameter T
     */
    @ApiProperty({ description: "Response data" })
    @Type((options) => {
        return (options?.newObject as EServicesAPIResponse<T>).type;
    })
    DATA: T;

    /**
     * Response status
     * Contains information about the status of the response
     */
    @ApiProperty({
        type: () => EServicesAPIResponseStatus,
        description: "Response status",
    })
    @Type(() => EServicesAPIResponseStatus)
    STATUS: EServicesAPIResponseStatus;

    /**
     * Constructor for EServicesAPIResponse
     * @param type - The type of the response data
     */
    constructor(type: Function) {
        this.type = type;
    }
}

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
