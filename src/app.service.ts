import { Injectable } from "@nestjs/common";

// TODO
@Injectable()
export class AppService {
    public getHello(): string {
        return "Hello World!";
    }
}
