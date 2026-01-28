import app from "./app";
import config from "./config/config";
import logger from "./logger";

app.listen(config, () => {
  logger.info(`Server is running on port ${config.port}`);
  logger.info(`Go to: ${config.baseURI}`);
  logger.info(`Mode: ${config.nodeEnv}`);
});
