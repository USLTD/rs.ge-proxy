import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { ToEServicesAPIDate } from "$/to-eapi-date/to-eapi-date.decorator";
import { IsTin } from "$/is-tin/is-tin.decorator";

/**
 * Data Transfer Object (DTO) for requesting VAT payer status of an organization.
 */
export class OrgGetVatPayerStatusRequestDto {
    /**
     * Tax Identification Number (TIN)
     */
    @ApiProperty({
        type: "string",
        description: "Tax Identification Number (TIN)",
        required: true,
    })
    @IsTin({
        message:
            "Tin must be a valid Taxpayer Identification Number - a numeric string consisting of 9 or 11 digits",
    })
    Tin: string;

    /**
     * VAT date
     */
    @ApiProperty({ type: Date, description: "VAT date", required: true })
    @IsDate({ message: "VatDate must be a valid date" })
    @ToEServicesAPIDate()
    VatDate: Date;
}
