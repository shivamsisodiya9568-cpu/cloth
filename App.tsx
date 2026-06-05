import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Product = {
  id: string;
  name: string;
  category: "Women" | "Men" | "Accessories";
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Sienna Silk Midi Dress",
    category: "Women",
    price: 249,
    oldPrice: 320,
    image:
      "https://images.pexels.com/photos/5137074/pexels-photo-5137074.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
    tag: "Best Seller",
  },
  {
    id: "p2",
    name: "Classic Wool Trench Coat",
    category: "Women",
    price: 389,
    image:
      "https://images.pexels.com/photos/30721037/pexels-photo-30721037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
    tag: "New",
  },
  {
    id: "p3",
    name: "Ivory Linen Blouse",
    category: "Women",
    price: 129,
    image:
      "https://images.pexels.com/photos/18093203/pexels-photo-18093203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
  },
  {
    id: "p4",
    name: "Cashmere Knit Sweater",
    category: "Women",
    price: 199,
    image:
      "https://images.pexels.com/photos/18161522/pexels-photo-18161522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
    tag: "Limited",
  },
  {
    id: "p5",
    name: "Tailored Navy Two-Piece Suit",
    category: "Men",
    price: 549,
    image:
      "https://images.pexels.com/photos/31959300/pexels-photo-31959300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
    tag: "Best Seller",
  },
  {
    id: "p6",
    name: "Pinstripe Wool Blazer",
    category: "Men",
    price: 329,
    image:
      "https://images.pexels.com/photos/35462556/pexels-photo-35462556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
  },
  {
    id: "p7",
    name: "Artisan Leather Tote",
    category: "Accessories",
    price: 279,
    image:
      "https://images.pexels.com/photos/5494389/pexels-photo-5494389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    tag: "New",
  },
  {
    id: "p8",
    name: "Oversized Acetate Sunglasses",
    category: "Accessories",
    price: 89,
    oldPrice: 120,
    image:
      "https://images.pexels.com/photos/12572107/pexels-photo-12572107.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  },
];

