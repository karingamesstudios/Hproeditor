import type { EditorElement } from '../types/editor';

export interface TemplateItem {
  id: string;
  title: string;
  category: 'Exclusivo' | 'E-commerce' | 'SaaS' | 'Ventas' | 'Agencia' | 'Streaming' | 'Servicios' | 'Portafolio' | 'Básico';
  description: string;
  tag: string;
  document: EditorElement;
}


const PROFESSIONAL_TEMPLATES: TemplateItem[] = [
  {
    id: 'professional-fitness-studio',
    title: 'Fitness Studio — Gimnasio Premium',
    category: 'Servicios',
    description: 'Landing page deportiva con llamada a la acción, beneficios, planes y estética oscura de alto contraste.',
    tag: 'Nuevo · Fitness',
    document: {
      id: 'root-body', type: 'container', name: 'Fitness Studio',
      styles: { backgroundColor: '#101513', color: '#f8faf9', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh' },
      children: [
        { id: 'fit-nav', type: 'container', name: 'Barra de navegación', styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '22px 6%', backgroundColor: '#151d19', gap: '16px' }, children: [
          { id: 'fit-logo', type: 'heading', name: 'Marca', content: 'FORGE / FITNESS', styles: { color: '#c7f36b', fontSize: '20px', fontWeight: '900', letterSpacing: '1px' } },
          { id: 'fit-nav-links', type: 'paragraph', name: 'Navegación', content: 'Entrenamiento   ·   Planes   ·   Contacto', styles: { color: '#d1d5db', fontSize: '13px' } }
        ]},
        { id: 'fit-hero', type: 'container', name: 'Portada principal', styles: { padding: '80px 8%', display: 'flex', flexDirection: 'column', gap: '22px', background: 'linear-gradient(135deg, #17251c 0%, #101513 70%)' }, children: [
          { id: 'fit-eyebrow', type: 'paragraph', name: 'Etiqueta', content: 'ENTRENA CON PROPÓSITO', styles: { color: '#c7f36b', fontSize: '12px', fontWeight: '800', letterSpacing: '2px' } },
          { id: 'fit-title', type: 'heading', name: 'Título principal', content: 'SUPERA TUS LÍMITES.', styles: { color: '#ffffff', fontSize: 'clamp(38px, 7vw, 76px)', lineHeight: '1.02', fontWeight: '900', maxWidth: '850px' } },
          { id: 'fit-copy', type: 'paragraph', name: 'Descripción', content: 'Entrenamiento inteligente, equipamiento de calidad y una comunidad que te impulsa a llegar más lejos.', styles: { color: '#b8c2bb', fontSize: '18px', lineHeight: '1.7', maxWidth: '620px' } },
          { id: 'fit-cta', type: 'button', name: 'Botón principal', content: 'Descubre nuestros planes ↗', styles: { backgroundColor: '#c7f36b', color: '#142016', padding: '14px 22px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', alignSelf: 'flex-start' } }
        ]},
        { id: 'fit-benefits', type: 'container', name: 'Beneficios', styles: { padding: '42px 6%', display: 'flex', flexDirection: 'row', gap: '18px', flexWrap: 'wrap' }, children: [
          { id: 'fit-b1', type: 'container', name: 'Fuerza', styles: { flex: '1 1 180px', padding: '24px', backgroundColor: '#1b2720', borderRadius: '12px', gap: '10px' }, children: [
            { id: 'fit-b1t', type: 'heading', name: 'Título fuerza', content: '01 / FUERZA', styles: { color: '#c7f36b', fontSize: '18px' } },
            { id: 'fit-b1p', type: 'paragraph', name: 'Texto fuerza', content: 'Zona de peso libre y máquinas para progresar a tu ritmo.', styles: { color: '#cbd5ce', fontSize: '14px', lineHeight: '1.6' } }
          ]},
          { id: 'fit-b2', type: 'container', name: 'Coaching', styles: { flex: '1 1 180px', padding: '24px', backgroundColor: '#1b2720', borderRadius: '12px', gap: '10px' }, children: [
            { id: 'fit-b2t', type: 'heading', name: 'Título coaching', content: '02 / COACHING', styles: { color: '#c7f36b', fontSize: '18px' } },
            { id: 'fit-b2p', type: 'paragraph', name: 'Texto coaching', content: 'Acompañamiento y objetivos claros para mantener la motivación.', styles: { color: '#cbd5ce', fontSize: '14px', lineHeight: '1.6' } }
          ]},
          { id: 'fit-b3', type: 'container', name: 'Comunidad', styles: { flex: '1 1 180px', padding: '24px', backgroundColor: '#1b2720', borderRadius: '12px', gap: '10px' }, children: [
            { id: 'fit-b3t', type: 'heading', name: 'Título comunidad', content: '03 / COMUNIDAD', styles: { color: '#c7f36b', fontSize: '18px' } },
            { id: 'fit-b3p', type: 'paragraph', name: 'Texto comunidad', content: 'Un espacio positivo para entrenar, aprender y avanzar juntos.', styles: { color: '#cbd5ce', fontSize: '14px', lineHeight: '1.6' } }
          ]}
        ]}
      ]
    }
  },
  {
    id: 'professional-creative-portfolio',
    title: 'Creative Portfolio — Portafolio Editorial',
    category: 'Portafolio',
    description: 'Diseño editorial minimalista para creativos, fotógrafos y diseñadores con tipografía protagonista y proyectos destacados.',
    tag: 'Nuevo · Creativo',
    document: {
      id: 'root-body', type: 'container', name: 'Creative Portfolio',
      styles: { backgroundColor: '#f4f0e8', color: '#20201e', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh' },
      children: [
        { id: 'port-nav', type: 'container', name: 'Navegación', styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '24px 6%', borderBottom: '1px solid #d8d1c5', gap: '14px' }, children: [
          { id: 'port-brand', type: 'heading', name: 'Nombre creativo', content: 'ALEX MORAN®', styles: { color: '#20201e', fontSize: '18px', fontWeight: '900', letterSpacing: '1px' } },
          { id: 'port-navlinks', type: 'paragraph', name: 'Enlaces', content: 'Trabajo   /   Sobre mí   /   Contacto', styles: { color: '#5b5953', fontSize: '13px' } }
        ]},
        { id: 'port-hero', type: 'container', name: 'Presentación', styles: { padding: '80px 8% 64px', display: 'flex', flexDirection: 'column', gap: '24px' }, children: [
          { id: 'port-label', type: 'paragraph', name: 'Especialidad', content: 'DISEÑO INDEPENDIENTE · CHILE', styles: { color: '#8b4a34', fontSize: '12px', fontWeight: '800', letterSpacing: '2px' } },
          { id: 'port-title', type: 'heading', name: 'Título', content: 'Ideas claras.\nDiseño con intención.', styles: { color: '#20201e', fontSize: 'clamp(40px, 7vw, 78px)', fontWeight: '800', lineHeight: '1.04', maxWidth: '900px' } },
          { id: 'port-desc', type: 'paragraph', name: 'Descripción', content: 'Creo identidades visuales y experiencias digitales para marcas que quieren comunicar algo real.', styles: { color: '#5b5953', fontSize: '18px', lineHeight: '1.7', maxWidth: '620px' } }
        ]},
        { id: 'port-projects', type: 'container', name: 'Proyectos destacados', styles: { padding: '0 6% 64px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }, children: [
          { id: 'port-project1', type: 'container', name: 'Proyecto identidad', styles: { flex: '1 1 260px', minHeight: '210px', padding: '24px', backgroundColor: '#d9a58d', borderRadius: '4px', justifyContent: 'space-between', gap: '30px' }, children: [
            { id: 'port-p1tag', type: 'paragraph', name: 'Categoría', content: '01 — IDENTIDAD VISUAL', styles: { color: '#542d22', fontSize: '11px', fontWeight: '800' } },
            { id: 'port-p1title', type: 'heading', name: 'Proyecto', content: 'Casa Nativa', styles: { color: '#30211c', fontSize: '30px', fontWeight: '800' } }
          ]},
          { id: 'port-project2', type: 'container', name: 'Proyecto digital', styles: { flex: '1 1 260px', minHeight: '210px', padding: '24px', backgroundColor: '#c6c9b2', borderRadius: '4px', justifyContent: 'space-between', gap: '30px' }, children: [
            { id: 'port-p2tag', type: 'paragraph', name: 'Categoría', content: '02 — EXPERIENCIA DIGITAL', styles: { color: '#34382a', fontSize: '11px', fontWeight: '800' } },
            { id: 'port-p2title', type: 'heading', name: 'Proyecto', content: 'Tierra Estudio', styles: { color: '#20251b', fontSize: '30px', fontWeight: '800' } }
          ]}
        ]}
      ]
    }
  },
  {
    id: 'professional-saas-launch',
    title: 'SaaS Launch — Producto Digital',
    category: 'SaaS',
    description: 'Landing page tecnológica con propuesta de valor, funciones, prueba gratuita y bloques listos para personalizar.',
    tag: 'Nuevo · SaaS',
    document: {
      id: 'root-body', type: 'container', name: 'SaaS Launch',
      styles: { backgroundColor: '#f8fafc', color: '#111827', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh' },
      children: [
        { id: 'saas-nav', type: 'container', name: 'Navegación', styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '20px 6%', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', gap: '14px' }, children: [
          { id: 'saas-brand', type: 'heading', name: 'Marca', content: 'orbit /', styles: { color: '#4f46e5', fontSize: '23px', fontWeight: '900' } },
          { id: 'saas-links', type: 'paragraph', name: 'Enlaces', content: 'Producto   ·   Soluciones   ·   Precios', styles: { color: '#4b5563', fontSize: '13px' } }
        ]},
        { id: 'saas-hero', type: 'container', name: 'Hero', styles: { padding: '82px 8%', alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '22px', background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)' }, children: [
          { id: 'saas-badge', type: 'paragraph', name: 'Etiqueta', content: '✦ UNA FORMA MÁS SIMPLE DE TRABAJAR', styles: { color: '#4f46e5', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px' } },
          { id: 'saas-title', type: 'heading', name: 'Título', content: 'Tu equipo, en perfecta sincronía.', styles: { color: '#111827', fontSize: 'clamp(38px, 6vw, 66px)', fontWeight: '850', lineHeight: '1.05', maxWidth: '850px', textAlign: 'center' } },
          { id: 'saas-copy', type: 'paragraph', name: 'Descripción', content: 'Organiza proyectos, automatiza tareas repetitivas y recupera tiempo para el trabajo que importa.', styles: { color: '#6b7280', fontSize: '18px', lineHeight: '1.7', maxWidth: '650px', textAlign: 'center' } },
          { id: 'saas-cta', type: 'button', name: 'Prueba gratuita', content: 'Comenzar gratis ↗', styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '14px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '800' } }
        ]},
        { id: 'saas-features', type: 'container', name: 'Funciones', styles: { padding: '36px 6% 64px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }, children: [
          { id: 'saas-f1', type: 'container', name: 'Automatización', styles: { flex: '1 1 200px', padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '14px', gap: '10px' }, children: [
            { id: 'saas-f1t', type: 'heading', name: 'Título función', content: 'Automatiza lo repetitivo', styles: { color: '#111827', fontSize: '18px' } },
            { id: 'saas-f1p', type: 'paragraph', name: 'Descripción función', content: 'Crea flujos de trabajo para reducir tareas manuales y mantener todo organizado.', styles: { color: '#6b7280', fontSize: '14px', lineHeight: '1.6' } }
          ]},
          { id: 'saas-f2', type: 'container', name: 'Colaboración', styles: { flex: '1 1 200px', padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '14px', gap: '10px' }, children: [
            { id: 'saas-f2t', type: 'heading', name: 'Título función', content: 'Colabora en contexto', styles: { color: '#111827', fontSize: '18px' } },
            { id: 'saas-f2p', type: 'paragraph', name: 'Descripción función', content: 'Centraliza decisiones, archivos y conversaciones en un mismo espacio.', styles: { color: '#6b7280', fontSize: '14px', lineHeight: '1.6' } }
          ]}
        ]}
      ]
    }
  },
];

// Plantillas inspiradas en patrones visuales conocidos. No usan logotipos ni recursos oficiales;
// todos los textos, colores, botones, tarjetas y enlaces son elementos editables en Hproeditor.
const makeBrandTemplate = (cfg: {
  id: string;
  title: string;
  category: TemplateItem['category'];
  description: string;
  brand: string;
  eyebrow: string;
  headline: string;
  copy: string;
  cta: string;
  bg: string;
  surface: string;
  text: string;
  accent: string;
  style: 'minimal' | 'stream' | 'commerce' | 'search' | 'marketplace' | 'deals' | 'enterprise' | 'workspace' | 'creator' | 'community' | 'game' | 'product' | 'app' | 'device';
}): TemplateItem => {
  const id = cfg.id;
  const el = (key: string, type: string, name: string, content: string, styles: Record<string, unknown> = {}): EditorElement =>
    ({ id: `${id}-${key}`, type, name, content, styles: styles as EditorElement['styles'] });
  const box = (key: string, name: string, styles: Record<string, unknown>, children: EditorElement[]): EditorElement =>
    ({ id: `${id}-${key}`, type: 'container', name, styles: styles as EditorElement['styles'], children });
  const image = (key: string, name: string, src: string, styles: Record<string, unknown> = {}): EditorElement =>
    ({ id: `${id}-${key}`, type: 'image', name, src, styles: { width: '100%', objectFit: 'cover', ...styles } as EditorElement['styles'] });
  const card = (key: string, title: string, copy: string, extra: Record<string, unknown> = {}) =>
    box(key, title, { flex: '1 1 190px', minWidth: '0', padding: '22px', borderRadius: cfg.style === 'workspace' ? '8px' : '16px', backgroundColor: cfg.surface, border: `1px solid ${cfg.accent}35`, display: 'flex', flexDirection: 'column', gap: '10px', ...extra }, [
      el(`${key}-mark`, 'paragraph', 'Indicador', cfg.style === 'game' ? '✦  DESTACADO' : cfg.style === 'community' ? '●  COMUNIDAD' : '01 / FEATURE', { color: cfg.accent, fontWeight: '800', fontSize: '10px', letterSpacing: '1px', margin: '0' }),
      el(`${key}-title`, 'heading', 'Título de tarjeta', title, { color: cfg.text, fontSize: '19px', fontWeight: '800', margin: '0' }),
      el(`${key}-copy`, 'paragraph', 'Descripción de tarjeta', copy, { color: cfg.text, opacity: '0.78', fontSize: '13px', lineHeight: '1.65', margin: '0' }),
    ]);
  const rootStyles: Record<string, unknown> = {
    backgroundColor: cfg.bg, color: cfg.text, padding: '0', display: 'flex',
    flexDirection: 'column', gap: '0', minHeight: '100vh', fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  };
  const nav = box('nav', 'Barra de navegación', {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
    justifyContent: 'space-between', gap: '16px', padding: cfg.style === 'game' ? '18px 4%' : '22px 6%',
    backgroundColor: cfg.surface, borderBottom: `1px solid ${cfg.accent}35`,
  }, [
    el('brand', 'heading', 'Marca editable', cfg.brand, { fontSize: cfg.style === 'creator' ? '25px' : '21px', fontWeight: '900', color: cfg.accent, margin: '0' }),
    el('navlinks', 'paragraph', 'Enlaces de navegación',
      cfg.style === 'game' ? 'JUEGO   ·   CAPTURAS   ·   REQUISITOS' :
      cfg.style === 'creator' ? 'Vídeos   ·   Series   ·   Sobre mí' :
      cfg.style === 'marketplace' ? 'Categorías   ·   Ofertas   ·   Vendedores' :
      cfg.style === 'community' ? 'Comunidad   ·   Eventos   ·   Recursos' :
      'Producto   ·   Características   ·   Precios   ·   Contacto',
      { color: cfg.text, fontSize: '12px', margin: '0' }),
  ]);

  const features = box('features', 'Bloque de características', {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '14px',
    padding: '32px 6% 58px', alignItems: 'stretch',
  }, [
    card('feature1', cfg.style === 'game' ? 'Una aventura única' : cfg.style === 'enterprise' ? 'Todo conectado' : 'Pensado para ti',
      cfg.style === 'game' ? 'Descubre un mundo con identidad propia, secretos y desafíos.' : 'Una experiencia clara, cuidada y fácil de adaptar a tu proyecto.'),
    card('feature2', cfg.style === 'community' ? 'Participa' : cfg.style === 'workspace' ? 'Orden sin esfuerzo' : 'Hecho para crecer',
      cfg.style === 'community' ? 'Comparte ideas, encuentra personas y participa en actividades.' : 'Empieza con lo importante y amplía el contenido cuando lo necesites.'),
    card('feature3', cfg.style === 'app' ? 'Siempre contigo' : cfg.style === 'creator' ? 'Nuevas historias' : 'Todo en un lugar',
      cfg.style === 'creator' ? 'Organiza tus vídeos, episodios y colecciones favoritas.' : 'Reúne información, contenido y acciones en una página coherente.'),
  ]);

  let sections: EditorElement[] = [];
  if (cfg.style === 'device') {
    sections = [
      box('device-showcase', 'Presentación del dispositivo', { padding: 'clamp(28px, 6vw, 72px) 7%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '28px', background: `linear-gradient(120deg, ${cfg.bg}, #e5edf8)` }, [
        box('device-copy', 'Información del dispositivo', { flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '16px' }, [
          el('device-eyebrow', 'paragraph', 'Etiqueta de producto', 'NUEVA GENERACIÓN · NOVA GALAXY', { color: cfg.accent, fontSize: '10px', fontWeight: '900', letterSpacing: '1px', margin: '0' }),
          el('device-title', 'heading', 'Nombre del dispositivo', 'Potencia para lo que viene.', { fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.03', margin: '0' }),
          el('device-copy-text', 'paragraph', 'Descripción del dispositivo', cfg.copy, { fontSize: '15px', lineHeight: '1.7', margin: '0' }),
          el('device-price', 'heading', 'Precio del dispositivo', 'Desde $499.990', { fontSize: '23px', margin: '0' }),
          el('device-cta', 'button', 'Comprar dispositivo', 'Conocer el dispositivo ↗', { backgroundColor: cfg.accent, color: '#ffffff', padding: '13px 18px', borderRadius: '8px', alignSelf: 'flex-start', fontWeight: '800' }),
          el('device-note', 'paragraph', 'Nota de compra', 'Consulta disponibilidad y opciones de financiación.', { fontSize: '11px', opacity: '0.7', margin: '0' }),
        ]),
        image('device-image', 'Imagen del dispositivo', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1000&auto=format&fit=crop', { flex: '1 1 260px', height: '350px', borderRadius: '18px', backgroundColor: '#dbe4f0' }),
      ]),
      box('device-specs', 'Especificaciones principales', { padding: '10px 7% 52px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }, [
        ...[['01', 'Cámara', 'Captura cada detalle'], ['02', 'Rendimiento', 'Fluidez durante todo el día'], ['03', 'Batería', 'Energía para seguir']].map(([n, title, copy], i) => box(`device-spec${i}`, `Especificación ${title}`, { flex: '1 1 170px', padding: '20px', backgroundColor: cfg.surface, border: '1px solid #dbe3ee', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }, [
          el(`device-spec-n${i}`, 'paragraph', 'Número', n, { color: cfg.accent, fontWeight: '900', fontSize: '11px', margin: '0' }),
          el(`device-spec-title${i}`, 'heading', 'Característica', title, { fontSize: '18px', margin: '0' }),
          el(`device-spec-copy${i}`, 'paragraph', 'Descripción', copy, { fontSize: '12px', opacity: '0.75', margin: '0' }),
        ])),
      ]),
    ];
  } else if (cfg.style === 'marketplace') {
    sections = [
      box('searchbar', 'Buscador de productos', { padding: '20px 6%', backgroundColor: cfg.surface, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }, [
        el('searchfield', 'paragraph', 'Campo de búsqueda', '⌕  Buscar productos, marcas y categorías…', { flex: '1 1 260px', padding: '14px 18px', backgroundColor: cfg.bg, border: '1px solid #d7dce3', borderRadius: '9px', color: '#667085', margin: '0' }),
        el('searchbutton', 'button', 'Buscar', 'Buscar productos', { backgroundColor: cfg.accent, color: '#202124', borderRadius: '9px', padding: '13px 18px', fontWeight: '800' }),
      ]),
      box('categories', 'Categorías rápidas', { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', padding: '10px 6% 28px' },
        ['Tecnología', 'Hogar', 'Moda', 'Videojuegos', 'Accesorios'].map((label, i) => el(`category${i}`, 'button', `Categoría ${label}`, label, { backgroundColor: i === 0 ? cfg.accent : cfg.surface, color: i === 0 ? '#202124' : cfg.text, border: '1px solid #e1e5eb', borderRadius: '999px', padding: '9px 14px', fontSize: '12px' }))),
      box('products', 'Productos destacados', { padding: '10px 6% 58px', display: 'flex', flexDirection: 'column', gap: '18px' }, [
        el('products-title', 'heading', 'Título de productos', 'Hallazgos de la semana', { fontSize: '28px', fontWeight: '900', margin: '0' }),
        box('product-grid', 'Grilla de productos', { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '14px' }, [
          ...[
            ['Auriculares inalámbricos', '$24.990', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop'],
            ['Reloj inteligente', '$39.990', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop'],
            ['Cámara compacta', '$79.990', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop'],
            ['Mochila urbana', '$19.990', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop'],
          ].map(([name, price, src], i) => box(`product${i}`, `Producto ${i + 1}`, { flex: '1 1 150px', minWidth: '0', backgroundColor: cfg.surface, border: '1px solid #e2e6eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '14px' }, [
            image(`product-img${i}`, `Imagen ${name}`, src, { height: '145px', borderRadius: '0' }),
            el(`product-name${i}`, 'heading', 'Nombre del producto', name, { fontSize: '14px', fontWeight: '700', margin: '6px 12px 0' }),
            el(`product-price${i}`, 'heading', 'Precio del producto', price, { fontSize: '18px', fontWeight: '900', color: cfg.text, margin: '0 12px' }),
            el(`product-action${i}`, 'button', 'Ver producto', 'Ver producto →', { backgroundColor: cfg.accent, color: '#202124', padding: '9px 10px', borderRadius: '7px', margin: '0 12px', fontSize: '11px' }),
          ])),
        ]),
      ]),
    ];
  } else if (cfg.style === 'deals') {
    sections = [
      box('promo-strip', 'Franja promocional', { backgroundColor: cfg.accent, color: '#ffffff', padding: '12px 6%', textAlign: 'center' }, [
        el('promo-copy', 'paragraph', 'Mensaje promocional', '⚡ SEMANA DE OFERTAS · Descuentos seleccionados para ti', { fontSize: '12px', fontWeight: '900', margin: '0' }),
      ]),
      box('deal-hero', 'Portada promocional', { padding: 'clamp(30px, 6vw, 68px) 6%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '26px', background: `linear-gradient(120deg, ${cfg.bg}, #ffe5dc)` }, [
        box('deal-copy', 'Texto de campaña', { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '15px' }, [
          el('deal-label', 'paragraph', 'Etiqueta de campaña', 'PRECIO ESPECIAL · POR TIEMPO LIMITADO', { color: cfg.accent, fontSize: '11px', fontWeight: '900', letterSpacing: '1px', margin: '0' }),
          el('deal-title', 'heading', 'Título de campaña', 'Un pequeño capricho, un gran descuento.', { fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: '1.04', fontWeight: '900', margin: '0' }),
          el('deal-desc', 'paragraph', 'Descripción de campaña', cfg.copy, { fontSize: '15px', lineHeight: '1.7', margin: '0' }),
          el('deal-cta', 'button', 'Botón de ofertas', 'Ver ofertas de hoy ↗', { backgroundColor: cfg.accent, color: '#ffffff', padding: '13px 18px', borderRadius: '8px', alignSelf: 'flex-start', fontWeight: '800' }),
        ]),
        image('deal-image', 'Imagen de oferta', 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000&auto=format&fit=crop', { flex: '1 1 260px', height: '300px', borderRadius: '20px' }),
      ]),
      box('deal-products', 'Ofertas de temporada', { padding: '12px 6% 54px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '14px' }, [
        ...[['-30%', 'Pack esencial', '$14.990'], ['-45%', 'Selección especial', '$21.990'], ['-20%', 'Favorito de la semana', '$9.990']].map(([discount, name, price], i) => box(`deal-card${i}`, `Oferta ${i + 1}`, { flex: '1 1 180px', padding: '18px', backgroundColor: cfg.surface, border: `1px solid ${cfg.accent}35`, borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '9px' }, [
          el(`discount${i}`, 'heading', 'Descuento', discount, { color: cfg.accent, fontSize: '27px', fontWeight: '900', margin: '0' }),
          el(`deal-name${i}`, 'paragraph', 'Nombre de oferta', name, { fontWeight: '700', margin: '0' }),
          el(`deal-price${i}`, 'heading', 'Precio de oferta', price, { fontSize: '20px', margin: '0' }),
          el(`deal-buy${i}`, 'button', 'Comprar oferta', 'Aprovechar oferta →', { backgroundColor: cfg.accent, color: '#fff', padding: '10px', borderRadius: '8px' }),
        ])),
      ]),
    ];
  } else if (cfg.style === 'enterprise') {
    sections = [
      box('suite-hero', 'Portada de plataforma', { padding: 'clamp(36px, 7vw, 80px) 7%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '32px' }, [
        box('suite-copy', 'Propuesta de valor', { flex: '1 1 290px', display: 'flex', flexDirection: 'column', gap: '18px' }, [
          el('suite-eyebrow', 'paragraph', 'Etiqueta', 'PLATAFORMA DE TRABAJO UNIFICADA', { color: cfg.accent, fontSize: '11px', fontWeight: '900', letterSpacing: '1.2px', margin: '0' }),
          el('suite-title', 'heading', 'Título principal', cfg.headline, { fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: '1.05', margin: '0' }),
          el('suite-copy', 'paragraph', 'Descripción', cfg.copy, { fontSize: '16px', lineHeight: '1.7', margin: '0' }),
          el('suite-cta', 'button', 'Probar plataforma', 'Probar gratis  →', { backgroundColor: cfg.accent, color: '#ffffff', borderRadius: '7px', padding: '13px 18px', alignSelf: 'flex-start' }),
        ]),
        box('dashboard-mock', 'Vista previa del panel', { flex: '1 1 290px', minWidth: '0', backgroundColor: '#111827', color: '#ffffff', borderRadius: '16px', padding: '16px', boxShadow: '0 18px 45px #0002', display: 'flex', flexDirection: 'column', gap: '12px' }, [
          el('dash-top', 'paragraph', 'Barra del panel', '●  ●  ●     Workspace / Overview', { color: '#cbd5e1', fontSize: '11px', margin: '0' }),
          box('dash-row', 'Panel y métricas', { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '9px' }, [
            ...[['Proyectos', '24'], ['Tareas activas', '08'], ['Equipo', '12']].map(([label, val], i) => box(`metric${i}`, `Métrica ${label}`, { flex: '1 1 80px', backgroundColor: '#1f2937', padding: '13px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }, [
              el(`metric-label${i}`, 'paragraph', 'Nombre de métrica', label, { color: '#9ca3af', fontSize: '10px', margin: '0' }),
              el(`metric-val${i}`, 'heading', 'Valor de métrica', val, { color: '#ffffff', fontSize: '24px', margin: '0' }),
            ])),
          ]),
          el('dash-bar-label', 'paragraph', 'Actividad reciente', 'Actividad reciente', { fontSize: '12px', fontWeight: '800', margin: '4px 0 0' }),
          ...['Diseño del producto actualizado', 'Nuevo miembro en el equipo', 'Informe semanal disponible'].map((t, i) => el(`dash-activity${i}`, 'paragraph', `Actividad ${i + 1}`, `✓  ${t}`, { backgroundColor: '#1f2937', color: '#d1d5db', padding: '9px', borderRadius: '6px', fontSize: '11px', margin: '0' })),
        ]),
      ]),
    ];
  } else if (cfg.style === 'workspace') {
    sections = [
      box('workspace-app', 'Maqueta de espacio de trabajo', { margin: '0 6% 44px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '310px', border: '1px solid #e7e3dc', borderRadius: '12px', overflow: 'hidden', backgroundColor: cfg.surface }, [
        box('workspace-sidebar', 'Barra lateral del espacio', { flex: '0 1 170px', padding: '18px', backgroundColor: '#f1efe9', display: 'flex', flexDirection: 'column', gap: '13px' }, [
          el('workspace-sidebar-title', 'heading', 'Nombre del espacio', 'Mi espacio', { fontSize: '14px', margin: '0 0 8px' }),
          ...['⌂  Inicio', '▤  Proyectos', '▣  Documentos', '☆  Favoritos', '+  Nueva página'].map((t, i) => el(`workspace-link${i}`, 'paragraph', `Elemento lateral ${i + 1}`, t, { fontSize: '12px', padding: '8px', backgroundColor: i === 1 ? '#dedbd3' : 'transparent', borderRadius: '6px', margin: '0' })),
        ]),
        box('workspace-document', 'Documento principal', { flex: '1 1 260px', padding: 'clamp(18px, 4vw, 38px)', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '0' }, [
          el('workspace-crumb', 'paragraph', 'Ruta del documento', 'PROYECTOS  /  PLANIFICACIÓN', { fontSize: '10px', fontWeight: '800', letterSpacing: '1px', color: cfg.accent, margin: '0' }),
          el('workspace-doc-title', 'heading', 'Título del documento', 'Un lugar para ordenar las ideas.', { fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: '1.1', margin: '0' }),
          el('workspace-doc-copy', 'paragraph', 'Texto del documento', 'Reúne notas, tareas y recursos de tu equipo en un espacio sereno y fácil de recorrer.', { fontSize: '14px', lineHeight: '1.7', margin: '0' }),
          ...['Definir el objetivo', 'Organizar las tareas', 'Compartir el progreso'].map((t, i) => el(`workspace-task${i}`, 'paragraph', `Tarea ${i + 1}`, `☐  ${t}`, { padding: '10px 12px', border: '1px solid #e7e3dc', borderRadius: '7px', fontSize: '12px', margin: '0' })),
        ]),
      ]),
    ];
  } else if (cfg.style === 'creator') {
    sections = [
      box('creator-profile', 'Perfil del canal', { padding: '0 6% 24px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '18px' }, [
        box('creator-avatar', 'Avatar del creador', { width: '76px', height: '76px', minWidth: '76px', borderRadius: '50%', background: `linear-gradient(135deg, ${cfg.accent}, #6b21a8)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }, [
          el('creator-avatar-text', 'heading', 'Iniciales', 'PLAY', { fontSize: '19px', color: '#ffffff', fontWeight: '900', margin: '0' }),
        ]),
        box('creator-info', 'Información del canal', { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }, [
          el('creator-name', 'heading', 'Nombre del canal', 'PLAY / STUDIO', { fontSize: '24px', margin: '0' }),
          el('creator-meta', 'paragraph', 'Datos del canal', '128 mil suscriptores · Nuevos vídeos cada semana', { color: '#b8b8b8', fontSize: '12px', margin: '0' }),
        ]),
        el('creator-subscribe', 'button', 'Botón de suscripción', '＋ Suscribirme', { backgroundColor: cfg.accent, color: '#ffffff', borderRadius: '999px', padding: '12px 18px', fontWeight: '800' }),
      ]),
      box('creator-featured', 'Vídeo destacado', { padding: '0 6% 30px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '18px' }, [
        image('creator-video-image', 'Miniatura de vídeo', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop', { flex: '2 1 300px', height: '250px', borderRadius: '14px' }),
        box('creator-video-copy', 'Información del vídeo', { flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }, [
          el('creator-video-label', 'paragraph', 'Etiqueta del vídeo', '▶  ÚLTIMO ESTRENO', { color: cfg.accent, fontWeight: '900', fontSize: '10px', margin: '0' }),
          el('creator-video-title', 'heading', 'Título del vídeo', 'Detrás de cámaras: cómo lo hicimos', { fontSize: '24px', lineHeight: '1.15', margin: '0' }),
          el('creator-video-desc', 'paragraph', 'Descripción del vídeo', 'Una nueva historia, ideas y procesos para compartir con la comunidad.', { color: '#b8b8b8', fontSize: '13px', lineHeight: '1.6', margin: '0' }),
        ]),
      ]),
      box('creator-playlists', 'Últimos vídeos', { padding: '0 6% 54px', display: 'flex', flexDirection: 'column', gap: '15px' }, [
        el('creator-playlist-title', 'heading', 'Título de lista', 'Para ver después', { fontSize: '25px', margin: '0' }),
        box('creator-video-grid', 'Grilla de vídeos', { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }, [
          ...[
            ['Ideas en movimiento', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&auto=format&fit=crop'],
            ['Un día creando', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop'],
            ['Sonidos y lugares', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&auto=format&fit=crop'],
          ].map(([title, src], i) => box(`creator-video${i}`, `Vídeo ${i + 1}`, { flex: '1 1 170px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '8px' }, [
            image(`creator-thumb${i}`, `Miniatura ${i + 1}`, src, { height: '120px', borderRadius: '10px' }),
            el(`creator-title${i}`, 'heading', 'Título del vídeo', title, { fontSize: '14px', margin: '0' }),
            el(`creator-views${i}`, 'paragraph', 'Información del vídeo', '12 mil visualizaciones · hace 3 días', { color: '#b8b8b8', fontSize: '11px', margin: '0' }),
          ])),
        ]),
      ]),
    ];
  } else if (cfg.style === 'community') {
    sections = [
      box('community-stats', 'Estadísticas de comunidad', { padding: '8px 6% 30px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }, [
        ...[['8.4k', 'Miembros'], ['120+', 'Conversaciones'], ['24', 'Eventos este mes']].map(([value, label], i) => box(`community-stat${i}`, `Estadística ${label}`, { flex: '1 1 140px', padding: '18px', backgroundColor: cfg.surface, border: `1px solid ${cfg.accent}30`, borderRadius: '14px', textAlign: 'center' }, [
          el(`community-statval${i}`, 'heading', 'Valor', value, { color: cfg.accent, fontSize: '29px', fontWeight: '900', margin: '0' }),
          el(`community-statlabel${i}`, 'paragraph', 'Descripción', label, { fontSize: '12px', margin: '5px 0 0' }),
        ])),
      ]),
      box('community-events', 'Próximos encuentros', { padding: '12px 6% 55px', display: 'flex', flexDirection: 'column', gap: '12px' }, [
        el('community-events-title', 'heading', 'Título de eventos', 'Lo que viene en la comunidad', { fontSize: '27px', margin: '0 0 5px' }),
        ...[['18 OCT', 'Café creativo', 'Encuentro informal para compartir proyectos'], ['22 OCT', 'Taller abierto', 'Una sesión práctica para aprender en conjunto'], ['29 OCT', 'Noche de juegos', 'Conecta y juega con otras personas']].map(([date, title, copy], i) => box(`community-event${i}`, `Evento ${i + 1}`, { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '16px', padding: '17px', borderRadius: '12px', backgroundColor: cfg.surface, border: `1px solid ${cfg.accent}30` }, [
          el(`community-date${i}`, 'heading', 'Fecha', date, { color: cfg.accent, fontSize: '14px', fontWeight: '900', margin: '0', minWidth: '70px' }),
          box(`community-eventcopy${i}`, 'Detalles del evento', { flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }, [
            el(`community-eventtitle${i}`, 'heading', 'Nombre del evento', title, { fontSize: '16px', margin: '0' }),
            el(`community-eventdesc${i}`, 'paragraph', 'Descripción del evento', copy, { fontSize: '12px', opacity: '0.75', margin: '0' }),
          ]),
          el(`community-eventbutton${i}`, 'button', 'Ver evento', 'Ver detalles →', { backgroundColor: cfg.surface, color: cfg.accent, border: `1px solid ${cfg.accent}`, borderRadius: '8px', padding: '9px 12px' }),
        ])),
      ]),
    ];
  } else if (cfg.style === 'game') {
    sections = [
      box('game-hero', 'Portada del videojuego', { margin: '0', padding: '0 6% 28px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch' }, [
        image('game-cover', 'Arte de portada', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop', { flex: '2 1 320px', height: '310px', borderRadius: '12px' }),
        box('game-buy-panel', 'Ficha de compra del juego', { flex: '1 1 210px', padding: '22px', backgroundColor: cfg.surface, border: `1px solid ${cfg.accent}55`, borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }, [
          el('game-tag', 'paragraph', 'Etiqueta de género', 'AVENTURA INDIE  ·  2026', { color: cfg.accent, fontSize: '10px', fontWeight: '900', margin: '0' }),
          el('game-title', 'heading', 'Nombre del videojuego', 'Ecos de otro mundo', { fontSize: '27px', lineHeight: '1.1', margin: '0' }),
          el('game-desc', 'paragraph', 'Descripción del videojuego', 'Explora, resuelve misterios y descubre qué se esconde más allá del horizonte.', { color: cfg.text, opacity: '0.8', fontSize: '13px', lineHeight: '1.6', margin: '0' }),
          el('game-price', 'heading', 'Precio', 'Gratis', { fontSize: '24px', margin: '0' }),
          el('game-cta', 'button', 'Descargar juego', '↓  Descargar juego', { backgroundColor: cfg.accent, color: '#101827', padding: '13px', borderRadius: '7px', fontWeight: '900' }),
          el('game-platforms', 'paragraph', 'Plataformas', 'Windows · Linux · Android', { color: cfg.text, opacity: '0.65', fontSize: '11px', margin: '0' }),
        ]),
      ]),
      box('game-gallery', 'Galería de capturas', { padding: '0 6% 56px', display: 'flex', flexDirection: 'column', gap: '14px' }, [
        el('game-gallery-title', 'heading', 'Título de capturas', 'Una mirada al mundo', { fontSize: '25px', margin: '0' }),
        box('game-gallery-grid', 'Grilla de capturas', { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }, [
          image('game-shot1', 'Captura de juego 1', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop', { flex: '1 1 200px', height: '145px', borderRadius: '9px' }),
          image('game-shot2', 'Captura de juego 2', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=700&auto=format&fit=crop', { flex: '1 1 200px', height: '145px', borderRadius: '9px' }),
          image('game-shot3', 'Captura de juego 3', 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=700&auto=format&fit=crop', { flex: '1 1 200px', height: '145px', borderRadius: '9px' }),
        ]),
      ]),
    ];
  } else if (cfg.style === 'product') {
    sections = [
      box('product-showcase', 'Ficha principal del producto', { padding: 'clamp(26px, 6vw, 70px) 7%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '34px', alignItems: 'center' }, [
        image('product-main-image', 'Imagen principal del producto', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop', { flex: '1 1 280px', height: '390px', borderRadius: '18px', backgroundColor: '#e8e3dc' }),
        box('product-details', 'Detalles del producto', { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '16px' }, [
          el('product-tag', 'paragraph', 'Etiqueta del producto', 'OBJETO DE DISEÑO · EDICIÓN ACTUAL', { color: cfg.accent, fontSize: '10px', fontWeight: '900', letterSpacing: '1px', margin: '0' }),
          el('product-title', 'heading', 'Nombre del producto', 'Forma. En su mejor versión.', { fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.05', margin: '0' }),
          el('product-copy', 'paragraph', 'Descripción del producto', cfg.copy, { fontSize: '14px', lineHeight: '1.7', opacity: '0.8', margin: '0' }),
          el('product-price', 'heading', 'Precio', '$89.990', { fontSize: '27px', margin: '0' }),
          el('product-options', 'paragraph', 'Opciones de color', 'Color  ●  ●  ●     Talla  S  M  L', { fontSize: '12px', padding: '12px 0', borderTop: '1px solid #c9c2b7', borderBottom: '1px solid #c9c2b7', margin: '0' }),
          el('product-buy', 'button', 'Comprar producto', 'Añadir al carrito  ↗', { backgroundColor: cfg.text, color: cfg.bg, borderRadius: '999px', padding: '15px 20px', fontWeight: '800' }),
          el('product-shipping', 'paragraph', 'Información de envío', '✓  Envío calculado al continuar · Cambios fáciles', { fontSize: '11px', opacity: '0.7', margin: '0' }),
        ]),
      ]),
    ];
  } else if (cfg.style === 'app') {
    sections = [
      box('app-hero', 'Portada de aplicación', { padding: 'clamp(30px, 7vw, 75px) 7%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '30px', background: `linear-gradient(130deg, ${cfg.bg}, ${cfg.surface})` }, [
        box('app-copy', 'Propuesta de valor de la app', { flex: '1 1 270px', display: 'flex', flexDirection: 'column', gap: '17px' }, [
          el('app-eyebrow', 'paragraph', 'Etiqueta de aplicación', 'TU NUEVA APP FAVORITA', { color: cfg.accent, fontSize: '11px', fontWeight: '900', letterSpacing: '1px', margin: '0' }),
          el('app-title', 'heading', 'Título de aplicación', cfg.headline, { fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: '1.04', margin: '0' }),
          el('app-desc', 'paragraph', 'Descripción de aplicación', cfg.copy, { fontSize: '15px', lineHeight: '1.7', opacity: '0.8', margin: '0' }),
          el('app-download', 'button', 'Descargar aplicación', '↓  Descargar gratis', { backgroundColor: cfg.accent, color: '#ffffff', borderRadius: '10px', padding: '14px 18px', alignSelf: 'flex-start', fontWeight: '800' }),
          el('app-platforms', 'paragraph', 'Compatibilidad', 'Disponible para iOS y Android', { fontSize: '11px', opacity: '0.7', margin: '0' }),
        ]),
        box('phone-mockup', 'Vista previa de pantalla móvil', { flex: '0 1 230px', minWidth: '180px', maxWidth: '270px', margin: '0 auto', padding: '10px', borderRadius: '32px', backgroundColor: '#171727', border: '3px solid #34344b', boxShadow: '0 22px 45px #27204a30' }, [
          box('phone-screen', 'Pantalla de la aplicación', { backgroundColor: '#ffffff', color: '#20203a', minHeight: '340px', borderRadius: '23px', padding: '19px 14px', display: 'flex', flexDirection: 'column', gap: '13px' }, [
            el('phone-top', 'paragraph', 'Cabecera de app', '●  pulse', { color: cfg.accent, fontSize: '12px', fontWeight: '900', margin: '0' }),
            el('phone-greeting', 'heading', 'Saludo de app', 'Hola, ¿qué tal?', { fontSize: '22px', margin: '0' }),
            box('phone-feature', 'Tarjeta de app', { background: `linear-gradient(140deg, ${cfg.accent}, #9c8cff)`, color: '#ffffff', borderRadius: '14px', padding: '18px', minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'end', gap: '5px' }, [
              el('phone-feature-label', 'paragraph', 'Etiqueta de app', 'TU RESUMEN', { fontSize: '9px', fontWeight: '900', margin: '0' }),
              el('phone-feature-title', 'heading', 'Tarjeta destacada', 'Todo en calma.', { fontSize: '19px', margin: '0' }),
            ]),
            ...['Tu actividad', 'Tus favoritos', 'Ajustes'].map((t, i) => el(`phone-row${i}`, 'paragraph', `Opción ${i + 1}`, `◦   ${t}                         ›`, { borderBottom: '1px solid #ececf2', padding: '9px 0', fontSize: '11px', margin: '0' })),
          ]),
        ]),
      ]),
    ];
  } else {
    // Plantillas clásicas: mantienen su estructura original, pero con jerarquía y contenido editable.
    sections = [
      ...(cfg.style === 'commerce' || cfg.style === 'stream' ? [
        box('showcase', 'Imagen destacada editable', { padding: '0 6% 38px', width: '100%' }, [
          image('showcase-image', 'Imagen destacada', cfg.style === 'commerce'
            ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop'
            : 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&auto=format&fit=crop',
          { height: '300px', borderRadius: '18px' }),
        ]),
      ] : []),
    ];
  }

  const hero = cfg.style === 'search'
    ? box('hero', 'Portada principal', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px', padding: 'clamp(48px, 8vw, 100px) 8%', background: cfg.bg }, [
        el('eyebrow', 'paragraph', 'Etiqueta superior', cfg.eyebrow, { color: cfg.accent, fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', margin: '0' }),
        el('title', 'heading', 'Título principal editable', cfg.headline, { color: cfg.text, fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: '1.04', fontWeight: '900', maxWidth: '900px', margin: '0' }),
        el('copy', 'paragraph', 'Descripción editable', cfg.copy, { color: cfg.text, opacity: '0.82', fontSize: '18px', lineHeight: '1.7', maxWidth: '680px', margin: '0' }),
        el('cta', 'button', 'Botón principal editable', cfg.cta, { backgroundColor: cfg.accent, color: cfg.bg, padding: '14px 22px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', border: '0' }),
      ])
    : box('hero', 'Portada principal', { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '20px', padding: 'clamp(42px, 7vw, 86px) 8%', background: cfg.style === 'stream' ? `linear-gradient(135deg, ${cfg.surface}, ${cfg.bg})` : cfg.bg }, [
        el('eyebrow', 'paragraph', 'Etiqueta superior', cfg.eyebrow, { color: cfg.accent, fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', margin: '0' }),
        el('title', 'heading', 'Título principal editable', cfg.headline, { color: cfg.text, fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: '1.04', fontWeight: '900', maxWidth: '900px', margin: '0' }),
        el('copy', 'paragraph', 'Descripción editable', cfg.copy, { color: cfg.text, opacity: '0.82', fontSize: '18px', lineHeight: '1.7', maxWidth: '680px', margin: '0' }),
        el('cta', 'button', 'Botón principal editable', cfg.cta, { backgroundColor: cfg.accent, color: ['stream'].includes(cfg.style) ? '#ffffff' : cfg.bg, padding: '14px 22px', borderRadius: cfg.style === 'minimal' ? '999px' : '8px', fontSize: '14px', fontWeight: '800', border: '0' }),
      ]);

  // Las variantes nuevas tienen composición propia: no son solo el mismo hero con otro color.
  if (['marketplace', 'deals', 'enterprise', 'workspace', 'creator', 'community', 'game', 'product', 'app', 'device'].includes(cfg.style)) {
    sections = sections;
  } else {
    sections = [...sections, features];
  }

  const document = box('root', cfg.title, rootStyles, [
    nav,
    ...(cfg.style === 'marketplace' ? [
      box('market-hero', 'Portada del marketplace', { padding: '38px 6% 28px', display: 'flex', flexDirection: 'column', gap: '14px', background: `linear-gradient(110deg, ${cfg.bg}, ${cfg.surface})` }, [
        el('market-eyebrow', 'paragraph', 'Etiqueta de temporada', 'TU PRÓXIMO FAVORITO TE ESTÁ ESPERANDO', { color: cfg.accent, fontWeight: '900', fontSize: '10px', letterSpacing: '1px', margin: '0' }),
        el('market-title', 'heading', 'Título de marketplace', cfg.headline, { fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.08', margin: '0', maxWidth: '760px' }),
        el('market-copy', 'paragraph', 'Descripción de marketplace', cfg.copy, { fontSize: '14px', lineHeight: '1.6', margin: '0', maxWidth: '600px' }),
      ]),
    ] : ['deals', 'enterprise', 'workspace', 'creator', 'community', 'game', 'product', 'app', 'device'].includes(cfg.style) ? [] : [hero]),
    ...sections,
    ...(cfg.style === 'minimal' || cfg.style === 'stream' || cfg.style === 'commerce' || cfg.style === 'search' ? [features] : []),
    box('footer', 'Pie de página', { padding: '24px 6%', backgroundColor: cfg.surface, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px', borderTop: `1px solid ${cfg.accent}35` }, [
      el('footerbrand', 'paragraph', 'Marca del pie', cfg.brand, { color: cfg.accent, fontWeight: '800', margin: '0' }),
      el('copyright', 'paragraph', 'Copyright editable', '© 2026 · Cambia este texto y tus enlaces desde el inspector.', { color: cfg.text, opacity: '0.7', fontSize: '12px', margin: '0' }),
    ]),
  ]);
  return { id, title: cfg.title, category: cfg.category, description: cfg.description, tag: 'Plantilla editable', document };
};

const BRAND_INSPIRED_TEMPLATES: TemplateItem[] = [
  makeBrandTemplate({ id: 'brand-apple-inspired', title: 'Minimal Tech (inspiración Apple)', category: 'Exclusivo', description: 'Diseño tecnológico minimalista, mucho espacio, tipografía grande y CTA redondeado. Todos los elementos son editables.', brand: 'NOVA / TECH', eyebrow: 'DISEÑADO PARA EL DÍA A DÍA', headline: 'La tecnología. Más simple.', copy: 'Presenta tu producto con una página limpia, elegante y enfocada en lo importante.', cta: 'Descubrir producto ↗', bg: '#f5f5f7', surface: '#ffffff', text: '#1d1d1f', accent: '#0071e3', style: 'minimal' }),
  makeBrandTemplate({ id: 'brand-google-inspired', title: 'Search & Start (inspiración Google)', category: 'SaaS', description: 'Portada clara para buscador, directorio o herramienta online con acciones destacadas.', brand: 'Lumen', eyebrow: 'ENCUENTRA LO QUE NECESITAS', headline: 'Todo empieza con una búsqueda.', copy: 'Una experiencia directa para descubrir recursos, productos y respuestas desde un solo lugar.', cta: 'Explorar ahora', bg: '#ffffff', surface: '#f8f9fa', text: '#202124', accent: '#4285f4', style: 'search' }),
  makeBrandTemplate({ id: 'brand-spotify-inspired', title: 'Music Hub (inspiración Spotify)', category: 'Streaming', description: 'Landing oscura para música, podcasts, contenido y servicios de suscripción.', brand: 'WAVE+', eyebrow: 'TU PRÓXIMA CANCIÓN FAVORITA', headline: 'Dale play a lo que te mueve.', copy: 'Presenta playlists, episodios, artistas o contenido destacado con una estética vibrante.', cta: 'Escuchar ahora ▶', bg: '#101010', surface: '#191919', text: '#ffffff', accent: '#1ed760', style: 'stream' }),
  makeBrandTemplate({ id: 'brand-shopify-inspired', title: 'Storefront (inspiración Shopify)', category: 'E-commerce', description: 'Tienda online adaptable con tarjetas de beneficios, navegación y botones personalizables.', brand: 'NORTH / GOODS', eyebrow: 'NUEVA COLECCIÓN', headline: 'Productos que encajan contigo.', copy: 'Presenta tu catálogo, destaca tus ventajas y dirige a tus clientes a la compra.', cta: 'Ver colección →', bg: '#f6f7f5', surface: '#ffffff', text: '#18251d', accent: '#16804a', style: 'commerce' }),
  makeBrandTemplate({ id: 'brand-netflix-inspired', title: 'Cinematic Landing (inspiración Netflix)', category: 'Streaming', description: 'Portada audiovisual oscura con contraste fuerte, mensaje principal y llamada a la acción.', brand: 'FRAME / PLAY', eyebrow: 'HISTORIAS QUE TE ATRAPAN', headline: 'Tu próxima historia empieza aquí.', copy: 'Ideal para catálogos de vídeo, canales, productoras o proyectos audiovisuales.', cta: 'Ver catálogo ▶', bg: '#101010', surface: '#202020', text: '#ffffff', accent: '#e50914', style: 'stream' }),
  makeBrandTemplate({ id: 'brand-restaurant', title: 'Mesa Norte — Restaurante', category: 'Servicios', description: 'Página para restaurante o cafetería con identidad cálida, presentación, llamada a reservar y secciones de servicios.', brand: 'MESA NORTE', eyebrow: 'COCINA DE TEMPORADA · HECHO CON CALMA', headline: 'Un buen lugar para reunirse.', copy: 'Presenta tu carta, horario, ubicación y experiencia con una web elegante y fácil de adaptar.', cta: 'Reservar una mesa ↗', bg: '#f4eee4', surface: '#fffaf2', text: '#34251d', accent: '#a34f2b', style: 'minimal' }),
  makeBrandTemplate({ id: 'brand-agency', title: 'Forma Studio — Agencia creativa', category: 'Agencia', description: 'Portada editorial para estudios creativos con propuesta de valor, proyectos y tarjetas de servicios editables.', brand: 'FORMA® STUDIO', eyebrow: 'ESTRATEGIA · DISEÑO · DIGITAL', headline: 'Marcas que se hacen notar.', copy: 'Una base profesional para agencias, diseñadores y consultores que quieren mostrar su trabajo.', cta: 'Ver proyectos ↗', bg: '#f5f5f5', surface: '#ffffff', text: '#171717', accent: '#e85d3f', style: 'minimal' }),
  makeBrandTemplate({ id: 'brand-education', title: 'Aula Abierta — Educación', category: 'Servicios', description: 'Página de cursos con presentación, ventajas y llamadas a inscripción. Textos y colores editables.', brand: 'AULA ABIERTA', eyebrow: 'APRENDE A TU RITMO', headline: 'Tu próximo paso empieza aquí.', copy: 'Presenta cursos, talleres, docentes y recursos para una comunidad que quiere seguir aprendiendo.', cta: 'Explorar cursos →', bg: '#f8fafc', surface: '#ffffff', text: '#172554', accent: '#2563eb', style: 'search' }),
  makeBrandTemplate({ id: 'brand-travel', title: 'Horizonte — Viajes y turismo', category: 'Portafolio', description: 'Landing de viajes con tonos naturales, imagen destacada y tarjetas para destinos o experiencias.', brand: 'HORIZONTE', eyebrow: 'DESCUBRE OTRO RITMO', headline: 'El mundo está más cerca.', copy: 'Promociona destinos, excursiones, alojamientos o experiencias con una página visual y personalizable.', cta: 'Explorar destinos ↗', bg: '#eef4ef', surface: '#ffffff', text: '#19352c', accent: '#24745b', style: 'commerce' }),
  // Nuevas plantillas profesionales solicitadas: marcas como inspiración, sin logos ni recursos oficiales.
  makeBrandTemplate({ id: 'brand-samsung-inspired', title: 'Galaxy Storefront (inspiración Samsung)', category: 'E-commerce', description: 'Escaparate tecnológico con tonos fríos, navegación de categorías, producto destacado y CTA editables.', brand: 'NOVA GALAXY', eyebrow: 'TECNOLOGÍA PARA TU DÍA A DÍA', headline: 'Conecta con lo que viene.', copy: 'Presenta móviles, accesorios, televisores o dispositivos inteligentes con un diseño limpio y adaptable.', cta: 'Explorar dispositivos ↗', bg: '#f4f7fb', surface: '#ffffff', text: '#101827', accent: '#1769d2', style: 'device' }),
  makeBrandTemplate({ id: 'brand-marketplace-inspired', title: 'Mercado Central (inspiración marketplace)', category: 'E-commerce', description: 'Portada de marketplace con búsqueda, categorías, productos destacados y mensajes de envío editables.', brand: 'MERCADO CENTRAL', eyebrow: 'ENCUENTRA MÁS, FÁCILMENTE', headline: 'Todo lo que buscas, en un solo lugar.', copy: 'Una base para catálogos de productos, vendedores, ofertas y accesos a categorías.', cta: 'Explorar ofertas →', bg: '#f5f7fa', surface: '#ffffff', text: '#182230', accent: '#f5b400', style: 'marketplace' }),
  makeBrandTemplate({ id: 'brand-deals-inspired', title: 'Flash Deals (inspiración AliExpress)', category: 'Ventas', description: 'Landing promocional con acento coral, ofertas destacadas y llamadas a la acción. Cambia precios y enlaces desde el editor.', brand: 'FLASH / DEALS', eyebrow: 'OFERTAS DESTACADAS · TIEMPO LIMITADO', headline: 'Encuentra algo que te encante.', copy: 'Destaca colecciones, descuentos y productos populares sin depender de componentes externos.', cta: 'Ver ofertas ↗', bg: '#fff7f4', surface: '#ffffff', text: '#29202a', accent: '#f04452', style: 'deals' }),
  makeBrandTemplate({ id: 'brand-microsoft-inspired', title: 'Work Suite (inspiración Microsoft)', category: 'SaaS', description: 'Página corporativa para herramientas de productividad, servicios en la nube o software empresarial.', brand: 'NORTH / WORK', eyebrow: 'TRABAJA MEJOR, EN EQUIPO', headline: 'Todo tu trabajo conectado.', copy: 'Presenta aplicaciones, funciones, planes y beneficios para equipos con un sistema visual claro.', cta: 'Conocer la plataforma →', bg: '#f7f8fa', surface: '#ffffff', text: '#20252b', accent: '#2563eb', style: 'enterprise' }),
  makeBrandTemplate({ id: 'brand-notion-inspired', title: 'Workspace (inspiración Notion)', category: 'SaaS', description: 'Página minimalista para una app de notas, documentación, organización y gestión de proyectos.', brand: 'PAPER / SPACE', eyebrow: 'IDEAS, DOCUMENTOS Y PROYECTOS', headline: 'Un espacio para pensar mejor.', copy: 'Explica tu producto con una jerarquía tipográfica sencilla, beneficios claros y una llamada a probarlo.', cta: 'Probar gratis →', bg: '#fbfaf8', surface: '#ffffff', text: '#22211f', accent: '#5b5a56', style: 'workspace' }),
  makeBrandTemplate({ id: 'brand-youtube-inspired', title: 'Creator Channel (inspiración YouTube)', category: 'Streaming', description: 'Portada para creadores, canales de vídeo y podcasts con contenido destacado y botón para ver el canal.', brand: 'PLAY / STUDIO', eyebrow: 'VÍDEOS NUEVOS CADA SEMANA', headline: 'Historias que vale la pena ver.', copy: 'Presenta tu canal, episodios destacados, listas de reproducción y enlaces externos personalizables.', cta: 'Ver contenido ▶', bg: '#111111', surface: '#202020', text: '#ffffff', accent: '#ff3030', style: 'creator' }),
  makeBrandTemplate({ id: 'brand-discord-inspired', title: 'Community Hub (inspiración Discord)', category: 'Servicios', description: 'Landing para comunidades, proyectos colaborativos y grupos con invitación, normas y ventajas.', brand: 'COMMON / ROOM', eyebrow: 'ENCUENTRA A TU GENTE', headline: 'Las buenas ideas crecen en comunidad.', copy: 'Invita a tu comunidad a participar, conocer eventos y acceder a recursos desde una página adaptable.', cta: 'Unirme a la comunidad ↗', bg: '#f2f3ff', surface: '#ffffff', text: '#20213a', accent: '#5865f2', style: 'community' }),
  makeBrandTemplate({ id: 'brand-steam-inspired', title: 'Indie Game Store (inspiración Steam)', category: 'Streaming', description: 'Página para presentar videojuegos con portada, descripción, plataformas, características y botones de descarga editables.', brand: 'INDIE / ARCADE', eyebrow: 'DESCUBRE TU PRÓXIMO JUEGO', headline: 'Grandes aventuras, creadas en pequeño.', copy: 'Presenta un juego independiente, capturas, requisitos, enlaces de descarga y datos del desarrollador.', cta: 'Ver el juego ↗', bg: '#101b2a', surface: '#18283b', text: '#f3f7fc', accent: '#66c0f4', style: 'game' }),
  makeBrandTemplate({ id: 'brand-premium-product', title: 'Premium Product (tienda minimalista)', category: 'Ventas', description: 'Ficha de producto premium con imagen protagonista, argumentos de venta, ventajas y CTA destacado.', brand: 'OBJECT / ONE', eyebrow: 'DISEÑO CON PROPÓSITO', headline: 'Menos ruido. Más producto.', copy: 'Ideal para lanzar un producto físico o digital con una presentación elegante y contenido fácil de cambiar.', cta: 'Comprar ahora ↗', bg: '#f2f0eb', surface: '#ffffff', text: '#242321', accent: '#9a7652', style: 'product' }),
  makeBrandTemplate({ id: 'brand-app-store-inspired', title: 'App Launch (inspiración App Store)', category: 'Exclusivo', description: 'Presentación de aplicación móvil con propuesta de valor, funciones y botones para descargar desde tiendas.', brand: 'PULSE / APP', eyebrow: 'TU DÍA, MÁS SENCILLO', headline: 'Todo lo importante, a un toque.', copy: 'Presenta una app móvil, sus características principales, capturas y enlaces de descarga para Android o iOS.', cta: 'Descargar aplicación ↓', bg: '#f5f7ff', surface: '#ffffff', text: '#161c35', accent: '#6558f5', style: 'app' }),
];


export const PRESET_TEMPLATES: TemplateItem[] = [
  // ==========================================
  // 1. PLANTILLAS ULTRA PRO & EXCLUSIVAS (ARRIBA)
  // ==========================================

  // 01. HPROEDITOR ULTRA STUDIO (EXCLUSIVA)
  {
    id: 'hproeditor-flagship-studio',
    title: 'Hproeditor Ultra Studio (Exclusiva)',
    category: 'Exclusivo',
    description: 'Diseño insignia con estética Frutiger Aero / Glassmorphism, resplandores neón violeta, grilla de funciones y CTA flotante.',
    tag: 'Exclusiva Hpro',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Hproeditor Studio Exclusiva',
      styles: {
        backgroundColor: '#05050a',
        color: '#ffffff',
        paddingTop: '32px',
        paddingBottom: '64px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      },
      children: [
        {
          id: 'hpro-nav',
          type: 'container',
          name: 'Navegación Superior',
          styles: {
            backgroundColor: 'rgba(24, 24, 37, 0.7)',
            backdropFilter: 'blur(16px)',
            borderWidth: '1px',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            borderRadius: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          children: [
            {
              id: 'hpro-logo',
              type: 'heading',
              name: 'Logo Hpro',
              content: '⚡ Hproeditor Studio',
              styles: { fontSize: '20px', fontWeight: 'bold', color: '#818cf8' },
            },
            {
              id: 'hpro-nav-btn',
              type: 'button',
              name: 'Botón Pro',
              content: 'Probar v1.0',
              styles: {
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '13px',
              },
            },
          ],
        },
        {
          id: 'hpro-hero',
          type: 'container',
          name: 'Hero Exclusivo',
          styles: {
            backgroundColor: 'rgba(15, 15, 26, 0.8)',
            borderWidth: '1px',
            borderColor: 'rgba(129, 140, 248, 0.25)',
            paddingTop: '56px',
            paddingBottom: '56px',
            paddingLeft: '32px',
            paddingRight: '32px',
            borderRadius: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 20px 50px rgba(79, 70, 229, 0.15)',
          },
          children: [
            {
              id: 'hpro-badge',
              type: 'paragraph',
              name: 'Badge Exclusivo',
              content: '✨ TECNOLOGÍA DE EDICIÓN FLUIDA & MODULAR',
              styles: { color: '#a5b4fc', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' },
            },
            {
              id: 'hpro-title',
              type: 'heading',
              name: 'Título Principal',
              content: 'Construye Sitios Web a la Velocidad de la Luz',
              styles: { fontSize: '44px', fontWeight: '900', color: '#ffffff', textAlign: 'center' },
            },
            {
              id: 'hpro-sub',
              type: 'paragraph',
              name: 'Subtítulo',
              content: 'Diseño ultra fluido, renderizado interactivo y exportación ZIP completa lista para producción.',
              styles: { fontSize: '18px', color: '#94a3b8', textAlign: 'center', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' },
            },
            {
              id: 'hpro-cta',
              type: 'button',
              name: 'Botón CTA Hero',
              content: 'Empezar a Diseñar Ahora 🚀',
              styles: {
                backgroundColor: '#6366f1',
                color: '#ffffff',
                paddingTop: '16px',
                paddingBottom: '16px',
                paddingLeft: '36px',
                paddingRight: '36px',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '16px',
                alignSelf: 'center',
              },
            },
          ],
        },
      ],
    },
  },

  // 02. ESTILO SAMSUNG MEGASTORE (NUEVA REFERENCIA 1)
  {
    id: 'samsung-megastore',
    title: 'Samsung Tech Megastore & E-Ecosystem (Estilo Samsung)',
    category: 'E-commerce',
    description: 'E-commerce corporativo completo con menú de categorías (Móviles, TV, Computación), etiquetas de "NUEVO", grilla de productos y panel lateral "DESCUBRE".',
    tag: 'Estilo Samsung',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Samsung Megastore',
      styles: {
        backgroundColor: '#ffffff',
        color: '#000000',
        paddingTop: '0px',
        paddingBottom: '64px',
        paddingLeft: '0px',
        paddingRight: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      },
      children: [
        // Navbar Samsung
        {
          id: 'samsung-nav',
          type: 'container',
          name: 'Navegación Samsung',
          styles: {
            backgroundColor: '#ffffff',
            borderBottomWidth: '1px',
            borderBottomColor: '#e5e5e5',
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '32px',
            paddingRight: '32px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          children: [
            {
              id: 'samsung-logo',
              type: 'heading',
              name: 'Logo Samsung',
              content: 'SAMSUNG',
              styles: { fontSize: '22px', fontWeight: '900', color: '#000000', letterSpacing: '1px' },
            },
            {
              id: 'samsung-links',
              type: 'paragraph',
              name: 'Categorías Nav',
              content: 'Tienda  |  Móviles  |  TV & AV  |  Línea Blanca  |  Computación  |  Watch y Buds',
              styles: { fontSize: '13px', fontWeight: '600', color: '#000000' },
            },
          ],
        },

        // Bloque Principal con Grilla + Columna Descubre
        {
          id: 'samsung-main-layout',
          type: 'container',
          name: 'Contenedor Catálogo',
          styles: {
            paddingLeft: '32px',
            paddingRight: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          },
          children: [
            {
              id: 'samsung-grid-title',
              type: 'heading',
              name: 'Título Sección',
              content: 'Ecosistema Galaxy & Tecnología AI Living',
              styles: { fontSize: '28px', fontWeight: 'bold', color: '#000000' },
            },

            // Grilla de Productos
            {
              id: 'samsung-cards-container',
              type: 'container',
              name: 'Tarjetas Dispositivos',
              styles: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              },
              children: [
                {
                  id: 'samsung-card-1',
                  type: 'container',
                  name: 'Tarjeta Galaxy S26',
                  styles: {
                    backgroundColor: '#f8f9fa',
                    borderRadius: '16px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  },
                  children: [
                    {
                      id: 's26-badge',
                      type: 'paragraph',
                      name: 'Badge Nuevo',
                      content: 'NUEVO ⚡',
                      styles: { color: '#2189ff', fontSize: '11px', fontWeight: 'bold' },
                    },
                    {
                      id: 's26-img',
                      type: 'image',
                      name: 'Imagen Galaxy',
                      src: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop',
                      styles: { width: '100%', height: '200px', borderRadius: '12px' },
                    },
                    {
                      id: 's26-name',
                      type: 'heading',
                      name: 'Nombre Dispositivo',
                      content: 'Galaxy S26 Ultra 5G AI',
                      styles: { fontSize: '18px', fontWeight: 'bold', color: '#000000' },
                    },
                    {
                      id: 's26-btn',
                      type: 'button',
                      name: 'Botón Comprar',
                      content: 'Comprar Directo',
                      styles: {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                      },
                    },
                  ],
                },
              ],
            },

            // Columna Lateral "DESCUBRE"
            {
              id: 'samsung-sidebar-discover',
              type: 'container',
              name: 'Sección Descubre',
              styles: {
                backgroundColor: '#ffffff',
                borderLeftWidth: '1px',
                borderLeftColor: '#e5e5e5',
                paddingTop: '16px',
                paddingBottom: '16px',
                paddingLeft: '20px',
                paddingRight: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              },
              children: [
                {
                  id: 'disc-title',
                  type: 'paragraph',
                  name: 'Título Descubre',
                  content: 'DESCUBRE:',
                  styles: { fontSize: '12px', fontWeight: 'bold', color: '#707070', letterSpacing: '1px' },
                },
                {
                  id: 'disc-links',
                  type: 'paragraph',
                  name: 'Enlaces En Tendencia',
                  content: '• Cyber Week\n• Compra directo y obtén más\n• Programas y Beneficios\n• Select AI\n• Recicla y Ahorra\n• Samsung Rewards',
                  styles: { fontSize: '14px', color: '#111111' },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // 03. ESTILO APPLE SHOWCASE IPHONE DUO
  {
    id: 'apple-showcase-duo',
    title: 'Showcase Tech Minimalista (Estilo Apple)',
    category: 'Exclusivo',
    description: 'Inspirado en la presentación de productos de gama alta. Barra oscura, fondo ultra limpio, tipografía pulida y botones estilo pill.',
    tag: 'Estilo Apple',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Showcase Apple',
      styles: {
        backgroundColor: '#f5f5f7',
        color: '#1d1d1f',
        paddingTop: '0px',
        paddingBottom: '64px',
        paddingLeft: '0px',
        paddingRight: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      },
      children: [
        {
          id: 'apple-nav',
          type: 'container',
          name: 'Navegación Apple',
          styles: {
            backgroundColor: '#161617',
            color: '#f5f5f7',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
          },
          children: [
            {
              id: 'apple-nav-title',
              type: 'paragraph',
              name: 'Links Nav',
              content: '🍎  Tienda  |  Mac  |  iPad  |  iPhone  |  Watch  |  Soporte',
              styles: { fontSize: '13px', color: '#d2d2d7', textAlign: 'center' },
            },
          ],
        },
        {
          id: 'apple-hero',
          type: 'container',
          name: 'Hero Producto',
          styles: {
            paddingTop: '48px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center',
          },
          children: [
            {
              id: 'apple-title',
              type: 'heading',
              name: 'Nombre Producto',
              content: 'iPhone Duo',
              styles: { fontSize: '56px', fontWeight: 'bold', color: '#1d1d1f', textAlign: 'center' },
            },
            {
              id: 'apple-headline',
              type: 'heading',
              name: 'Eslogan',
              content: 'Hola, hola.',
              styles: { fontSize: '28px', fontWeight: '500', color: '#1d1d1f', textAlign: 'center' },
            },
            {
              id: 'apple-date',
              type: 'paragraph',
              name: 'Fecha Preventa',
              content: 'La preventa empieza el 16/10 a las 09:00 horas. Disponible el 23/10.',
              styles: { fontSize: '17px', color: '#6e6e73', textAlign: 'center', maxWidth: '500px' },
            },
            {
              id: 'apple-buttons-row',
              type: 'container',
              name: 'Fila de Botones',
              styles: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                marginTop: '12px',
                width: '100%',
              },
              children: [
                {
                  id: 'apple-btn-main',
                  type: 'button',
                  name: 'Botón Azul',
                  content: 'Más información',
                  styles: {
                    backgroundColor: '#0071e3',
                    color: '#ffffff',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '22px',
                    paddingRight: '22px',
                    borderRadius: '9999px',
                    fontSize: '15px',
                    fontWeight: '500',
                  },
                },
                {
                  id: 'apple-btn-sec',
                  type: 'button',
                  name: 'Botón Borde Azul',
                  content: 'Ver precios',
                  styles: {
                    backgroundColor: 'transparent',
                    color: '#0071e3',
                    borderWidth: '1px',
                    borderColor: '#0071e3',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '22px',
                    paddingRight: '22px',
                    borderRadius: '9999px',
                    fontSize: '15px',
                    fontWeight: '500',
                  },
                },
              ],
            },
            {
              id: 'apple-device-img',
              type: 'image',
              name: 'Vista Dispositivo',
              src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop',
              styles: {
                width: 'min(100%, 650px)',
                maxWidth: '650px',
                height: 'auto',
                borderRadius: '24px',
                marginTop: '24px',
                alignSelf: 'center',
              },
            },
          ],
        },
      ],
    },
  },

  // 04. ESTILO GOOGLE AI SEARCH & START HUB (NUEVA REFERENCIA 2)
  {
    id: 'google-ai-starthub',
    title: 'Google AI Search & Start Page (Estilo Google Dark)',
    category: 'SaaS',
    description: 'Página de inicio minimalista en modo oscuro con barra de búsqueda redondeada, botones inteligentes de Modo IA y acceso directo a atajos de aplicaciones.',
    tag: 'Estilo Google',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Google Start Hub',
      styles: {
        backgroundColor: '#202124',
        color: '#e8eaed',
        paddingTop: '20px',
        paddingBottom: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      },
      children: [
        // Top Nav Google
        {
          id: 'gg-topnav',
          type: 'container',
          name: 'Navegación Superior',
          styles: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '16px',
          },
          children: [
            {
              id: 'gg-links',
              type: 'paragraph',
              name: 'Links Gmail',
              content: 'Gmail  |  Imágenes',
              styles: { fontSize: '13px', color: '#e8eaed' },
            },
          ],
        },

        // Logo Google Central
        {
          id: 'gg-logo-title',
          type: 'heading',
          name: 'Logo Google',
          content: 'Google',
          styles: {
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginTop: '32px',
          },
        },

        // Barra de Búsqueda Redondeada con Modo IA
        {
          id: 'gg-searchbar-container',
          type: 'container',
          name: 'Barra de Búsqueda',
          styles: {
            backgroundColor: '#303134',
            borderWidth: '1px',
            borderColor: '#5f6368',
            borderRadius: '9999px',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '16px',
            width: '100%',
            maxWidth: '650px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          children: [
            {
              id: 'gg-search-input',
              type: 'paragraph',
              name: 'Input Búsqueda',
              content: '🔍 Preguntar a Google...',
              styles: { fontSize: '15px', color: '#9aa0a6' },
            },
            {
              id: 'gg-ai-btn',
              type: 'button',
              name: 'Botón Modo IA',
              content: '✨ Modo IA',
              styles: {
                backgroundColor: '#3c4043',
                color: '#8ab4f8',
                paddingTop: '6px',
                paddingBottom: '6px',
                paddingLeft: '14px',
                paddingRight: '14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
              },
            },
          ],
        },

        // Botones de Prompts IA
        {
          id: 'gg-ai-prompts-row',
          type: 'container',
          name: 'Prompts IA',
          styles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '12px',
          },
          children: [
            {
              id: 'gg-prompt-1',
              type: 'button',
              name: 'Prompt 1',
              content: '🔍 Haz más cosas con el Modo IA',
              styles: {
                backgroundColor: '#303134',
                color: '#e8eaed',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '18px',
                paddingRight: '18px',
                borderRadius: '16px',
                fontSize: '13px',
              },
            },
            {
              id: 'gg-prompt-2',
              type: 'button',
              name: 'Prompt 2',
              content: '🎨 Crear imágenes con IA',
              styles: {
                backgroundColor: '#303134',
                color: '#e8eaed',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '18px',
                paddingRight: '18px',
                borderRadius: '16px',
                fontSize: '13px',
              },
            },
          ],
        },

        // Grilla de Accesos Directos Circular
        {
          id: 'gg-shortcuts-grid',
          type: 'container',
          name: 'Atajos Directos',
          styles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          },
          children: [
            {
              id: 'sc-gemini',
              type: 'button',
              name: 'Shortcut Gemini',
              content: '✦ Google Gemini',
              styles: {
                backgroundColor: '#303134',
                color: '#ffffff',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '12px',
                fontSize: '12px',
              },
            },
            {
              id: 'sc-chatgpt',
              type: 'button',
              name: 'Shortcut ChatGPT',
              content: '🤖 ChatGPT',
              styles: {
                backgroundColor: '#303134',
                color: '#ffffff',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '12px',
                fontSize: '12px',
              },
            },
            {
              id: 'sc-hproeditor',
              type: 'button',
              name: 'Shortcut Hproeditor',
              content: '⚡ Hproeditor',
              styles: {
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
              },
            },
          ],
        },
      ],
    },
  },

  // 05. ESTILO MERCADO LIBRE SUPER MARKETPLACE
  {
    id: 'mercadolibre-marketplace',
    title: 'Super Marketplace & Ofertas (Estilo Mercado Libre)',
    category: 'E-commerce',
    description: 'Plataforma e-commerce con cabecera promocional amarilla, distintivos "10/10 ¡ES HOY!", tarjetas de productos e insignias de envío gratis.',
    tag: 'Marketplace',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Marketplace Mercado',
      styles: {
        backgroundColor: '#f5f5f5',
        color: '#333333',
        paddingTop: '0px',
        paddingBottom: '48px',
        paddingLeft: '0px',
        paddingRight: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      },
      children: [
        {
          id: 'ml-header-banner',
          type: 'container',
          name: 'Banner Promocional Amarillo',
          styles: {
            backgroundColor: '#ffe600',
            paddingTop: '32px',
            paddingBottom: '32px',
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          },
          children: [
            {
              id: 'ml-badge-today',
              type: 'paragraph',
              name: 'Insignia Hoy',
              content: '⚡ 10/10 ¡ES HOY! HASTA 50% OFF',
              styles: {
                backgroundColor: '#e60000',
                color: '#ffffff',
                paddingTop: '6px',
                paddingBottom: '6px',
                paddingLeft: '18px',
                paddingRight: '18px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '14px',
              },
            },
            {
              id: 'ml-banner-title',
              type: 'heading',
              name: 'Título Ofertas',
              content: '¡Aprovecha Descuentos Exclusivos con Envío Gratis!',
              styles: { fontSize: '34px', fontWeight: 'bold', color: '#2d3277', textAlign: 'center' },
            },
          ],
        },
        {
          id: 'ml-products-grid',
          type: 'container',
          name: 'Grilla de Productos',
          styles: {
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          },
          children: [
            {
              id: 'ml-card-item-1',
              type: 'container',
              name: 'Tarjeta Producto 1',
              styles: {
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                paddingTop: '16px',
                paddingBottom: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              },
              children: [
                {
                  id: 'ml-prod-img',
                  type: 'image',
                  name: 'Imagen Producto',
                  src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
                  styles: { width: '100%', height: '180px', borderRadius: '8px' },
                },
                {
                  id: 'ml-prod-title',
                  type: 'paragraph',
                  name: 'Título Producto',
                  content: 'Audífonos Inalámbricos Bluetooth High Bass',
                  styles: { fontSize: '14px', fontWeight: '600', color: '#333333' },
                },
                {
                  id: 'ml-prod-price',
                  type: 'heading',
                  name: 'Precio Producto',
                  content: '$ 37.052 CLP',
                  styles: { fontSize: '22px', fontWeight: 'bold', color: '#222222' },
                },
                {
                  id: 'ml-free-shipping',
                  type: 'paragraph',
                  name: 'Etiqueta Envío',
                  content: 'Envío gratis ⚡',
                  styles: { fontSize: '12px', fontWeight: 'bold', color: '#00a650' },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // 06. ESTILO ALIEXPRESS GLOBAL DEALS
  {
    id: 'aliexpress-global-deals',
    title: 'Global Deals & Cupones (Estilo AliExpress)',
    category: 'E-commerce',
    description: 'E-commerce promocional con banner azul "Brand Day", cupones de descuento aplicables y contadores de ofertas relámpago.',
    tag: 'Cupones & Deals',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'AliExpress Store',
      styles: {
        backgroundColor: '#f2f2f2',
        color: '#191919',
        paddingTop: '0px',
        paddingBottom: '48px',
        paddingLeft: '0px',
        paddingRight: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      },
      children: [
        {
          id: 'ali-banner-blue',
          type: 'container',
          name: 'Banner Brand Day',
          styles: {
            backgroundColor: '#0070e0',
            color: '#ffffff',
            paddingTop: '28px',
            paddingBottom: '28px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          },
          children: [
            {
              id: 'ali-brand-day',
              type: 'heading',
              name: 'Título Brand Day',
              content: 'Brand Day 🚀 Spring Refresh',
              styles: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff' },
            },
            {
              id: 'ali-coupon-box',
              type: 'container',
              name: 'Caja de Cupones',
              styles: {
                backgroundColor: '#ffffff',
                color: '#e62e04',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '10px',
                borderWidth: '1px',
                borderStyle: 'dashed',
                borderColor: '#fd384f',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                {
                  id: 'ali-coupon-text',
                  type: 'paragraph',
                  name: 'Texto Cupón',
                  content: '🎟️ $30.000 OFF en compras mayores a $268.000',
                  styles: { fontSize: '14px', fontWeight: 'bold', color: '#fd384f' },
                },
                {
                  id: 'ali-coupon-code',
                  type: 'button',
                  name: 'Código Cupón',
                  content: 'Usar Código: BDCL30',
                  styles: {
                    backgroundColor: '#fd384f',
                    color: '#ffffff',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // 07. ESTILO YOUTUBE MUSIC MEDIA PLAYER
  {
    id: 'ytmusic-streaming-hub',
    title: 'Media & Streaming Player (Estilo YouTube Music)',
    category: 'Streaming',
    description: 'Interfaz en modo oscuro para reproducción de música, podcasts y carrusel de álbumes con filtros y reproductor flotante.',
    tag: 'Streaming Player',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'YouTube Music Studio',
      styles: {
        backgroundColor: '#030303',
        color: '#ffffff',
        paddingTop: '20px',
        paddingBottom: '64px',
        paddingLeft: '20px',
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      },
      children: [
        {
          id: 'ytm-header',
          type: 'container',
          name: 'Encabezado Streaming',
          styles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '12px',
            borderBottomWidth: '1px',
            borderBottomColor: '#212121',
          },
          children: [
            {
              id: 'ytm-logo',
              type: 'heading',
              name: 'Logo Player',
              content: '▶️ Music Hub',
              styles: { fontSize: '22px', fontWeight: 'bold', color: '#ff0000' },
            },
            {
              id: 'ytm-user',
              type: 'paragraph',
              name: 'Perfil Usuario',
              content: '👤 Karintupadre',
              styles: { fontSize: '13px', color: '#aaa' },
            },
          ],
        },
        {
          id: 'ytm-filter-chips',
          type: 'paragraph',
          name: 'Chips de Categorías',
          content: '📍 Podcasts   •   Actívate   •   Relajación   •   Para sentirte bien   •   Fiesta   •   Entrenamiento',
          styles: {
            fontSize: '13px',
            color: '#f1f1f1',
            backgroundColor: '#212121',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '16px',
            paddingRight: '16px',
            borderRadius: '12px',
          },
        },
      ],
    },
  },

  // 08. SAAS PLATFORM
  {
    id: 'saas-app',
    title: 'SaaS & Plataforma de Inteligencia Artificial',
    category: 'SaaS',
    description: 'Estructura moderna para presentar plataformas de software, herramientas en la nube y suscripciones B2B.',
    tag: 'SaaS B2B',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'SaaS Landing',
      styles: {
        backgroundColor: '#09090b',
        color: '#ffffff',
        paddingTop: '48px',
        paddingBottom: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      },
      children: [
        {
          id: 'saas-hero',
          type: 'heading',
          name: 'Título SaaS',
          content: 'Automatiza tu Flujo de Trabajo con IA',
          styles: { fontSize: '42px', fontWeight: 'bold', textAlign: 'center', color: '#818cf8' },
        },
        {
          id: 'saas-desc',
          type: 'paragraph',
          name: 'Descripción SaaS',
          content: 'Conecta tus aplicaciones, analiza métricas clave y optimiza procesos en minutos.',
          styles: { fontSize: '18px', textAlign: 'center', color: '#94a3b8' },
        },
      ],
    },
  },

  // 09. PÁGINA DE VENTAS VSL
  {
    id: 'sales-funnel-pro',
    title: 'Página de Ventas VSL (Alta Conversión)',
    category: 'Ventas',
    description: 'Landing optimizada para venta directa con contador de oferta, testimonio, garantía de devolución y CTA de alto impacto.',
    tag: 'Ventas Pro',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Página de Ventas',
      styles: {
        backgroundColor: '#09090b',
        color: '#ffffff',
        paddingTop: '48px',
        paddingBottom: '64px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      },
      children: [
        {
          id: 'hero-sales',
          type: 'container',
          name: 'Encabezado Hero',
          styles: {
            backgroundColor: '#18181b',
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingLeft: '32px',
            paddingRight: '32px',
            borderRadius: '20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          },
          children: [
            {
              id: 'badge-sales',
              type: 'paragraph',
              name: 'Etiqueta Oferta',
              content: '🔥 OFERTA EXCLUSIVA - 50% DE DESCUENTO SOLO HOY',
              styles: { color: '#f59e0b', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' },
            },
            {
              id: 'title-sales',
              type: 'heading',
              name: 'Título Principal',
              content: 'Escala tus Ventas Digitales en Menos de 30 Días',
              styles: { fontSize: '40px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
            },
          ],
        },
      ],
    },
  },

  // 10. PORTAFOLIO FREELANCE
  {
    id: 'freelance-portfolio',
    title: 'Portafolio Senior Developer & Designer',
    category: 'Portafolio',
    description: 'Plantilla personal para programadores, creadores visuales, diseñadores UI/UX y consultores independientes.',
    tag: 'Portafolio',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Portafolio Freelance',
      styles: {
        backgroundColor: '#000000',
        color: '#ffffff',
        paddingTop: '48px',
        paddingBottom: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      },
      children: [
        {
          id: 'port-head',
          type: 'heading',
          name: 'Título Portafolio',
          content: 'Hola, soy Gabriel — Full-Stack Developer & UI Designer',
          styles: { fontSize: '38px', fontWeight: 'bold', color: '#a855f7' },
        },
        {
          id: 'port-sub',
          type: 'paragraph',
          name: 'Subtítulo Portafolio',
          content: 'Especializado en aplicaciones web reactivas, arquitecturas limpias e interfaces modernas.',
          styles: { fontSize: '18px', color: '#a1a1aa' },
        },
      ],
    },
  },

  // ==========================================
  // 2. PLANTILLAS SIMPLES Y BÁSICAS (ABAJO)
  // ==========================================

  // 11. PÁGINA INFORMATIVA PROFESIONAL
  {
    id: 'simple-landing',
    title: 'Página Informativa — Servicios y contacto',
    category: 'Básico',
    description: 'Página completa de ejemplo con cabecera, portada, tres servicios, bloque de contacto y pie de página. Todo es editable.',
    tag: 'Informativa',
    document: {
      id: 'root-body', type: 'container', name: 'Página Informativa',
      styles: { backgroundColor: '#f8fafc', color: '#0f172a', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh' },
      children: [
        { id: 'info-nav', type: 'container', name: 'Cabecera y navegación', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '20px 6%', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }, children: [
          { id: 'info-brand', type: 'heading', name: 'Nombre del sitio', content: 'NORTE / SERVICIOS', styles: { color: '#1d4ed8', fontSize: '18px', fontWeight: '900', margin: '0' } },
          { id: 'info-links', type: 'paragraph', name: 'Enlaces de navegación', content: 'Inicio   ·   Servicios   ·   Nosotros   ·   Contacto', styles: { color: '#475569', fontSize: '13px', margin: '0' } },
        ]},
        { id: 'info-hero', type: 'container', name: 'Portada principal', styles: { padding: 'clamp(36px, 7vw, 80px) 8%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px', background: 'linear-gradient(135deg, #eff6ff, #f8fafc)' }, children: [
          { id: 'info-eyebrow', type: 'paragraph', name: 'Etiqueta', content: 'ATENCIÓN CERCANA · SOLUCIONES CLARAS', styles: { color: '#2563eb', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', margin: '0' } },
          { id: 'simple-title', type: 'heading', name: 'Título principal', content: 'Soluciones pensadas para ti.', styles: { fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: '1.08', fontWeight: '900', color: '#0f172a', maxWidth: '780px', margin: '0' } },
          { id: 'simple-p1', type: 'paragraph', name: 'Descripción principal', content: 'Aquí puedes presentar tus servicios, horarios, experiencia e información de contacto con una página clara y profesional.', styles: { fontSize: '17px', lineHeight: '1.7', color: '#475569', maxWidth: '680px', margin: '0' } },
          { id: 'info-cta', type: 'button', name: 'Botón de contacto', content: 'Solicitar información ↗', styles: { backgroundColor: '#2563eb', color: '#ffffff', padding: '13px 20px', borderRadius: '9px', fontSize: '14px', fontWeight: '800', marginTop: '6px' } },
        ]},
        { id: 'info-services', type: 'container', name: 'Servicios destacados', styles: { padding: '0 6% 56px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }, children: [
          { id: 'info-service1', type: 'container', name: 'Servicio 1', styles: { flex: '1 1 210px', padding: '22px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }, children: [
            { id: 'info-s1icon', type: 'heading', name: 'Icono servicio 1', content: '✦', styles: { color: '#2563eb', fontSize: '24px', margin: '0' } },
            { id: 'info-s1title', type: 'heading', name: 'Título servicio 1', content: 'Atención personalizada', styles: { color: '#0f172a', fontSize: '18px', margin: '0' } },
            { id: 'info-s1copy', type: 'paragraph', name: 'Descripción servicio 1', content: 'Acompañamiento y respuestas adaptadas a tus necesidades.', styles: { color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0' } },
          ]},
          { id: 'info-service2', type: 'container', name: 'Servicio 2', styles: { flex: '1 1 210px', padding: '22px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }, children: [
            { id: 'info-s2icon', type: 'heading', name: 'Icono servicio 2', content: '◈', styles: { color: '#2563eb', fontSize: '24px', margin: '0' } },
            { id: 'info-s2title', type: 'heading', name: 'Título servicio 2', content: 'Proceso transparente', styles: { color: '#0f172a', fontSize: '18px', margin: '0' } },
            { id: 'info-s2copy', type: 'paragraph', name: 'Descripción servicio 2', content: 'Información clara desde el primer contacto hasta la entrega.', styles: { color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0' } },
          ]},
          { id: 'info-service3', type: 'container', name: 'Servicio 3', styles: { flex: '1 1 210px', padding: '22px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }, children: [
            { id: 'info-s3icon', type: 'heading', name: 'Icono servicio 3', content: '↗', styles: { color: '#2563eb', fontSize: '24px', margin: '0' } },
            { id: 'info-s3title', type: 'heading', name: 'Título servicio 3', content: 'Apoyo continuo', styles: { color: '#0f172a', fontSize: '18px', margin: '0' } },
            { id: 'info-s3copy', type: 'paragraph', name: 'Descripción servicio 3', content: 'Estamos disponibles para resolver dudas y ayudarte a avanzar.', styles: { color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0' } },
          ]},
        ]},
        { id: 'info-contact', type: 'container', name: 'Bloque de contacto', styles: { margin: '0 6% 48px', padding: '28px', borderRadius: '16px', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }, children: [
          { id: 'info-contact-copy', type: 'container', name: 'Texto de contacto', styles: { display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 240px' }, children: [
            { id: 'info-contact-title', type: 'heading', name: 'Título de contacto', content: '¿Hablamos de tu proyecto?', styles: { color: '#ffffff', fontSize: '22px', fontWeight: '800', margin: '0' } },
            { id: 'info-contact-desc', type: 'paragraph', name: 'Descripción de contacto', content: 'Añade aquí tu correo, teléfono o dirección.', styles: { color: '#cbd5e1', fontSize: '13px', margin: '0' } },
          ]},
          { id: 'info-contact-btn', type: 'button', name: 'CTA de contacto', content: 'Contactar →', styles: { backgroundColor: '#ffffff', color: '#0f172a', padding: '12px 18px', borderRadius: '8px', fontWeight: '800' } },
        ]},
        { id: 'info-footer', type: 'paragraph', name: 'Pie de página', content: '© 2026 Norte / Servicios · Cambia este texto por los datos de tu proyecto.', styles: { padding: '22px 6%', backgroundColor: '#ffffff', color: '#64748b', fontSize: '12px', margin: '0', borderTop: '1px solid #e2e8f0' } },
      ]
    }
  },

  ...PROFESSIONAL_TEMPLATES,
  ...BRAND_INSPIRED_TEMPLATES,

  // Página profesional de videojuego inspirada en páginas de distribución indie
  {
    id: 'itchio-game-page-studio',
    title: 'Indie Game Page — Presentación de videojuego',
    category: 'Exclusivo',
    description: 'Página completa para presentar un juego como en una tienda indie: portada, descripción, tráiler, capturas, plataformas, descargas, ficha técnica y creador. Cada parte se puede editar por separado.',
    tag: 'Videojuegos · Completa',
    document: {
      id: 'itch-root', type: 'container', name: 'Página de videojuego',
      styles: { width: '100%', maxWidth: '1120px', margin: '0 auto', padding: '0', backgroundColor: '#71aadc', color: '#162b62', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh', overflow: 'hidden', fontFamily: 'Arial, sans-serif' },
      children: [
        { id: 'itch-topbar', type: 'container', name: 'Barra superior del proyecto', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '14px clamp(16px, 4vw, 32px)', backgroundColor: '#3f4a54', color: '#ffffff' }, children: [
          { id: 'itch-brand', type: 'heading', name: 'Nombre del estudio', content: 'TU ESTUDIO', styles: { fontSize: '17px', fontWeight: '900', color: '#ffffff', margin: '0' } },
          { id: 'itch-nav', type: 'paragraph', name: 'Enlaces superiores', content: 'Juego  ·  Características  ·  Capturas  ·  Descargar', styles: { fontSize: '12px', color: '#ffffff', margin: '0' } }
        ]},
        { id: 'itch-hero', type: 'container', name: 'Portada del juego', styles: { display: 'flex', flexDirection: 'column', gap: '0', backgroundColor: '#71aadc', width: '100%' }, children: [
          { id: 'itch-cover', type: 'image', name: 'Imagen principal del juego', src: 'https://img.itch.zone/aW1hZ2UvMzc5OTU5MC8yMzQyNjUwOC5wbmc=/original/kHVIW1.png', styles: { display: 'block', width: '100%', maxHeight: '520px', aspectRatio: '16 / 7', objectFit: 'cover', objectPosition: 'center', borderRadius: '0' } },
          { id: 'itch-title', type: 'heading', name: 'Título del videojuego', content: 'FRUTIGER STICKMAN', styles: { color: '#162b62', fontSize: 'clamp(30px, 5vw, 54px)', lineHeight: '1.08', fontWeight: '900', margin: '26px clamp(18px, 4vw, 36px) 8px' } },
          { id: 'itch-tagline', type: 'paragraph', name: 'Frase principal', content: 'Una pequeña compañía para tus momentos de calma.', styles: { color: '#162b62', fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: '1.6', margin: '0 clamp(18px, 4vw, 36px) 18px', maxWidth: '760px' } },
          { id: 'itch-cta-row', type: 'container', name: 'Botones principales', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', padding: '0 clamp(18px, 4vw, 36px) 28px' }, children: [
            { id: 'itch-cta-download', type: 'button', name: 'Botón descargar', content: 'Descargar gratis ↓', linkUrl: '#descargas', styles: { backgroundColor: '#091637', color: '#ffffff', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '800' } },
            { id: 'itch-cta-trailer', type: 'button', name: 'Botón ver tráiler', content: 'Ver tráiler ▶', styles: { backgroundColor: 'rgba(255,255,255,.45)', color: '#091637', border: '1px solid #82aed8', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '800' } }
          ]}
        ]},
        { id: 'itch-body', type: 'container', name: 'Contenido del proyecto', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: '22px', padding: 'clamp(16px, 3vw, 28px)', backgroundColor: 'rgba(183,212,240,.96)', color: '#162b62' }, children: [
          { id: 'itch-main-column', type: 'container', name: 'Columna de descripción y multimedia', styles: { flex: '2 1 440px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '20px' }, children: [
            { id: 'itch-about', type: 'container', name: 'Acerca del juego', styles: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '0' }, children: [
              { id: 'itch-about-label', type: 'paragraph', name: 'Etiqueta descripción', content: 'ACERCA DEL JUEGO', styles: { fontSize: '11px', letterSpacing: '1.5px', fontWeight: '900', color: '#091637', margin: '0' } },
              { id: 'itch-about-title', type: 'heading', name: 'Título descripción', content: 'Hola, soy tu stickman virtual.', styles: { fontSize: 'clamp(22px, 3vw, 30px)', color: '#162b62', fontWeight: '900', lineHeight: '1.2', margin: '0' } },
              { id: 'itch-about-p1', type: 'paragraph', name: 'Descripción principal', content: 'Frutiger Stickman es una aplicación de mascota virtual donde puedes interactuar libremente con un simpático stickman.', styles: { fontSize: '14px', lineHeight: '1.8', color: '#162b62', margin: '0' } },
              { id: 'itch-about-p2', type: 'paragraph', name: 'Descripción secundaria', content: 'Un pequeño homenaje a los juegos de alrededor de 2015, pensado para acompañarte, relajarte y pasar el tiempo a tu ritmo.', styles: { fontSize: '14px', lineHeight: '1.8', color: '#162b62', margin: '0' } }
            ]},
            { id: 'itch-trailer', type: 'container', name: 'Tráiler y vídeo', styles: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', backgroundColor: 'rgba(255,255,255,.55)', border: '1px solid #82aed8', borderRadius: '12px' }, children: [
              { id: 'itch-trailer-title', type: 'heading', name: 'Título del tráiler', content: 'Mira el tráiler', styles: { fontSize: '20px', color: '#162b62', fontWeight: '800', margin: '0' } },
              { id: 'itch-trailer-image', type: 'image', name: 'Miniatura del tráiler', src: 'https://img.itch.zone/aW1hZ2UvMzc5OTU5MC8yNDI0MDQyMC5wbmc=/original/KsaRm6.png', styles: { width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px' } },
              { id: 'itch-trailer-help', type: 'paragraph', name: 'Ayuda tráiler', content: 'Reemplaza esta imagen por la miniatura de tu vídeo y configura el enlace desde el inspector.', styles: { fontSize: '12px', color: '#304b78', lineHeight: '1.6', margin: '0' } }
            ]},
            { id: 'itch-gallery', type: 'container', name: 'Galería de capturas', styles: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
              { id: 'itch-gallery-title', type: 'heading', name: 'Título capturas', content: 'Capturas de pantalla', styles: { fontSize: '22px', color: '#162b62', fontWeight: '900', margin: '0' } },
              { id: 'itch-gallery-grid', type: 'container', name: 'Grilla de capturas', styles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: '10px', width: '100%' }, children: [
                { id: 'itch-shot-1', type: 'image', name: 'Captura 1', src: 'https://img.itch.zone/aW1hZ2UvMzc5OTU5MC8yMzQyNjUwOC5wbmc=/347x500/ZEfJIY.png', styles: { width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '8px' } },
                { id: 'itch-shot-2', type: 'image', name: 'Captura 2', src: 'https://img.itch.zone/aW1hZ2UvMzc5OTU5MC8yNDEzNDkxMC5wbmc=/347x500/bdxoE2.png', styles: { width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '8px' } },
                { id: 'itch-shot-3', type: 'image', name: 'Captura 3', src: 'https://img.itch.zone/aW1hZ2UvMzc5OTU5MC8yNDIyNDAzNi5wbmc=/347x500/rxeXZf.png', styles: { width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '8px' } }
              ]}
            ]}
          ]},
          { id: 'itch-side-column', type: 'container', name: 'Columna de descarga e información', styles: { flex: '1 1 250px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }, children: [
            { id: 'itch-downloads', type: 'container', name: 'Descargas', styles: { display: 'flex', flexDirection: 'column', gap: '12px', padding: '18px', backgroundColor: '#ffffff', border: '1px solid #82aed8', borderRadius: '12px' }, children: [
              { id: 'itch-download-title', type: 'heading', name: 'Título descargas', content: 'Descargar', styles: { fontSize: '22px', color: '#162b62', fontWeight: '900', margin: '0' } },
              { id: 'itch-download-copy', type: 'paragraph', name: 'Texto descargas', content: 'Elige la versión para tu dispositivo.', styles: { fontSize: '13px', color: '#304b78', margin: '0' } },
              { id: 'itch-android-download', type: 'button', name: 'Descarga Android', content: '📱 Descargar para Android', styles: { width: '100%', backgroundColor: '#091637', color: '#ffffff', padding: '12px', borderRadius: '8px', fontWeight: '800', textAlign: 'center' } },
              { id: 'itch-pc-download', type: 'button', name: 'Descarga Windows', content: '🖥 Descargar para Windows', styles: { width: '100%', backgroundColor: '#ffffff', color: '#091637', border: '1px solid #82aed8', padding: '12px', borderRadius: '8px', fontWeight: '800', textAlign: 'center' } },
              { id: 'itch-download-note', type: 'paragraph', name: 'Nota de descargas', content: 'Añade el enlace real de cada archivo desde el inspector.', styles: { fontSize: '11px', color: '#58749b', lineHeight: '1.5', margin: '0' } }
            ]},
            { id: 'itch-platforms', type: 'container', name: 'Plataformas y etiquetas', styles: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', backgroundColor: 'rgba(255,255,255,.45)', border: '1px solid #82aed8', borderRadius: '12px' }, children: [
              { id: 'itch-platform-title', type: 'heading', name: 'Título plataformas', content: 'Plataformas', styles: { fontSize: '18px', color: '#162b62', fontWeight: '800', margin: '0' } },
              { id: 'itch-platform-tags', type: 'container', name: 'Etiquetas plataformas', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '7px' }, children: [
                { id: 'itch-platform-win', type: 'paragraph', name: 'Windows', content: 'Windows', styles: { padding: '6px 9px', backgroundColor: '#d5e7f7', border: '1px solid #82aed8', borderRadius: '999px', fontSize: '11px', fontWeight: '700', margin: '0' } },
                { id: 'itch-platform-android', type: 'paragraph', name: 'Android', content: 'Android', styles: { padding: '6px 9px', backgroundColor: '#d5e7f7', border: '1px solid #82aed8', borderRadius: '999px', fontSize: '11px', fontWeight: '700', margin: '0' } }
              ]},
              { id: 'itch-tags', type: 'paragraph', name: 'Etiquetas juego', content: 'Indie · 2D · Pixel Art · Casual', styles: { fontSize: '12px', lineHeight: '1.7', color: '#304b78', margin: '0' } }
            ]},
            { id: 'itch-details', type: 'container', name: 'Ficha técnica', styles: { display: 'flex', flexDirection: 'column', gap: '0', padding: '16px', backgroundColor: 'rgba(255,255,255,.45)', border: '1px solid #82aed8', borderRadius: '12px' }, children: [
              { id: 'itch-details-title', type: 'heading', name: 'Título ficha técnica', content: 'Información', styles: { fontSize: '18px', color: '#162b62', fontWeight: '800', margin: '0 0 8px' } },
              ...[['Estado','En desarrollo'],['Versión','1.0'],['Género','Casual'],['Idioma','Español'],['Desarrollador','Tu nombre']].map(([label, value], i) => ({ id: `itch-detail-${i}`, type: 'container', name: `Fila ${label}`, styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '6px', padding: '9px 0', borderBottom: '1px solid #b7d4f0' }, children: [ { id: `itch-detail-label-${i}`, type: 'paragraph', name: `Campo ${label}`, content: label, styles: { color: '#58749b', fontSize: '12px', margin: '0' } }, { id: `itch-detail-value-${i}`, type: 'paragraph', name: `Valor ${label}`, content: value, styles: { color: '#162b62', fontSize: '12px', fontWeight: '800', margin: '0' } } ] }))
            ]},
            { id: 'itch-creator', type: 'container', name: 'Tarjeta de creador', styles: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: '#3f4a54', color: '#ffffff', borderRadius: '12px' }, children: [
              { id: 'itch-creator-label', type: 'paragraph', name: 'Etiqueta creador', content: 'CREADO POR', styles: { fontSize: '10px', letterSpacing: '1px', fontWeight: '900', color: '#b7d4f0', margin: '0' } },
              { id: 'itch-creator-name', type: 'heading', name: 'Nombre desarrollador', content: 'Tu nombre / estudio', styles: { fontSize: '17px', color: '#ffffff', fontWeight: '900', margin: '0' } },
              { id: 'itch-creator-bio', type: 'paragraph', name: 'Descripción desarrollador', content: 'Descubre más juegos, proyectos y novedades del equipo.', styles: { fontSize: '12px', color: '#e2e8f0', lineHeight: '1.6', margin: '0' } },
              { id: 'itch-creator-button', type: 'button', name: 'Ver otros proyectos', content: 'Ver otros proyectos ↗', styles: { alignSelf: 'flex-start', backgroundColor: '#091637', color: '#ffffff', padding: '9px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: '800' } }
            ]}
          ]}
        ]},
        { id: 'itch-footer', type: 'container', name: 'Pie de página', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', padding: '18px clamp(16px, 4vw, 32px)', backgroundColor: '#3f4a54', color: '#ffffff' }, children: [
          { id: 'itch-footer-brand', type: 'paragraph', name: 'Copyright', content: '© 2026 Tu estudio. Todos los derechos reservados.', styles: { fontSize: '11px', color: '#ffffff', margin: '0' } },
          { id: 'itch-footer-links', type: 'paragraph', name: 'Enlaces pie de página', content: 'Contacto  ·  Privacidad  ·  Comunidad', styles: { fontSize: '11px', color: '#ffffff', margin: '0' } }
        ]}
      ]
    } as EditorElement
  },

  // PLANTILLA NUEVA: MUSEO / GALERÍA CULTURAL
  {
    id: 'museum-casa-arte',
    title: 'Casa de Arte — Museo & Galería',
    category: 'Servicios',
    description: 'Sitio editorial para museo o galería: exposición destacada, colección, agenda cultural e información para visitantes.',
    tag: 'Nuevo · Cultura',
    document: {
      id: 'museum-root', type: 'container', name: 'Museo — página completa',
      styles: { backgroundColor: '#f3efe6', color: '#20231f', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '100vh', fontFamily: 'Georgia, serif' },
      children: [
        { id: 'museum-topline', type: 'container', name: 'Franja superior', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px 20px', padding: '10px 5%', backgroundColor: '#243b32', color: '#f3efe6' }, children: [
          { id: 'museum-topline-left', type: 'paragraph', name: 'Aviso del museo', content: 'ENTRADA LIBRE LOS DOMINGOS · 10:00–18:00', styles: { color: '#f3efe6', fontSize: '11px', letterSpacing: '1px', margin: '0', fontWeight: '700' } },
          { id: 'museum-topline-right', type: 'paragraph', name: 'Idioma y accesibilidad', content: 'ES  /  EN     ·     VISITA ACCESIBLE', styles: { color: '#d7dfd6', fontSize: '11px', margin: '0' } }
        ]},
        { id: 'museum-nav', type: 'container', name: 'Navegación del museo', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '24px 5%', borderBottom: '1px solid #d5d0c5', backgroundColor: '#f3efe6' }, children: [
          { id: 'museum-brand', type: 'heading', name: 'Nombre del museo', content: 'CASA DE ARTE', styles: { color: '#243b32', fontSize: '22px', fontWeight: '900', letterSpacing: '2px', margin: '0' } },
          { id: 'museum-nav-links', type: 'paragraph', name: 'Enlaces de navegación', content: 'EXPOSICIONES     COLECCIÓN     AGENDA     VISÍTANOS', styles: { color: '#414940', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', margin: '0' } }
        ]},
        { id: 'museum-hero', type: 'container', name: 'Portada editorial', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: '0', backgroundColor: '#e6dfd1' }, children: [
          { id: 'museum-hero-copy', type: 'container', name: 'Texto de exposición destacada', styles: { flex: '1 1 320px', minWidth: '0', padding: 'clamp(28px, 5vw, 72px) clamp(22px, 5vw, 76px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '18px' }, children: [
            { id: 'museum-eyebrow', type: 'paragraph', name: 'Etiqueta de exposición', content: 'EXPOSICIÓN TEMPORAL · 12 JUN — 28 SEP 2026', styles: { color: '#a34832', fontSize: '11px', fontWeight: '900', letterSpacing: '1.5px', margin: '0' } },
            { id: 'museum-title', type: 'heading', name: 'Título principal', content: 'El color también recuerda.', styles: { color: '#243b32', fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: '1.02', fontWeight: '700', maxWidth: '620px', margin: '0', letterSpacing: '-1.5px' } },
            { id: 'museum-description', type: 'paragraph', name: 'Descripción principal', content: 'Un recorrido por artistas que transformaron escenas cotidianas en mundos extraordinarios. Más de 40 obras, archivos inéditos y nuevas miradas.', styles: { color: '#55594f', fontSize: '16px', lineHeight: '1.8', maxWidth: '480px', margin: '0' } },
            { id: 'museum-hero-button', type: 'button', name: 'Botón de exposición', content: 'Descubrir la exposición  ↗', styles: { backgroundColor: '#a34832', color: '#fffaf1', padding: '14px 20px', borderRadius: '2px', fontSize: '12px', fontWeight: '800', letterSpacing: '.4px', border: 'none' } },
            { id: 'museum-hero-note', type: 'paragraph', name: 'Nota de entrada', content: 'ENTRADA GENERAL $4.000 · ESTUDIANTES Y MAYORES $2.000', styles: { color: '#66685e', fontSize: '10px', letterSpacing: '.5px', margin: '4px 0 0' } }
          ]},
          { id: 'museum-hero-image-wrap', type: 'container', name: 'Imagen principal de arte', styles: { flex: '1 1 360px', minWidth: '0', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#d1c6b2', padding: '18px' }, children: [
            { id: 'museum-hero-image', type: 'image', name: 'Obra destacada', src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=85', styles: { width: '100%', height: '100%', minHeight: '360px', maxHeight: '620px', objectFit: 'cover', objectPosition: 'center', borderRadius: '1px' } },
            { id: 'museum-image-caption', type: 'paragraph', name: 'Pie de imagen', content: 'ARCHIVO DE LA COLECCIÓN · SALA 02', styles: { color: '#4e5148', fontSize: '10px', letterSpacing: '1px', margin: '10px 0 0' } }
          ]}
        ]},
        { id: 'museum-intro', type: 'container', name: 'Introducción del museo', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px 40px', alignItems: 'flex-start', padding: '54px 5%', backgroundColor: '#f8f5ed', borderBottom: '1px solid #d5d0c5' }, children: [
          { id: 'museum-intro-label', type: 'paragraph', name: 'Etiqueta de introducción', content: 'UN LUGAR PARA MIRAR DE NUEVO', styles: { flex: '1 1 180px', color: '#a34832', fontSize: '11px', fontWeight: '900', letterSpacing: '1.4px', margin: '5px 0 0' } },
          { id: 'museum-intro-text', type: 'heading', name: 'Manifiesto del museo', content: 'El arte nos ayuda a ver lo conocido con otros ojos.', styles: { flex: '2 1 380px', color: '#243b32', fontSize: 'clamp(25px, 3vw, 38px)', lineHeight: '1.2', fontWeight: '600', maxWidth: '760px', margin: '0' } }
        ]},
        { id: 'museum-collection', type: 'container', name: 'Colección destacada', styles: { display: 'flex', flexDirection: 'column', gap: '26px', padding: '60px 5%', backgroundColor: '#f3efe6' }, children: [
          { id: 'museum-collection-head', type: 'container', name: 'Encabezado de colección', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: '12px' }, children: [
            { id: 'museum-collection-title', type: 'heading', name: 'Título de colección', content: 'En las salas ahora', styles: { color: '#243b32', fontSize: '32px', fontWeight: '700', margin: '0' } },
            { id: 'museum-collection-link', type: 'paragraph', name: 'Enlace a colección completa', content: 'VER TODAS LAS EXPOSICIONES  ↗', styles: { color: '#a34832', fontSize: '11px', fontWeight: '900', letterSpacing: '.8px', margin: '0 0 4px' } }
          ]},
          { id: 'museum-gallery-grid', type: 'container', name: 'Galería de tres exposiciones', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: '22px' }, children: [
            { id: 'museum-card-one', type: 'container', name: 'Tarjeta exposición 1', styles: { flex: '1 1 220px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
              { id: 'museum-card-one-image', type: 'image', name: 'Imagen exposición 1', src: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', styles: { width: '100%', height: '250px', objectFit: 'cover' } },
              { id: 'museum-card-one-date', type: 'paragraph', name: 'Fecha exposición 1', content: 'COLECCIÓN PERMANENTE', styles: { color: '#a34832', fontSize: '10px', fontWeight: '900', letterSpacing: '1px', margin: '4px 0 0' } },
              { id: 'museum-card-one-title', type: 'heading', name: 'Nombre exposición 1', content: 'Formas de la naturaleza', styles: { color: '#243b32', fontSize: '22px', fontWeight: '700', margin: '0' } },
              { id: 'museum-card-one-copy', type: 'paragraph', name: 'Descripción exposición 1', content: 'Texturas, paisajes y pequeñas observaciones del mundo natural.', styles: { color: '#62645a', fontSize: '13px', lineHeight: '1.7', margin: '0' } }
            ]},
            { id: 'museum-card-two', type: 'container', name: 'Tarjeta exposición 2', styles: { flex: '1 1 220px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
              { id: 'museum-card-two-image', type: 'image', name: 'Imagen exposición 2', src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80', styles: { width: '100%', height: '250px', objectFit: 'cover' } },
              { id: 'museum-card-two-date', type: 'paragraph', name: 'Fecha exposición 2', content: 'HASTA EL 28 DE SEPTIEMBRE', styles: { color: '#a34832', fontSize: '10px', fontWeight: '900', letterSpacing: '1px', margin: '4px 0 0' } },
              { id: 'museum-card-two-title', type: 'heading', name: 'Nombre exposición 2', content: 'La memoria de los objetos', styles: { color: '#243b32', fontSize: '22px', fontWeight: '700', margin: '0' } },
              { id: 'museum-card-two-copy', type: 'paragraph', name: 'Descripción exposición 2', content: 'Objetos cotidianos convertidos en relatos de otras épocas.', styles: { color: '#62645a', fontSize: '13px', lineHeight: '1.7', margin: '0' } }
            ]},
            { id: 'museum-card-three', type: 'container', name: 'Tarjeta exposición 3', styles: { flex: '1 1 220px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
              { id: 'museum-card-three-image', type: 'image', name: 'Imagen exposición 3', src: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=700&q=80', styles: { width: '100%', height: '250px', objectFit: 'cover' } },
              { id: 'museum-card-three-date', type: 'paragraph', name: 'Fecha exposición 3', content: 'NUEVA ADQUISICIÓN', styles: { color: '#a34832', fontSize: '10px', fontWeight: '900', letterSpacing: '1px', margin: '4px 0 0' } },
              { id: 'museum-card-three-title', type: 'heading', name: 'Nombre exposición 3', content: 'Color, gesto y materia', styles: { color: '#243b32', fontSize: '22px', fontWeight: '700', margin: '0' } },
              { id: 'museum-card-three-copy', type: 'paragraph', name: 'Descripción exposición 3', content: 'Una selección de obras que exploran el lenguaje del color.', styles: { color: '#62645a', fontSize: '13px', lineHeight: '1.7', margin: '0' } }
            ]}
          ]}
        ]},
        { id: 'museum-visit', type: 'container', name: 'Información para visitantes', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '28px', padding: '48px 5%', backgroundColor: '#243b32', color: '#f3efe6' }, children: [
          { id: 'museum-visit-title', type: 'container', name: 'Título visita', styles: { flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
            { id: 'museum-visit-kicker', type: 'paragraph', name: 'Etiqueta visita', content: 'PLANIFICA TU VISITA', styles: { color: '#d9a18d', fontSize: '10px', fontWeight: '900', letterSpacing: '1.5px', margin: '0' } },
            { id: 'museum-visit-heading', type: 'heading', name: 'Título visita', content: 'Te esperamos.', styles: { color: '#fffaf1', fontSize: '36px', lineHeight: '1.1', margin: '0' } },
            { id: 'museum-visit-copy', type: 'paragraph', name: 'Descripción visita', content: 'Ven con tiempo, recorre las salas a tu ritmo y descubre algo nuevo en cada visita.', styles: { color: '#d7dfd6', fontSize: '14px', lineHeight: '1.7', margin: '0' } }
          ]},
          { id: 'museum-hours', type: 'container', name: 'Horarios', styles: { flex: '1 1 170px', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }, children: [
            { id: 'museum-hours-title', type: 'heading', name: 'Título horarios', content: 'Horarios', styles: { color: '#fffaf1', fontSize: '18px', margin: '0 0 4px' } },
            { id: 'museum-hours-week', type: 'paragraph', name: 'Horario semanal', content: 'MAR — VIE     10:00–18:00', styles: { color: '#d7dfd6', fontSize: '13px', margin: '0', paddingBottom: '8px', borderBottom: '1px solid #50665b' } },
            { id: 'museum-hours-weekend', type: 'paragraph', name: 'Horario fin de semana', content: 'SÁB — DOM     11:00–19:00', styles: { color: '#d7dfd6', fontSize: '13px', margin: '0', paddingBottom: '8px', borderBottom: '1px solid #50665b' } },
            { id: 'museum-hours-close', type: 'paragraph', name: 'Día cerrado', content: 'LUNES     CERRADO', styles: { color: '#d7dfd6', fontSize: '13px', margin: '0' } }
          ]},
          { id: 'museum-address', type: 'container', name: 'Dirección y contacto', styles: { flex: '1 1 170px', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }, children: [
            { id: 'museum-address-title', type: 'heading', name: 'Título dirección', content: 'Encuéntranos', styles: { color: '#fffaf1', fontSize: '18px', margin: '0 0 4px' } },
            { id: 'museum-address-copy', type: 'paragraph', name: 'Dirección', content: 'Av. de la Cultura 125\nCentro histórico', styles: { color: '#d7dfd6', fontSize: '13px', lineHeight: '1.8', whiteSpace: 'pre-line', margin: '0' } },
            { id: 'museum-contact', type: 'paragraph', name: 'Contacto', content: 'visitas@casadearte.cl\n+56 2 2345 6789', styles: { color: '#d7dfd6', fontSize: '13px', lineHeight: '1.8', whiteSpace: 'pre-line', margin: '0' } }
          ]}
        ]},
        { id: 'museum-footer', type: 'container', name: 'Pie de página del museo', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '20px 5%', backgroundColor: '#192b24', color: '#d7dfd6' }, children: [
          { id: 'museum-footer-brand', type: 'paragraph', name: 'Firma del museo', content: 'CASA DE ARTE  ·  CULTURA PARA TODOS', styles: { color: '#d7dfd6', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', margin: '0' } },
          { id: 'museum-footer-links', type: 'paragraph', name: 'Enlaces legales', content: 'ACCESIBILIDAD   ·   PRIVACIDAD   ·   CONTACTO', styles: { color: '#aab9af', fontSize: '10px', letterSpacing: '.5px', margin: '0' } }
        ]}
      ]
    } as EditorElement
  },

  // 12. LIENZO EN BLANCO (ÚLTIMA DE LA LISTA)
  {
    id: 'blank-canvas',
    title: 'Lienzo en Blanco (Limpio)',
    category: 'Básico',
    description: 'Empieza desde cero con una estructura neutra sin elementos preestablecidos.',
    tag: 'Empieza Gratis',
    document: {
      id: 'root-body',
      type: 'container',
      name: 'Cuerpo Principal',
      styles: {
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '32px',
        paddingRight: '32px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      },
      children: [
        {
          id: 'heading-blank',
          type: 'heading',
          name: 'Título Inicial',
          content: 'Tu Nuevo Sitio Web',
          styles: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginTop: '40px',
          },
        },
        {
          id: 'para-blank',
          type: 'paragraph',
          name: 'Subtítulo Inicial',
          content: 'Haz clic en el botón "+ Añadir" o usa el menú contextual (clic derecho) para agregar bloques.',
          styles: {
            fontSize: '16px',
            color: '#a1a1aa',
            textAlign: 'center',
          },
        },
      ],
    },
  },
];