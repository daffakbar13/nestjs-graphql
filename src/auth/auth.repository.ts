import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { User } from "src/auth/entities/user.entity";
import { Query, Options } from "src/utils/options";
import { UpdateRole } from "./dto/role.dto";
import { UpdateUser } from "./dto/user.dto";
import { Role } from "./entities/role.entity";


export class RoleRepository {
    @InjectModel(Role)
    private role: typeof Role

    public async create(input): Promise<{ count: number; rows: Role[] }> {
        const created = await this.role.create(input);

        return { count: 1, rows: [created] }
    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: Role[] }> {
        return this.role.findAndCountAll(Query(filter, options));
    }

    public async update(input: UpdateRole): Promise<{ count: number; rows: Role[] }> {
        const [count, rows] = await this.role.update(input, { where: { i_id: input.id }, returning: true });

        return { count, rows }
    }

    public async remove(filter: WhereOptions): Promise<{ count: number; rows: Role[] }> {
        const deleted = this.findAll(filter)
        await this.role.destroy({ where: filter });

        return deleted
    }
}

export class UserRepository {
    @InjectModel(User)
    private user: typeof User

    public async create(input): Promise<{ count: number; rows: User[] }> {
        const created = await this.user.create(input);

        return { count: 1, rows: [created] }

    }

    public findAll(filter: WhereOptions, options?: Options): Promise<{ count: number; rows: User[] }> {
        return this.user.findAndCountAll(Query({ ...filter }, options));
    }

    public async update(input: UpdateUser): Promise<{ count: number; rows: User[] }> {
        const [count, rows] = await this.user.update(input, { where: { i_id: input.id }, returning: true });

        return { count, rows }
    }

    public async remove(filter: WhereOptions): Promise<{ count: number; rows: User[] }> {
        const deleted = await this.findAll(filter)
        await this.user.destroy({ where: filter });

        return deleted
    }
}