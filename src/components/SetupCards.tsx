import type { CSSVars } from '../app.types';

export function SetupCards() {
  return (
    <section className="grid">
      <article className="card reveal" style={{ '--delay': '0.2s' } as CSSVars}>
        <div className="tag">Roadmap</div>
        <h2>Built to expand with each platform.</h2>
        <p>
          Each platform gets its own cleanup logic, swipe flows, and account
          controls so you can tame one feed at a time.
        </p>
        <div className="roadmap">
          <span className="chip">YouTube v1 live</span>
          <span className="chip">X v1 in build</span>
          <span className="chip">LinkedIn v1 in build</span>
        </div>
      </article>
    </section>
  );
}
