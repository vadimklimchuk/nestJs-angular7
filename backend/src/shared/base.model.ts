import { SchemaOptions } from "mongoose";
import { Typegoose, prop } from "typegoose";
import { ApiModelPropertyOptional } from "@nestjs/swagger";

export class BaseModel extends Typegoose {
    @prop({ default: Date.now() })
    createdAt?: Date;

    @prop({ default: Date.now() })
    updatedAT?: Date;

    id?: string;
}

export class BaseModelVM {
    @ApiModelPropertyOptional({ type: String, format: "date-time" })
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: "date-time" })
    updatedAt?: Date;

    @ApiModelPropertyOptional()
    id?: string;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
};
