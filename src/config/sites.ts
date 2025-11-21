export type NoradSite = {
  id: string;
  vercelProjectId: string;
  name: string;
  slug: string;
  baseUrl: string;
};

export const NORAD_SITES: NoradSite[] = [
 {
  id: "gp31",
- vercelProjectId: "prj_xxx_gp31",
+ vercelProjectId: "gp31",
  name: "GP31 Baseball",
  slug: "gp31",
  baseUrl: "https://gp31baseball.com",
}
,
  {
    id: "realtor",
    vercelProjectId: "prj_xxx_realtor",
    name: "Carolyn Snell Realtor",
    slug: "realtor",
    baseUrl: "https://carolynsnellrealtor.com",
  },
  {
    id: "oleum",
    vercelProjectId: "prj_xxx_oleum",
    name: "Oleum Consulting",
    slug: "oleum",
    baseUrl: "https://oleumconsulting.com",
  }
];
