import { HttpException, HttpStatus } from "@nestjs/common";

export const CheckAvailibility = (check: any, msg: string) => {
    if (!check) { throw new HttpException(msg, HttpStatus.NOT_FOUND); }
}