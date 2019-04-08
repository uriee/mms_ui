
import { act_resources } from './ActResources.js';
let process_act_resources = JSON.parse(JSON.stringify(act_resources))
process_act_resources.fields.type.value = 2;
export { process_act_resources };
