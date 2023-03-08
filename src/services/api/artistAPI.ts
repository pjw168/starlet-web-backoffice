import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import {
  ArtistCreateModel,
  ArtistDeleteModel,
  ArtistGetByIdModel,
  ArtistSearchModel,
  ArtistUpdateModel,
} from '@services/models/artist';
import { transformRequestToFormData } from '@utils/apiUtils';
import { encodeQueryString } from '@utils/dataUtils';
import { generatePath } from 'react-router-dom';

export async function search(req: Partial<ArtistSearchModel.Request>) {
  const query = encodeQueryString(req);
  const { data } = await apiClient.get<ArtistSearchModel.Response>(
    `${generatePath(BASE_URL.ARTISTS_SEARCH)}?${query}`,
  );
  return data;
}

export async function del(id: string) {
  const { data } = await apiClient.delete<ArtistDeleteModel.Response>(
    generatePath(BASE_URL.ARTISTS_BY_ID, { id }),
  );
  return data;
}

export async function create(req: ArtistCreateModel.Request) {
  const formData = transformRequestToFormData(req);
  const { data } = await apiClient.post<ArtistCreateModel.Response>(
    generatePath(BASE_URL.BASE_ARTISTS),
    formData,
  );
  return data;
}

export async function getById(id: string) {
  const { data } = await apiClient.get<ArtistGetByIdModel.Response>(
    generatePath(BASE_URL.ARTISTS_BY_ID, { id }),
  );
  return data;
}

export async function update(id: string, req: ArtistUpdateModel.Request) {
  const formData = transformRequestToFormData(req);
  const { data } = await apiClient.put<ArtistUpdateModel.Response>(
    generatePath(BASE_URL.ARTISTS_BY_ID, { id }),
    formData,
  );
  return data;
}
