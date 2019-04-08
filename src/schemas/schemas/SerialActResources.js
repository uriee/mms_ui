
import { act_resources } from './ActResources.js';
let serial_act_resources = JSON.parse(JSON.stringify(act_resources))
serial_act_resources.fields.type.value = 3;
export { serial_act_resources };
