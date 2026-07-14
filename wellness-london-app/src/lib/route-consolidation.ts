export type PermanentRouteRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export const permanentRouteRedirects: PermanentRouteRedirect[] = [
  {
    source: "/journal/best-saunas-london",
    destination: "/collections/best-sauna-london",
    permanent: true,
  },
  {
    source: "/editorial/best-saunas-london",
    destination: "/collections/best-sauna-london",
    permanent: true,
  },
  {
    source: "/best-sauna-cold-plunge-london",
    destination: "/collections/best-contrast-therapy-london",
    permanent: true,
  },
  {
    source: "/best-recovery-clubs-london",
    destination: "/collections/best-recovery-clubs-london",
    permanent: true,
  },
  {
    source: "/journal",
    destination: "/editorial",
    permanent: true,
  },
  {
    source: "/journal/:slug*",
    destination: "/editorial/:slug*",
    permanent: true,
  },
  {
    source: "/longevity-london",
    destination: "/longevity",
    permanent: true,
  },
];
