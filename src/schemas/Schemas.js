import { emp } from './schemas/Emp.js';
import { part } from './schemas/Part.js';
import { partStatus } from './schemas/PartStatus.js';
import { dept } from './schemas/Departments.js';
import { user } from './schemas/User.js';
import { profile } from './schemas/Profile.js';
import { equipment } from './schemas/Equipment.js';
import { resourceGroup } from './schemas/ResourceGroup.js';
import { resource } from './schemas/Resource.js';
import { availabilityProfile } from './schemas/AvailabilityProfile.js';
import { availabilities } from './schemas/Availabilities.js';
import { resource_timeoff } from './schemas/Resource_timeoff.js';
import { employee_timeoff } from './schemas/Employee_timeoff.js';
import { malfunctions } from './schemas/Malfunctions.js';
import { malfunction_types } from './schemas/Malfunction_Types.js';
import { repairs } from './schemas/Repairs.js';
import { repair_types } from './schemas/Repair_Types.js';
import { mnt_plans } from './schemas/Mnt_plans.js';
import { mnt_plan_items } from './schemas/Mnt_plan_items.js';
import { serials } from './schemas/Serials.js';
import { serialStatuses } from './schemas/SerialStatuses.js';
import { actions } from './schemas/Actions.js';
import { positions } from './schemas/Positions.js';
import { work_report } from './schemas/WorkReport.js';
import { process } from './schemas/Process.js';
import { proc_act } from './schemas/ProcAct.js';
import { serial_act } from './schemas/SerAct.js';
import { act_resources } from './schemas/ActResources.js';
import { process_act_resources } from './schemas/ProcessActResources.js';
import { serial_act_resources } from './schemas/SerialActResources.js';
import { locations } from './schemas/Locations.js';
import { kit } from './schemas/Kit.js';
import { bom } from './schemas/Bom.js';
import { iden } from './schemas/Iden.js';
import { identifier } from './schemas/Identifier.js';
import { identifier_links } from './schemas/Identifier_links.js';
import { preferences } from './schemas/Preferences.js';
import { numerators } from './schemas/Numerators.js';
import { fault } from './schemas/fault.js';
import { fault_type } from './schemas/Fault_Types.js';
import { fault_status } from './schemas/Fault_Statuses.js';

const schemas = {
  emp,
  part,
  dept,
  user,
  kit,
  bom,
  iden,
  profile,
  equipment,
  resourceGroup,
  resource,
  availabilityProfile,
  availabilities,
  resource_timeoff,
  employee_timeoff,
  malfunctions,
  malfunction_types,
  repairs,
  repair_types,
  mnt_plans,
  mnt_plan_items,
  serials ,
  serial_statuses: serialStatuses,
  part_status: partStatus,
  actions,
  positions,  
  process,
  locations,
  proc_act,
  serial_act,
  act_resources,
  process_act_resources ,
  serial_act_resources  ,  
  work_report,
  identifier,
  preferences,
  numerators,
  fault,
  fault_status,
  fault_type,
  identifier_links
};

export default schemas;
