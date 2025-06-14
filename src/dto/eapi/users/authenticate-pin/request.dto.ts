import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication using a PIN.
 */
export class UsersAuthenticatePinRequestDto {
    /**
     * Temporary PIN token used for authentication.
     */
    @ApiProperty({
        type: "string",
        description: "Temporary PIN token",
        required: true,
    })
    @IsString({ message: "PIN_TOKEN must be a string" })
    @IsNotEmpty({ message: "PIN_TOKEN must not be empty" })
    PIN_TOKEN: string;

    /**
     * Four-digit PIN code used for authentication.
     */
    @ApiProperty({
        type: "string",
        description: "Four-digit PIN code",
        required: true,
    })
    @IsString({ message: "PIN must be a string" })
    PIN: string;

    /**
     * Device code for two-step authentication.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Device code for two-step authentication",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "DEVICE_CODE must be a string" })
    DEVICE_CODE?: string | undefined;

    /**
     * Address from which the user is logging in, such as an IP address.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Login address",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "ADDRESS must be a string" })
    ADDRESS?: string | undefined;

    /**
     * Browser used for login, such as Chrome, Firefox, etc.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Browser used for login",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "BROWSER must be a string" })
    BROWSER?: string | undefined;

    /**
     * Operating system used for login, such as Windows, macOS, Linux, etc.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Operating system used for login",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "OPER_SYSTEM must be a string" })
    OPER_SYSTEM?: string | undefined;
}
