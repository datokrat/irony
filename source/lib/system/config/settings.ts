import { Provided, Singleton, AutoWired, ConfigurationProvider/*, ProvidedByJson*/ } from "../core/factory";
import { ILoggerConfig } from "../core/interfaces";

import { JsonObject, JsonMember } from "typedjson-npm";

@AutoWired
@Singleton
@Provided(new ConfigurationProvider(Settings))
// TODO: wrap with @ProvidedByJson
@JsonObject
export class Settings {

  @JsonMember
  public readonly protocol: string = "http";

  @JsonMember
  public readonly hostname: string = "127.0.0.1";

  @JsonMember
  public readonly port: number = 80;

  @JsonMember
  public readonly root: string = "/";

  @JsonMember
  public readonly basePath: string = "/build/lib"; // HACK: Hardcoded parts of the path!

  @JsonMember
  public readonly logging: ILoggerConfig = { bufferLogs: false, level: 9, delimiter: " | " };

  public get rootUrl(): string {
    return this.protocol
      + "://" + this.hostname
      + ":" + this.port
      + this.root;
  }
}
