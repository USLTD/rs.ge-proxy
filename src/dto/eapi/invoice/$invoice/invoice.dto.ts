import { ApiProperty, PickType, OmitType } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsEnum } from "class-validator";
import { INV_CATEGORY } from "$/dto/eapi/invoice/inv-category.enum";
import { INV_TYPE } from "$/dto/eapi/invoice/inv-type.enum";
import { SELLER_ACTION } from "$/dto/eapi/invoice/seller-action.enum";
import { BUYER_ACTION } from "$/dto/eapi/invoice/buyer-action.enum";

export class InvoiceDto {
    @ApiProperty({
        type: "number",
        description: "Document identifier. When saving, set to 0",
        required: true,
    })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: "ID must be a number" },
    )
    ID: number;

    @ApiProperty({
        type: "string",
        description: "Serie",
        required: false,
    })
    @IsString({ message: "INV_SERIE must be a string" })
    INV_SERIE: string;

    @ApiProperty({
        type: "number",
        description: "Invoice number. Automatically assigned when activated",
    })
    @IsNumber({}, { message: "INV_NUMBER must be a number" })
    INV_NUMBER: number;

    @ApiProperty({
        type: () => INV_CATEGORY,
        enum: INV_CATEGORY,
        enumName: "INV_CATEGORY",
        description: "Invoice date in Unix timestamp format",
    })
    @IsEnum(INV_CATEGORY, {
        message: "INV_CATEGORY must be a valid enum value",
    })
    INV_CATEGORY: INV_CATEGORY;

    @ApiProperty({
        type: () => INV_TYPE,
        enum: INV_TYPE,
        enumName: "INV_TYPE",
        description: "Invoice type",
    })
    INV_TYPE: INV_TYPE;
    SELLER_ACTION: SELLER_ACTION;
    BUYER_ACTION: BUYER_ACTION;
    OPERATION_DATE: Date;
    ACTIVATE_DATE: Date;
    CREATE_DATE: Date;
    CONFIRM_DATE: Date;
    REFUSE_DATE: Date;
    REQUEST_CANCEL_DATE: Date;
    DELIVERY_DATE: Date;
    AGREE_CANCEL_DATE: Date;
    CORRECT_DATE: Date;
    TRANS_START_DATE: Date;
    CORRECT_REASON_ID: number;
    TIN_SELLER: string;
    TIN_BUYER?: string | undefined;
    FOREIGN_BUYER?: boolean | undefined;
    NAME_SELLER: string;
    NAME_BUYER: string;
    SEQNUM_SELLER: string;
    SEQNUM_BUYER: string;
}

export class CreateInvoiceDto extends OmitType(InvoiceDto, [
    "INV_NUMBER",
    "SELLER_ACTION",
    "BUYER_ACTION",
    "ACTIVATE_DATE",
    "CREATE_DATE",
    "CONFIRM_DATE",
    "REFUSE_DATE",
    "REQUEST_CANCEL_DATE",
    "DELIVERY_DATE",
    "AGREE_CANCEL_DATE",
    "CORRECT_DATE",
    "NAME_SELLER",
    "NAME_BUYER",
    "SEQNUM_SELLER",
    "SEQNUM_BUYER",
] as const) {}
export class UpdateInvoiceDto extends OmitType(InvoiceDto, [
    "INV_CATEGORY",
] as const) {}
