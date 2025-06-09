import { IntersectionType } from "@nestjs/swagger";
import { UsersAuthenticateResponseOneStepDto } from "./response.one-step.dto";
import { UsersAuthenticateResponseTwoStepDto } from "./response.two-step.dto";

/**
 * Combined Data Transfer Object (DTO) for user authentication response
 * that includes both one-step and two-step authentication responses.
 */
export class UsersAuthenticateResponseDto extends IntersectionType(
    UsersAuthenticateResponseOneStepDto,
    UsersAuthenticateResponseTwoStepDto,
) {}
