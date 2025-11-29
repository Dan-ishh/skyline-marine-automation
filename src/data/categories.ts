/**
 * Product Categories Data
 * All marine equipment categories for navigation and filtering
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const categories: Category[] = [
  {
    id: "cat-001",
    name: "Main Engines and Spares",
    slug: "main-engines",
    description: "High-performance main propulsion engines for vessels",
  },
  {
    id: "cat-002",
    name: "Auxiliary Engines and Spares",
    slug: "auxiliary-engines",
    description: "Auxiliary power generation engines and components",
  },
  {
    id: "cat-003",
    name: "Offshore Rigs",
    slug: "offshore-rigs",
    description: "Equipment and systems for offshore drilling operations",
  },
  {
    id: "cat-004",
    name: "Automation",
    slug: "automation",
    description: "Advanced automation and control systems",
  },
  {
    id: "cat-005",
    name: "Oil Purifier and Spares",
    slug: "oil-purifier",
    description: "Oil purification systems and spare parts",
  },
  {
    id: "cat-006",
    name: "Air, Gas and Chilling Compressor",
    slug: "compressors",
    description: "Industrial compressors for various applications",
  },
  {
    id: "cat-007",
    name: "Hydraulic Pump and Motor",
    slug: "hydraulic-pump",
    description: "Hydraulic power systems and components",
  },
  {
    id: "cat-008",
    name: "Turbo Charges and Spares",
    slug: "turbo-charges",
    description: "Turbochargers and replacement parts",
  },
  {
    id: "cat-009",
    name: "Fresh Water Generator",
    slug: "fresh-water-generator",
    description: "Water desalination and purification systems",
  },
  {
    id: "cat-010",
    name: "Heat Exchanger",
    slug: "heat-exchanger",
    description: "Marine heat exchange equipment",
  },
  {
    id: "cat-011",
    name: "OMD & ODME",
    slug: "omd-odme",
    description: "Oil discharge monitoring equipment",
  },
  {
    id: "cat-012",
    name: "Deck Machinery",
    slug: "deck-machinery",
    description: "Deck equipment and handling systems",
  },
  {
    id: "cat-013",
    name: "Life Boat and Davit",
    slug: "life-boat",
    description: "Life-saving equipment and davit systems",
  },
  {
    id: "cat-014",
    name: "Navigation and Radar",
    slug: "navigation-radar",
    description: "Navigation systems and radar equipment",
  },
  {
    id: "cat-015",
    name: "Pump",
    slug: "pump",
    description: "Marine pumps for various applications",
  },
  {
    id: "cat-016",
    name: "Electric Motor",
    slug: "electric-motor",
    description: "Electric motors and drive systems",
  },
  {
    id: "cat-017",
    name: "Anchor & Chain",
    slug: "anchor-chain",
    description: "Anchoring systems and chains",
  },
  {
    id: "cat-018",
    name: "Electric Item",
    slug: "electric-item",
    description: "Electrical components and accessories",
  },
  {
    id: "cat-019",
    name: "Switch and Controller",
    slug: "switch-controller",
    description: "Electrical switches and control systems",
  },
];

export default categories;
