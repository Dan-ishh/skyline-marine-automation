# Skyline Marine Automation PortalThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A professional Next.js portal for marine equipment products where users can browse brands, view products, and submit inquiries.## Getting Started

## 🚀 Project StatusFirst, run the development server:

**Foundation Setup: Complete ✅**```bash

npm run dev

This project has been initialized with a complete professional structure and is ready for development.# or

yarn dev

## 📦 Tech Stack# or

pnpm dev

- **Framework:** Next.js 16.0.0 (Page Router)# or

- **Language:** TypeScriptbun dev

- **State Management:** Zustand```

- **Styling:** SCSS/SASS

- **UI Components:** React SelectOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Responsive:** Mobile-first (320px minimum width)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🏗️ Project Structure

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

```

skyline-automation/## Learn More

├── pages/                      # Next.js pages (Page Router)

│   ├── _app.tsx               # Custom App componentTo learn more about Next.js, take a look at the following resources:

│   ├── _document.tsx          # Custom Document

│   ├── index.tsx              # Home page- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

│   ├── brands/                # Brands and products pages- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

│   └── contact.tsx            # Contact page (to be created)

├── src/You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

│   ├── components/            # React components

│   │   ├── common/           # Reusable components## Deploy on Vercel

│   │   ├── layout/           # Layout components (Header, Footer)

│   │   ├── home/             # Home page componentsThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

│   │   ├── brands/           # Brand components

│   │   └── products/         # Product componentsCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

│   ├── store/                # Zustand state management ✅
│   │   ├── useBrandStore.ts
│   │   ├── useProductStore.ts
│   │   ├── useInquiryStore.ts
│   │   └── useUIStore.ts
│   ├── types/                # TypeScript types ✅
│   │   ├── brand.types.ts
│   │   ├── product.types.ts
│   │   ├── inquiry.types.ts
│   │   └── common.types.ts
│   ├── data/                 # Mock data (to be created)
│   ├── utils/                # Utility functions (to be created)
│   ├── hooks/                # Custom React hooks (to be created)
│   └── styles/               # SCSS styles (to be created)
├── public/                   # Static assets
├── PROJECT_INSTRUCTIONS.md   # Comprehensive project documentation ✅
├── PROMPTS.md               # Session continuation prompts ✅
└── README.md                # This file

✅ = Complete
```

## 📚 Documentation

### Key Documentation Files

1. **PROJECT_INSTRUCTIONS.md** - Complete project documentation including:

   - Detailed requirements and specifications
   - Architecture overview
   - Component guidelines
   - Type definitions
   - Implementation phases
   - Best practices

2. **PROMPTS.md** - Step-by-step development prompts for:
   - Building all components
   - Implementing all features
   - Session continuation guidance
   - 14+ detailed development sessions

## 🎯 Features

### Planned Features

- ✅ Home page with banner, latest products, most enquired products
- ✅ Brand listing and browsing
- ✅ Product catalog by brand
- ✅ Individual product detail pages
- ✅ Inquiry form popup modal
- ✅ Contact page
- ✅ Responsive design (320px - 1920px+)
- ✅ State management with Zustand
- ✅ TypeScript type safety

### Pages

1. **Home** (`/`) - Main landing page
2. **Brands** (`/brands`) - All brands listing
3. **Brand Products** (`/brands/[brandSlug]`) - Products by brand
4. **Product Detail** (`/brands/[brandSlug]/[productSlug]`) - Individual product
5. **Contact** (`/contact`) - Contact information and inquiry form

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

Dependencies are already installed:

```bash
✅ next@16.0.0
✅ react@19.2.0
✅ zustand@5.0.2
✅ sass@1.83.3
✅ react-select@5.9.0
```

### Development

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📖 Development Guide

### Next Steps

Follow the **PROMPTS.md** file for detailed step-by-step development instructions. The prompts are organized into 14 sessions covering:

1. **Session 1:** Type System Setup ✅
2. **Session 2:** Global Styles & SCSS
3. **Session 3:** Zustand Stores ✅
4. **Session 4:** Mock Data & Utilities
5. **Session 5:** Layout Components
6. **Session 6:** Common Components
7. **Session 7:** Home Page Components
8. **Session 8:** Brands Pages
9. **Session 9:** Product Details Page
10. **Session 10:** Contact Page
11. **Session 11:** Custom Hooks
12. **Session 12:** Integration & Testing
13. **Session 13:** Polish & Optimization
14. **Session 14:** Final Touches

### Quick Start Development

To continue development, use the prompts in **PROMPTS.md** starting from Session 2.1:

```
I'm working on the Skyline Marine Automation portal project.
I need to set up the complete SCSS styling foundation...
```

## 🎨 Design System

The project follows a professional design system with:

- Consistent color palette (marine/industrial theme)
- Typography scale
- Responsive breakpoints (320px - 1920px+)
- Component library
- SCSS variables and mixins

## 🔧 State Management

### Zustand Stores (✅ Complete)

- **useBrandStore** - Manages brand data and selection
- **useProductStore** - Manages product data, filtering, and latest/most enquired
- **useInquiryStore** - Handles inquiry form state and validation
- **useUIStore** - Controls modals, mobile menu, and loading states

## 📝 TypeScript Types (✅ Complete)

All TypeScript types are defined in `src/types/`:

- Brand types
- Product types
- Inquiry types
- Common types

## 🤝 Contributing

This is a private project. Follow the project structure and coding standards outlined in PROJECT_INSTRUCTIONS.md.

## 📄 License

Private Project - All Rights Reserved

---

## 🎯 Current Status

### ✅ Completed

- [x] Project initialization with Next.js Page Router
- [x] Dependencies installed (Zustand, SASS, React Select)
- [x] Professional folder structure created
- [x] TypeScript type system complete
- [x] Zustand stores implemented
- [x] Comprehensive documentation created
- [x] Development prompts prepared

### 🔄 Next Up

- [ ] SCSS styling system (Next: Session 2 in PROMPTS.md)
- [ ] Mock data creation
- [ ] Component development
- [ ] Page implementation

### 📋 Upcoming

- [ ] Layout components (Header, Footer)
- [ ] Common components (Button, Card, Modal)
- [ ] Home page implementation
- [ ] Brands and products pages
- [ ] Contact page
- [ ] Testing and optimization

---

**Ready to build!** 🚀

Use the prompts in **PROMPTS.md** to continue development step-by-step.

For detailed information, see [PROJECT_INSTRUCTIONS.md](./PROJECT_INSTRUCTIONS.md)
