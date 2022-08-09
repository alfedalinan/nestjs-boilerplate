import { IsNotEmpty } from "class-validator"

class UserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string  
}

export { UserDto }