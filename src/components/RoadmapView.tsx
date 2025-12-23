import type { CSSVars } from '../app.types';

type RoadmapViewProps = {
  onBack: () => void;
};

export function RoadmapView({ onBack }: RoadmapViewProps) {
  return (
    <>
      <header className="roadmap-header">
        <button className="ghost" type="button" onClick={onBack}>
          Back to Unhooked
        </button>
        <span className="brand">Unhooked</span>
      </header>
      <header className="hero hero-roadmap">
        <div className="hero-top">
          <span className="status-pill">Roadmap</span>
        </div>
        <h1>Build the calm, platform by platform.</h1>
        <p>
          We ship one platform at a time, making sure cleanup flows feel effortless
          before we expand.
        </p>
        <div className="hero-row">
          <div className="roadmap">
            <span className="chip">YouTube v1 live</span>
            <span className="chip">X v1 in build</span>
            <span className="chip">LinkedIn v1 in build</span>
          </div>
        </div>
      </header>
      <section className="grid">
        <article className="card reveal" style={{ '--delay': '0.1s' } as CSSVars}>
          <div className="tag">Now</div>
          <h2>YouTube clean-up foundation</h2>
          <p>Solid swipe flows with channel context and safe unsubscribes.</p>
          <ul>
            <li>Swipe left to unsubscribe, right to keep.</li>
            <li>Channel visuals and summaries pulled in automatically.</li>
            <li>Progress tracking as you clear your list.</li>
          </ul>
        </article>
        <article className="card reveal" style={{ '--delay': '0.2s' } as CSSVars}>
          <div className="tag">Next</div>
          <h2>X clean-up flow</h2>
          <p>Clear down lists, mutes, and follows with the same speed.</p>
          <div className="roadmap">
            <span className="chip">Mute triage</span>
            <span className="chip">Follow review</span>
            <span className="chip">List hygiene</span>
          </div>
        </article>
        <article className="card reveal" style={{ '--delay': '0.3s' } as CSSVars}>
          <div className="tag">Later</div>
          <h2>LinkedIn clean-up flow</h2>
          <p>Make your network intentional without losing connections you need.</p>
          <div className="roadmap">
            <span className="chip">Connection review</span>
            <span className="chip">Feed tuning</span>
            <span className="chip">Recruiter filters</span>
          </div>
        </article>
      </section>
      <section className="grid">
        <article className="card reveal" style={{ '--delay': '0.15s' } as CSSVars}>
          <div className="tag">Quality</div>
          <h2>Experience polish</h2>
          <p>Every release ships with clear safeguards and fast recovery.</p>
          <ul>
            <li>Undo windows and confirmation steps for risky actions.</li>
            <li>Batch insights so you can decide faster.</li>
            <li>Reusable routines saved per platform.</li>
          </ul>
        </article>
        <article className="card reveal" style={{ '--delay': '0.25s' } as CSSVars}>
          <div className="tag">Signals</div>
          <h2>How we pick the next build</h2>
          <p>We prioritize by impact and how much effort it saves you.</p>
          <ul>
            <li>Highest clutter first: follows, lists, and subscriptions.</li>
            <li>Platform access and stability of the cleanup APIs.</li>
            <li>Workflows that make `one more scroll` less tempting.</li>
          </ul>
        </article>
      </section>
    </>
  );
}
