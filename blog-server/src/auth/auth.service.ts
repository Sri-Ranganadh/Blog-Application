import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domain/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(body: LoginDto) {
    try {
      {
      }
      const user = await this.userModel.findOne({
        $or: [{ email: body.email }, { username: body.email }],
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const verify = bcrypt.compare(user.password, body.password);
      if (!verify) {
        throw new BadRequestException('Invalid Password');
      }

      const access_token = this.jwtService.sign({
        id: user._id,
        username: user.username,
      });

      return {
        message: 'Login Successful',
        success: true,
        id: user._id,
        access_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async signup(body: SignupDto) {
    try {
      const exist = await this.userModel.findOne({ email: body.email });
      if (exist) {
        throw new BadRequestException('User already exists');
      }
      const isUserNameTaken = await this.userModel.findOne({
        user: body.username,
      });
      
      if (isUserNameTaken) {
        throw new BadRequestException('Username Already Taken');
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const user = await this.userModel.create({
        email: body.email,
        username: body.username,
        password: hashedPassword,
      });

      await user.save();

      console.log('user', user);
      console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
      const access_token = this.jwtService.sign({
        id: user._id,
        username: user.username,
      });

      return {
        success: true,
        message: 'User created successfully',
        id: user._id,
        access_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
