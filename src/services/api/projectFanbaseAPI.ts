import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import {
  ProjectFanbaseCreateModel,
  ProjectFanbaseGetByProjectIdModel,
  ProjectFanbaseUpdateByProjectIdModel,
} from '@services/models/projectFanbase';
import { transformRequestToFormData } from '@utils/apiUtils';
import { generatePath } from 'react-router-dom';

export async function getByProjectId(projectId: string) {
  const { data } =
    await apiClient.get<ProjectFanbaseGetByProjectIdModel.Response>(
      generatePath(BASE_URL.PROJECT_FANBASE_BY_PROJECT_ID, {
        projectId,
      }),
    );
  return data;
}

export async function create(req: ProjectFanbaseCreateModel.Request) {
  const formData = transformRequestToFormData(req);
  const { data } = await apiClient.post<ProjectFanbaseCreateModel.Response>(
    generatePath(BASE_URL.BASE_PROJECT_FANBASES),
    formData,
  );
  return data;
}

export async function updateByProjectId(
  projectId: string,
  req: ProjectFanbaseUpdateByProjectIdModel.Request,
) {
  const formData = transformRequestToFormData(req);
  const { data } =
    await apiClient.put<ProjectFanbaseUpdateByProjectIdModel.Response>(
      generatePath(BASE_URL.PROJECT_FANBASE_BY_PROJECT_ID, {
        projectId,
      }),
      formData,
    );
  return data;
}
