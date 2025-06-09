import { ApiProperty } from "@nestjs/swagger";

export class InvoiceGetActionsResponseDto {
    /**
     * Status ID
     */
    @ApiProperty({
        type: "number",
        description: "Status ID",
    })
    ID: number;
    /**
     * Status name
     */
    @ApiProperty({
        type: "string",
        description: "Status name",
    })
    NAME: string;
    /**
     * Action by seller
     */
    @ApiProperty({
        type: "number",
        description: "Action by seller",
    })
    SELLER_ACTION: number;
    /**
     * Action by buyer
     */
    @ApiProperty({
        type: "number",
        description: "Action by buyer",
    })
    BUYER_ACTION: number;
}
