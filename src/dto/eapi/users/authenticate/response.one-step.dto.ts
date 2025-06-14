import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication response for one-step authentication
 */
export class UsersAuthenticateResponseOneStepDto {
    /**
     * Key
     */
    @ApiProperty({ type: "string", description: "Key" })
    @IsString({
        message: "ACCESS_TOKEN must be a string",
    })
    ACCESS_TOKEN: string;

    /**
     * Expiration time (in seconds)
     */
    @ApiProperty({
        type: "number",
        description: "Expiration time (in seconds)",
    })
    @IsNumber({}, { message: "EXPIRES_IN must be a number" })
    EXPIRES_IN: number;

    /**
     * Masked mobile number (last two digits are visible),
     * used for displaying code receiver phone in case two-step authentication
     */
    @ApiProperty({
        type: "string",
        description:
            "Masked mobile number (last two digits are visible), used for displaying code receiver phone in case two-step authentication",
    })
    @IsString({ message: "MASKED_MOBILE must be a string" })
    MASKED_MOBILE: string;
}
