import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import ThresholdKey from "@tkey/core";
import * as BN from "bn.js";
import WhiteManeServiceProvider from "./WhiteManeServiceProvider";
import { TorusStorageLayer } from "@tkey/storage-layer-torus";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: "get_service" })
  getService() {
    global.FormData = require("form-data");
    global.fetch = require("node-fetch");
    const pk = new BN(
      "818bd9fdca4746143f834308b1d3c61a9a1abf721320fa3744a188a744633c78",
      "hex"
    );
    const serviceProvider = new WhiteManeServiceProvider({ postboxKey: pk });
    const storageLayer = new TorusStorageLayer({
      hostUrl: "https://metadata.tor.us",
      enableLogging: true,
    });

    const tkey = new ThresholdKey({
      serviceProvider,
      storageLayer,
    });

    tkey._setKey(pk);

    tkey
      .initialize()
      .then(async (result) => {
        // const res = await tkey._initializeNewKey();
        tkey.generateNewShare();
        console.log("done", result);
        console.log("x", result.pubKey.x.toString("hex"));
        console.log("y", result.pubKey.y.toString("hex"));
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("tkey", pk);
    return tkey;
  }
}
