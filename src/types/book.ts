export interface Book {
  id: string;
  volumeInfo: {
    description?: string;
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  };
}
