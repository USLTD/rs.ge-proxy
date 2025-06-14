import { ApiProperty, PickType } from "@nestjs/swagger";
import { UsersAuthenticateResponseOneStepDto } from "./response.one-step.dto";
import { IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) for user authentication response for two-step authentication
 *
 * @extends UsersAuthenticateResponseOneStepDto
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
    PIN_TOKEN: string;
}
