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

export interface RecentsResponse {
  items: {
    track: {
      name: string;
      album: {
        images: {
          0: {
            url: string;
          };
        };
      };
      artists: {
        id: string;
        name: string;
      }[];
      external_urls: {
        spotify: string;
      };
    };
    played_at: string;
  }[];
}

export type TopTracksResponse = {
  items: {
    artists: {
      id: string;
      name: string;
    }[];
    name: string;
    album: {
      images: {
        0: {
          url: string;
        };
      };
    };
  }[];
};

export type TopArtistesResponse = {
  items: {
    images: {
      0: {
        url: string;
      };
    };
    name: string;
    external_urls: {
      spotify: string;
    };
  }[];
};

export type TopGenres = {
  items: {
    genres: string;
    count: number;
  };
};
