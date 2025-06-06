import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication request body
 */
export class UsersAuthenticateRequestDto {
    /**
     * Username or personal ID of the user.
     */
    @ApiProperty({ type: "string", description: "Username or personal ID" })
    @IsString({ message: "USERNAME must be a string" })
    @IsNotEmpty({ message: "USERNAME must be a non-empty string" })
    USERNAME: string;

    /**
     * Password of the user.
     */
    @ApiProperty({ type: "string", description: "Password" })
    @IsString({ message: "PASSWORD must be a string" })
    @IsNotEmpty({ message: "PASSWORD must be a non-empty string" })
    PASSWORD: string;

    /**
     * Device code for two-step authentication, if applicable.
     */
    @ApiProperty({
        type: "string",
        description: "Device code for two-step authentication",
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: "DEVICE_CODE must be a string or null" })
    @IsNotEmpty({ message: "DEVICE_CODE must be a non-empty string or null" })
    DEVICE_CODE: string | null;
}