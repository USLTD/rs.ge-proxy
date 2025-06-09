import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

/**
 * Data Transfer Object (DTO) for the response of the organization's VAT payer status check.
 */
export class OrgGetVatPayerStatusResponseDto {
    /**
     * Indicates if the entity is a VAT payer.
     */
    @ApiProperty({ description: "Indicates if the entity is a VAT payer" })
    @IsBoolean({ message: "IsVatPayer must be a boolean value" })
    IsVatPayer: boolean;
}
