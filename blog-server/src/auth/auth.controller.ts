import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    @Post('login')
    login(@Body() body:LoginDto){
        
    }
}
