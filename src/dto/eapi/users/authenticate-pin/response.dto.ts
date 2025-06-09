import { PickType } from "@nestjs/swagger";
import { UsersAuthenticateResponseOneStepDto } from "../authenticate";

/**
 * Data Transfer Object (DTO) for the response of user authentication using a PIN.
 */
export class UsersAuthenticatePinResponseDto extends PickType(
    UsersAuthenticateResponseOneStepDto,
    ["ACCESS_TOKEN", "EXPIRES_IN"] as const,
) {}
