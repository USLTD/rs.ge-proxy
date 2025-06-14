import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { FromEServicesAPIDate } from "$/from-eapi-date/from-eapi-date.decorator";

export class InvoiceReturnDto {
    /**
     * ID of return payment document
     */
    @ApiProperty({
        type: "number",
        description: "ID of return payment document",
        required: true,
    })
    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
        },
        { message: "RETURN_INVOICE_ID must be a number" },
    )
    RETURN_INVOICE_ID: number;

    /**
     * ID of the corrected payment document
     */
    @ApiProperty({
        type: "number",
        description: "ID of the corrected payment document",
    })
    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
        },
        { message: "CORRECTED_INVOICE_ID must be a number" },
    )
    CORRECTED_INVOICE_ID: number;

    /**
     * Number
     */
    @ApiProperty({
        type: "string",
        description: "Number",
    })
    @IsString({ message: "INV_NUMBER must be a string" })
    INV_NUMBER: string;

    /**
     * Series
     */
    @ApiProperty({
        type: "string",
        description: "Serie",
    })
    @IsString({ message: "INV_SERIE must be a string" })
    INV_SERIE: string;

    /**
     * Buyer
     */
    @ApiProperty({
        type: "string",
        description: "Buyer",
    })
    @IsString({ message: "BUYER must be a string" })
    BUYER: string;

    @ApiProperty({
        type: Date,
        description: "Date of operation",
    })
    @IsDate({ message: "OPERATION_DATE must be a date" })
    @FromEServicesAPIDate()
    OPERATION_DATE: Date;
}

export class CreateInvoiceReturnDto extends OmitType(InvoiceReturnDto, [
    "CORRECTED_INVOICE_ID",
    "INV_NUMBER",
    "INV_SERIE",
    "BUYER",
    "OPERATION_DATE",
] as const) {}
