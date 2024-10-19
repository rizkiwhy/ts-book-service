import {web} from "./utils/web";
import {logger} from "./utils/logger";

web.listen(3000, () => {
    logger.info("Listening on port 3000");
})
