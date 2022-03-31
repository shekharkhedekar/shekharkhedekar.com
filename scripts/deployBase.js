/* eslint-disable no-console */
const FtpDeploy = require("ftp-deploy");
const consola = require("consola");
const open = require("open");

class Deploy {
  constructor(config) {
    consola.info(`Deploying...`);

    if (!config || !config.localRoot || !config.remoteRoot) {
      throw new Error("config.localRoot and config.remoteRoot must be defined");
    }

    this.ftpDeploy = new FtpDeploy();
    this.config = Object.assign(
      {
        user: "u40157445",
        host: "ftp.wgirankings.com",
        port: 21,
        continueOnError: true,
        include: ["*", "**/*"],
      },
      config
    );

    this.ftpDeploy.on("uploaded", (data) => {
      const { transferredFileCount, totalFileCount, filename } = data;
      consola.success(
        `Uploaded ${transferredFileCount}/${totalFileCount}: ${filename}`
      );
    });

    this.ftpDeploy.on("upload-error", (data) => {
      consola.error(`Error uploading: ${data.err}`);
    });
  }

  deploy() {
    this.ftpDeploy.deploy(this.config, (err) => {
      if (err) {
        consola.error(`Error deploying: ${JSON.stringify(err, null, 2)}`);
      } else {
        consola.success("Deploy complete.");
        if (this.config.url) {
          open(this.config.url);
        }
      }
    });
  }
}

module.exports.default = Deploy;
