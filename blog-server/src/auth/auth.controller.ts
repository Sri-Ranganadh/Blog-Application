import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerice: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    console.log('body', body);
    return this.authSerice.login(body);
  }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    console.log(body);
    return this.authSerice.signup(body);
  }
}
