import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication response for one-step authentication
 */
export class UsersAuthenticateResponseOneStepDto {
    /**
     * Access token for the authenticated user.
     */
    @ApiProperty({ type: "string", description: "Access token" })
    @IsString({
        message: "ACCESS_TOKEN must be a string",
    })
    @IsNotEmpty({ message: "ACCESS_TOKEN must be a non-empty string" })
    ACCESS_TOKEN: string;

    /**
     * Expiration time for access token in seconds.
     */
    @ApiProperty({ type: "number", description: "Expiration time in seconds" })
    @IsNumber({}, { message: "EXPIRES_IN must be a number" })
    @Min(1, { message: "EXPIRES_IN must be at least 1 second" })
    EXPIRES_IN: number;

    /**
     * Masked mobile number of the user.
     */
    @ApiProperty({ type: "string", description: "Masked mobile number" })
    @IsString({ message: "MASKED_MOBILE must be a string" })
    @IsNotEmpty({ message: "MASKED_MOBILE must be a non-empty string" })
    MASKED_MOBILE: string;
}