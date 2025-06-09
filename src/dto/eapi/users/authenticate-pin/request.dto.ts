import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication using a PIN.
 */
export class UsersAuthenticatePinRequestDto {
    /**
     * Temporary PIN token used for authentication.
     */
    @ApiProperty({ type: "string", description: "Temporary PIN token" })
    @IsString({ message: "PIN_TOKEN must be a string" })
    @IsNotEmpty({ message: "PIN_TOKEN must be a non-empty string" })
    PIN_TOKEN: string;

    /**
     * Four-digit PIN code used for authentication.
     */
    @ApiProperty({ type: "string", description: "Four-digit PIN code" })
    @IsString({ message: "PIN must be a string" })
    @IsNotEmpty({ message: "PIN must be a non-empty string" })
    PIN: string;

    /**
     * Device code for two-step authentication.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Device code for two-step authentication",
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: "DEVICE_CODE must be a string" })
    @IsNotEmpty({ message: "DEVICE_CODE must be a non-empty string" })
    DEVICE_CODE: string | null;

    /**
     * Address from which the user is logging in, such as an IP address.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Login address",
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: "ADDRESS must be a string" })
    @IsNotEmpty({ message: "ADDRESS must be a non-empty string" })
    ADDRESS: string | null;

    /**
     * Browser used for login, such as Chrome, Firefox, etc.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Browser used for login",
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: "BROWSER must be a string" })
    @IsNotEmpty({ message: "BROWSER must be a non-empty string" })
    BROWSER: string | null;

    /**
     * Operating system used for login, such as Windows, macOS, Linux, etc.
     * Used for remembering the device.
     */
    @ApiProperty({
        type: "string",
        description: "Operating system used for login",
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: "OPER_SYSTEM must be a string" })
    @IsNotEmpty({ message: "OPER_SYSTEM must be a non-empty string" })
    OPER_SYSTEM: string | null;
}
