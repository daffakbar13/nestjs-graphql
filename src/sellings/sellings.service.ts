import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Options } from 'src/utils/options';
import { SellingRepository } from './sellings.repository';
import { CreateSelling, FilterSelling, UpdateSelling } from './dto/selling.dto';
import { Selling } from './entities/selling.entity';
import { WhereOptions } from 'sequelize';

@Injectable()
export class SellingService {
  constructor(
    private readonly repository: SellingRepository,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreateSelling, token: string): Promise<{ count: number; rows: Selling[] }> {
    const user = await this.authService.getUserByToken(token)
    return await this.repository.create(input, user);
  }

  public async findAll(filter: FilterSelling, options?: Options): Promise<{ count: number; rows: Selling[] }> {
    return await this.repository.findAll(filter as WhereOptions, options)
  }

  public async update(input: UpdateSelling, token: string): Promise<{ count: number; rows: Selling[] }> {
    const user = (await this.authService.getUserByToken(token))

    return await this.repository.update(input, user);
  }

  public async remove(filter: FilterSelling, token: string): Promise<{ count: number; rows: Selling[] }> {
    const user = await this.authService.getUserByToken(token)

    return await this.repository.remove(filter as WhereOptions, user);
  }
}
