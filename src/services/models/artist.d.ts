import { Artist } from '@services/models/base/artist';
import { BaseSearchQuery } from 'interfaces/common';

export namespace ArtistSearchModel {
  export interface Request extends BaseSearchQuery {
    id?: string;
    name?: string;
  }
  export interface Response {
    data: Data[];
    pagination: Pagination;
  }

  export interface Data {
    artist: Artist;
    artistInfo: ArtistInfo;
  }
  export interface ArtistInfo {
    profileImageURL?: string;
  }
}

export namespace ArtistDeleteModel {
  export interface Response {
    deletedAt: string;
  }
}

export namespace ArtistCreateModel {
  export interface Request {
    profileImage?: RcFile;
    firstNameEn: string;
    lastNameEn: string;
    firstNameTh: string;
    lastNameTh: string;
    email: string;
    telephone: string;
  }
  export interface Response {
    artistId: string;
    userId: string;
    createdAt: string;
  }
}

export namespace ArtistGetByIdModel {
  // export interface Request {}
  export interface Response {
    artist: Artist;
    artistInfo: ArtistInfo;
  }

  export interface ArtistInfo {
    profileImageUrl: string;
    profileImageOriginalFilename: string;
  }
}

export namespace ArtistUpdateModel {
  export interface Request {
    profileImage?: RcFile;
    firstNameEn: string;
    lastNameEn: string;
    firstNameTh: string;
    lastNameTh: string;
    email: string;
    telephone: string;
  }
  export interface Response {
    updatedAt: string;
  }
}
