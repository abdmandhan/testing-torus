const BN = require('bn.js');
const ServiceProviderBase = require('@tkey/service-provider-base').default;

class UccServiceProvider extends ServiceProviderBase {
  constructor({ enableLogging = false, postboxKey }) {
    super({ enableLogging, postboxKey });
    this.enableLogging = enableLogging;
    this.postboxKey = new BN(postboxKey, "hex");
    this.serviceProviderName = "ServiceProvider";
  }

  toJSON() {
    return {
      ...super.toJSON(),
      serviceProviderName: this.serviceProviderName,
    };
  }
}

module.exports = UccServiceProvider;
