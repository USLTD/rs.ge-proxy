import { Exclude, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { EServicesAPIResponseStatus } from "./EServicesAPIResponseStatus";

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