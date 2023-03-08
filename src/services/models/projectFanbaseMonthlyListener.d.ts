import { Pagination } from '@cores/models/pagination';
import { ProjectFanbaseMonthlyListener } from '@services/models/base/ProjectFanbaseMonthlyListener';

export namespace ProjectFanbaseMonthlyListenerGetByProjectIdModel {
  export interface Response {
    pagination: Pagination;
    projectFanbaseMonthlyListeners: ProjectFanbaseMonthlyListener[];
  }
}

export namespace ProjecFanbaseMonthlyListenerDeleteByIdListModel {
  export interface Request {
    idList: string[];
  }
  export interface Response {
    deletedAt: string;
  }
}

export namespace ProjectFanbaseMonthlyListenerUpdateListModel {
  export interface Request {
    list: ProjectFanbaseMonthlyListenerUpdateListModelData[];
  }
  export interface ProjectFanbaseMonthlyListenerUpdateListModelData {
    id?: string;
    name: string;
    value: number;
    state: string;
  }
  export interface Response {
    deletedAt: string;
  }
}
