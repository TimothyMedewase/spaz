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

export interface Recents {
  items: {
    track: {
      name: string;
      artists: {
        name: string;
      };
    };
    played_at: string;
  };
}

export type TopTracks = {
  items: {
    TrackObject: {
      artistes: {
        name: string;
      }[];
      name: string;
    };
  }[];
};

export type TopArtistes = {
  items: {
    ArtistObject: {
      images: {
        url: string;
        height: number;
        width: number;
      };
      name: string;
    };
  }[];
};

export type TopGenres = {
  genre: string;
};
