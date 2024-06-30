import {Body, Controller, Inject, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {ChangeUserStatusDTO, EditUserDTO, RegisterUserDTO} from "./dtos";

@Controller('user')
export class UserController {
    @Inject(UserService) private readonly userService: UserService;

    @Post("register")
    registerUser(@Body() dto: RegisterUserDTO) {
        return this.userService.registerUser(dto);
    }

    @Patch("status/:id")
    changeUserStatusById(@Param("id", ParseIntPipe) id: number, @Body() dto: ChangeUserStatusDTO) {
        return this.userService.changeUserStatusById(id, dto);
    }

    @Patch(":id")
    updateUserById(@Param("id",ParseIntPipe) id: number, @Body() dto: EditUserDTO) {
        return this.userService.editUser(id, dto);
    }
}
