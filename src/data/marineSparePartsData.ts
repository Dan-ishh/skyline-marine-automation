/**
 * Marine Spare Parts Sub-Categories Data
 * Contains the 16 marine spare parts sub-categories
 */

export interface MarineSparePartSubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

/**
 * All Marine Spare Parts Sub-Categories
 * These are the items shown in the Marine Spare Parts mega menu
 */
export const marineSparePartsSubCategories: MarineSparePartSubCategory[] = [
  {
    id: "msp-001",
    name: "Air Valve",
    slug: "air-valve",
    description: "Air valve components and assemblies for marine engines",
    order: 1,
  },
  {
    id: "msp-002",
    name: "Cylinder Head",
    slug: "cylinder-head",
    description: "Cylinder head assemblies and components",
    order: 2,
  },
  {
    id: "msp-003",
    name: "Cylinder Liner",
    slug: "cylinder-liner",
    description: "Cylinder liner components for marine engines",
    order: 3,
  },
  {
    id: "msp-004",
    name: "Connecting Rod",
    slug: "connecting-rod",
    description: "Connecting rod assemblies and replacement parts",
    order: 4,
  },
  {
    id: "msp-005",
    name: "Indicator Valve",
    slug: "indicator-valve",
    description: "Indicator valve components for engine monitoring",
    order: 5,
  },
  {
    id: "msp-006",
    name: "Piston Head",
    slug: "piston-head",
    description: "Piston head assemblies and components",
    order: 6,
  },
  {
    id: "msp-007",
    name: "Piston Rod",
    slug: "piston-rod",
    description: "Piston rod components and assemblies",
    order: 7,
  },
  {
    id: "msp-008",
    name: "Piston Skirt",
    slug: "piston-skirt",
    description: "Piston skirt components for marine engines",
    order: 8,
  },
  {
    id: "msp-009",
    name: "Cylinder Head Water Jacket",
    slug: "cylinder-head-water-jacket",
    description: "Cylinder head water jacket assemblies",
    order: 9,
  },
  {
    id: "msp-010",
    name: "Cylinder Water Jacket",
    slug: "cylinder-water-jacket",
    description: "Cylinder water jacket components",
    order: 10,
  },
  {
    id: "msp-011",
    name: "Camshaft",
    slug: "camshaft",
    description: "Camshaft components and assemblies",
    order: 11,
  },
  {
    id: "msp-012",
    name: "Crankshaft",
    slug: "crankshaft",
    description: "Crankshaft components for marine engines",
    order: 12,
  },
  {
    id: "msp-013",
    name: "Fuel Injector",
    slug: "fuel-injector",
    description: "Fuel injector components and assemblies",
    order: 13,
  },
  {
    id: "msp-014",
    name: "Safety Valve",
    slug: "safety-valve",
    description: "Safety valve components for engine protection",
    order: 14,
  },
  {
    id: "msp-015",
    name: "Valve Box",
    slug: "valve-box",
    description: "Valve box assemblies and components",
    order: 15,
  },
  {
    id: "msp-016",
    name: "Valve Seat",
    slug: "valve-seat",
    description: "Valve seat components and replacements",
    order: 16,
  },
  {
    id: "msp-017",
    name: "Engine Block",
    slug: "engine-block",
    description: "Engine Block assemblies and components",
    order: 16,
  },
];

/**
 * Helper function to get all sub-categories
 */
export const getAllMarineSparePartSubCategories =
  (): MarineSparePartSubCategory[] => {
    return marineSparePartsSubCategories;
  };

/**
 * Helper function to get a sub-category by slug
 */
export const getMarineSparePartSubCategoryBySlug = (
  slug: string
): MarineSparePartSubCategory | undefined => {
  return marineSparePartsSubCategories.find((cat) => cat.slug === slug);
};

/**
 * Helper function to get a sub-category by ID
 */
export const getMarineSparePartSubCategoryById = (
  id: string
): MarineSparePartSubCategory | undefined => {
  return marineSparePartsSubCategories.find((cat) => cat.id === id);
};

export default marineSparePartsSubCategories;
