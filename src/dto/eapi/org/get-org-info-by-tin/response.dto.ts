import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";
import { IsTin } from "$/is-tin/is-tin.decorator";

/**
 * Data Transfer Object (DTO) for the response of GetOrgInfoByTin API.
 */
export class OrgGetOrgInfoByTinResponseDto {
    /**
     * Tax Identification Number (TIN)
     */
    @ApiProperty({
        type: "string",
        description: "Tax Identification Number (TIN)",
    })
    @IsTin({
        message:
            "Tin must be a valid Taxpayer Identification Number - a numeric string consisting of 9 or 11 digits",
    })
    Tin: string;

    /**
     * Address of the organization or individual entrepreneur.
     */
    @ApiProperty({
        type: "string",
        description: "Address",
    })
    @IsString({
        message: "Address must be a string",
    })
    @IsNotEmpty({
        message: "Address must not be empty",
    })
    Address: string;

    /**
     * If the organization or individual entrepreneur is VAT payer
     */
    @ApiProperty({
        type: "boolean",
        description: "Is VAT Payer",
    })
    @IsBoolean({
        message: "IsVatPayer must be a boolean value",
    })
    IsVatPayer: boolean;

    /**
     * If the organization or individual entrepreneur is a diplomat
     */
    @ApiProperty({
        type: "boolean",
        description: "Is Diplomat",
    })
    @IsBoolean({
        message: "IsDiplomat must be a boolean value",
    })
    IsDiplomat: boolean;

    /**
     * Name or in the case of individual entrepreneur, initials.
     */
    @ApiProperty({
        type: "string",
        description: "Name or initials",
    })
    @IsString({
        message: "Name must be a string",
    })
    @IsNotEmpty({
        message: "Name must not be empty",
    })
    Name: string;
}
