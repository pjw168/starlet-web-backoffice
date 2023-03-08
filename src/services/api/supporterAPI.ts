import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import {
  SupporterDeleteModel,
  SupporterSearchModel,
} from '@services/models/supporter';
import { encodeQueryString } from '@utils/dataUtils';
import { generatePath } from 'react-router-dom';

export async function search(req: Partial<SupporterSearchModel.Request>) {
  const query = encodeQueryString(req);
  const { data } = await apiClient.get<SupporterSearchModel.Response>(
    `${generatePath(BASE_URL.SUPPORTERS_SEARCH)}?${query}`,
  );
  return data;
}

export async function del(id: string) {
  const { data } = await apiClient.delete<SupporterDeleteModel.Response>(
    generatePath(BASE_URL.SUPPORTERS_BY_ID, { id }),
  );
  return data;
}
