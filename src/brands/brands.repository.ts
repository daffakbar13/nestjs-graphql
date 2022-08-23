import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateBrandInput, FindBrand, LimitBrand, UpdateBrandInput } from "./dto/brand.dto";
import { Brand } from "./entities/brand.entity";

export class BrandRepository {
    @InjectModel(Brand)
    private brand: typeof Brand
    create(createBrandInput: CreateBrandInput): Promise<Brand> {
        return this.brand.create(createBrandInput as any);
    }

    private async findOne(findProduct: any) {
        const result = await this.brand.findOne({ where: findProduct });
        if (!result) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    public findAll(limitBrand: LimitBrand, findBrand: WhereOptions): Promise<{ count: number; rows: Brand[] }> {
        return this.brand.findAndCountAll({
            where: findBrand,
            offset: limitBrand.offset,
            limit: limitBrand.limit
        });
    }

    public async update(updateBrandInput: UpdateBrandInput): Promise<void> {
        await this.findOne({ i_id: updateBrandInput.id })
        await this.brand.update(updateBrandInput as any, { where: { i_id: updateBrandInput.id } });
    }

    public async remove(findBrand: FindBrand): Promise<void> {
        await this.findOne(findBrand)
        await this.brand.destroy(
            { where: findBrand as WhereOptions }
        );
    }

}