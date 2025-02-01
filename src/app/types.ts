export interface SpotifyResponse {
  tracks: {
    items: {
      name: string;
      preview_url: string;
      uri: string;
      external_urls: {
        spotify: string;
      };
      artists: {
        name: string;
      }[];
      album: {
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };
    }[];
  };
}

export interface RecentlyPlayed {
  img: string;
  track: string;
  artistes: string;
  playedAt: string;
}

export type TopTracks = {
  rank: number;
  img: string;
  track: string;
  artistes: string;
};

export type TopArtistes = {
  rank: number;
  img: string;
  name: string;
};

export type TopGenres = {
  genre: string;
};
