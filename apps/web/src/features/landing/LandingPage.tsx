import { Link } from "react-router-dom";
import { Seo } from "../../components/Seo";
import { ui } from "../../lib/ui";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-16">
      <Seo
        title="SyntaxGym | Local-First Rust Code Typing Trainer"
        description="Build syntax muscle memory with SyntaxGym, a local-first typing trainer for backend and systems programming languages like Rust."
        canonicalPath="/"
      />

      <div className="max-w-[800px] flex flex-col items-center gap-24">
        <h1 className={ui.heading + " text-[48px] sm:text-[64px] leading-tight tracking-tight text-sst-ink"}>
          Build syntax <br className="sm:hidden" />
          <span className="text-sst-blue">muscle memory</span>.
        </h1>
        
        <p className={ui.body + " text-[18px] sm:text-[20px] max-w-[600px] text-fog"}>
          A distraction-free, fully local-first code typing trainer designed to help you internalize complex Rust patterns like <code className="font-ibm-plex-mono text-code-teal bg-lavender-mist px-4 py-2 rounded">Result&lt;T, E&gt;</code> and <code className="font-ibm-plex-mono text-code-teal bg-lavender-mist px-4 py-2 rounded">match</code>.
        </p>

        <div className="flex flex-col sm:flex-row gap-16 mt-16 w-full sm:w-auto">
          <Link
            to="/practice"
            className={`${ui.ghostButton} bg-sst-ink text-paper hover:bg-sst-ink/90 text-center w-full sm:w-auto py-12 px-24`}
          >
            Start Practice
          </Link>
          <Link
            to="/docs/what-is-syntaxgym"
            className={`${ui.ghostButton} text-center w-full sm:w-auto py-12 px-24 border border-lavender-mist hover:bg-lavender-mist`}
          >
            Read Docs
          </Link>
        </div>

        <div className="mt-32 flex flex-wrap justify-center gap-16 text-caption text-fog font-ibm-plex-mono">
          <span className="flex items-center gap-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            No login required
          </span>
          <span className="flex items-center gap-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Local-first storage
          </span>
          <span className="flex items-center gap-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Token-aware analytics
          </span>
        </div>
      </div>
    </div>
  );
}
