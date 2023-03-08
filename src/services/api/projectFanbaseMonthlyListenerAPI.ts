import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import {
  ProjecFanbaseMonthlyListenerDeleteByIdListModel,
  ProjectFanbaseMonthlyListenerGetByProjectIdModel,
  ProjectFanbaseMonthlyListenerUpdateListModel,
} from '@services/models/projectFanbaseMonthlyListener';
import { generatePath } from 'react-router-dom';

export async function getByProjectId(projectId: string) {
  const { data } =
    await apiClient.get<ProjectFanbaseMonthlyListenerGetByProjectIdModel.Response>(
      generatePath(BASE_URL.PROJECT_FANBASE_MONTHLY_LISTENERS_BY_PROJECT_ID, {
        projectId,
      }),
    );
  return data;
}

export async function deleteByIdList(
  req: ProjecFanbaseMonthlyListenerDeleteByIdListModel.Request,
) {
  const { data } =
    await apiClient.delete<ProjecFanbaseMonthlyListenerDeleteByIdListModel.Response>(
      generatePath(BASE_URL.PROJECT_FANBASE_MONTHLY_LISTENERS_BY_ID_LIST),
      { data: req },
    );
  return data;
}

export async function updateByProjectId(
  projectId: string,
  req: ProjectFanbaseMonthlyListenerUpdateListModel.Request,
) {
  const { data } =
    await apiClient.put<ProjectFanbaseMonthlyListenerUpdateListModel.Response>(
      generatePath(BASE_URL.PROJECT_FANBASE_MONTHLY_LISTENERS_BY_PROJECT_ID, {
        projectId,
      }),
      req,
    );
  return data;
}
