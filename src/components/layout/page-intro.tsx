
import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="page-intro-content">
          <p className="section-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-intro-description">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
