import { ApiProperty, PickType } from "@nestjs/swagger";
import { UsersAuthenticateResponseOneStepDto } from "./response-one-step.dto";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication response for two-step authentication
 */
export class UsersAuthenticateResponseTwoStepDto extends PickType(
    UsersAuthenticateResponseOneStepDto,
    ["MASKED_MOBILE"] as const,
) {
    /**
     * PIN token for two-step authentication.
     */
    @ApiProperty({ type: "string", description: "Temporary PIN token" })
    @IsString({ message: "PIN_TOKEN must be a string" })
    @IsNotEmpty({ message: "PIN_TOKEN must be a non-empty string" })
    PIN_TOKEN: string;
}