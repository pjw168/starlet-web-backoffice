import { ProjectFanbase } from '@services/models/base/projectFanbase';

export namespace ProjectFanbaseGetByProjectIdModel {
  export interface Response {
    projectFanbase: ProjectFanbase;
    info: Info;
  }

  export interface Info {
    imageUrl: string;
    imageOriginalFilename: string;
  }
}

export namespace ProjectFanbaseCreateModel {
  export interface Request {
    image: RcFile;
    description: string;
    projectId: string;
  }

  export interface Response {
    id: string;
    createdAt: string;
  }
}

export namespace ProjectFanbaseUpdateByProjectIdModel {
  export interface Request {
    image: RcFile;
    description: string;
  }
  export interface Response {
    updatedAt: string;
  }
}
