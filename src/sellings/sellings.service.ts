import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Options } from 'src/utils/options';
import { SellingRepository } from './sellings.repository';
import { CreateSelling, FilterSelling, UpdateSelling } from './dto/selling.dto';
import { SellingModel } from './entities/selling.entity';

@Injectable()
export class SellingService {
  constructor(
    private readonly repository: SellingRepository,
    private readonly authService: AuthService
  ) { }

  public async create(input: CreateSelling, token: string): Promise<SellingModel> {
    const user = await this.authService.getUserByToken(token)
    return this.repository.create({ ...input, i_usersId: user.i_id });
  }

  public async findAll(filter: FilterSelling, options?: Options): Promise<SellingModel> {
    return this.repository.findAll(filter, options)
  }

  public async update(filter: FilterSelling, input: UpdateSelling): Promise<SellingModel> {
    return this.repository.update(filter, input);
  }
}
