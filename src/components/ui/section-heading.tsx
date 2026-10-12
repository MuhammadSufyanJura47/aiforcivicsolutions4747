
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className="section-heading"
      style={{
        textAlign: align,
        marginLeft: align === "left" ? 0 : undefined,
        marginRight: align === "left" ? 0 : undefined,
      }}
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}

      <h2 className="section-title">{title}</h2>

      {description && (
        <p className="section-description">{description}</p>
      )}
    </div>
  );
}
