import {
  ThumbnailDefault,
  ThumbnailMedium,
  ThumbnailHigh,
  PageInfo,
} from './ThumbnailDefault';

export interface PlayListDetailThumbnails {
  default: ThumbnailDefault;
  medium: ThumbnailMedium;
  high: ThumbnailHigh;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface PlayListDetailSnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: PlayListDetailThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
}

export interface PlayListDetailItem {
  kind: string;
  etag: string;
  id: string;
  snippet: PlayListDetailSnippet;
}

export interface PlayListDetail {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: PlayListDetailItem[];
}

export interface PlayListDetailRoot {
  data: PlayListDetail;
}
