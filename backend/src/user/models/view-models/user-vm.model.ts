import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

import { UserRole } from "../user-role.enum";
import { BaseModelVM } from "src/shared/base.model";
import { EnumToArray } from "src/shared/utilities/enum-to-array";

export class UserVm extends BaseModelVM {
    @ApiModelProperty()
    username: string;
    @ApiModelPropertyOptional()
    firstName?: string;
    @ApiModelPropertyOptional()
    lastName?: string;
    @ApiModelPropertyOptional()
    fullName?: string;
    @ApiModelPropertyOptional({ enum: UserRole })
    role?: UserRole;
}