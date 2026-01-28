import pinoHttp from "pino-http";
import logger from "../logger";

const httpLogger = pinoHttp({
  logger,

  quietReqLogger: true,

  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} → ${res.statusCode}`;
  },

  customErrorMessage(req, res, err) {
    return `${req.method} ${req.url} → ${res.statusCode} (${err?.message})`;
  },
});

export default httpLogger;
