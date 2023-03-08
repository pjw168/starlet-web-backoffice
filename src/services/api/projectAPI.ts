import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import {
  ProjectCreateModel,
  ProjectDeleteModel,
  ProjectGetByIdModel,
  ProjectGetPublishedModel,
  ProjectPublishModel,
  ProjectSearchModel,
  ProjectUnpublishModel,
  ProjectUpdateModel,
} from '@services/models/project';
import { transformRequestToFormData } from '@utils/apiUtils';
import { encodeQueryString } from '@utils/dataUtils';
import { generatePath } from 'react-router-dom';

export async function getPublished(
  option?: Partial<ProjectGetPublishedModel.Request>,
) {
  const query = encodeQueryString(option);
  const { data } = await apiClient.get<ProjectGetPublishedModel.Response>(
    `${BASE_URL.PROJECT_GET_PUBLISHED}?${query}`,
  );
  return data;
}

export async function getById(id: string) {
  const { data } = await apiClient.get<ProjectGetByIdModel.Response>(
    generatePath(BASE_URL.PROJECT_BY_ID, { id }),
  );
  return data;
}

export async function create(req: ProjectCreateModel.Request) {
  const formData = transformRequestToFormData(req);
  const { data } = await apiClient.post<ProjectCreateModel.Response>(
    generatePath(BASE_URL.BASE_PROJECTS),
    formData,
  );
  return data;
}

export async function publish(req: ProjectPublishModel.Request) {
  const { data } = await apiClient.post<ProjectPublishModel.Response>(
    generatePath(BASE_URL.PROJECT_PUBLISH),
    req,
  );
  return data;
}

export async function unpublish(req: ProjectUnpublishModel.Request) {
  const { data } = await apiClient.post<ProjectUnpublishModel.Response>(
    generatePath(BASE_URL.PROJECT_UNPUBLISH),
    req,
  );
  return data;
}

export async function search(req: Partial<ProjectSearchModel.Request>) {
  const query = encodeQueryString(req);
  const { data } = await apiClient.get<ProjectSearchModel.Response>(
    `${generatePath(BASE_URL.PROJECT_SEARCH)}?${query}`,
  );
  return data;
}

export async function del(id: string) {
  const { data } = await apiClient.delete<ProjectDeleteModel.Response>(
    generatePath(BASE_URL.PROJECT_BY_ID, { id }),
  );
  return data;
}

export async function update(id: string, req: ProjectUpdateModel.Request) {
  const formData = transformRequestToFormData(req);
  const { data } = await apiClient.put<ProjectUpdateModel.Response>(
    generatePath(BASE_URL.PROJECT_BY_ID, { id }),
    formData,
  );
  return data;
}
