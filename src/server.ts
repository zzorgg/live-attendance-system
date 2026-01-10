import app from "./app";
import config from "./config/config";

app.listen(config, () => {
  console.log(`server running on the port ${config.port}`);
  console.log(`mode ${config.nodeEnv}`);
});
