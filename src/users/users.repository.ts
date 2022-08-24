import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateUserInput, FindUser, LimitUser, UpdateUserInput } from "./dto/user.dto";
import { User } from "./entities/user.entity";

export class UserRepository {
    @InjectModel(User)
    private user: typeof User

    public async findOne(findUser: FindUser) {
        const result = await this.user.findOne({
            where: findUser as WhereOptions
        });
        if (!result) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public create(createUserInput: CreateUserInput): Promise<User> {
        return this.user.create(createUserInput as any);
    }

    public findAll(limitUser: LimitUser, findUser: WhereOptions): Promise<{ count: number; rows: User[] }> {
        return this.user.findAndCountAll({
            where: findUser,
            offset: limitUser.offset,
            limit: limitUser.limit
        });
    }

    public async update(updateUserInput: UpdateUserInput): Promise<void> {
        await this.findOne({ i_id: updateUserInput.id })
        await this.user.update(updateUserInput, { where: { i_id: updateUserInput.id } });
    }

    public async remove(findUser: FindUser): Promise<void> {
        await this.findOne(findUser)
        await this.user.destroy(
            { where: findUser as WhereOptions }
        );
    }

}