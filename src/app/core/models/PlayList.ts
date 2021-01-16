import {
  ThumbnailDefault,
  ThumbnailMedium,
  ThumbnailHigh,
  PageInfo,
} from './ThumbnailDefault';

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface PlayListThumbnails {
  default: ThumbnailDefault;
  medium: ThumbnailMedium;
  high: ThumbnailHigh;
  standard: Standard;
  maxres: Maxres;
}

export interface Localized {
  title: string;
  description: string;
}

export interface PlayListSnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: PlayListThumbnails;
  channelTitle: string;
  localized: Localized;
}

export interface ContentDetails {
  itemCount: number;
}

export interface PlayListItem {
  kind: string;
  etag: string;
  id: string;
  snippet: PlayListSnippet;
  contentDetails: ContentDetails;
}

export interface PLayList {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: PlayListItem[];
}
