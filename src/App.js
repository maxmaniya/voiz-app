import { useState, useEffect, useRef, useCallback } from "react";


// ══════════════════════════════════════════════════════════════
// UPDATE THESE LINKS WHEN YOU HAVE REAL URLS
// ══════════════════════════════════════════════════════════════
const CONFIG = {
  twitter:         'https://twitter.com/VOIZProtocol',
  telegram:        'https://t.me/VOIZProtocol',
  pumpfun:         'https://pump.fun',
  solscan:         'https://solscan.io',
  coingecko:       'https://www.coingecko.com',
  cmc:             'https://coinmarketcap.com',
  raydium:         'https://raydium.io/swap/',
  website:         'https://voizprotocol.com',
  email:           'mailto:hello@voizprotocol.com',
  whitepaper_pdf:  'https://voizprotocol.com/VOIZ_Whitepaper_v1.pdf',
  brandPortal:     'https://voizprotocol.com/brands',
};

// ── SHARED STYLES ─────────────────────────────────────────────
const G = {
  cyan: "#00E5FF", blue: "#0090FF", bg: "#03050A",
  surface: "#080C14", border: "#0D1520", text: "#E0E8F0",
  muted: "#6B7A8D", dark: "#0A0F1E"
};

// ── SHARED COMPONENTS ─────────────────────────────────────────
function Dot({ size = 8, pulse = false }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {pulse && <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `${G.cyan}22`, animation: "pulseRing 2s ease-out infinite" }} />}
      <div style={{ width: size, height: size, borderRadius: "50%", background: G.cyan, boxShadow: `0 0 ${size}px ${G.cyan}` }} />
    </div>
  );
}

function Badge({ children, color = G.cyan }) {
  return <span style={{ background: `${color}1A`, color, border: `1px solid ${color}33`, borderRadius: 100, padding: "3px 10px", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 1 }}>{children}</span>;
}

function BtnPrimary({ children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? "#33EDFF" : G.cyan, color: "#000", border: "none", padding: "13px 28px", borderRadius: 100, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.2s", transform: hover ? "translateY(-2px)" : "none", boxShadow: hover ? `0 8px 32px ${G.cyan}44` : "none", ...style }}>
      {children}
    </button>
  );
}

function BtnOutline({ children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? `${G.cyan}0A` : "transparent", color: G.cyan, border: `1.5px solid ${hover ? G.cyan : G.cyan + "44"}`, padding: "12px 28px", borderRadius: 100, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.2s", ...style }}>
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.cyan, letterSpacing: 4, marginBottom: 12, textTransform: "uppercase" }}>{children}</div>;
}

function H2({ children }) {
  return <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#fff", letterSpacing: -1, margin: "0 0 24px", lineHeight: 1.1 }}>{children}</h2>;
}

function Card({ children, style = {}, hover = true }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: G.surface, border: `1px solid ${h ? G.cyan + "33" : G.border}`, borderRadius: 14, transition: "all 0.25s", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? `0 20px 60px ${G.cyan}08` : "none", ...style }}>
      {children}
    </div>
  );
}

