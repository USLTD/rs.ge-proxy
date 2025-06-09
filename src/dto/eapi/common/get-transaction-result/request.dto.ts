import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CommonGetTransactionResultRequestDto {
    /**
     * Transaction ID
     */
    @ApiProperty({
        type: "string",
        description: "Transaction ID",
    })
    @IsString({ message: "TransactionId must be a string" })
    @IsNotEmpty({ message: "TransactionId must not be an empty string" })
    TransactionId: string;
}
