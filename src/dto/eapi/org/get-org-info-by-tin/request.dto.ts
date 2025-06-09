import { ApiProperty } from "@nestjs/swagger";
import { IsTin } from "$/is-tin/is-tin.decorator";

/**
 * Data Transfer Object (DTO) for requesting organization information by TIN
 */
export class OrgGetOrgInfoByTinRequestDto {
    /**
     * The TIN (Tax Identification Number) of the organization
     */
    @ApiProperty({
        description: "The TIN (Tax Identification Number) of the organization",
    })
    @IsTin({
        message:
            "Tin must be a valid Taxpayer Identification Number - a numeric string consisting of 9 or 11 digits",
    })
    Tin: string;
}
