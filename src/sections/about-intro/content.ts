/*
 * About page intro content: everything the owner can change.
 * Layout, spacing, colours and motion live in AboutIntro.tsx and tokens.css.
 */
type Part = { text: string; muted?: boolean };

export type AboutIntroContent = {
  /** Page heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  /** Wide photo under the heading (moves slowly while scrolling). */
  image: { src: string; alt: string };
  tag: string;
  /** Big paragraph: white parts, `muted` parts softer. */
  statement: Part[];
  /** Short line with the thin plus: white part + softer part. */
  note: { text: string; muted: string };
  /** Two photos side by side (4:3). */
  photos: { src: string; alt: string }[];
};

export const aboutIntroContent: AboutIntroContent = {
  heading: { text: "About the ", muted: "Sensoria Team" },
  image: { src: "/images/about-intro/office-greenery.webp", alt: "Sensoria office with large windows and green plants." },
  tag: "[Who we are]",
  statement: [
    { text: "Sensoria is a team of AI engineers and skincare experts dedicated to clinical-grade analysis. " },
    { text: "We built this system to replace generic beauty advice with precise, neural-driven data.", muted: true },
    { text: " " },
    { text: "By mapping thousands of dermal points,", muted: true },
    { text: " we provide you with a scientific roadmap to healthier skin every single day." },
  ],
  note: { text: "Driven by data, not trends. ", muted: "Our technology adapts to your biology in real-time." },
  photos: [
    { src: "/images/about-intro/team-talking.png", alt: "Group of Sensoria team members talking and smiling together in the office." },
    { src: "/images/about-intro/team-meeting.png", alt: "Sensoria team members around a table in a meeting, one raising both hands while talking." },
  ],
};
