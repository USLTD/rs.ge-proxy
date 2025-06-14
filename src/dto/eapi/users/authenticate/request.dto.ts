import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication request body
 */
export class UsersAuthenticateRequestDto {
    /**
     * Name or personal ID of the user
     */
    @ApiProperty({
        type: "string",
        description: "Name or personal ID of the user",
        required: true,
    })
    @IsString({ message: "USERNAME must be a string" })
    @IsNotEmpty({ message: "USERNAME must not be empty" })
    USERNAME: string;

    /**
     * Password of the user
     */
    @ApiProperty({ type: "string", description: "Password", required: true })
    @IsString({ message: "PASSWORD must be a string" })
    @IsNotEmpty({ message: "PASSWORD must not be empty" })
    PASSWORD: string;

    /**
     * In the case of two-step authentication, saved device code GUID
     */
    @ApiProperty({
        type: "string",
        description:
            "In the case of two-step authentication, saved device code GUID.",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "DEVICE_CODE must be a string" })
    @IsNotEmpty({ message: "DEVICE_CODE must not be empty" })
    DEVICE_CODE?: string | undefined;
}
