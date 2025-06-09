import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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