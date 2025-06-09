import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

/**
 * Data Transfer Object (DTO) for Invoice Get Invoice Request
 */
export class InvoiceGetInvoiceRequestDto {
    /**
     * Document Identifier
     */
    @ApiProperty({
        type: "number",
        description: "Document Identifier",
    })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        {
            message: "InvoiceID must be a valid number.",
        },
    )
    InvoiceID: number;
    /**
     * Document Number
     */
    @ApiProperty({
        type: "number",
        description: "Document Number",
    })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        {
            message: "InvoiceNumber must be a valid number.",
        },
    )
    InvoiceNumber: number;
    /**
     * The parent document identification number -
     * Distribution. Used only if you create a new sub-document of the distribution
     * (i.e. `InvoiceId = 0`) and returns INVOICE_PARENT_GOODS parent distribution
     * goods from which the product should be
     * distributed. In other cases, you should pass
     * 0.
     */
    @ApiProperty({
        type: "number",
        description:
            "The parent document identification number - Distribution. Used only if you create a new sub-document of the distribution (i.e. `InvoiceId = 0`) and returns INVOICE_PARENT_GOODS parent distribution goods from which the product should be distributed. In other cases, you should pass 0.",
    })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        {
            message: "parentInvoiceID must be a valid number.",
        },
    )
    parentInvoiceID: number;
}
