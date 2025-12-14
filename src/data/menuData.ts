/**
 * Centralized Menu Data
 * Contains navigation menu structure, main menu items, and sub-items
 */

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  icon?: React.ReactNode;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  href: string;
  hasMegaMenu?: boolean;
  icon?: string;
}

export interface MenuSubItem {
  id: string;
  label: string;
  slug: string;
  href: string;
}

/**
 * MAIN NAVIGATION MENU ITEMS
 * Home, Marine Spare Parts, Complete Engine, Generators, Turbochargers
 */
export const mainNavigation: MenuItem[] = [
  {
    id: "nav-home",
    label: "Home",
    href: "/",
  },
  {
    id: "nav-spare-parts",
    label: "Marine Spare Parts",
    href: "/marine-spare-parts",
    hasMegaMenu: true,
  },
  {
    id: "nav-complete-engine",
    label: "Complete Engine",
    href: "/complete-engine",
  },
  {
    id: "nav-generators",
    label: "Generators",
    href: "/generators",
  },
  {
    id: "nav-turbochargers",
    label: "Turbochargers",
    href: "/turbochargers",
  },
];

/**
 * MAIN PRODUCT CATEGORIES
 * These represent the 4 main menu items (excluding Home)
 */
export const mainCategories: MainCategory[] = [
  {
    id: "cat-marine-spare-parts",
    name: "Marine Spare Parts",
    slug: "marine-spare-parts",
    description: "Complete range of marine spare parts and components",
    href: "/marine-spare-parts",
    hasMegaMenu: true,
  },
  {
    id: "cat-complete-engine",
    name: "Complete Engine",
    slug: "complete-engine",
    description: "Full marine engines and propulsion systems",
    href: "/complete-engine",
  },
  {
    id: "cat-generators",
    name: "Generators",
    slug: "generators",
    description: "Marine electrical generators and power generation systems",
    href: "/generators",
  },
  {
    id: "cat-turbochargers",
    name: "Turbochargers",
    slug: "turbochargers",
    description: "Turbocharger systems for marine engines",
    href: "/turbochargers",
  },
];

/**
 * MARINE SPARE PARTS SUB-ITEMS
 * These items appear in the popover menu on hover (desktop) or accordion (mobile)
 * Based on the provided image
 */
export const marineSparePartsItems: MenuSubItem[] = [
  {
    id: "spare-air-valve",
    label: "Air Valve",
    slug: "air-valve",
    href: "/marine-spare-parts/air-valve",
  },
  {
    id: "spare-cylinder-head",
    label: "Cylinder head",
    slug: "cylinder-head",
    href: "/marine-spare-parts/cylinder-head",
  },
  {
    id: "spare-cylinder-liner",
    label: "Cylinder liner",
    slug: "cylinder-liner",
    href: "/marine-spare-parts/cylinder-liner",
  },
  {
    id: "spare-connecting-rod",
    label: "Connecting Rod",
    slug: "connecting-rod",
    href: "/marine-spare-parts/connecting-rod",
  },
  {
    id: "spare-indicator-valve",
    label: "Indicator Valve",
    slug: "indicator-valve",
    href: "/marine-spare-parts/indicator-valve",
  },
  {
    id: "spare-piston-head",
    label: "Piston Head",
    slug: "piston-head",
    href: "/marine-spare-parts/piston-head",
  },
  {
    id: "spare-piston-rod",
    label: "Piston Rod",
    slug: "piston-rod",
    href: "/marine-spare-parts/piston-rod",
  },
  {
    id: "spare-piston-skirt",
    label: "Piston Skirt",
    slug: "piston-skirt",
    href: "/marine-spare-parts/piston-skirt",
  },
  {
    id: "spare-cylinder-head-water-jacket",
    label: "Cylinder Head Water Jacket",
    slug: "cylinder-head-water-jacket",
    href: "/marine-spare-parts/cylinder-head-water-jacket",
  },
  {
    id: "spare-cylinder-water-jacket",
    label: "cylinder water jacket",
    slug: "cylinder-water-jacket",
    href: "/marine-spare-parts/cylinder-water-jacket",
  },
  {
    id: "spare-camshaft",
    label: "camshaft",
    slug: "camshaft",
    href: "/marine-spare-parts/camshaft",
  },
  {
    id: "spare-crankshaft",
    label: "Crankshaft",
    slug: "crankshaft",
    href: "/marine-spare-parts/crankshaft",
  },
  {
    id: "spare-fuel-injector",
    label: "Fuel injector",
    slug: "fuel-injector",
    href: "/marine-spare-parts/fuel-injector",
  },
  {
    id: "spare-safety-valve",
    label: "Safety valve",
    slug: "safety-valve",
    href: "/marine-spare-parts/safety-valve",
  },
  {
    id: "spare-valve-box",
    label: "Valve Box",
    slug: "valve-box",
    href: "/marine-spare-parts/valve-box",
  },
  {
    id: "spare-valve-seat",
    label: "Valve seat",
    slug: "valve-seat",
    href: "/marine-spare-parts/valve-seat",
  },
];

/**
 * Helper function to get menu items for a category
 */
export const getMenuItemsByCategory = (categorySlug: string): MenuSubItem[] => {
  switch (categorySlug) {
    case "marine-spare-parts":
      return marineSparePartsItems;
    default:
      return [];
  }
};

/**
 * Helper function to get main category by slug
 */
export const getMainCategoryBySlug = (
  slug: string
): MainCategory | undefined => {
  return mainCategories.find((cat) => cat.slug === slug);
};

/**
 * Helper function to get navigation item by slug
 */
export const getNavItemBySlug = (slug: string): MenuItem | undefined => {
  return mainNavigation.find((item) => item.href === `/${slug}`);
};
