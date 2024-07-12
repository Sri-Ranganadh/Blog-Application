import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {

    async login(body: LoginDto){
        try{
            const {email,password} = body
            

        }catch(error){
            console.log( error)
            throw new HttpException(error.message, error.status)
        }
    }

}
