import { Supporter } from '@services/models/base/supporter';
import { BaseSearchQuery } from 'interfaces/common';

export namespace SupporterSearchModel {
  export interface Request extends BaseSearchQuery {
    id?: string;
    name?: string;
  }
  export interface Response {
    data: Data[];
    pagination: Pagination;
  }

  export interface Data {
    supporter: Supporter;
    supporterInfo: SupporterInfo;
  }
  export interface SupporterInfo {
    profileImageURL?: string;
  }
}

export namespace SupporterDeleteModel {
  export interface Response {
    deletedAt: string;
  }
}
