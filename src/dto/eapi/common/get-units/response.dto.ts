import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object (DTO) for the response of the Get Units API.
 */
export class CommonGetUnitsResponseDto {
    /**
     * Unit ID
     */
    @ApiProperty({
        type: "string",
        description: "Unit of Measurement ID",
    })
    @IsString({ message: "value must be a string" })
    @IsNotEmpty({ message: "value must not be a empty string" })
    value: string;

    /**
     * Unit Text
     */
    @ApiProperty({
        type: "string",
        description: "Unit of Measurement Text",
    })
    @IsString({ message: "label must be a string" })
    @IsNotEmpty({ message: "label must not be a empty string" })
    label: string;
}
