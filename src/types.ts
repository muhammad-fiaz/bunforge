export interface PageMeta {
  title: string;
  description: string;
}

export interface PageComponent {
  meta: PageMeta;
  render: () => string;
  client?: () => void;
}

export interface Route {
  path: string;
  component: PageComponent;
}
