# Delosi E-commerce — Reto Técnico Frontend 2026

Aplicación modular de catálogo y detalle de producto con **Next.js (App Router)**, orientada a rendimiento, SEO y UX. Consume la [Fake Store API](https://fakestoreapi.com) y cumple los requerimientos del documento de evaluación DELOSI (PLP, PDP, carrito, metadata dinámica y pruebas).

---

## Ejecución en entorno local

### Requisitos previos

| Herramienta | Versión |
|-------------|---------|
| **Node.js** | ≥ 20 (ver `engines` en `package.json`) |
| **pnpm** | ≥ 10 (recomendado; el repo usa `pnpm-lock.yaml`) |

Comprobar:

```bash
node -v
pnpm -v
```

Si no tienes pnpm: `corepack enable` y `corepack prepare pnpm@10.33.0 --activate`, o `npm install -g pnpm`.

### Instalación y arranque (paso a paso)

1. **Clonar** el repositorio e **entrar** al directorio del proyecto.

2. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

3. **Variables de entorno (opcional en local):**

   ```bash
   cp .env.example .env.local
   ```

   En desarrollo no es obligatorio definir nada: la app usa `http://localhost:3000` como URL del sitio si no existe `NEXT_PUBLIC_SITE_URL`.

4. **Modo desarrollo:**

   ```bash
   pnpm dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000) (redirige a `/products`).

5. **Build de producción local (recomendado antes de entregar o desplegar):**

   ```bash
   pnpm run build
   pnpm start
   ```

   La app queda en [http://localhost:3000](http://localhost:3000) en modo producción.

### Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Redirige a `/products` |
| `/products` | Catálogo (PLP) con filtros en URL |
| `/products/[id]` | Detalle de producto (PDP) |
| `/product/[id]` | Redirect 308 → `/products/[id]` |

**Query params del catálogo (ejemplos):**

- `?category=electronics`
- `?q=phone`
- `?sort=price-asc` · `price-desc` · `relevance`
- `?minRating=4` · `?price=0-50`

### Calidad y pruebas en local

```bash
pnpm lint              # ESLint
pnpm format            # Prettier (formatear todo el repo)
pnpm test              # Vitest: unit (*.unit.test.ts) + stories con play
pnpm test:unit         # Solo pruebas unitarias
pnpm test:e2e          # Playwright (levanta Next en puerto 3010)
pnpm storybook         # UI aislada en http://localhost:6006
```

**Nota E2E:** la primera ejecución de `pnpm test:e2e` puede descargar el browser de Playwright. Los tests usan la API real de Fake Store; hace falta conexión a internet.

### Problemas frecuentes

- **Fake Store no responde:** el cliente HTTP usa snapshot local (`catalog-fallback.json`) como respaldo; el catálogo sigue cargando.
- **Puerto 3000 ocupado:** `pnpm dev -- -p 3001` (o el puerto que prefieras).
- **Tras cambiar rutas, error de tipos en build:** borrar caché con `rm -rf .next` y volver a `pnpm run build`.

---

## Lineamientos técnicos

Documento de referencia para revisión de código y sustentación: convenciones, capas y decisiones adoptadas en este proyecto.

### 1. Stack y responsabilidades

| Área | Elección | Motivo breve |
|------|----------|--------------|
| Framework | Next.js 16 App Router | SSR/SSG, Server Components, Metadata API |
| Lenguaje | TypeScript `strict` | Contratos en dominio y props |
| UI | React 19 | Alineado con Next 16 |
| Estilos | Tailwind CSS v4 | Utilidades, diseño responsive |
| Estado global | Redux Toolkit (solo carrito) | Acciones predecibles + DevTools |
| Persistencia carrito | `localStorage` + middleware | Recarga sin perder ítems |
| Datos catálogo | Server Components + `fetch` | HTML inicial con productos; SEO |
| Imágenes | `next/image` + dominios en config | Optimización y LCP |
| SEO | `generateMetadata`, JSON-LD, sitemap | Título, description, OG por página |
| Tests | Vitest + Storybook (play) + Playwright | Unit, UI integrada, flujos E2E |
| Calidad | ESLint (Next) + Prettier | Estilo consistente |

### 2. Arquitectura por módulos (Clean Architecture / SOLID)

```text
src/
├── app/                         # Routing Next.js, layouts, metadata por ruta
├── modules/
│   ├── catalog/
│   │   ├── domain/              # Entidades, ProductRepository, ProductQuery
│   │   ├── application/         # Casos de uso, filterProducts
│   │   ├── infrastructure/      # API Fake Store, DI, fallback JSON
│   │   └── presentation/        # Componentes, hooks (URL filters)
│   └── cart/
│       ├── domain/
│       ├── application/         # Totales
│       ├── infrastructure/      # Redux slice, localStorage
│       └── presentation/        # Sidebar, botones, contador header
└── shared/
    ├── ui/                      # Design system (Atomic Design)
    │   ├── atoms/               # Button, Input, ProductImage
    │   ├── molecules/           # Breadcrumbs
    │   ├── organisms/           # SiteNavbar, SiteFooter, PromoBanner
    │   └── index.ts             # Re-export opcional (@/shared/ui)
    ├── store/                   # configureStore + middleware persistencia
    ├── seo/                     # metadata-builders, json-ld, sitemap helpers
    └── a11y/                    # Skip link, labels accesibles
```

**Reglas de dependencia:**

- `domain` no importa de `infrastructure` ni de `presentation`.
- `application` depende solo de `domain` (puertos/repositorios).
- `infrastructure` implementa puertos e integra APIs externas.
- `app/` compone páginas e inyecta casos de uso vía `catalog.container.ts` (DI manual, explícita).

**SOLID en la práctica:**

- **S:** un caso de uso por operación (`GetProductsUseCase`, `GetProductDetailUseCase`).
- **O:** filtros/orden extensibles en `filterProducts` sin cambiar la página.
- **L:** `ProductRepository` intercambiable (API vs mock en Storybook).
- **I:** contrato de repositorio acotado a catálogo.
- **D:** páginas dependen de use cases, no de `fetch` directo.

### 3. Renderizado y datos (PLP / PDP)

- **PLP (`/products`):** página server; `searchParams` → `ProductQuery` → `GetProductsUseCase`. Secciones async dentro de `Suspense` (filtros y grid con skeletons).
- **PDP (`/products/[id]`):** server; `generateMetadata` + detalle en un solo request de producto.
- **Filtros:** estado en **URL** (`useProductsFilter` en cliente solo actualiza query string; el servidor re-renderiza con la query parseada). URLs compartibles e indexables.

### 4. Estado del carrito

- **Redux Toolkit** para ítems, cantidades y apertura del drawer.
- **No** se guarda el catálogo en el store global (evita duplicar datos ya servidos por el servidor).
- **Middleware** persiste en `localStorage` (`delosi-cart-v1`); **hydration** en `Providers` al montar la app.
- Justificación: feedback instantáneo en header y sidebar; alcance del reto sin backend de checkout.

### 5. API externa, caché y resiliencia

Endpoints:

- `GET https://fakestoreapi.com/products`
- `GET https://fakestoreapi.com/products/{id}`
- `GET https://fakestoreapi.com/products/categories`

Cliente: `fakestore-api.client.ts` con `next.revalidate: 3600`. Si la red falla o hay 403, **`catalog-fallback.json`**. Errores no recuperables en PLP: `app/products/error.tsx`. Listado vacío: empty state en `ProductGrid`.

### 6. SEO y accesibilidad

- Metadata por PLP (según filtros) y por PDP (producto).
- Canonical, Open Graph, Twitter cards vía `buildPageMetadata`.
- JSON-LD (WebSite, Product, BreadcrumbList), `sitemap.xml`, `robots.txt`.
- `lang="es"`, skip link, landmarks, labels en controles del carrito, contraste en CTAs.

### 7. Testing

| Tipo | Ubicación | Comando |
|------|-----------|---------|
| Unit | `*.unit.test.ts` | `pnpm test:unit` |
| UI / integración ligera | `*.stories.tsx` con `play` | `pnpm test` (proyecto storybook) |
| E2E | `e2e/*.spec.ts` | `pnpm test:e2e` |

En Storybook/Vitest, el catálogo usa mock en `.storybook/mocks/catalog.container.ts` (datos de fallback, sin depender de la API en CI).

### 8. Convenciones de código

- Alias de imports: `@/` → `src/`.
- Componentes de presentación en PascalCase; casos de uso con sufijo `UseCase`.
- Estilos con Tailwind; evitar CSS global salvo tokens en `globals.css`.
- Commits y formato: Prettier; lint antes de PR (`pnpm lint`).

---

## Requerimientos del reto (trazabilidad)

### PLP (`/products`)

- Server Components para carga inicial.
- Filtro por categoría en URL (`?category=`).
- Búsqueda (`?q=`) y ordenamiento (`?sort=`).
- Suspense + skeletons.

### PDP (`/products/[id]`)

- Ruta dinámica exigida por el enunciado.
- `generateMetadata` (title, description, Open Graph).
- Botón agregar al carrito + contador en header.

### Iniciativas proactivas

- Streaming / skeletons, `error.tsx`, empty states, revalidación en fetch, tests unit + E2E + Storybook.

---

## Despliegue (Vercel)

Gestor: **pnpm**. Framework: **Next.js** (preset automático).

1. Importar repo en [vercel.com/new](https://vercel.com/new).
2. Install: `pnpm install` · Build: `pnpm run build` · Output Directory: **vacío**.
3. Variable opcional: `NEXT_PUBLIC_SITE_URL` = URL canónica de producción.

CLI:

```bash
pnpm dlx vercel login
pnpm dlx vercel link
pnpm dlx vercel --prod
```

Antes de desplegar: `pnpm install && pnpm run build`. Imágenes remotas permitidas en `next.config.ts` (`fakestoreapi.com`).

---

## Autor

Proyecto de evaluación técnica — Delosi 2026.
