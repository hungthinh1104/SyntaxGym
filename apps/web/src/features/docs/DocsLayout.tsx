import { Outlet, NavLink } from "react-router-dom";
import { ui } from "../../lib/ui";

export function DocsLayout() {
  return (
    <div className="flex flex-col lg:flex-row gap-32 w-full max-w-[1200px] mx-auto">
      <aside className="w-full lg:w-[240px] shrink-0">
        <h3 className={ui.eyebrow + " mb-16"}>Documentation</h3>
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              to="/docs/what-is-syntaxgym"
              className={({ isActive }) =>
                isActive
                  ? `${ui.navButton} w-full text-left bg-lavender-mist text-sst-ink`
                  : `${ui.navButton} w-full text-left`
              }
            >
              What is SyntaxGym?
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/rust-typing-practice"
              className={({ isActive }) =>
                isActive
                  ? `${ui.navButton} w-full text-left bg-lavender-mist text-sst-ink`
                  : `${ui.navButton} w-full text-left`
              }
            >
              Rust typing practice
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/rust-option-result-practice"
              className={({ isActive }) =>
                isActive
                  ? `${ui.navButton} w-full text-left bg-lavender-mist text-sst-ink`
                  : `${ui.navButton} w-full text-left`
              }
            >
              Option & Result Practice
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/rust-enum-match-practice"
              className={({ isActive }) =>
                isActive
                  ? `${ui.navButton} w-full text-left bg-lavender-mist text-sst-ink`
                  : `${ui.navButton} w-full text-left`
              }
            >
              Enum & Match Practice
            </NavLink>
          </li>
        </ul>
      </aside>

      <div className="flex-1 min-w-0 pb-32">
        <Outlet />
      </div>
    </div>
  );
}
