export const extractIdFromUrl = (url: string): string | null => {
  return url.split('/').slice(-2)[0];
};
