import { Project } from '@services/models/base/project';
import { RcFile } from 'antd/es/upload';
import { BaseSearchQuery, Limit, Sort } from 'interfaces/common';

export namespace ProjectGetPublishedModel {
  export interface Request extends Limit, Sort {}

  export interface Response {
    data: Data[];
    pagination: Pagination;
  }

  export interface Data {
    artistInfo: ArtistInfo;
    project: Project;
    projectInfo: ProjectInfo;
  }

  export interface ArtistInfo {
    email: string;
    firstNameEn: string;
    firstNameTh: string;
    id: string;
    lastNameEn: string;
    lastNameTh: string;
    userId: string;
  }

  export interface ProjectInfo {
    imageLargeUrl: string;
    imagePortraitURL: string;
    imageSmallUrl: string;
  }
}

export namespace ProjectGetByIdModel {
  // export interface Request {}
  export interface Response {
    artistInfo: ArtistInfo;
    project: Project;
    projectInfo: ProjectInfo;
  }

  export interface ArtistInfo {
    id: string;
    firstNameEn: string;
    firstNameTh: string;
    lastNameEn: string;
    lastNameTh: string;
    profileImageURL: string;
    userId: string;
  }

  export interface ProjectInfo {
    imageLargeUrl: string;
    imageSmallUrl: string;
    imagePortraitUrl: string;
    imageLargeOriginalFilename: string;
    imageSmallOriginalFilename: string;
    imagePortraitOriginalFilename: string;
    isLastestProject: boolean;
  }
}

export namespace ProjectCreateModel {
  export interface Request {
    imageLarge?: RcFile;
    imageSmall?: RcFile;
    imagePortrait?: RcFile;

    name: string;
    artistUserId: string;
    description?: string;
    endDate?: string;
    contactFacebook?: string;
    contactTwitter?: string;
    contactReddit?: string;
    contactEmail?: string;
    maxCap?: number;
    minCap?: number;
    maxNFT?: number;
    nft?: number;
    revenue: number;
  }
  export interface Response {
    id: string;
    createdAt: Date;
  }
}

export namespace ProjectPublishModel {
  export interface Request {
    ids: string[];
  }
  export interface Response {
    updatedAt: Date;
    state: string;
  }
}

export namespace ProjectUnpublishModel {
  export interface Request {
    ids: string[];
  }
  export interface Response {
    updatedAt: Date;
    state: string;
  }
}

export namespace ProjectSearchModel {
  export interface Request extends BaseSearchQuery {
    name?: string;
    id?: string;
    artistName?: string;
    artistId?: string;
    state?: string;
    endDateFrom?: Date;
    endDateTo?: Date;
    capFrom?: number;
    capTo?: number;
    nftFrom?: number;
    nftTo?: number;
    revenueFrom?: number;
    revenueTo?: number;
  }
  export interface Response {
    data: Data[];
    pagination: Pagination;
  }

  export interface Data {
    project: Project;
    projectInfo: ProjectInfo;
    artistInfo: ArtistInfo;
  }

  export interface ProjectInfo {
    imageSmallUrl: string;
  }

  export interface ArtistInfo {
    id: string;
    userId: string;
    email: string;
    firstNameEn: string;
    lastNameEn: string;
    firstNameTh: string;
    lastNameTh: string;
  }
}

export namespace ProjectUpdateModel {
  export interface Request {
    imageLarge?: RcFile;
    imageSmall?: RcFile;
    imagePortrait?: RcFile;

    name: string;
    state: string;
    description?: string;
    endDate?: string;
    contactFacebook?: string;
    contactTwitter?: string;
    contactReddit?: string;
    contactEmail?: string;
    maxCap?: number;
    minCap?: number;
    maxNFT?: number;
    nft?: number;
    revenue: number;
  }
  export interface Response {
    updatedAt: string;
  }
}

export namespace ProjectDeleteModel {
  export interface Response {
    deletedAt: string;
  }
}
