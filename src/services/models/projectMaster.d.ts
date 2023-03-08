import { Pagination } from '@cores/models/pagination';
import { ProjectMaster } from '@services/models/base/projectMaster';

export namespace ProjectMasterModel {
  // export interface Request {}

  export interface Response {
    projectMasters: ProjectMaster[];
    pagination: Pagination;
  }
}
