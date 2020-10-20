const safeTraffic = artifacts.require("safeTraffic");

module.exports = function (deployer) {
  deployer.deploy(safeTraffic);
};
