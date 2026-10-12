
import { homeStats } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Event overview">
      <div className="container">
        <div className="stats-panel">
          {homeStats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}

          <div className="stats-caption">
            <ArrowUpRight size={17} />
            <span>Designed for builders with ideas that matter.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
