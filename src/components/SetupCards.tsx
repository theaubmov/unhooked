import type { CSSVars } from '../app.types';

type SetupCardsProps = {
  summary: string;
};

export function SetupCards({ summary }: SetupCardsProps) {
  return (
    <section className="grid">
      <article className="card reveal" style={{ '--delay': '0.1s' } as CSSVars}>
        <div className="tag">Focus</div>
        <h2>Feed cleanup that feels human.</h2>
        <p>{summary}</p>
        <ul>
          <li>Reset recommendations without losing subscriptions.</li>
          <li>Mute high-velocity topics that derail attention.</li>
          <li>Keep a record of what was tuned out and why.</li>
        </ul>
      </article>

      <article className="card reveal" style={{ '--delay': '0.2s' } as CSSVars}>
        <div className="tag">Workflow</div>
        <h2>Small steps, repeatable impact.</h2>
        <p>
          Pick a platform, scan what is overstimulating, and apply cleanup
          actions that stick. Every change is reversible.
        </p>
        <div className="steps">
          <span>1. Diagnose</span>
          <span>2. Clean</span>
          <span>3. Maintain</span>
        </div>
      </article>

      <article className="card reveal" style={{ '--delay': '0.3s' } as CSSVars}>
        <div className="tag">Roadmap</div>
        <h2>Designed to expand.</h2>
        <p>
          YouTube is the first module. The same cleanup model will be extended
          to X/Twitter and LinkedIn with platform-specific rules.
        </p>
        <div className="roadmap">
          <span className="chip">YouTube v1</span>
          <span className="chip">X v1</span>
          <span className="chip">LinkedIn v1</span>
        </div>
      </article>
    </section>
  );
}
