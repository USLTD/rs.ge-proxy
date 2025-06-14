import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CommonGetTransactionResultRequestDto {
    /**
     * Transaction ID
     */
    @ApiProperty({
        type: "string",
        description: "Transaction ID",
        required: true,
    })
    @IsString({ message: "TransactionId must be a string" })
    TransactionId: string;
}
