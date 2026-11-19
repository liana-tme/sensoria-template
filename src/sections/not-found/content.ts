/*
 * 404 page content (any unknown address): everything the owner can change.
 */
export type NotFoundContent = {
  tag: string;
  number: string;
  text: string;
  action: { label: string; href: string };
};

export const notFoundContent: NotFoundContent = {
  tag: "[Not found]",
  number: "404",
  text: "The page you are looking for could not be found.",
  action: { label: "Back to Home", href: "/" },
};
