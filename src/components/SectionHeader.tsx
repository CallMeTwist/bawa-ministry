interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeader = ({ label, title, subtitle, center = true }: SectionHeaderProps) => (
  <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
    {label && (
      <p className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-3">
        {label}
      </p>
    )}
    <h2 className="section-heading">{title}</h2>
    {subtitle && <p className={`section-subheading mt-3 ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
  </div>
);

export default SectionHeader;
