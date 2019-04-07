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
import { locations } from './schemas/Locations.js';
import { kit } from './schemas/Kit.js';
import { bom } from './schemas/Bom.js';
import { iden } from './schemas/Iden.js';
import { identifier } from './schemas/Identifier.js';
import { preferences } from './schemas/Preferences.js';

const schemas = {
  emp: emp,
  part: part,
  dept: dept,
  user: user,
  kit: kit,
  bom: bom,
  iden: iden,
  profile: profile,
  equipment: equipment,
  resourceGroup: resourceGroup,
  resource: resource,
  availabilityProfile: availabilityProfile,
  availabilities: availabilities,
  resource_timeoff: resource_timeoff,
  employee_timeoff: employee_timeoff,
  malfunctions: malfunctions,
  malfunction_types: malfunction_types,
  repairs: repairs,
  repair_types: repair_types,
  mnt_plans: mnt_plans,
  mnt_plan_items: mnt_plan_items,
  serials: serials,
  serial_statuses: serialStatuses,
  part_status: partStatus,
  actions: actions,
  positions: positions,  
  process: process,
  locations: locations,
  proc_act: proc_act,
  serial_act: serial_act,
  work_report: work_report,
  identifier: identifier,
  preferences: preferences,
};

export default schemas;
