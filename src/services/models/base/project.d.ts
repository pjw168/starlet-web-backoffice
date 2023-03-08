export interface Project {
  artistUserId: string;
  contactEmail: string;
  contactFacebook: string;
  contactReddit: string;
  contactTwitter: string;
  createdAt: Date;
  createdBy: string;
  description: string;
  endDate?: string;
  id: string;
  imageLargeFileId: string;
  imagePortraitFileId: string;
  imageSmallFileId: string;
  maxCap: number;
  maxNFT: number;
  minCap: number;
  name: string;
  nft: number;
  revenue: number;
  state: string;
  status: string;
  updatedAt: Date;
  updatedBy: string;
}