const CATEGORIES = [
  {
    name: "Women",
    tagline: "Elegance redefined",
    image:
      "https://images.pexels.com/photos/31621202/pexels-photo-31621202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  },
  {
    name: "Men",
    tagline: "Modern tailoring",
    image:
      "https://images.pexels.com/photos/31959300/pexels-photo-31959300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  },
  {
    name: "Accessories",
    tagline: "Finishing touches",
    image:
      "https://images.pexels.com/photos/5494389/pexels-photo-5494389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900",
  },
];

/* ------------------------------------------------------------------ */
/*  ICONS                                                              */
/* ------------------------------------------------------------------ */

const Icon = {
  Bag: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  ),
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  User: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
  Menu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Truck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Refresh: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 4 6v6c0 4.5 3.2 8.5 8 9 4.8-.5 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Leaf: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 20c8-1 14-7 15-16-8 1-14 7-15 16Z" />
      <path d="M5 20c4-6 8-10 14-14" />
    </svg>
  ),
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 2 2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2Z" />
    </svg>
  ),
  Arrow: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2h-3c-3 0-5 1.8-5 5v3H6v4h3v8h4Z" />
    </svg>
  ),
  Pinterest: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.1 0 .8.3 1.7.7 2.2.1.1.1.2 0 .3l-.2 1c-.1.2-.2.3-.4.2-1.5-.7-2.4-2.8-2.4-4.6 0-3.7 2.7-7.2 7.8-7.2 4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.4-6.1 7.4-1.2 0-2.3-.6-2.7-1.3l-.7 2.8c-.3 1-.9 2.3-1.4 3A10 10 0 1 0 12 2Z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar({
  cartCount,
  onCartOpen,
  onMenuOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
  onMenuOpen: () => void;
}) {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1C1917] text-[#FAF7F2] text-xs tracking-[0.2em] uppercase overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2.5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6">
              <span>✦ Complimentary shipping on orders over $100</span>
              <span>✦ New Autumn Collection — now live</span>
              <span>✦ Free returns within 30 days</span>
              <span>✦ Ethically crafted in Italy & Portugal</span>
              <span>✦ Complimentary shipping on orders over $100</span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-stone-200/70">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-20 flex items-center justify-between">
          <button
            onClick={onMenuOpen}
            className="md:hidden p-2 -ml-2 text-stone-800"
            aria-label="Open menu"
          >
            <Icon.Menu className="h-6 w-6" />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-stone-700">
            <a href="#women" className="hover:text-[#B8886E] transition">Women</a>
            <a href="#men" className="hover:text-[#B8886E] transition">Men</a>
            <a href="#accessories" className="hover:text-[#B8886E] transition">Accessories</a>
            <a href="#journal" className="hover:text-[#B8886E] transition">Journal</a>
          </nav>

          <a href="#top" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <h1 className="font-display text-2xl md:text-3xl tracking-[0.25em] text-stone-900">
              LUMIÈRE
            </h1>
          </a>

          <div className="flex items-center gap-1 md:gap-3 text-stone-700">
            <button className="p-2 hover:text-[#B8886E] transition" aria-label="Search">
              <Icon.Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-[#B8886E] transition hidden sm:block" aria-label="Account">
              <Icon.User className="h-5 w-5" />
            </button>
            <button
              onClick={onCartOpen}
              className="p-2 hover:text-[#B8886E] transition relative"
              aria-label="Cart"
            >
              <Icon.Bag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B8886E] text-white text-[10px] font-semibold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative h-[88vh] min-h-[620px] overflow-hidden">
      <img
        src="https://images.pexels.com/photos/31621202/pexels-photo-31621202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2400"
        alt="Lumière autumn campaign"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/30 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl h-full px-6 md:px-10 flex items-center">
        <div className="max-w-xl animate-fade-up">
          <p className="text-[#E8C9B3] text-xs tracking-[0.4em] uppercase mb-5">Autumn · Winter 2026</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-white mb-6">
            Quiet luxury,<br />
            <span className="italic text-[#E8C9B3]">loudly worn.</span>
          </h2>
          <p className="text-stone-200/90 text-lg leading-relaxed mb-8 max-w-md">
            A season of softened silhouettes, natural fibres, and pieces designed to
            outlive every trend.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#collection"
              className="group inline-flex items-center gap-2 bg-[#FAF7F2] text-stone-900 px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#B8886E] hover:text-white transition"
            >
              Shop the Edit
              <Icon.Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition"
            >
              View Lookbook
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[10px] tracking-[0.3em] uppercase flex flex-col items-center gap-2 z-10">
        <span>Scroll</span>
        <span className="h-8 w-px bg-white/50" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CATEGORIES                                                         */
/* ------------------------------------------------------------------ */

function Categories() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[#B8886E] text-xs tracking-[0.3em] uppercase mb-3">Shop by Category</p>
            <h3 className="font-display text-4xl md:text-5xl text-stone-900">
              Curated with care
            </h3>
          </div>
          <a href="#collection" className="text-sm text-stone-600 hover:text-[#B8886E] underline underline-offset-4">
            View all →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((c, i) => (
            <a
              key={c.name}
              href={`#${c.name.toLowerCase()}`}
              className={`group relative overflow-hidden block ${
                i === 2 ? "md:col-span-1 aspect-[4/5] md:aspect-auto md:h-[560px]" : "aspect-[4/5] md:h-[560px]"
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-xs tracking-[0.3em] uppercase opacity-80 mb-2">{c.tagline}</p>
                <h4 className="font-display text-3xl md:text-4xl mb-3">{c.name}</h4>
                <span className="inline-flex items-center gap-2 text-sm border-b border-white/60 pb-0.5 group-hover:border-white">
                  Explore
                  <Icon.Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD + GRID                                                */
/* ------------------------------------------------------------------ */

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EBE1] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-[#FAF7F2] text-stone-900 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => onAdd(product)}
          className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white py-4 text-xs tracking-[0.25em] uppercase translate-y-full group-hover:translate-y-0 transition duration-300 hover:bg-[#B8886E]"
        >
          + Add to Bag
        </button>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-1">{product.category}</p>
          <h5 className="font-display text-lg text-stone-900 leading-tight">{product.name}</h5>
        </div>
        <div className="text-right shrink-0">
          {product.oldPrice && (
            <p className="text-xs text-stone-400 line-through">${product.oldPrice}</p>
          )}
          <p className="text-stone-900 font-medium">${product.price}</p>
        </div>
      </div>
    </div>
  );
}

function Collection({ onAdd }: { onAdd: (p: Product) => void }) {
  const [filter, setFilter] = useState<"All" | "Women" | "Men" | "Accessories">("All");
  const filtered = useMemo(
    () => (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter]
  );
  const filters: ("All" | "Women" | "Men" | "Accessories")[] = ["All", "Women", "Men", "Accessories"];

  return (
    <section id="collection" className="py-20 md:py-28 bg-[#F0EBE1]/50">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-[#B8886E] text-xs tracking-[0.3em] uppercase mb-3">The Edit</p>
          <h3 className="font-display text-4xl md:text-5xl text-stone-900 mb-4">
            Our Signature Collection
          </h3>
          <p className="text-stone-600 max-w-xl mx-auto">
            Thoughtfully designed pieces in natural fibres — made to be worn, loved, and kept.
          </p>
        </div>

        <div className="flex justify-center gap-2 md:gap-8 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm tracking-[0.15em] uppercase pb-1 border-b transition ${
                filter === f
                  ? "border-[#B8886E] text-stone-900"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-14">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-stone-900 text-stone-900 px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-[#FAF7F2] transition"
          >
            View Entire Collection
            <Icon.Arrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LOOKBOOK / EDITORIAL                                               */
/* ------------------------------------------------------------------ */

function Lookbook() {
  return (
    <section id="lookbook" className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/26102169/pexels-photo-26102169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
                alt="Editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block absolute -bottom-8 -right-8 w-52 h-64 overflow-hidden border-8 border-[#FAF7F2] shadow-xl">
              <img
                src="https://images.pexels.com/photos/6218356/pexels-photo-6218356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400"
                alt="Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-[#B8886E] text-xs tracking-[0.3em] uppercase mb-4">The Atelier</p>
            <h3 className="font-display text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
              Made slowly,<br />
              <span className="italic">meant to last.</span>
            </h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              Every piece begins in a small European atelier — sketched by hand, cut from
              certified organic linen, recycled cashmere, and GOTS cotton. We partner with
              family-run workshops in Porto, Florence, and Barcelona, producing in small
              batches to ensure quality and to respect the hands that make them.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              No excess stock. No fast trends. Just garments you'll reach for, season after season.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8 pt-6 border-t border-stone-200">
              <div>
                <p className="font-display text-3xl text-stone-900">12</p>
                <p className="text-xs tracking-[0.15em] uppercase text-stone-500 mt-1">Partner Ateliers</p>
              </div>
              <div>
                <p className="font-display text-3xl text-stone-900">98%</p>
                <p className="text-xs tracking-[0.15em] uppercase text-stone-500 mt-1">Natural Fibres</p>
              </div>
              <div>
                <p className="font-display text-3xl text-stone-900">0</p>
                <p className="text-xs tracking-[0.15em] uppercase text-stone-500 mt-1">Overstock Items</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-stone-900 border-b border-stone-900 pb-1 text-sm tracking-[0.2em] uppercase"
            >
              Our Sustainability Story
              <Icon.Arrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURES                                                           */
/* ------------------------------------------------------------------ */

function Features() {
  const items = [
    { icon: Icon.Truck, title: "Complimentary Shipping", desc: "On all orders over $100 worldwide" },
    { icon: Icon.Refresh, title: "30-Day Returns", desc: "Simple, stress-free exchanges" },
    { icon: Icon.Shield, title: "Lifetime Repair", desc: "We'll mend what time wears down" },
    { icon: Icon.Leaf, title: "Ethically Made", desc: "Transparent, certified supply chain" },
  ];
  return (
    <section className="bg-stone-900 text-[#FAF7F2] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((f) => (
          <div key={f.title} className="text-center">
            <f.icon className="h-9 w-9 mx-auto mb-4 text-[#E8C9B3]" />
            <h5 className="font-display text-lg mb-1">{f.title}</h5>
            <p className="text-sm text-stone-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIAL                                                        */
/* ------------------------------------------------------------------ */

function Testimonial() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F2]">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex justify-center gap-1 text-[#B8886E] mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon.Star key={i} className="h-4 w-4" />
          ))}
        </div>
        <p className="font-display italic text-2xl md:text-3xl text-stone-800 leading-snug mb-8">
          "The cashmere knit is the softest thing I've ever owned. Three winters in and it
          still looks brand new — this is what clothing should feel like."
        </p>
        <p className="text-xs tracking-[0.25em] uppercase text-stone-500">
          Isabelle M. · Paris, France
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NEWSLETTER                                                         */
/* ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/13068364/pexels-photo-13068364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=2000"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-stone-900/75" />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-[#FAF7F2]">
        <p className="text-[#E8C9B3] text-xs tracking-[0.3em] uppercase mb-4">Join the Circle</p>
        <h3 className="font-display text-4xl md:text-5xl mb-5">
          Letters from the atelier
        </h3>
        <p className="text-stone-300 mb-8">
          Early access to new collections, private sales, and the occasional essay on
          slow fashion. No noise — just the good stuff.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-white/30 px-5 py-4 text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#E8C9B3]"
          />
          <button
            type="submit"
            className="bg-[#E8C9B3] text-stone-900 px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-white transition"
          >
            {sent ? "Thank you ✓" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[#1C1917] text-stone-400 pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-5 gap-10 pb-14 border-b border-stone-800">
          <div className="md:col-span-2">
            <h4 className="font-display text-3xl tracking-[0.25em] text-[#FAF7F2] mb-4">LUMIÈRE</h4>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Timeless fashion, crafted with intention in small European ateliers.
              Founded in Milan, 2018.
            </p>
            <div className="flex gap-4">
              {[Icon.Instagram, Icon.Facebook, Icon.Pinterest].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 flex items-center justify-center border border-stone-700 rounded-full hover:border-[#B8886E] hover:text-[#B8886E] transition"
                >
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-[#FAF7F2] text-xs tracking-[0.2em] uppercase mb-5">Shop</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#B8886E]">Women</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Men</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Accessories</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Gift Cards</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Sale</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#FAF7F2] text-xs tracking-[0.2em] uppercase mb-5">Help</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#B8886E]">Shipping</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Returns</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Care & Repair</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#FAF7F2] text-xs tracking-[0.2em] uppercase mb-5">Maison</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#B8886E]">Our Story</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Journal</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Careers</a></li>
              <li><a href="#" className="hover:text-[#B8886E]">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© 2026 Lumière Maison S.r.l. — All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#B8886E]">Privacy</a>
            <a href="#" className="hover:text-[#B8886E]">Terms</a>
            <a href="#" className="hover:text-[#B8886E]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  CART DRAWER                                                        */
/* ------------------------------------------------------------------ */

type CartItem = Product & { qty: number };

function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onQty,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onQty: (id: string, delta: number) => void;
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h4 className="font-display text-2xl text-stone-900">Your Bag</h4>
          <button onClick={onClose} className="p-2 hover:text-[#B8886E]">
            <Icon.Close className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <Icon.Bag className="h-12 w-12 mx-auto text-stone-300 mb-4" />
              <p className="text-stone-500 mb-6">Your bag is empty</p>
              <button
                onClick={onClose}
                className="text-sm tracking-[0.2em] uppercase border-b border-stone-900 pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((it) => (
                <li key={it.id} className="flex gap-4">
                  <div className="h-28 w-24 bg-stone-100 overflow-hidden shrink-0">
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">{it.category}</p>
                        <p className="font-display text-stone-900 leading-tight">{it.name}</p>
                      </div>
                      <p className="text-stone-900 font-medium">${it.price}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-stone-300">
                        <button
                          onClick={() => onQty(it.id, -1)}
                          className="px-3 py-1.5 hover:bg-stone-100"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm">{it.qty}</span>
                        <button
                          onClick={() => onQty(it.id, 1)}
                          className="px-3 py-1.5 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(it.id)}
                        className="text-xs text-stone-500 underline underline-offset-4 hover:text-[#B8886E]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4 bg-[#F0EBE1]/50">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>Shipping</span>
              <span>{subtotal >= 100 ? "Complimentary" : "$12.00"}</span>
            </div>
            <div className="flex justify-between font-display text-xl text-stone-900 pt-3 border-t border-stone-300">
              <span>Total</span>
              <span>${(subtotal + (subtotal >= 100 ? 0 : 12)).toFixed(2)}</span>
            </div>
            <button className="w-full bg-stone-900 text-[#FAF7F2] py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#B8886E] transition">
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-stone-500">
              Taxes calculated at checkout · Secure payment
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MOBILE MENU                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-50 md:hidden transition ${open ? "visible" : "invisible"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute top-0 left-0 h-full w-[82%] max-w-sm bg-[#FAF7F2] p-8 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h4 className="font-display text-xl tracking-[0.25em]">LUMIÈRE</h4>
          <button onClick={onClose}><Icon.Close className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-col gap-6 font-display text-2xl text-stone-800">
          <a href="#women" onClick={onClose}>Women</a>
          <a href="#men" onClick={onClose}>Men</a>
          <a href="#accessories" onClick={onClose}>Accessories</a>
          <a href="#lookbook" onClick={onClose}>Lookbook</a>
          <a href="#journal" onClick={onClose}>Journal</a>
          <a href="#" onClick={onClose}>Contact</a>
        </nav>
        <div className="absolute bottom-8 left-8 right-8 text-xs tracking-[0.2em] uppercase text-stone-500">
          <p>✦ Complimentary shipping over $100</p>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <Hero />
      <Categories />
      <Collection onAdd={addToCart} />
      <Lookbook />
      <Features />
      <Testimonial />
      <Newsletter />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onQty={updateQty}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
