import { PlayListDetailItem } from './PlaylistDetail';

export interface TubeDetail {
  pageToken: string;
  isBusy: boolean;
  totalResults: number;
  position: number;
  items: PlayListDetailItem[];
}
