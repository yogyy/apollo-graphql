import { Outlet, Link, useLocation } from "react-router-dom";

export default function Root() {
  let { pathname } = useLocation();

  return (
    <main>
      <nav className="block top-0">
        <ul className="flex items-center gap-4 justify-start [&>li]:list-none">
          {["users", "movies"].map((link) => (
            <li
              key={link}
              className={pathname === `/${link}` ? "text-accent" : ""}>
              <Link
                className="text-inherit"
                to={link}>
                {link[0].toUpperCase() + link.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}
