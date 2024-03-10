import { IConfig } from "./IConfig";
import { IExcelConfig } from "./IExcelConfig";

export interface IDatabase  {
    Config: IConfig
    ExcelConfigs: IExcelConfig[]
}