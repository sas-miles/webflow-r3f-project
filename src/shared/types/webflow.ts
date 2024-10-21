export interface WebflowData {
  fieldData: {
    "page-link": string;
    slug: string;
    name: string;
    title: string;
    "main-content": string;
    "featured-image": {
      url: string;
      alt: string | null;
    };
  };
}
