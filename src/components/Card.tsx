import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="my-8">
      <a
        href={href}
        className="inline-block font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-xl font-semibold decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-xl font-semibold decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} className="mt-2" />
      <p className="mt-3 leading-relaxed opacity-70">{description}</p>
    </li>
  );
}