// ── SHARED NAV ────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "whitepaper", label: "Whitepaper" },
    { id: "app", label: "Launch App" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "#03050Af0" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${G.border}` : "none", transition: "all 0.3s" }}>
      <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <Dot size={8} pulse />
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" }}>VOIZ</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 3 }}>PROTOCOL</span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {links.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)}
            style={{ background: l.id === "app" ? G.cyan : "transparent", color: l.id === "app" ? "#000" : page === l.id ? G.cyan : G.muted, border: "none", padding: l.id === "app" ? "9px 20px" : "9px 16px", borderRadius: l.id === "app" ? 100 : 8, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: l.id === "app" ? 700 : 500, fontSize: 14, transition: "all 0.2s", borderBottom: page === l.id && l.id !== "app" ? `2px solid ${G.cyan}` : "2px solid transparent" }}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE 1 — LANDING
// ══════════════════════════════════════════════════════════════
function LandingPage({ setPage }) {
  const STATS = [["700M+", "Global Traders"], ["$8B", "Survey Industry"], ["0%", "Tax"], ["1B", "Supply"]];
  const HOW = [
    { who: "BRANDS", icon: "🏢", title: "Post a Survey", desc: "Buy $VOIZ tokens, deposit into smart contract, configure questions and target audience. No monthly fees." },
    { who: "USERS", icon: "🧑‍💻", title: "Answer & Earn", desc: "Connect Phantom wallet, complete available surveys, receive $VOIZ instantly via smart contract." },
    { who: "PROTOCOL", icon: "⚙️", title: "Value Accrues", desc: "5% of every campaign goes to stakers. The more surveys run, the more everyone earns — forever." },
  ];
  const TOKES = [
    { label: "Community Rewards", pct: 40, color: G.cyan },
    { label: "Liquidity Pool", pct: 25, color: G.blue },
    { label: "Team (12mo vest)", pct: 15, color: "#0040FF" },
    { label: "Marketing", pct: 10, color: "#7B2FFF" },
    { label: "Reserve", pct: 10, color: "#1A1A3E" },
  ];
  const ROADMAP = [
    { q: "Q2 2026", t: "Genesis", items: ["Token launch on Solana", "Website & socials", "pump.fun listing", "500 holders"], live: true },
    { q: "Q3 2026", t: "Platform MVP", items: ["Survey beta launch", "Telegram earn bot", "CoinGecko listing", "First brand partner"], live: false },
    { q: "Q4 2026", t: "Scale", items: ["Staking live", "Brand API", "Mobile app beta", "50K holders"], live: false },
    { q: "Q1 2027", t: "Expansion", items: ["CEX listing", "DAO governance", "Enterprise deals", "100K holders"], live: false },
  ];

  const size = 200, r = 72, sw = 32, circ = 2 * Math.PI * r;
  let cum = 0;

  return (
    <div style={{ background: G.bg, color: G.text, minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${G.border} 1px,transparent 1px),linear-gradient(90deg,${G.border} 1px,transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.4 }} />
        <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${G.cyan}06 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 840 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${G.cyan}0D`, border: `1px solid ${G.cyan}22`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <Dot size={6} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.cyan, letterSpacing: 2 }}>NOW LIVE ON SOLANA</span>
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(44px,9vw,88px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, color: "#fff", marginBottom: 12 }}>
            Your Opinion<br />
            <span style={{ background: `linear-gradient(135deg, ${G.cyan}, ${G.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Has Value.</span>
          </h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(16px,2vw,20px)", color: G.muted, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            Brands pay to ask questions. You get paid to answer them. The first decentralized opinion economy — powered by <strong style={{ color: G.text }}>$VOIZ</strong> on Solana.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <BtnPrimary onClick={() => setPage("app")}>🚀 Launch App</BtnPrimary>
            <BtnOutline onClick={() => setPage("whitepaper")}>📄 Read Whitepaper</BtnOutline>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden", maxWidth: 680, margin: "0 auto" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: "20px 16px", textAlign: "center", background: G.surface, borderRight: i < 3 ? `1px solid ${G.border}` : "none" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#fff" }}>{s[0]}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: G.muted, marginTop: 2 }}>{s[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}`, padding: "12px 0", overflow: "hidden", background: G.surface }}>
        <div style={{ display: "inline-block", whiteSpace: "nowrap", animation: "marquee 20s linear infinite" }}>
          {Array(6).fill("$VOIZ • OPINION ECONOMY • EARN BY ANSWERING • BRANDS PAY IN $VOIZ • SOLANA • 0% TAX • STAKE & EARN • REAL UTILITY • ").map((t, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.muted, letterSpacing: 3, marginRight: 24 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* PROBLEM / SOLUTION */}
      <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Why VOIZ Exists</SectionLabel>
          <H2>The Survey Industry Is Broken</H2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          <Card style={{ padding: 40, borderColor: "#CC333322", background: "#0A0505" }} hover={false}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#FF6B6B", letterSpacing: 3, marginBottom: 16 }}>THE PROBLEM</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Today's model</h3>
            {["SurveyMonkey charges $99/month", "Respondents earn $0 for their time", "Fake answers = bad data for brands", "Middlemen keep all the value"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#FF6B6B" }}>✕</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: G.muted }}>{p}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: 40, borderColor: `${G.cyan}22`, background: "#030D10" }} hover={false}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.cyan, letterSpacing: 3, marginBottom: 16 }}>THE SOLUTION</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>VOIZ model</h3>
            {["Brands buy $VOIZ tokens per campaign", "Respondents earn $VOIZ instantly", "On-chain verification = real data", "No middleman — 90% goes to users"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <span style={{ color: G.cyan }}>✓</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: G.muted }}>{p}</span>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", background: G.surface, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>Mechanics</SectionLabel>
            <H2>How VOIZ Works</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {HOW.map((h, i) => (
              <Card key={i} style={{ padding: 32 }}>
                <Badge>{h.who}</Badge>
                <div style={{ fontSize: 44, margin: "20px 0 16px", animation: `float ${2.5 + i * 0.4}s ease-in-out infinite` }}>{h.icon}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{h.title}</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: G.muted, lineHeight: 1.7 }}>{h.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TOKENOMICS */}
      <section style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Distribution</SectionLabel>
          <H2>Tokenomics</H2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 20px ${G.cyan}22)` }}>
              {TOKES.map((t, i) => {
                const dash = (t.pct / 100) * circ;
                const offset = -(cum / 100) * circ;
                cum += t.pct;
                return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.color} strokeWidth={sw} strokeDasharray={`${dash} ${circ}`} strokeDashoffset={offset} />;
              })}
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>1B</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.cyan, letterSpacing: 1 }}>VOIZ</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 260 }}>
            {TOKES.map((t, i) => (
              <Card key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, boxShadow: `0 0 8px ${t.color}`, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: G.text, flex: 1 }}>{t.label}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 700, color: t.color }}>{t.pct}%</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={{ padding: "100px 24px", background: G.surface, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel>Timeline</SectionLabel>
            <H2>Roadmap</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {ROADMAP.map((r, i) => (
              <div key={i} style={{ background: r.live ? "#030D10" : G.surface, border: `1px solid ${r.live ? G.cyan + "33" : G.border}`, borderRadius: 14, padding: 28, position: "relative", overflow: "hidden" }}>
                {r.live && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${G.cyan},transparent)` }} />}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.cyan, letterSpacing: 2 }}>{r.q}</span>
                  {r.live && <Badge>LIVE</Badge>}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: r.live ? "#fff" : G.muted, marginBottom: 14 }}>{r.t}</h3>
                {r.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: r.live ? "#A0B4C8" : "#2A3A4A" }}>
                    <span style={{ color: r.live ? G.cyan : "#1A2A3A" }}>▸</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>🎙️</div>
          <H2>Join the Opinion Economy</H2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, color: G.muted, lineHeight: 1.7, marginBottom: 36 }}>Be early. The $8 billion survey industry is being disrupted. Every opinion you share earns $VOIZ. Every brand that joins buys more tokens. One direction.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <BtnPrimary onClick={() => setPage("app")}>🚀 Start Earning</BtnPrimary>
            <BtnOutline onClick={() => setPage("whitepaper")}>📄 Read Whitepaper</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "𝕏 Twitter", url: CONFIG.twitter },
              { label: "✈ Telegram", url: CONFIG.telegram },
              { label: "🔍 Solscan", url: CONFIG.solscan },
              { label: "🥞 pump.fun", url: CONFIG.pumpfun },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: G.muted, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = G.cyan} onMouseLeave={e => e.target.style.color = G.muted}>{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${G.border}`, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Dot size={8} />
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>VOIZ</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {[["Home", "home"], ["Whitepaper", "whitepaper"], ["App", "app"]].map(([l, p]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 14, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = G.text} onMouseLeave={e => e.target.style.color = G.muted}>{l}</button>
          ))}
          <div style={{ width: 1, height: 16, background: G.border }} />
          {[["𝕏", CONFIG.twitter], ["✈", CONFIG.telegram], ["🔍", CONFIG.solscan]].map(([icon, url]) => (
            <a key={icon} href={url} target="_blank" rel="noreferrer" style={{ color: G.muted, textDecoration: "none", fontSize: 16, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = G.cyan} onMouseLeave={e => e.target.style.color = G.muted}>{icon}</a>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#1A2535", letterSpacing: 2 }}>© 2026 VOIZ PROTOCOL • NOT FINANCIAL ADVICE</p>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE 2 — WHITEPAPER
// ══════════════════════════════════════════════════════════════
const WP_SECTIONS = [
  { id: "wp-abstract", label: "Abstract" },
  { id: "wp-problem", label: "1. The Problem" },
  { id: "wp-solution", label: "2. The Solution" },
  { id: "wp-how", label: "3. How It Works" },
  { id: "wp-antispam", label: "4. Anti-Spam System" },
  { id: "wp-tokenomics", label: "5. Tokenomics" },
  { id: "wp-architecture", label: "6. Architecture" },
  { id: "wp-brands", label: "7. Brand Onboarding" },
  { id: "wp-revenue", label: "8. Revenue Model" },
  { id: "wp-tiers", label: "9. Tier System" },
  { id: "wp-roadmap", label: "10. Roadmap" },
  { id: "wp-vision", label: "11. Vision" },
  { id: "wp-legal", label: "12. Legal" },
];

const WpTable = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", margin: "20px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Outfit',sans-serif", fontSize: 14 }}>
      <thead><tr>{headers.map((h, i) => <th key={i} style={{ background: "#0A1F3A", color: "#fff", padding: "12px 16px", textAlign: "left", borderBottom: `2px solid ${G.cyan}`, whiteSpace: "nowrap", fontWeight: 700 }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, ri) => <tr key={ri} style={{ background: ri % 2 === 0 ? G.surface : "#060A10" }}>{row.map((cell, ci) => <td key={ci} style={{ padding: "10px 16px", borderBottom: `1px solid ${G.border}`, color: "#A0B4C8", lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

const WpCallout = ({ children, type = "info" }) => {
  const c = type === "danger" ? "#FF4444" : type === "warn" ? "#FFD700" : G.cyan;
  const bg = type === "danger" ? "#100505" : type === "warn" ? "#0F0D00" : "#030D10";
  return <div style={{ borderLeft: `4px solid ${c}`, background: bg, padding: "16px 20px", borderRadius: "0 8px 8px 0", margin: "20px 0" }}><p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "#A0B4C8", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>{children}</p></div>;
};

const WpLayer = ({ n, title, bullets }) => (
  <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "22px 26px", marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${G.cyan}1A`, border: `1px solid ${G.cyan}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: 13, color: G.cyan, fontWeight: 700, flexShrink: 0 }}>{n}</div>
      <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: 0 }}>{title}</h4>
    </div>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {bullets.map((b, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: G.muted, lineHeight: 1.7, marginBottom: 5 }}><span style={{ color: G.cyan, fontSize: 10, marginTop: 5, flexShrink: 0 }}>◆</span>{b}</li>)}
    </ul>
  </div>
);

function WhitepaperPage({ setPage }) {
  const [active, setActive] = useState("wp-abstract");
  const [progress, setProgress] = useState(0);
  const obs = useRef(null);

  useEffect(() => {
    const fn = () => { const t = document.body.scrollHeight - window.innerHeight; setProgress(Math.round((window.scrollY / t) * 100)); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    obs.current = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-20% 0px -70% 0px" });
    WP_SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.current.observe(el); });
    return () => obs.current?.disconnect();
  }, []);

  const wpH2 = (text) => <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(24px,4vw,34px)", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: -0.5, paddingTop: 80, marginTop: -40 }}>{text}<div style={{ width: 36, height: 3, background: G.cyan, borderRadius: 2, marginTop: 10 }} /></h2>;
  const wpP = (text, style = {}) => <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: G.muted, lineHeight: 1.9, marginBottom: 14, ...style }}>{text}</p>;
  const wpUl = (items) => <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 18px" }}>{items.map((it, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: G.muted, lineHeight: 1.7, marginBottom: 8 }}><span style={{ color: G.cyan, fontSize: 10, marginTop: 5, flexShrink: 0 }}>◆</span>{it}</li>)}</ul>;
  const hr = () => <hr style={{ border: "none", borderTop: `1px solid ${G.border}`, margin: "44px 0" }} />;

  return (
    <div style={{ background: G.bg, color: G.text, minHeight: "100vh", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, height: 2, background: G.border, zIndex: 199 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: G.cyan, transition: "width 0.1s linear", boxShadow: `0 0 8px ${G.cyan}` }} />
      </div>
      <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Sidebar */}
        <aside style={{ width: 230, flexShrink: 0, position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto", padding: "28px 0", borderRight: `1px solid ${G.border}` }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 3, marginBottom: 14, paddingLeft: 14 }}>CONTENTS</div>
          {WP_SECTIONS.map(s => (
            <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: active === s.id ? `${G.cyan}0D` : "transparent", color: active === s.id ? G.cyan : G.muted, borderLeft: active === s.id ? `2px solid ${G.cyan}` : "2px solid transparent", padding: active === s.id ? "7px 12px" : "7px 14px", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.2s", borderRadius: "0 6px 6px 0" }}>
              {s.label}
            </button>
          ))}
          <div style={{ marginTop: 28, paddingLeft: 14, paddingRight: 14 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 3, marginBottom: 10 }}>TOKEN INFO</div>
            {[["Symbol", "$VOIZ"], ["Network", "Solana"], ["Supply", "1 Billion"], ["Tax", "0% / 0%"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#2A3A4A" }}>{l}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.cyan }}>{v}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "48px 0 48px 52px", maxWidth: 780 }}>
          {/* Hero */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${G.cyan}0D`, border: `1px solid ${G.cyan}22`, borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <Dot size={6} /><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.cyan, letterSpacing: 2 }}>OFFICIAL WHITEPAPER — MAY 2026</span>
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,6vw,60px)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: -2, marginBottom: 16 }}>
              VOIZ Protocol<br /><span style={{ background: `linear-gradient(135deg,${G.cyan},${G.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Whitepaper</span>
            </h1>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, color: G.muted, lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>The Decentralized Opinion Economy — powered by $VOIZ on Solana.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["$VOIZ", "Symbol"], ["Solana", "Network"], ["1B", "Supply"], ["0%", "Tax"]].map(([v, l]) => (
                <div key={l} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 8, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: G.cyan }}>{v}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 2, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {hr()}
          <WpCallout type="danger">⚠️ Disclaimer: This whitepaper is for informational purposes only. $VOIZ is a utility token — not a financial instrument. Cryptocurrency investments carry substantial risk. Always DYOR before participating.</WpCallout>
          {hr()}

          <section id="wp-abstract">{wpH2("Abstract")}{wpP("VOIZ Protocol is a decentralized opinion economy built on Solana. It directly connects global brands seeking consumer insights with everyday users — and compensates them fairly and instantly using the $VOIZ utility token.")}{wpP("The global market research industry is valued at over $8 billion USD annually, yet the vast majority of survey respondents receive zero financial compensation. VOIZ solves this by requiring brands to deposit $VOIZ to run surveys, and automatically distributing those tokens to verified respondents via smart contracts.")}</section>
          {hr()}

          <section id="wp-problem">
            {wpH2("1. The Problem")}
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: G.text, margin: "20px 0 8px" }}>1.1 A Broken $8 Billion Industry</h3>
            {wpP("SurveyMonkey, Qualtrics, and Typeform charge brands $99–$1,000+/month. Respondents receive nothing. The result: bad data, fake answers, and an industry built on extracting value from unpaid labor.")}
            {wpUl(["Brands pay significant monthly subscription fees to survey platforms", "Survey respondents receive zero financial compensation for their time", "Incentiveless responses result in low-quality, rushed, or fabricated answers", "Platforms act as extractive middlemen keeping all value for themselves", "No transparency on how response data is stored, used, or sold"])}
            <WpCallout type="info">The core problem: Brands overpay for bad data. Respondents generate value but receive nothing. VOIZ eliminates this dynamic entirely.</WpCallout>
          </section>
          {hr()}

          <section id="wp-solution">
            {wpH2("2. The Solution — VOIZ Protocol")}
            {wpP("VOIZ is a two-sided marketplace connecting brands with respondents, mediated entirely by smart contracts on Solana. No monthly subscriptions, no extractive middlemen, no unpaid respondents.")}
            <WpTable headers={["Old Model", "VOIZ Model"]} rows={[["Brands pay $99/month", "Brands buy $VOIZ per campaign"], ["Respondents earn $0", "Respondents earn $VOIZ instantly"], ["No verification", "On-chain, permanently recorded"], ["Middleman keeps value", "90% users, 5% stakers, 5% protocol"], ["Data can be altered", "Immutable on Solana blockchain"]]} />
          </section>
          {hr()}

          <section id="wp-how">
            {wpH2("3. How It Works")}
            {wpP("Three parties: Brands (survey creators), Users (respondents), and the Protocol (smart contract). Every financial flow is on-chain and transparent.")}
            <WpTable headers={["Step", "Actor", "Action"]} rows={[["1", "Brand", "Purchases $VOIZ on open market"], ["2", "Brand", "Deposits $VOIZ into survey smart contract"], ["3", "Brand", "Configures questions, target audience, reward per response"], ["4", "User", "Connects Phantom wallet, passes 5-layer security"], ["5", "User", "Completes survey questions"], ["6", "Protocol", "Smart contract verifies & releases $VOIZ to user"], ["7", "Protocol", "5% to treasury, 5% to stakers — automatic"], ["8", "Brand", "Downloads anonymized response CSV from dashboard"]]} />
          </section>
          {hr()}

          <section id="wp-antispam">
            {wpH2("4. Anti-Spam & Sybil Resistance")}
            {wpP("A Sybil attack — creating multiple wallets to drain rewards — is the most critical threat to any earn platform. VOIZ implements 5 independent layers. An attacker must defeat ALL simultaneously.")}
            <WpCallout type="danger">Without robust protection, a single person with 100 wallets could drain an entire survey campaign in minutes, destroying brand trust and platform viability.</WpCallout>
            <div style={{ marginTop: 24 }}>
              <WpLayer n="1" title="Wallet Age ≥ 30 Days" bullets={["All wallets must be at least 30 days old — verifiable on-chain via creation timestamp", "Fresh wallets created to exploit surveys are automatically blocked", "Forces attackers to wait 30 days per wallet — makes mass exploitation impractical"]} />
              <WpLayer n="2" title="Minimum Token Balance" bullets={["Minimum 100 $VOIZ for Basic, 10,000 for Holder, 50,000 for Premium", "100 spam wallets × 100 $VOIZ = 10,000 $VOIZ cost — more than potential reward", "Creates direct financial cost even for basic spam attempts"]} />
              <WpLayer n="3" title="On-Chain Daily Lock" bullets={["Each wallet can complete each survey only once per day — enforced by smart contract", "Smart contract records hash of (wallet + survey_id + date) permanently", "Cannot be bypassed by anyone including the VOIZ team — fully decentralized"]} />
              <WpLayer n="4" title="Reputation Score (0–100)" bullets={["Holder and Premium surveys require reputation ≥ 50 to access", "Reputation is on-chain, non-transferable, and earned only through participation", "New wallets cannot access higher-value surveys regardless of token balance"]} />
              <WpLayer n="5" title="Phone Verification (Premium)" bullets={["Premium tier requires linking a verified phone number — hashed on-chain", "One phone number = one Premium wallet permanently, cannot be reused", "Cost of 100 SIM cards >> potential Premium survey earnings"]} />
            </div>
            <WpTable headers={["Attack", "Why It Fails"]} rows={[["Create 100 new wallets", "Fail Layer 1 — must wait 30 days each"], ["Buy tokens for 100 wallets", "Cost > reward for basic surveys"], ["Complete survey twice", "Layer 3 on-chain lock blocks instantly"], ["Build high-rep bot", "Takes months — economically unviable"], ["Buy 100 SIMs", "Cost >> Premium earnings"]]} />
          </section>
          {hr()}

          <section id="wp-tokenomics">
            {wpH2("5. Tokenomics")}
            <WpTable headers={["Property", "Value"]} rows={[["Token Name", "VOIZ Protocol"], ["Symbol", "$VOIZ"], ["Blockchain", "Solana (SPL Token)"], ["Total Supply", "1,000,000,000 — Fixed, no minting"], ["Buy / Sell Tax", "0% / 0%"]]} />
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: G.text, margin: "24px 0 8px" }}>Distribution</h3>
            <WpTable headers={["Allocation", "%", "Purpose"]} rows={[["Community Rewards", "40%", "Paid to survey respondents over time"], ["Liquidity Pool", "25%", "DEX liquidity, LP locked 12 months"], ["Team & Founders", "15%", "12-month vesting, 3-month cliff"], ["Marketing", "10%", "Campaigns, partnerships, influencers"], ["Reserve", "10%", "Future development, emergency fund"]]} />
            <WpCallout type="info">The more brands use VOIZ, the more $VOIZ they buy. The more users earn, the more they hold for better tiers. Every platform action creates demand for the token.</WpCallout>
          </section>
          {hr()}

          <section id="wp-architecture">
            {wpH2("6. Platform Architecture")}
            {wpP("VOIZ uses a hybrid architecture: blockchain for trust-critical data, traditional database for performance-critical data.")}
            <WpTable headers={["Layer", "Technology", "Stores"]} rows={[["On-Chain (Solana)", "Anchor Smart Contract", "Payouts, completions, reputation, phone hashes, daily locks"], ["Off-Chain (DB)", "Supabase PostgreSQL", "Survey questions, brand details, response text, analytics"]]} />
            <WpTable headers={["Component", "Technology", "Cost"]} rows={[["Frontend", "React.js + Vercel", "Free"], ["Backend", "Node.js + Supabase", "Free tier"], ["Smart Contract", "Solana + Anchor", "~0.1 SOL"], ["Wallet Auth", "Phantom SDK", "Free"]]} />
          </section>
          {hr()}

          <section id="wp-brands">
            {wpH2("7. Brand Onboarding")}
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: G.text, margin: "20px 0 8px" }}>Phase 1 — Managed (Current)</h3>
            {wpUl(["Brand contacts VOIZ team via website form or email", "VOIZ verifies: active website, professional email, LinkedIn presence", "Dashboard access granted within 24 hours", "Brand deposits $VOIZ and creates first survey"])}
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: G.text, margin: "20px 0 8px" }}>Phase 2 — Self-Service (Q3 2026)</h3>
            {wpUl(["Brand completes KYC form on voizprotocol.com/brands", "Automated verification: domain, registration, email", "Smart contract deposit — no manual approval needed", "Full dashboard available immediately after KYC"])}
          </section>
          {hr()}

          <section id="wp-revenue">
            {wpH2("8. Revenue Model")}
            {wpP("Every survey campaign generates automatic protocol revenue via smart contract fee splitting.")}
            <WpTable headers={["Recipient", "Share", "Example (10,000 $VOIZ campaign)"]} rows={[["Survey Respondents", "90%", "9,000 $VOIZ to users"], ["Protocol Treasury", "5%", "500 $VOIZ to team"], ["Staking Pool", "5%", "500 $VOIZ to stakers"]]} />
            <WpTable headers={["Monthly Campaigns", "Avg. Size", "Monthly Revenue (5%)"]} rows={[["10", "5,000 $VOIZ", "2,500 $VOIZ"], ["50", "5,000 $VOIZ", "12,500 $VOIZ"], ["200", "10,000 $VOIZ", "100,000 $VOIZ"], ["500", "20,000 $VOIZ", "500,000 $VOIZ"]]} />
          </section>
          {hr()}

          <section id="wp-tiers">
            {wpH2("9. Tier System & Rewards")}
            <WpTable headers={["Tier", "Name", "Min. Holding", "Reward", "Requirements"]} rows={[["🥉 Bronze", "Citizen", "100 $VOIZ", "Base rate", "None"], ["🥈 Silver", "Contributor", "10,000 $VOIZ", "4x base", "Age 30d, rep 50+"], ["🥇 Gold", "Insider", "50,000 $VOIZ", "20x base", "All Silver + phone"]]} />
            <WpTable headers={["Tier", "Monthly Earning", "USD Equivalent*"]} rows={[["Citizen", "~1,000 $VOIZ", "~$10"], ["Contributor", "~3,750 $VOIZ", "~$37"], ["Insider", "~15,000 $VOIZ", "~$150"], ["Insider + Staking", "~20,000+ $VOIZ", "~$200+"]]} />
            {wpP("*Estimates based on launch price. Actual earnings vary with token price and survey availability.", { fontStyle: "italic", fontSize: 13 })}
          </section>
          {hr()}

          <section id="wp-roadmap">
            {wpH2("10. Roadmap")}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginTop: 24 }}>
              {[
                { q: "Q2 2026", t: "Genesis", items: ["Token launch on Solana", "Website & socials", "500 holders", "CoinGecko listing"], live: true },
                { q: "Q3 2026", t: "Platform MVP", items: ["Survey beta", "Telegram bot", "3 brand partners", "10K holders"], live: false },
                { q: "Q4 2026", t: "Scale", items: ["Staking live", "Brand API", "Mobile app", "50K holders"], live: false },
                { q: "Q1 2027", t: "Expansion", items: ["CEX listing", "DAO governance", "Enterprise", "100K holders"], live: false },
              ].map((r, i) => (
                <div key={i} style={{ background: r.live ? "#030D10" : G.surface, border: `1px solid ${r.live ? G.cyan + "33" : G.border}`, borderRadius: 10, padding: 20, position: "relative", overflow: "hidden" }}>
                  {r.live && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${G.cyan},transparent)` }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.cyan, letterSpacing: 2 }}>{r.q}</span>
                    {r.live && <Badge>LIVE</Badge>}
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: r.live ? "#fff" : G.muted, marginBottom: 10 }}>{r.t}</div>
                  {r.items.map((it, j) => <div key={j} style={{ fontSize: 12, color: r.live ? "#A0B4C8" : "#2A3A4A", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: r.live ? G.cyan : "#1A2A3A" }}>▸</span>{it}</div>)}
                </div>
              ))}
            </div>
          </section>
          {hr()}

          <section id="wp-vision">
            {wpH2("11. Vision")}
            <WpCallout type="info">"We believe every human opinion has value. Today, that value is captured entirely by corporations. VOIZ returns it to the people who generate it — one survey at a time, on-chain, forever."</WpCallout>
            {wpP("Blockchain is not used here for novelty. It solves three specific problems no other technology can:")}
            {wpUl(["Trustless payments: Smart contracts pay users automatically — no possibility of withholding payment", "Immutable records: Completions and reputation scores cannot be altered or deleted by anyone", "Global access: Anyone with a smartphone and Solana wallet can participate, regardless of banking access"])}
          </section>
          {hr()}

          <section id="wp-legal">
            {wpH2("12. Legal & Risk Disclosures")}
            {wpP("$VOIZ is designed as a utility token providing access to the VOIZ survey platform. It is not a security, investment contract, or financial instrument.")}
            {wpUl(["Market Risk: Cryptocurrency markets are highly volatile", "Regulatory Risk: Future regulations could impact platform operations", "Technology Risk: Smart contracts may contain undiscovered vulnerabilities", "Adoption Risk: Platform success depends on brand and user adoption", "Liquidity Risk: Token liquidity may be limited in early stages"])}
            <WpCallout type="danger">Nothing in this whitepaper constitutes financial, investment, tax, or legal advice. Never invest more than you can afford to lose. DYOR — Do Your Own Research.</WpCallout>
          </section>

          {hr()}
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: G.cyan, marginBottom: 8 }}>VOIZ Protocol</div>
            <p style={{ color: G.muted, fontSize: 14, marginBottom: 24 }}>
                <a href={CONFIG.website} target="_blank" rel="noreferrer" style={{ color: G.muted, textDecoration: "none" }} onMouseEnter={e=>e.target.style.color=G.cyan} onMouseLeave={e=>e.target.style.color=G.muted}>voizprotocol.com</a>
                {" • "}
                <a href={CONFIG.twitter} target="_blank" rel="noreferrer" style={{ color: G.muted, textDecoration: "none" }} onMouseEnter={e=>e.target.style.color=G.cyan} onMouseLeave={e=>e.target.style.color=G.muted}>@VOIZProtocol</a>
                {" • "}
                <a href={CONFIG.telegram} target="_blank" rel="noreferrer" style={{ color: G.muted, textDecoration: "none" }} onMouseEnter={e=>e.target.style.color=G.cyan} onMouseLeave={e=>e.target.style.color=G.muted}>t.me/VOIZProtocol</a>
              </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <BtnPrimary onClick={() => setPage("app")}>🚀 Start Earning</BtnPrimary>
              <a href={CONFIG.whitepaper_pdf} target="_blank" rel="noreferrer" style={{ background: "transparent", color: G.cyan, border: `1.5px solid ${G.cyan}44`, padding: "12px 28px", borderRadius: 100, fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-block" }}>↓ PDF</a>
              <BtnOutline onClick={() => setPage("home")} style={{}}>← Home</BtnOutline>
            </div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#1A2535", letterSpacing: 2, marginTop: 24 }}>© 2026 VOIZ PROTOCOL • v1.0 • NOT FINANCIAL ADVICE</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE 3 — APP (survey platform, simplified)
// ══════════════════════════════════════════════════════════════
const SURVEYS = [
  { id: "s1", tier: "basic", brand: "Nike", icon: "👟", title: "What motivates your sneaker purchases?", questions: 4, reward: 50, time: "2 min" },
  { id: "s2", tier: "basic", brand: "Zomato", icon: "🍕", title: "How often do you order food delivery?", questions: 3, reward: 30, time: "1 min" },
  { id: "s3", tier: "holder", brand: "Samsung", icon: "📱", title: "Rate your smartphone upgrade habits", questions: 6, reward: 250, time: "4 min" },
  { id: "s4", tier: "holder", brand: "HDFC Bank", icon: "🏦", title: "Your experience with digital banking", questions: 8, reward: 400, time: "5 min" },
  { id: "s5", tier: "premium", brand: "Apple", icon: "🍎", title: "Upcoming product preference study", questions: 12, reward: 1200, time: "8 min" },
  { id: "s6", tier: "premium", brand: "Tesla", icon: "⚡", title: "EV adoption barriers in emerging markets", questions: 15, reward: 2000, time: "10 min" },
];

const SQ = {
  s1: [{ q: "How often do you buy sneakers?", o: ["Monthly", "Every 3 months", "Every 6 months", "Yearly"] }, { q: "What matters most?", o: ["Brand", "Comfort", "Style", "Price"] }, { q: "Where do you shop?", o: ["Online", "Physical store", "Both", "Second-hand"] }, { q: "Your budget?", o: ["Under $25", "$25–$60", "$60–$180", "$180+"] }],
  s2: [{ q: "How many times per week do you order delivery?", o: ["Never", "1–2 times", "3–5 times", "Daily"] }, { q: "Primary reason for ordering?", o: ["Convenience", "Variety", "No time to cook", "Treat myself"] }, { q: "Preferred platform?", o: ["Zomato", "Swiggy", "Both equally", "Other"] }],
  s3: [{ q: "How often do you upgrade your phone?", o: ["Every year", "Every 2 years", "Every 3+ years", "When it breaks"] }, { q: "What triggers an upgrade?", o: ["New features", "Better camera", "Battery issues", "Phone damage"] }, { q: "Preferred brand?", o: ["Samsung", "Apple", "OnePlus", "Other"] }, { q: "Budget?", o: ["Under $180", "$180–$360", "$360–$720", "$720+"] }, { q: "Most important spec?", o: ["Camera", "Battery", "Performance", "Display"] }, { q: "Where do you buy?", o: ["Online", "Brand store", "Retail", "Second-hand"] }],
  s4: [{ q: "Satisfaction with bank app?", o: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"] }, { q: "Branch visits?", o: ["Never", "Yearly", "Monthly", "Weekly"] }, { q: "Do you use UPI?", o: ["Always", "Often", "Sometimes", "Never"] }, { q: "Wish your bank had?", o: ["Better UI", "Faster support", "More rewards", "Lower fees"] }, { q: "Trust bank with investments?", o: ["Fully", "Mostly", "Somewhat", "Not at all"] }, { q: "Preferred support?", o: ["Chat", "Phone", "Email", "Branch"] }, { q: "Switch for better digital?", o: ["Definitely", "Maybe", "Unlikely", "Never"] }, { q: "Rate digital banking overall", o: ["Excellent", "Good", "Average", "Poor"] }],
  s5: [{ q: "Likely to buy next iPhone?", o: ["Definitely", "Probably", "Unlikely", "Never"] }, { q: "Most important feature?", o: ["Camera", "Battery", "AI features", "Design"] }, { q: "Budget for flagship?", o: ["Under $960", "$960–$1,200", "$1,200–$1,800", "$1,800+"] }, { q: "Apple ecosystem user?", o: ["Yes, multiple", "Just iPhone", "No", "Planning to"] }, { q: "What would make you switch?", o: ["Better camera", "Ecosystem", "Status", "Nothing"] }, { q: "Apple Intelligence AI?", o: ["Very excited", "Interested", "Indifferent", "Concerned"] }, { q: "Purchase channel?", o: ["Apple Store", "Online", "Retail partner", "Carrier"] }, { q: "Keep Apple products?", o: ["5+ years", "3–4 years", "2 years", "1 year"] }, { q: "After-sales service?", o: ["Excellent", "Good", "Average", "Poor"] }, { q: "Recommend Apple?", o: ["Definitely", "Probably", "Maybe not", "No"] }, { q: "Apple Vision Pro?", o: ["Want now", "Wait for v2", "Maybe someday", "Not interested"] }, { q: "Overall satisfaction?", o: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"] }],
  s6: [{ q: "Considered buying an EV?", o: ["Own one", "Planning", "Considered", "No interest"] }, { q: "Biggest barrier?", o: ["Charging infra", "High price", "Range anxiety", "Lack of trust"] }, { q: "Daily driving distance?", o: ["Under 20km", "20–50km", "50–100km", "100km+"] }, { q: "Home charging access?", o: ["Easy", "Possible", "Difficult", "No"] }, { q: "EV budget?", o: ["Under $12K", "$12K–$24K", "$24K–$48K", "$48K+"] }, { q: "Preferred EV type?", o: ["Hatchback", "Sedan", "SUV", "2-wheeler"] }, { q: "Government incentives?", o: ["Fully aware", "Somewhat", "Heard of it", "Unaware"] }, { q: "Charging infrastructure?", o: ["Good enough", "Improving", "Inadequate", "Very poor"] }, { q: "Trusted EV brand?", o: ["Tesla", "Tata", "MG", "Ola Electric"] }, { q: "Environmental motivation?", o: ["Primary reason", "One of many", "Minor", "Not a factor"] }, { q: "Timeline for first EV?", o: ["Within 1 year", "1–3 years", "3–5 years", "5+ years"] }, { q: "Recommend EVs?", o: ["Strongly yes", "Yes", "Maybe", "No"] }, { q: "Public charging speed?", o: ["Very fast", "Acceptable", "Too slow", "Never used"] }, { q: "Most needed improvement?", o: ["Range", "Price", "Charging speed", "Service"] }, { q: "Overall EV readiness?", o: ["Ready now", "Need 1 year", "Need 2+ years", "Not planning"] }],
};

function AppPage({ setPage }) {
  const [wallet, setWallet] = useState(null);
  const [wData, setWData] = useState(null);
  const [tab, setTab] = useState("surveys");
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [doneModal, setDoneModal] = useState(null);
  const [blockModal, setBlockModal] = useState(null);
  const [notif, setNotif] = useState(null);
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const toast = (msg, type = "ok") => { setNotif({ msg, type }); setTimeout(() => setNotif(null), 3000); };

  const connect = (preset) => {
    const addr = Math.random().toString(36).slice(2, 46);
    const d = { createdAt: Date.now() - preset.age * 86400000, balance: preset.bal, reputation: preset.rep, phoneVerified: preset.phone || false, completed: [], earned: 0, count: 0 };
    setWallet(addr); setWData(d); toast(`Connected as ${preset.name}!`);
  };

  const save = (updates) => { const d = { ...wData, ...updates }; setWData(d); };

  const tryStart = (survey) => {
    const age = Math.floor((Date.now() - wData.createdAt) / 86400000);
    const today = new Date().toISOString().slice(0, 10);
    const key = `${survey.id}_${today}`;
    const checks = [
      { label: "Wallet age > 30 days", pass: age >= 30, detail: `${age} days old` },
      { label: "Min 100 $VOIZ balance", pass: wData.balance >= 100, detail: `${wData.balance.toLocaleString()} $VOIZ` },
      { label: "Not completed today", pass: !wData.completed.includes(key), detail: wData.completed.includes(key) ? "Already done today" : "Not yet attempted ✓" },
      ...(survey.tier !== "basic" ? [{ label: "Reputation ≥ 50", pass: wData.reputation >= 50, detail: `Score: ${wData.reputation}/100` }] : []),
      ...(survey.tier === "premium" ? [{ label: "Phone verified", pass: !!wData.phoneVerified, detail: wData.phoneVerified ? "Verified ✓" : "Not verified" }, { label: "Hold 50,000+ $VOIZ", pass: wData.balance >= 50000, detail: `${wData.balance.toLocaleString()} / 50,000` }] : []),
      ...(survey.tier === "holder" ? [{ label: "Hold 10,000+ $VOIZ", pass: wData.balance >= 10000, detail: `${wData.balance.toLocaleString()} / 10,000` }] : []),
    ];
    if (checks.some(c => !c.pass)) { setBlockModal({ survey, checks }); return; }
    setActiveSurvey(survey); setStep(0); setAnswers({}); setTab("taking");
  };

  const finish = () => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `${activeSurvey.id}_${today}`;
    save({ balance: wData.balance + activeSurvey.reward, reputation: Math.min(wData.reputation + 5, 100), completed: [...wData.completed, key], earned: (wData.earned || 0) + activeSurvey.reward, count: (wData.count || 0) + 1 });
    setDoneModal(activeSurvey); setActiveSurvey(null); setTab("surveys");
  };

  const isDone = (s) => wData?.completed.includes(`${s.id}_${new Date().toISOString().slice(0, 10)}`);
  const tier = !wData ? null : wData.balance >= 50000 ? "premium" : wData.balance >= 10000 ? "holder" : "basic";
  const tierColor = tier === "premium" ? G.cyan : tier === "holder" ? G.blue : G.muted;
  const tierName = tier === "premium" ? "🥇 Insider" : tier === "holder" ? "🥈 Contributor" : "🥉 Citizen";

  // SURVEY TAKING
  if (tab === "taking" && activeSurvey) {
    const qs = SQ[activeSurvey.id] || [];
    const q = qs[step];
    return (
      <div style={{ background: G.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "90px 24px 24px", fontFamily: "'Outfit',sans-serif" }}>
        <div style={{ width: "100%", maxWidth: 580 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.muted }}>{activeSurvey.icon} {activeSurvey.brand}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.cyan }}>{step + 1} / {qs.length}</span>
          </div>
          <div style={{ height: 4, background: "#111", borderRadius: 2, marginBottom: 28 }}>
            <div style={{ height: "100%", width: `${((step + 1) / qs.length) * 100}%`, background: G.cyan, borderRadius: 2, transition: "width 0.4s ease", boxShadow: `0 0 8px ${G.cyan}66` }} />
          </div>
          <Card style={{ padding: 36 }} hover={false}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 28, lineHeight: 1.4 }}>{q.q}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.o.map((opt, i) => (
                <div key={i} onClick={() => setAnswers(a => ({ ...a, [step]: opt }))}
                  style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${answers[step] === opt ? G.cyan : G.border}`, background: answers[step] === opt ? `${G.cyan}0D` : G.bg, cursor: "pointer", color: answers[step] === opt ? G.cyan : "#A0B4C8", fontWeight: 500, fontSize: 15, transition: "all 0.15s" }}>
                  {opt}
                </div>
              ))}
            </div>
            <button onClick={() => answers[step] && (step < qs.length - 1 ? setStep(s => s + 1) : finish())} disabled={!answers[step]}
              style={{ marginTop: 24, width: "100%", background: answers[step] ? G.cyan : "#111", color: answers[step] ? "#000" : "#333", border: "none", padding: 15, borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, cursor: answers[step] ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
              {step < qs.length - 1 ? "Next →" : `Submit & Earn ${activeSurvey.reward} $VOIZ 🎉`}
            </button>
          </Card>
          <button onClick={() => { setActiveSurvey(null); setTab("surveys"); }} style={{ marginTop: 14, background: "none", border: "none", color: G.muted, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: 14, width: "100%" }}>← Exit</button>
        </div>
      </div>
    );
  }

  // CONNECT SCREEN
  if (!wallet) {
    return (
      <div style={{ background: G.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "90px 24px 24px" }}>
        <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${G.cyan}0D`, border: `1px solid ${G.cyan}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22 }}>🎙️</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>VOIZ App</h1>
          <p style={{ color: G.muted, fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>Connect your wallet to start earning $VOIZ by answering brand surveys.</p>
          <Card style={{ padding: 24, marginBottom: 16 }} hover={false}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.cyan, letterSpacing: 3, marginBottom: 14 }}>DEMO WALLETS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "New User", age: 5, bal: 150, rep: 35, phone: false, desc: "Basic surveys only" },
                { name: "Holder", age: 45, bal: 12000, rep: 72, phone: false, desc: "Holder surveys unlocked" },
                { name: "Premium", age: 90, bal: 55000, rep: 88, phone: true, desc: "All surveys unlocked" },
              ].map((p, i) => (
                <div key={i} onClick={() => connect(p)} style={{ padding: "12px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${G.cyan}44`} onMouseLeave={e => e.currentTarget.style.borderColor = G.border}>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>{p.desc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: G.cyan }}>{p.bal.toLocaleString()} $VOIZ</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted }}>{p.age}d old</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <a href="https://phantom.app" target="_blank" rel="noreferrer" style={{ display:"block", background: "#AB9FF2", color: "#000", padding: "14px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, textDecoration: "none", textAlign: "center" }}>👻 Connect Phantom Wallet</a>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", marginTop: 12, fontFamily: "'Outfit',sans-serif", fontSize: 14 }}>← Back to site</button>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Outfit',sans-serif", color: G.text }}>
      {notif && <div style={{ position: "fixed", top: 76, right: 20, zIndex: 500, background: notif.type === "err" ? "#1A0505" : "#051A0A", border: `1px solid ${notif.type === "err" ? "#FF3D0044" : "#00FF8844"}`, borderRadius: 10, padding: "12px 18px", fontWeight: 600, fontSize: 14, color: notif.type === "err" ? "#FF6B6B" : "#00FF88" }}>{notif.msg}</div>}

      {/* Done modal */}
      {doneModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000C", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDoneModal(null)}>
          <Card style={{ padding: 44, maxWidth: 380, textAlign: "center" }} hover={false}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Survey Complete!</h2>
            <p style={{ color: G.muted, marginBottom: 20, fontSize: 14 }}>{doneModal.brand} — {doneModal.title.slice(0, 40)}...</p>
            <div style={{ background: `${G.cyan}0D`, border: `1px solid ${G.cyan}33`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: G.muted, letterSpacing: 3, marginBottom: 6 }}>EARNED</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 42, fontWeight: 800, color: G.cyan }}>+{doneModal.reward}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: `${G.cyan}88` }}>$VOIZ</div>
            </div>
            <BtnPrimary onClick={() => setDoneModal(null)} style={{ width: "100%", borderRadius: 10 }}>Continue →</BtnPrimary>
          </Card>
        </div>
      )}

      {/* Block modal */}
      {blockModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000C", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setBlockModal(null)}>
          <Card style={{ padding: 32, maxWidth: 440, width: "100%" }} hover={false}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Access Check Failed</h3>
            <p style={{ color: G.muted, fontSize: 14, marginBottom: 20 }}>You need to pass all security layers for this survey.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {blockModal.checks.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: c.pass ? "#0A1A0A" : "#1A0A0A", border: `1px solid ${c.pass ? "#00FF8822" : "#FF3D0022"}`, borderRadius: 8 }}>
                  <span>{c.pass ? "✅" : "❌"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: c.pass ? "#A0C8A0" : "#C88080", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, marginTop: 2 }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setBlockModal(null)} style={{ marginTop: 20, width: "100%", background: G.border, color: G.text, border: "none", padding: 13, borderRadius: 8, cursor: "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>Got it</button>
          </Card>
        </div>
      )}

      {/* Sub nav */}
      <div style={{ borderBottom: `1px solid ${G.border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 64, background: `${G.bg}f0`, backdropFilter: "blur(20px)", zIndex: 150 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[["surveys", "📋 Surveys"], ["wallet", "💰 Wallet"], ["verify", "🔐 Verify"]].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", borderBottom: tab === t ? `2px solid ${G.cyan}` : "2px solid transparent", color: tab === t ? G.cyan : G.muted, padding: "8px 16px", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge color={tierColor}>{tierName}</Badge>
          <button onClick={() => { setWallet(null); setWData(null); }} style={{ background: "none", border: `1px solid ${G.border}`, color: G.muted, padding: "5px 12px", borderRadius: 100, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>Disconnect</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* SURVEYS TAB */}
        {tab === "surveys" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 28 }}>
              {[{ label: "Balance", value: `${wData.balance.toLocaleString()} $VOIZ`, color: G.cyan }, { label: "Total Earned", value: `${(wData.earned || 0).toLocaleString()} $VOIZ`, color: "#00FF88" }, { label: "Surveys Done", value: wData.count || 0, color: G.blue }, { label: "Reputation", value: `${wData.reputation}/100`, color: "#7B2FFF" }].map((s, i) => (
                <Card key={i} style={{ padding: "16px 18px" }} hover={false}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: G.muted, letterSpacing: 3, marginBottom: 5 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                </Card>
              ))}
            </div>
            {["basic", "holder", "premium"].map(t => (
              <div key={t} style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <Badge color={t === "premium" ? G.cyan : t === "holder" ? G.blue : G.muted}>{t === "basic" ? "🥉 CITIZEN" : t === "holder" ? "🥈 CONTRIBUTOR" : "🥇 INSIDER"}</Badge>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 2 }}>{t === "basic" ? "FREE TO JOIN" : t === "holder" ? "REQUIRES 10,000 $VOIZ" : "REQUIRES 50,000 $VOIZ + PHONE"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
                  {SURVEYS.filter(s => s.tier === t).map(survey => {
                    const done = isDone(survey);
                    return (
                      <Card key={survey.id} style={{ padding: 24, opacity: done ? 0.5 : 1, position: "relative" }}>
                        {done && <div style={{ position: "absolute", top: 12, right: 12 }}><Badge color="#00FF88">DONE TODAY</Badge></div>}
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 2, marginBottom: 8 }}>{survey.icon} {survey.brand}</div>
                        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.3 }}>{survey.title}</h3>
                        <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12, color: G.muted }}>
                          <span>📝 {survey.questions}q</span><span>⏱️ {survey.time}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div><span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: G.cyan }}>{survey.reward}</span><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: `${G.cyan}88`, marginLeft: 4 }}>$VOIZ</span></div>
                          <button onClick={() => tryStart(survey)} disabled={done}
                            style={{ background: done ? "#111" : G.cyan, color: done ? G.muted : "#000", border: "none", padding: "8px 18px", borderRadius: 100, cursor: done ? "not-allowed" : "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, transition: "all 0.2s" }}>
                            {done ? "Done ✓" : "Start →"}
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WALLET TAB */}
        {tab === "wallet" && (
          <div style={{ maxWidth: 540 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 24 }}>Your Wallet</h2>
            <Card style={{ padding: 24, marginBottom: 16 }} hover={false}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 3, marginBottom: 8 }}>ADDRESS</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#A0B4C8", wordBreak: "break-all" }}>{wallet}</div>
            </Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[{ l: "Balance", v: `${wData.balance.toLocaleString()} $VOIZ`, i: "💰" }, { l: "Wallet Age", v: `${Math.floor((Date.now() - wData.createdAt) / 86400000)} days`, i: "📅" }, { l: "Reputation", v: `${wData.reputation}/100`, i: "⭐" }, { l: "Phone", v: wData.phoneVerified ? "Verified ✓" : "Not verified", i: "📱" }].map((s, i) => (
                <Card key={i} style={{ padding: "16px 18px" }} hover={false}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>{s.i}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: G.muted, letterSpacing: 2, marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>{s.v}</div>
                </Card>
              ))}
            </div>
            <Card style={{ padding: 24 }} hover={false}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 3, marginBottom: 16 }}>SECURITY LAYERS</div>
              {[
                { l: "Wallet age > 30 days", p: Math.floor((Date.now() - wData.createdAt) / 86400000) >= 30 },
                { l: "Min 100 $VOIZ balance", p: wData.balance >= 100 },
                { l: "On-chain survey lock active", p: true },
                { l: "Reputation ≥ 50", p: wData.reputation >= 50 },
                { l: "Phone verified", p: !!wData.phoneVerified },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "center" }}>
                  <span>{c.p ? "✅" : "❌"}</span>
                  <span style={{ fontSize: 14, color: c.p ? "#A0C8A0" : G.muted }}>{c.l}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* VERIFY TAB */}
        {tab === "verify" && (
          <div style={{ maxWidth: 440 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Phone Verification</h2>
            <p style={{ color: G.muted, marginBottom: 28 }}>Required for Premium tier. One phone = one Premium account.</p>
            {wData.phoneVerified ? (
              <Card style={{ padding: 40, textAlign: "center", borderColor: "#00FF8833", background: "#051A0A" }} hover={false}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#00FF88", marginBottom: 8 }}>Verified!</h3>
                <p style={{ color: G.muted }}>You have full access to Premium surveys.</p>
              </Card>
            ) : (
              <Card style={{ padding: 28 }} hover={false}>
                {!otpSent ? (
                  <>
                    <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 2, display: "block", marginBottom: 8 }}>PHONE NUMBER</label>
                    <input value={phoneInput} onChange={e => setPhoneInput(e.target.value)} placeholder="+91 98765 43210"
                      style={{ width: "100%", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "13px 16px", color: "#fff", fontFamily: "'DM Mono',monospace", fontSize: 15, marginBottom: 14, boxSizing: "border-box", outline: "none" }} />
                    <BtnPrimary onClick={() => { if (phoneInput.length >= 10) { setOtpSent(true); toast("OTP sent! Use 1234 for demo"); } }} style={{ width: "100%", borderRadius: 8 }}>Send OTP</BtnPrimary>
                  </>
                ) : (
                  <>
                    <div style={{ background: `${G.cyan}0D`, border: `1px solid ${G.cyan}22`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: G.muted }}>OTP sent to {phoneInput}. <strong style={{ color: G.cyan }}>Use 1234 for demo.</strong></div>
                    <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: G.muted, letterSpacing: 2, display: "block", marginBottom: 8 }}>ENTER OTP</label>
                    <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="1234" maxLength={4}
                      style={{ width: "100%", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, padding: "13px 16px", color: "#fff", fontFamily: "'DM Mono',monospace", fontSize: 28, letterSpacing: 10, textAlign: "center", marginBottom: 14, boxSizing: "border-box", outline: "none" }} />
                    <BtnPrimary onClick={() => { if (otp === "1234") { save({ phoneVerified: true }); toast("Phone verified! 🎉 Premium unlocked"); setTab("surveys"); } else { toast("Wrong OTP. Use 1234", "err"); } }} style={{ width: "100%", borderRadius: 8 }}>Verify & Unlock Premium</BtnPrimary>
                  </>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT APP — ROUTER
// ══════════════════════════════════════════════════════════════
export default function VoizApp() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#03050A} ::-webkit-scrollbar-thumb{background:#00E5FF44;border-radius:2px}
      `}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <LandingPage setPage={setPage} />}
      {page === "whitepaper" && <WhitepaperPage setPage={setPage} />}
      {page === "app" && <AppPage setPage={setPage} />}
    </div>
  );
}
