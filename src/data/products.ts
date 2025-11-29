/**
 * Products Mock Data
 * Marine equipment products across all categories
 */

import { Product } from "../types";

export const products: Product[] = [
  // Main Engines
  {
    id: "prod-001",
    name: "Wärtsilä 31 Main Engine",
    slug: "wartsila-31-main-engine",
    brandId: "wartsila-16",
    category: "Main Engines",
    description:
      "The Wärtsilä 31 is the most fuel-efficient four-stroke engine currently available on the market. Designed for marine propulsion and power generation.",
    price: 0, // Price on request
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "4.2-9.8 MW",
      Speed: "720-1000 rpm",
      Cylinders: "6L, 8L, 9L",
      "Fuel Type": "MDO, HFO, LNG",
      Emissions: "IMO Tier III compliant",
      Weight: "24-56 tonnes",
    },
    inStock: true,
    featured: true,
    enquiryCount: 156,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-002",
    name: "MAN B&W 6S50ME-C Main Engine",
    slug: "man-bw-6s50me-c",
    brandId: "man-bw-6",
    category: "Main Engines",
    description:
      "Two-stroke low-speed diesel engine for large container vessels and bulk carriers.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "9,480 kW",
      Speed: "99 rpm",
      Cylinders: "6",
      Bore: "500 mm",
      Stroke: "2,214 mm",
      "Fuel Consumption": "167 g/kWh",
    },
    inStock: true,
    featured: true,
    enquiryCount: 142,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-003",
    name: "Caterpillar 3516C Marine Engine",
    slug: "cat-3516c-marine",
    brandId: "cat-1",
    category: "Main Engines",
    description:
      "High-performance V16 diesel engine for commercial marine applications.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "2,085-3,386 kW",
      Speed: "1,600-1,800 rpm",
      Configuration: "V16",
      Displacement: "69.0 L",
      Weight: "11,700 kg",
      Applications: "Propulsion, Auxiliary Power",
    },
    inStock: true,
    featured: false,
    enquiryCount: 98,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2025-10-20"),
  },

  // Auxiliary Engines
  {
    id: "prod-004",
    name: "Yanmar 6EY26W Auxiliary Engine",
    slug: "yanmar-6ey26w-auxiliary",
    brandId: "yanmar-17",
    category: "Auxiliary Engines",
    description:
      "Medium-speed diesel generator for auxiliary power generation onboard vessels.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "1,618 kW",
      Speed: "750 rpm",
      Cylinders: "6L",
      "Bore x Stroke": "260 x 440 mm",
      Application: "Generator Drive",
      Cooling: "Water-cooled",
    },
    inStock: true,
    featured: false,
    enquiryCount: 76,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-005",
    name: "Cummins QSK60-M Auxiliary Generator",
    slug: "cummins-qsk60-m-gen",
    brandId: "cummins-2",
    category: "Auxiliary Engines",
    description: "Reliable auxiliary power generation for marine vessels.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "1,800-2,013 kW",
      Speed: "1,500-1,800 rpm",
      Configuration: "V16",
      Displacement: "60 L",
      "Fuel Type": "Diesel",
      Emissions: "IMO II compliant",
    },
    inStock: true,
    featured: false,
    enquiryCount: 64,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2025-10-20"),
  },

  // Automation Systems
  {
    id: "prod-006",
    name: "Wärtsilä NACOS Platinum",
    slug: "wartsila-nacos-platinum",
    brandId: "wartsila-16",
    category: "Automation",
    description:
      "Advanced integrated ship automation system for propulsion, power generation, and auxiliary systems.",
    price: 0,
    images: ["/Assets/images/Products/Automation.jpg"],
    specifications: {
      Type: "Integrated Automation System",
      Features: "Engine Control, Power Management, Alarm Monitoring",
      Display: "Multi-function Touch Screens",
      Redundancy: "Dual redundant controllers",
      Communication: "Modbus, CANbus, Ethernet",
      Certification: "Class approved",
    },
    inStock: true,
    featured: true,
    enquiryCount: 188,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-007",
    name: "Rolls-Royce SAM Electronics",
    slug: "rolls-royce-sam-electronics",
    brandId: "rolls-royce-11",
    category: "Automation",
    description: "Comprehensive ship automation and control system.",
    price: 0,
    images: ["/Assets/images/Products/Automation.jpg"],
    specifications: {
      Type: "Ship Automation",
      Modules: "Engine, Thruster, Power Management",
      Interface: "Touchscreen HMI",
      Protocols: "Modbus RTU/TCP, OPC",
      Monitoring: "Real-time diagnostics",
      Compliance: "IACS standards",
    },
    inStock: true,
    featured: false,
    enquiryCount: 92,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2025-10-20"),
  },

  // Turbo Chargers
  {
    id: "prod-008",
    name: "MAN TCR22 Turbocharger",
    slug: "man-tcr22-turbocharger",
    brandId: "man-7",
    category: "Turbo Chargers",
    description:
      "High-efficiency radial turbocharger for medium-speed marine engines.",
    price: 0,
    images: ["/Assets/images/Products/gear-motors-v1.jpg"],
    specifications: {
      Model: "TCR22",
      Type: "Radial",
      "Compressor Diameter": "400 mm",
      "Turbine Diameter": "420 mm",
      "Max Speed": "19,000 rpm",
      Applications: "Medium-speed engines",
    },
    inStock: true,
    featured: false,
    enquiryCount: 54,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-009",
    name: "Mitsubishi MET83SE Turbocharger",
    slug: "mitsubishi-met83se",
    brandId: "mitsubishi-8",
    category: "Turbo Chargers",
    description: "Compact and efficient turbocharger for auxiliary engines.",
    price: 0,
    images: ["/Assets/images/Products/gear-motors-v1.jpg"],
    specifications: {
      Model: "MET83SE",
      Type: "Single-stage",
      Weight: "850 kg",
      "Max Pressure Ratio": "3.8",
      "Max Speed": "16,500 rpm",
      Maintenance: "Extended service intervals",
    },
    inStock: true,
    featured: false,
    enquiryCount: 41,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2025-10-20"),
  },

  // Oil Purifiers
  {
    id: "prod-010",
    name: "Alfa Laval MAPX 309 Oil Purifier",
    slug: "alfa-laval-mapx-309",
    brandId: "man-7",
    category: "Oil Purifier",
    description: "High-speed separator for fuel oil and lube oil purification.",
    price: 0,
    images: ["/Assets/images/Products/filters-v2.jpg"],
    specifications: {
      Model: "MAPX 309",
      Capacity: "9,800 L/h",
      "Max Speed": "7,600 rpm",
      "Bowl Volume": "30 L",
      Power: "11 kW",
      Applications: "HFO, MDO, LO purification",
    },
    inStock: true,
    featured: true,
    enquiryCount: 118,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-011",
    name: "Westfalia OSE 20 Separator",
    slug: "westfalia-ose-20",
    brandId: "man-bw-6",
    category: "Oil Purifier",
    description: "Self-cleaning oil separator for marine diesel engines.",
    price: 0,
    images: ["/Assets/images/Products/filters-v2.jpg"],
    specifications: {
      Model: "OSE 20",
      Throughput: "5,000 L/h",
      "Bowl Speed": "7,400 rpm",
      "Separation Efficiency": "99.9%",
      Control: "Automatic operation",
      Type: "Self-cleaning disc stack",
    },
    inStock: true,
    featured: false,
    enquiryCount: 72,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2025-10-20"),
  },

  // Hydraulic Pumps
  {
    id: "prod-012",
    name: "Bosch Rexroth A10VSO Hydraulic Pump",
    slug: "bosch-rexroth-a10vso",
    brandId: "man-7",
    category: "Hydraulic Pump",
    description:
      "Variable displacement axial piston pump for marine hydraulic systems.",
    price: 0,
    images: ["/Assets/images/Products/gear-motors-v1.jpg"],
    specifications: {
      Type: "Axial piston",
      Displacement: "18-140 cm³",
      "Max Pressure": "280 bar",
      "Speed Range": "1,200-2,600 rpm",
      Control: "Hydraulic proportional",
      Applications: "Deck machinery, Steering",
    },
    inStock: true,
    featured: false,
    enquiryCount: 86,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2025-10-20"),
  },

  // Heat Exchangers
  {
    id: "prod-013",
    name: "Alfa Laval M15-BFM Plate Heat Exchanger",
    slug: "alfa-laval-m15-bfm",
    brandId: "wartsila-16",
    category: "Heat Exchanger",
    description:
      "Compact brazed plate heat exchanger for marine cooling systems.",
    price: 0,
    images: ["/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"],
    specifications: {
      Type: "Plate Heat Exchanger",
      "Heat Transfer Area": "1.5-25 m²",
      "Max Pressure": "30 bar",
      "Max Temperature": "225°C",
      Material: "Stainless steel 316",
      Applications: "Engine cooling, HVAC",
    },
    inStock: true,
    featured: false,
    enquiryCount: 94,
    createdAt: new Date("2024-03-25"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-014",
    name: "Bowman Shell & Tube Heat Exchanger",
    slug: "bowman-shell-tube",
    brandId: "cat-1",
    category: "Heat Exchanger",
    description:
      "Robust shell and tube heat exchanger for heavy-duty marine applications.",
    price: 0,
    images: ["/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"],
    specifications: {
      Type: "Shell & Tube",
      "Heat Duty": "50-500 kW",
      "Tube Material": "Cupro-nickel",
      "Shell Material": "Carbon steel",
      "Design Pressure": "10 bar",
      Certification: "Lloyd's approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 68,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2025-10-20"),
  },

  // Electric Motors
  {
    id: "prod-015",
    name: "ABB M3BP 315 Electric Motor",
    slug: "abb-m3bp-315",
    brandId: "rolls-royce-11",
    category: "Electric Motor",
    description:
      "Marine-duty three-phase induction motor for pumps and compressors.",
    price: 0,
    images: ["/Assets/images/Products/electric-motors-v1.jpg"],
    specifications: {
      Power: "90-200 kW",
      Voltage: "380-690 V",
      Speed: "750-3,000 rpm",
      "Frame Size": "315",
      Efficiency: "IE3",
      Protection: "IP55",
    },
    inStock: true,
    featured: false,
    enquiryCount: 102,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-016",
    name: "Siemens 1LA8 Marine Motor",
    slug: "siemens-1la8-marine",
    brandId: "man-7",
    category: "Electric Motor",
    description: "Rugged AC motor designed for harsh marine environments.",
    price: 0,
    images: ["/Assets/images/Products/electric-motors-v1.jpg"],
    specifications: {
      Power: "0.75-355 kW",
      Voltage: "400/690 V",
      Poles: "2, 4, 6, 8",
      Enclosure: "Totally enclosed",
      Insulation: "Class F",
      "Marine Type": "Type approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 78,
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2025-10-20"),
  },

  // Switch & Controller
  {
    id: "prod-017",
    name: "Schneider Electric TeSys GV3 Motor Starter",
    slug: "schneider-tesys-gv3",
    brandId: "wartsila-16",
    category: "Switch & Controller",
    description:
      "Thermal-magnetic motor circuit breaker for marine applications.",
    price: 0,
    images: ["/Assets/images/Products/electric-equipments-v1.jpg"],
    specifications: {
      Type: "Motor Protection",
      "Current Range": "0.25-100 A",
      "Breaking Capacity": "50 kA",
      "Trip Class": "Class 10A",
      Certification: "DNV GL, ABS",
      Mounting: "DIN rail",
    },
    inStock: true,
    featured: false,
    enquiryCount: 56,
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-018",
    name: "ABB ACS880 Marine Drive",
    slug: "abb-acs880-marine",
    brandId: "rolls-royce-11",
    category: "Switch & Controller",
    description: "Variable frequency drive for marine pump and fan control.",
    price: 0,
    images: ["/Assets/images/Products/electric-equipments-v1.jpg"],
    specifications: {
      "Power Range": "0.75-5,600 kW",
      Voltage: "380-690 V AC",
      "Control Mode": "DTC, Scalar",
      Protection: "IP54",
      Features: "Built-in PLC, Safe torque off",
      Approval: "All major class societies",
    },
    inStock: true,
    featured: true,
    enquiryCount: 134,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2025-10-20"),
  },

  // Life Boats
  {
    id: "prod-019",
    name: "Norsafe Magnum 70 Lifeboat",
    slug: "norsafe-magnum-70",
    brandId: "rolls-royce-11",
    category: "Life Boat",
    description: "Freefall lifeboat for offshore and merchant vessels.",
    price: 0,
    images: ["/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"],
    specifications: {
      Capacity: "70 persons",
      Length: "9.0 m",
      "Launch Type": "Freefall",
      Engine: "Diesel inboard",
      Speed: "6 knots",
      Certification: "SOLAS, IMO LSA Code",
    },
    inStock: true,
    featured: false,
    enquiryCount: 44,
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-020",
    name: "Viking SOLAS B Life Raft",
    slug: "viking-solas-b-life-raft",
    brandId: "rolls-royce-11",
    category: "Life Boat",
    description: "Inflatable life raft meeting SOLAS requirements.",
    price: 0,
    images: ["/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"],
    specifications: {
      Capacity: "6-25 persons",
      Type: "Inflatable SOLAS B",
      Container: "Rigid canister",
      Inflation: "CO2 automatic",
      Service: "12-month intervals",
      Standard: "SOLAS Amendment",
    },
    inStock: true,
    featured: false,
    enquiryCount: 38,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2025-10-20"),
  },

  // Navigation & Radar
  {
    id: "prod-021",
    name: "Furuno FAR-2228 Marine Radar",
    slug: "furuno-far-2228",
    brandId: "wartsila-16",
    category: "Navigation & Radar",
    description:
      "S-band radar with solid-state technology for commercial vessels.",
    price: 0,
    images: ["/Assets/images/Products/Automation.jpg"],
    specifications: {
      Frequency: "S-band (3 GHz)",
      "Output Power": "25 kW",
      Range: "0.0625-96 NM",
      Antenna: "12 ft / 3.6 m",
      Features: "ARPA, ATA, EPA",
      Standard: "IMO SOLAS, IEC",
    },
    inStock: true,
    featured: true,
    enquiryCount: 166,
    createdAt: new Date("2024-05-05"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-022",
    name: "JRC JAN-9201 ECDIS",
    slug: "jrc-jan-9201-ecdis",
    brandId: "wartsila-16",
    category: "Navigation & Radar",
    description:
      "Type approved Electronic Chart Display and Information System.",
    price: 0,
    images: ["/Assets/images/Products/Automation.jpg"],
    specifications: {
      Display: '24" TFT LCD',
      Charts: "S-57 ENC",
      Backup: "Integrated backup",
      Interface: "Multi-touch",
      Compliance: "IMO Performance Standards",
      Updates: "AVCS chart updates",
    },
    inStock: true,
    featured: false,
    enquiryCount: 124,
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2025-10-20"),
  },

  // OMD & ODME
  {
    id: "prod-023",
    name: "Rivertrace RI-3500 ODME",
    slug: "rivertrace-ri-3500-odme",
    brandId: "wartsila-16",
    category: "OMD & ODME",
    description:
      "Oil Discharge Monitoring Equipment for compliance with MARPOL Annex I.",
    price: 0,
    images: ["/Assets/images/Products/marine-Equipment-and-accesories-v1.jpg"],
    specifications: {
      Type: "ODME",
      Measurement: "0-100 ppm",
      "Flow Rate": "5-2,000 m³/h",
      Accuracy: "±1 ppm",
      Display: "Color touchscreen",
      Approval: "IMO MEPC, Class societies",
    },
    inStock: true,
    featured: false,
    enquiryCount: 82,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2025-10-20"),
  },

  // Anchor & Chain
  {
    id: "prod-024",
    name: "MacGregor VW Windlass 50T",
    slug: "macgregor-vw-windlass-50t",
    brandId: "rolls-royce-11",
    category: "Anchor & Chain",
    description: "Heavy-duty vertical windlass for large vessels.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Type: "Vertical Windlass",
      Capacity: "50 tonnes",
      "Chain Size": "84-102 mm",
      "Motor Power": "75 kW",
      Speed: "9 m/min",
      "Brake Type": "Hydraulic band brake",
    },
    inStock: true,
    featured: false,
    enquiryCount: 48,
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-025",
    name: "Hall Anchor 8,000 kg",
    slug: "hall-anchor-8000kg",
    brandId: "rolls-royce-11",
    category: "Anchor & Chain",
    description: "Stockless marine anchor for commercial vessels.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Type: "Hall Stockless",
      Weight: "8,000 kg",
      Material: "Cast steel",
      Standard: "Lloyd's Register",
      "Shank Length": "4.2 m",
      Certification: "Class approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 36,
    createdAt: new Date("2024-05-25"),
    updatedAt: new Date("2025-10-20"),
  },

  // Fresh Water Generator
  {
    id: "prod-026",
    name: "Alfa Laval JWP-26 Fresh Water Generator",
    slug: "alfa-laval-jwp-26",
    brandId: "wartsila-16",
    category: "Fresh Water Generator",
    description: "Plate-type evaporator for potable water production onboard.",
    price: 0,
    images: ["/Assets/images/Products/filters-v2.jpg"],
    specifications: {
      Capacity: "26 tonnes/day",
      Type: "Plate evaporator",
      Heating: "Engine jacket water",
      Salinity: "Max 3 ppm TDS",
      Power: "2.2 kW",
      Treatment: "UV sterilization",
    },
    inStock: true,
    featured: true,
    enquiryCount: 148,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-027",
    name: "Wartsila AquaMarin 80 FWG",
    slug: "wartsila-aquamarin-80",
    brandId: "wartsila-16",
    category: "Fresh Water Generator",
    description:
      "Energy-efficient fresh water generator with reverse osmosis option.",
    price: 0,
    images: ["/Assets/images/Products/filters-v2.jpg"],
    specifications: {
      Production: "80 m³/day",
      Technology: "Vacuum distillation",
      "Heat Source": "Waste heat",
      "Power Consumption": "15 kW",
      Automation: "Fully automatic",
      Quality: "WHO standards",
    },
    inStock: true,
    featured: false,
    enquiryCount: 96,
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2025-10-20"),
  },

  // Deck Machinery
  {
    id: "prod-028",
    name: "TTS Deck Crane 30T/25M",
    slug: "tts-deck-crane-30t-25m",
    brandId: "rolls-royce-11",
    category: "Deck Machinery",
    description: "Hydraulic deck crane for cargo handling operations.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Capacity: "30 tonnes @ 8m",
      Outreach: "25 m",
      "Lift Height": "30 m",
      Slewing: "360° continuous",
      Drive: "Hydraulic",
      Control: "Radio remote",
    },
    inStock: true,
    featured: false,
    enquiryCount: 64,
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-029",
    name: "MacGregor RoRo Ramp System",
    slug: "macgregor-roro-ramp",
    brandId: "rolls-royce-11",
    category: "Deck Machinery",
    description: "Heavy-duty stern ramp for RoRo vessels.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Type: "Stern Ramp",
      SWL: "100 tonnes",
      Width: "12 m",
      Length: "20 m",
      Operation: "Electro-hydraulic",
      Certification: "Class approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 52,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2025-10-20"),
  },

  // Pumps
  {
    id: "prod-030",
    name: "Grundfos CRN 64 Centrifugal Pump",
    slug: "grundfos-crn-64",
    brandId: "wartsila-16",
    category: "Pump",
    description: "Multi-stage centrifugal pump for marine water systems.",
    price: 0,
    images: ["/Assets/images/Products/gear-motors-v1.jpg"],
    specifications: {
      Type: "Multistage centrifugal",
      "Flow Rate": "0-64 m³/h",
      Head: "Up to 340 m",
      "Motor Power": "30 kW",
      Material: "Stainless steel 316",
      Temperature: "-10 to 120°C",
    },
    inStock: true,
    featured: false,
    enquiryCount: 108,
    createdAt: new Date("2024-06-20"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-031",
    name: "Sulzer XRW Screw Pump",
    slug: "sulzer-xrw-screw-pump",
    brandId: "sulzer-13",
    category: "Pump",
    description: "Twin-screw pump for heavy fuel oil transfer.",
    price: 0,
    images: ["/Assets/images/Products/gear-motors-v1.jpg"],
    specifications: {
      Type: "Twin Screw",
      Capacity: "5-200 m³/h",
      Pressure: "Up to 25 bar",
      Viscosity: "Up to 860,000 cSt",
      Temperature: "-20 to 350°C",
      Application: "Heavy fuel oil",
    },
    inStock: true,
    featured: false,
    enquiryCount: 76,
    createdAt: new Date("2024-06-25"),
    updatedAt: new Date("2025-10-20"),
  },

  // Air/Gas/Chilling Compressor
  {
    id: "prod-032",
    name: "Atlas Copco GA 90 Air Compressor",
    slug: "atlas-copco-ga-90",
    brandId: "wartsila-16",
    category: "Air/Gas/Chilling Compressor",
    description:
      "Oil-injected rotary screw compressor for marine compressed air systems.",
    price: 0,
    images: ["/Assets/images/Products/aircompressor-v1.jpg"],
    specifications: {
      Type: "Rotary Screw",
      "Free Air Delivery": "16.5 m³/min",
      Pressure: "7.5-13 bar",
      "Motor Power": "90 kW",
      Cooling: "Air-cooled",
      "Marine Type": "Approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 88,
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-033",
    name: "Carrier 30RB Marine Chiller",
    slug: "carrier-30rb-chiller",
    brandId: "rolls-royce-11",
    category: "Air/Gas/Chilling Compressor",
    description: "Screw compressor water chiller for HVAC systems.",
    price: 0,
    images: ["/Assets/images/Products/aircompressor-v1.jpg"],
    specifications: {
      "Cooling Capacity": "500-1,500 kW",
      Compressor: "Twin screw",
      Refrigerant: "R134a",
      Control: "PIC controller",
      Efficiency: "EER 3.2",
      Certification: "Marine type approved",
    },
    inStock: true,
    featured: false,
    enquiryCount: 72,
    createdAt: new Date("2024-07-05"),
    updatedAt: new Date("2025-10-20"),
  },

  // Offshore Rigs
  {
    id: "prod-034",
    name: "NOV 7500 HP Mud Pump",
    slug: "nov-7500-hp-mud-pump",
    brandId: "rolls-royce-11",
    category: "Offshore Rigs",
    description:
      "High-pressure triplex mud pump for offshore drilling operations.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Type: "Triplex",
      Power: "7,500 HP",
      "Max Pressure": "7,500 psi",
      "Flow Rate": "2,180 GPM",
      "Liner Size": '7.5"',
      Application: "Drilling mud circulation",
    },
    inStock: true,
    featured: false,
    enquiryCount: 42,
    createdAt: new Date("2024-07-10"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-035",
    name: "Cameron BOP Stack",
    slug: "cameron-bop-stack",
    brandId: "rolls-royce-11",
    category: "Offshore Rigs",
    description: "Blowout preventer stack for deepwater drilling.",
    price: 0,
    images: ["/Assets/images/Products/bearings-v1.jpg"],
    specifications: {
      Type: "Subsea BOP",
      "Bore Size": '18-3/4"',
      "Pressure Rating": "15,000 psi",
      "Water Depth": "Up to 10,000 ft",
      Rams: "Blind, Shear, Pipe",
      Certification: "API 16A",
    },
    inStock: true,
    featured: false,
    enquiryCount: 28,
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2025-10-20"),
  },

  // Electric Items
  {
    id: "prod-036",
    name: "Schneider PowerPact Circuit Breaker",
    slug: "schneider-powerpact-breaker",
    brandId: "wartsila-16",
    category: "Electric Item",
    description: "Marine-grade molded case circuit breaker.",
    price: 0,
    images: ["/Assets/images/Products/panel-boards-v3.jpg"],
    specifications: {
      Type: "MCCB",
      "Frame Size": "630A",
      "Breaking Capacity": "65 kA",
      Poles: "3P, 4P",
      "Trip Unit": "Thermal-magnetic",
      Approval: "IEC, DNV GL",
    },
    inStock: true,
    featured: false,
    enquiryCount: 92,
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-037",
    name: "ABB MNS Switchgear",
    slug: "abb-mns-switchgear",
    brandId: "rolls-royce-11",
    category: "Electric Item",
    description: "Low voltage marine switchboard system.",
    price: 0,
    images: ["/Assets/images/Products/panel-boards-v3.jpg"],
    specifications: {
      Type: "LV Switchboard",
      "Rated Current": "Up to 6,300 A",
      Voltage: "690 V AC",
      Form: "Form 4b",
      "Arc Rating": "AFLR 50 kA",
      Classification: "All major class societies",
    },
    inStock: true,
    featured: true,
    enquiryCount: 156,
    createdAt: new Date("2024-07-25"),
    updatedAt: new Date("2025-10-20"),
  },

  // Additional Featured Products
  {
    id: "prod-038",
    name: "Volvo Penta D13 Marine Engine",
    slug: "volvo-penta-d13",
    brandId: "volvo-15",
    category: "Main Engines",
    description:
      "In-line 6-cylinder marine diesel engine with excellent fuel economy.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "368-515 kW",
      Speed: "1,800-2,300 rpm",
      Configuration: "In-line 6",
      Displacement: "12.8 L",
      Weight: "1,450 kg",
      Applications: "Medium-speed vessels",
    },
    inStock: true,
    featured: true,
    enquiryCount: 186,
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-039",
    name: "Daihatsu 6DK-28 Main Engine",
    slug: "daihatsu-6dk-28",
    brandId: "daihatsu-14",
    category: "Main Engines",
    description: "Medium-speed four-stroke marine diesel engine.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "3,240 kW",
      Speed: "600 rpm",
      Cylinders: "6L",
      "Bore x Stroke": "280 x 380 mm",
      "Fuel Consumption": "185 g/kWh",
      Type: "Four-stroke",
    },
    inStock: true,
    featured: false,
    enquiryCount: 68,
    createdAt: new Date("2024-08-05"),
    updatedAt: new Date("2025-10-20"),
  },
  {
    id: "prod-040",
    name: "Niigata 28AHX Marine Engine",
    slug: "niigata-28ahx",
    brandId: "niigata-9",
    category: "Auxiliary Engines",
    description: "High-speed diesel generator for auxiliary power.",
    price: 0,
    images: ["/Assets/images/Products/Diesel-engine-And-Generators-v1.jpg"],
    specifications: {
      "Power Output": "1,200 kW",
      Speed: "900 rpm",
      Cylinders: "6L",
      "Bore x Stroke": "280 x 330 mm",
      Application: "Generator drive",
      Cooling: "Freshwater cooled",
    },
    inStock: true,
    featured: false,
    enquiryCount: 54,
    createdAt: new Date("2024-08-10"),
    updatedAt: new Date("2025-10-20"),
  },
];

