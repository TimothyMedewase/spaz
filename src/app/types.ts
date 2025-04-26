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
    external_urls: {
      spotify: string;
    };
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
