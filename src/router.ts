import type { Route } from "./types";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { NotFound } from "./pages/404";

export const routes: Route[] = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/404.html", component: NotFound }
];
