# PageTurn Bookstore — Project Reference

## Brand
- Name: PageTurn
- Type: Premium E-Commerce Bookstore

## Design Tokens
- Font Headings: Playfair Display (Google Fonts)
- Font Body/UI: Inter (Google Fonts)
- BG: #FAFAF7 | Brand Red: #C0392B | Navy: #2C3E50
- Text: #1A1A1A | Muted: #6B6B6B | Card BG: #FFFFFF
- Border-radius: 8px cards, 4px buttons
- Max width: 1280px centered
- Shadows: 0 2px 12px rgba(0,0,0,0.07)

## Tech Stack
- React (JSX) + Tailwind CSS
- Icons: lucide-react
- Google Fonts via @import
- State: useState/useReducer
- No backend — mock data only
- Images: https://picsum.photos/seed/{title}/300/450

## Sample Book Data (reuse across all prompts)
[
  { id:1, title:"The Silent Patient", author:"Alex Michaelides", genre:"Thriller", mrp:399, price:320, cover:"https://picsum.photos/seed/silentpatient/300/450" },
  { id:2, title:"Atomic Habits", author:"James Clear", genre:"Self-Help", mrp:599, price:480, cover:"https://picsum.photos/seed/atomichabits/300/450" },
  { id:3, title:"Ikigai", author:"Hector Garcia", genre:"Self-Help", mrp:599, price:570, cover:"https://picsum.photos/seed/ikigai/300/450" },
  { id:4, title:"Verity", author:"Colleen Hoover", genre:"Thriller", mrp:399, price:320, cover:"https://picsum.photos/seed/verity/300/450" },
  { id:5, title:"Dune", author:"Frank Herbert", genre:"Sci-Fi", mrp:699, price:594, cover:"https://picsum.photos/seed/dune/300/450" },
  { id:6, title:"A Little Life", author:"Hanya Yanagihara", genre:"Fiction", mrp:699, price:595, cover:"https://picsum.photos/seed/alittlelife/300/450" },
  { id:7, title:"The Midnight Library", author:"Matt Haig", genre:"Fiction", mrp:699, price:665, cover:"https://picsum.photos/seed/midnightlibrary/300/450" },
  { id:8, title:"Project Hail Mary", author:"Andy Weir", genre:"Sci-Fi", mrp:599, price:570, cover:"https://picsum.photos/seed/projecthailmary/300/450" },
  { id:9, title:"The 48 Laws of Power", author:"Robert Greene", genre:"Business", mrp:999, price:850, cover:"https://picsum.photos/seed/48laws/300/450" },
  { id:10, title:"Tuesdays With Morrie", author:"Mitch Albom", genre:"Non-Fiction", mrp:299, price:240, cover:"https://picsum.photos/seed/tuesdaysmorrie/300/450" },
  { id:11, title:"Palace of Illusions", author:"Chitra Banerjee", genre:"Mythology", mrp:499, price:425, cover:"https://picsum.photos/seed/palaceofillusions/300/450" },
  { id:12, title:"It Ends With Us", author:"Colleen Hoover", genre:"Romance", mrp:499, price:450, cover:"https://picsum.photos/seed/itendswithus/300/450" }
]

## Global Components (build once, reuse)
- BookCard: cover image, title, author, MRP strikethrough, sale price, savings badge, Add to Cart, Wishlist heart
- SectionHeader: Playfair Display h2 + italic subtext + "View All →" link
- AnnouncementBar: red bg, scrolling marquee
- Navbar: logo left, mega-menu center, icons right — sticky with backdrop blur
- Footer: 4-col navy bg

## Cart State Shape
{ items: [{id, title, price, qty, cover}], total: Number }

## Pages Built (check off as done)
- [x] Prompt 1: Layout Shell + Homepage Hero + Navbar + Footer
- [x] Prompt 2: Homepage Sections (Bestsellers, Pre-orders, Quotes, Newsletter)
- [x] Prompt 3: Product Listing Page (PLP) + Filters + Sort
- [x] Prompt 4: Product Detail Page (PDP)
- [x] Prompt 5: Cart Page + Checkout Flow + Toast System
- [x] Prompt 6: Admin Panel
## Admin Panel (Prompt 6)
- Route: "admin" — accessible via currentPage state router
- Login: email = admin@pageturn.com / password = admin123
- Sections: Dashboard, Books Manager, Orders, Customers, Coupons, Settings
- Admin state shape:
  { 
    books: [...BOOKS from above],
    orders: [{ id, customer, items, total, status, date }],
    customers: [{ id, name, email, orders, spent }],
    coupons: [{ code, discount, type, active }]
  }
- Design: sidebar nav (dark navy #2C3E50) + main content area (light gray #F4F5F7)
- Keep Playfair Display for page titles, Inter for all UI/data
- Admin is completely separate from storefront — no shared header/footer
## Migration Notes
- Source: single App.jsx file with all components, pages, admin panel
- Target: proper Vite + React multi-file structure
- Rules during migration:
  → ZERO logic changes
  → ZERO styling changes  
  → ZERO feature changes
  → Only split, reorganize, add imports/exports
  → Every component gets its own file
  → All mock data moves to /src/data/
  → All context moves to /src/context/
  → Use React Router v6 for page routing (replace currentPage state)