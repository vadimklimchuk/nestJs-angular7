import "automapper-ts/dist/automapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MapperService {
    public mapper: AutoMapperJs.AutoMapper;

    constructor() {
        this.mapper = automapper;
        this.initializeMapper();
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }

    private static configure(config: AutoMapperJs.IConfiguration): void {
        config
            .createMap("User", "UserVm")
            .forSourceMember("_id", opts => opts.ignored())
            .forSourceMember("password", opts => opts.ignore());

        config.createMap("Todo", "TodoVm").forSourceMember("_id", opts => opts.ignore());
    }
}