/**
 * Helper Functions
 */

import { getBrandById } from "./brands";

// Enrich a product with brand data
const enrichProductWithBrand = (product: Product): Product => {
  const brand = getBrandById(product.brandId);
  return {
    ...product,
    brand,
  };
};

export const getAllProducts = (): Product[] => {
  return products.map(enrichProductWithBrand);
};

export const getProductById = (id: string): Product | undefined => {
  const product = products.find((product) => product.id === id);
  return product ? enrichProductWithBrand(product) : undefined;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const product = products.find((product) => product.slug === slug);
  return product ? enrichProductWithBrand(product) : undefined;
};

export const getProductsByBrand = (brandId: string): Product[] => {
  return products
    .filter((product) => product.brandId === brandId)
    .map(enrichProductWithBrand);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products
    .filter((product) => product.category === category)
    .map(enrichProductWithBrand);
};

export const getFeaturedProducts = (): Product[] => {
  return products
    .filter((product) => product.featured)
    .map(enrichProductWithBrand);
};

export const getLatestProducts = (limit: number = 8): Product[] => {
  return [...products]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
    .map(enrichProductWithBrand);
};

export const getMostEnquiredProducts = (limit: number = 8): Product[] => {
  return [...products]
    .sort((a, b) => b.enquiryCount - a.enquiryCount)
    .slice(0, limit)
    .map(enrichProductWithBrand);
};

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories).sort();
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    )
    .map(enrichProductWithBrand);
};

export default products;
