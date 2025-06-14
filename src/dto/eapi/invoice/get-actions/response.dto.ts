import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEnum } from "class-validator";
import { SELLER_ACTION } from "$/dto/eapi/invoice/seller-action.enum";
import { BUYER_ACTION } from "$/dto/eapi/invoice/buyer-action.enum";

export class InvoiceGetActionsResponseDto {
    /**
     * Status ID
     */
    @ApiProperty({
        type: "number",
        description: "Status ID",
    })
    @IsNumber({}, { message: "ID must be a number" })
    ID: number;
    /**
     * Status name
     */
    @ApiProperty({
        type: "string",
        description: "Status name",
    })
    @IsString({ message: "NAME must be a string" })
    NAME: string;
    /**
     * Action by seller
     */
    @ApiProperty({
        type: () => SELLER_ACTION,
        enum: SELLER_ACTION,
        enumName: "SELLER_ACTION",
        description: "Action by seller",
    })
    @IsEnum(SELLER_ACTION, {
        message: "SELLER_ACTION must be a valid enum value",
    })
    SELLER_ACTION: SELLER_ACTION;
    /**
     * Action by buyer
     */
    @ApiProperty({
        type: () => BUYER_ACTION,
        enum: BUYER_ACTION,
        enumName: "BUYER_ACTION",
        description: "Action by buyer",
    })
    @IsEnum(BUYER_ACTION, {
        message: "BUYER_ACTION must be a valid enum value",
    })
    BUYER_ACTION: BUYER_ACTION;
}
