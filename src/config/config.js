import { config as conf} from "dotenv";
 conf();
 
const _config = {
    // eslint-disable-next-line no-undef
    port: process.env.PORT, 
};

export const config = Object.freeze(_config)