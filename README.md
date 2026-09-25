# Delosi E-commerce — Reto Técnico Frontend

Aplicación modular de catálogo y detalle de producto construida con **Next.js (App Router)**, orientada a rendimiento, SEO y UX, cumpliendo el reto técnico DELOSI 2026.

## Stack

| Área | Elección |
| --- | --- |
| Framework | Next.js App Router |
| Lenguaje | TypeScript (`strict`) |
| UI | React 19 |
| Estilos | Tailwind CSS v4 |
| Estado global (carrito) | Redux Toolkit |
| Persistencia carrito | `localStorage` |
| Datos | Server Components + `fetch` (Fake Store API) |
| Imágenes | `next/image` |
| SEO | Metadata API + `generateMetadata` |
| Streaming | `Suspense` + skeletons |
| Errores | `error.tsx`, `not-found.tsx`, empty states |
| Tests unitarios | Vitest + React Testing Library |
| E2E | Playwright |
| Iconos | Lucide React |
| Calidad | ESLint + Prettier |

## Arquitectura

Estructura por **módulos de dominio** y capas (Clean Architecture / SOLID):

```text
src/
├── app/                    # Enrutamiento Next.js (PLP, PDP, layout, providers)
├── modules/
│   ├── catalog/            # Productos y categorías (domain → application → infra → UI)
│   └── cart/               # Carrito (drawer lateral estilo Rappi)
└── shared/
    ├── ui/                 # Design system (Button, Input, Navbar, Footer)
    ├── store/              # Redux Toolkit + middleware localStorage
    └── utils/              # formatPrice, etc.
```

- **Domain**: entidades y contratos (`ProductRepository`, `CartItem`).
- **Application**: casos de uso (`GetProductsUseCase`, `GetProductDetailUseCase`).
- **Infrastructure**: `catalog.container.ts` (DI), cliente HTTP Fake Store, persistencia del carrito.
- **Presentation**: componentes co-ubicados con Storybook (`*.stories.tsx`).

## Requerimientos del reto cubiertos

### PLP (`/products`)

- Renderizado inicial en **Server Components**.
- Filtro por **categoría** vía **URL Search Params** (`?category=`).
- **Búsqueda** (`?q=`) y **ordenamiento** (`?sort=price-asc|price-desc|relevance`).
- Streaming con `Suspense` y skeletons.

### PDP (`/products/[id]`)

- Ruta dinámica `/products/[id]` (requerida por el reto). URLs antiguas `/product/:id` → redirect 308 en `next.config.ts`.
- **`generateMetadata`** dinámico (title, description, Open Graph).
- Botón **Agregar al carrito** con estado global Redux y contador en header.

### Iniciativas proactivas

- Caché/revalidación en consumo de API.
- Manejo de errores (`error.tsx`) y estados vacíos.
- Tests unitarios + E2E.
- UI inspirada en marketplace (header, banner, chips, carrusel de categorías, grid).

## API

- `GET https://fakestoreapi.com/products`
- `GET https://fakestoreapi.com/products/{id}`
- `GET https://fakestoreapi.com/products/categories`

## Scripts

```bash
pnpm install
pnpm dev             # http://localhost:3000
pnpm build
pnpm start
pnpm lint
pnpm format
pnpm test            # Vitest (unit + interacciones Storybook)
pnpm test:unit       # Solo pruebas unitarias
pnpm test:e2e        # Playwright (puerto 3010)
pnpm storybook       # Historias co-ubicadas (*.stories.tsx)
```

## Despliegue en Vercel

El proyecto es **Next.js App Router** y Vercel lo detecta automáticamente. El gestor de paquetes es **pnpm** (`pnpm-lock.yaml`).

### Opción A — Dashboard (recomendada)

1. Sube el repositorio a GitHub (si aún no está en remoto).
2. En [vercel.com/new](https://vercel.com/new), importa el repo `delosi-ecommerce`.
3. **Framework Preset: Next.js** (no Vite ni “Other”).
4. **Output Directory:** vacío (no uses `dist`; Next.js publica desde `.next`).
5. **Install Command:** `pnpm install` · **Build Command:** `pnpm run build`.
6. Variables de entorno (opcional pero recomendado en producción):
   - `NEXT_PUBLIC_SITE_URL` = URL canónica del sitio, p. ej. `https://delosi-ecommerce.vercel.app` o tu dominio custom.
   - Si no la defines, `getSiteUrl()` usa `https://${VERCEL_URL}` en runtime de Vercel.
7. Deploy.

Si ves *No Output Directory named "dist" found*, en **Settings → General → Build & Development Settings** pon **Framework Preset: Next.js** y borra **Output Directory**.

### Opción B — CLI

```bash
pnpm dlx vercel login
pnpm dlx vercel link    # primera vez en el repo
pnpm dlx vercel         # preview
pnpm dlx vercel --prod  # producción
```

Copia `.env.example` a `.env.local` solo para desarrollo local; en Vercel configura las variables en **Project → Settings → Environment Variables**.

### Comprobación previa

Antes de desplegar, ejecuta localmente:

```bash
pnpm install
pnpm run build
```

La API externa (`fakestoreapi.com`) debe ser accesible desde el runtime de Vercel; las imágenes ya están permitidas en `next.config.ts` (`images.remotePatterns`).

## Decisiones técnicas

### Carrito en Redux + localStorage

El carrito es estado **cliente predecible** (Redux Toolkit) porque no depende del servidor y debe reaccionar al instante en el header. La persistencia en `localStorage` mantiene la sesión entre recargas sin sobrecargar memoria con duplicados de catálogo.

### Filtros en URL

Los filtros viven en query params para URLs compartibles e indexables (requisito SEO del reto). El servidor parsea `searchParams` y aplica reglas de negocio en el caso de uso `filterProducts`.

## Autor

Proyecto de evaluación técnica — Delosi 2026.
