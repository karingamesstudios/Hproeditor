import type { EditorElement } from '../types/editor';

export interface SectionTemplateItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  element: EditorElement;
}

export const SECTION_TEMPLATES: SectionTemplateItem[] = [
  // 1. HERO PORTADA PRINCIPAL
  {
    id: 'hero-impact',
    title: 'Portada Hero de Alto Impacto',
    description: 'Cabecera moderna con etiqueta neón, título gigante, subtítulo y botones de llamada a la acción.',
    badge: 'Popular · Hero',
    element: {
      id: `hero-${Date.now()}`,
      name: 'Sección Hero Impacto',
      type: 'section',
      styles: {
        paddingTop: '64px',
        paddingBottom: '64px',
        paddingLeft: '32px',
        paddingRight: '32px',
        backgroundColor: '#0f0f17',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#1e1e2e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        marginBottom: '32px',
      },
      children: [
        {
          id: `badge-${Date.now()}`,
          name: 'Badge Etiqueta',
          type: 'paragraph',
          content: '✨ TECNOLOGÍA DE ÚLTIMA GENERACIÓN',
          styles: {
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: '#a5b4fc',
            borderWidth: '1px',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            paddingTop: '6px',
            paddingBottom: '6px',
            paddingLeft: '14px',
            paddingRight: '14px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: '1px',
          },
        },
        {
          id: `title-${Date.now()}`,
          name: 'Título Principal Hero',
          type: 'heading',
          content: 'Construye Experiencias Digitales Extraordinarias',
          styles: {
            fontSize: '44px',
            fontWeight: '900',
            color: '#ffffff',
            maxWidth: '800px',
            lineHeight: '1.1',
            textAlign: 'center',
          },
        },
        {
          id: `sub-${Date.now()}`,
          name: 'Subtítulo Hero',
          type: 'paragraph',
          content: 'Crea sitios web ultrarrápidos, modulares y completamente personalizables sin esfuerzo.',
          styles: {
            fontSize: '18px',
            color: '#94a3b8',
            maxWidth: '600px',
            lineHeight: '1.6',
            textAlign: 'center',
          },
        },
        {
          id: `cta-row-${Date.now()}`,
          name: 'Fila de Botones CTA',
          type: 'container',
          styles: {
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginTop: '10px',
            justifyContent: 'center',
          },
          children: [
            {
              id: `btn1-${Date.now()}`,
              name: 'Botón Primario',
              type: 'button',
              content: 'Comenzar Ahora ↗',
              styles: {
                backgroundColor: '#6366f1',
                color: '#ffffff',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '24px',
                paddingRight: '24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
              },
            },
            {
              id: `btn2-${Date.now()}`,
              name: 'Botón Secundario',
              type: 'button',
              content: 'Ver Demostración',
              styles: {
                backgroundColor: '#181825',
                color: '#e2e8f0',
                borderWidth: '1px',
                borderColor: '#313244',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '24px',
                paddingRight: '24px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '14px',
              },
            },
          ],
        },
      ],
    },
  },

  // 2. TABLA DE PRECIOS (PRICING TABLE)
  {
    id: 'pricing-table',
    title: 'Tabla de Precios y Planes',
    description: 'Comparativa de 3 tarjetas de planes (Básico, Pro y Enterprise) con precios y características.',
    badge: 'Ventas · Precios',
    element: {
      id: `pricing-${Date.now()}`,
      name: 'Sección Precios',
      type: 'section',
      styles: {
        paddingTop: '48px',
        paddingBottom: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        backgroundColor: '#09090b',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginBottom: '32px',
      },
      children: [
        {
          id: `p-head-${Date.now()}`,
          name: 'Encabezado Precios',
          type: 'container',
          styles: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' },
          children: [
            { id: `p-t-${Date.now()}`, name: 'Título Precios', type: 'heading', content: 'Planes a tu Medida', styles: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' } },
            { id: `p-sub-${Date.now()}`, name: 'Subtítulo Precios', type: 'paragraph', content: 'Escoge la suscripción perfecta para escalar tu negocio.', styles: { fontSize: '15px', color: '#a1a1aa', textAlign: 'center' } },
          ],
        },
        {
          id: `p-cards-${Date.now()}`,
          name: 'Grilla de 3 Tarjetas',
          type: 'container',
          styles: { display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' },
          children: [
            {
              id: `plan-1-${Date.now()}`,
              name: 'Plan Básico',
              type: 'container',
              styles: { flex: '1 1 240px', backgroundColor: '#18181b', borderWidth: '1px', borderColor: '#27272a', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' },
              children: [
                { id: `p1-name`, name: 'Nombre Plan', type: 'heading', content: 'Básico', styles: { fontSize: '20px', color: '#a1a1aa' } },
                { id: `p1-price`, name: 'Precio', type: 'heading', content: '$19 / mes', styles: { fontSize: '36px', fontWeight: 'bold', color: '#ffffff' } },
                { id: `p1-desc`, name: 'Características', type: 'paragraph', content: '• 1 Dominio Incluido\n• Soporte por Email\n• Hasta 5.000 Visitas/mes', styles: { fontSize: '13px', color: '#a1a1aa', lineHeight: '1.8' } },
                { id: `p1-btn`, name: 'Botón Plan', type: 'button', content: 'Elegir Básico', styles: { backgroundColor: '#27272a', color: '#ffffff', padding: '10px', borderRadius: '8px', textAlign: 'center', marginTop: 'auto' } },
              ],
            },
            {
              id: `plan-2-${Date.now()}`,
              name: 'Plan Pro (Destacado)',
              type: 'container',
              styles: { flex: '1 1 240px', backgroundColor: '#1e1b4b', borderWidth: '2px', borderColor: '#6366f1', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 0 30px rgba(99, 102, 241, 0.25)' },
              children: [
                { id: `p2-name`, name: 'Nombre Plan', type: 'heading', content: 'Pro ⭐', styles: { fontSize: '20px', color: '#818cf8', fontWeight: 'bold' } },
                { id: `p2-price`, name: 'Precio', type: 'heading', content: '$49 / mes', styles: { fontSize: '36px', fontWeight: 'bold', color: '#ffffff' } },
                { id: `p2-desc`, name: 'Características', type: 'paragraph', content: '• Dominios Ilimitados\n• Soporte Prioritario 24/7\n• Hasta 100.000 Visitas/mes\n• Copias de Seguridad Diarias', styles: { fontSize: '13px', color: '#c7d2fe', lineHeight: '1.8' } },
                { id: `p2-btn`, name: 'Botón Plan', type: 'button', content: 'Probar Gratis 14 Días 🚀', styles: { backgroundColor: '#6366f1', color: '#ffffff', padding: '10px', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center', marginTop: 'auto' } },
              ],
            },
          ],
        },
      ],
    },
  },

  // 3. GRILLA DE CARACTERÍSTICAS (FEATURES)
  {
    id: 'features-grid',
    title: 'Grilla de Beneficios & Funciones',
    description: '3 bloques visuales para resaltar los puntos fuertes de tu producto o servicio.',
    badge: 'Características',
    element: {
      id: `features-${Date.now()}`,
      name: 'Sección Beneficios',
      type: 'section',
      styles: {
        paddingTop: '48px',
        paddingBottom: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        backgroundColor: '#121218',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#1f1f2e',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '32px',
      },
      children: [
        {
          id: `f-title-${Date.now()}`,
          name: 'Título Sección',
          type: 'heading',
          content: 'Diseñado para Impulsar tus Resultados',
          styles: { fontSize: '28px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
        },
        {
          id: `f-cols-${Date.now()}`,
          name: 'Columnas de Funciones',
          type: 'container',
          styles: { display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' },
          children: [
            {
              id: `f-1`,
              name: 'Bloque 1',
              type: 'container',
              styles: { flex: '1 1 200px', backgroundColor: '#1a1a24', padding: '20px', borderRadius: '12px', borderLeftWidth: '3px', borderColor: '#6366f1', gap: '8px', display: 'flex', flexDirection: 'column' },
              children: [
                { id: `f1-t`, name: 'Título', type: 'heading', content: '⚡ Velocidad Extrema', styles: { fontSize: '18px', color: '#ffffff' } },
                { id: `f1-p`, name: 'Texto', type: 'paragraph', content: 'Carga ultrarrápida optimizada para el motor de búsqueda y la experiencia del usuario.', styles: { fontSize: '13px', color: '#94a3b8' } },
              ],
            },
            {
              id: `f-2`,
              name: 'Bloque 2',
              type: 'container',
              styles: { flex: '1 1 200px', backgroundColor: '#1a1a24', padding: '20px', borderRadius: '12px', borderLeftWidth: '3px', borderColor: '#a855f7', gap: '8px', display: 'flex', flexDirection: 'column' },
              children: [
                { id: `f2-t`, name: 'Título', type: 'heading', content: '🎨 Diseño Modular', styles: { fontSize: '18px', color: '#ffffff' } },
                { id: `f2-p`, name: 'Texto', type: 'paragraph', content: 'Personaliza cada sección, color y tipografía de manera intuitiva y sin complicaciones.', styles: { fontSize: '13px', color: '#94a3b8' } },
              ],
            },
            {
              id: `f-3`,
              name: 'Bloque 3',
              type: 'container',
              styles: { flex: '1 1 200px', backgroundColor: '#1a1a24', padding: '20px', borderRadius: '12px', borderLeftWidth: '3px', borderColor: '#22c55e', gap: '8px', display: 'flex', flexDirection: 'column' },
              children: [
                { id: `f3-t`, name: 'Título', type: 'heading', content: '🔒 Máxima Seguridad', styles: { fontSize: '18px', color: '#ffffff' } },
                { id: `f3-p`, name: 'Texto', type: 'paragraph', content: 'Sistemas protegidos con cifrado de datos y arquitectura confiable en todo momento.', styles: { fontSize: '13px', color: '#94a3b8' } },
              ],
            },
          ],
        },
      ],
    },
  },

  // 4. BANNER DE LLAMADA A LA ACCIÓN (CTA BANNER)
  {
    id: 'cta-banner',
    title: 'Banner de Conversión (CTA Neón)',
    description: 'Bloque horizontal brillante ideal para colocar antes del footer y capturar clientes.',
    badge: 'Conversión',
    element: {
      id: `cta-banner-${Date.now()}`,
      name: 'Banner CTA',
      type: 'section',
      styles: {
        padding: '40px 32px',
        backgroundColor: '#4f46e5',
        backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
        marginBottom: '32px',
      },
      children: [
        {
          id: `cta-text-box`,
          name: 'Contenedor Texto',
          type: 'container',
          styles: { display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '550px' },
          children: [
            { id: `cta-t`, name: 'Título CTA', type: 'heading', content: '¿Listo para llevar tu proyecto al siguiente nivel?', styles: { fontSize: '26px', fontWeight: 'bold', color: '#ffffff' } },
            { id: `cta-p`, name: 'Texto CTA', type: 'paragraph', content: 'Únete a miles de creadores y comienza a construir hoy mismo.', styles: { fontSize: '14px', color: '#e0e7ff' } },
          ],
        },
        {
          id: `cta-btn`,
          name: 'Botón CTA Banner',
          type: 'button',
          content: 'Empezar Gratis Ahora ⚡',
          styles: {
            backgroundColor: '#ffffff',
            color: '#4f46e5',
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingLeft: '28px',
            paddingRight: '28px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '14px',
          },
        },
      ],
    },
  },

  // 5. PREGUNTAS FRECUENTES (FAQ)
  {
    id: 'faq-section',
    title: 'Preguntas Frecuentes (FAQ)',
    description: 'Módulo de resolución de dudas con títulos desplegables y texto claro.',
    badge: 'Soporte · FAQ',
    element: {
      id: `faq-${Date.now()}`,
      name: 'Sección Preguntas Frecuentes',
      type: 'section',
      styles: {
        padding: '48px 24px',
        backgroundColor: '#18181b',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#27272a',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '32px',
      },
      children: [
        { id: `faq-title`, name: 'Título FAQ', type: 'heading', content: 'Preguntas Frecuentes', styles: { fontSize: '28px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' } },
        {
          id: `faq-item-1`,
          name: 'Pregunta 1',
          type: 'container',
          styles: { backgroundColor: '#09090b', padding: '16px 20px', borderRadius: '12px', borderWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'column', gap: '6px' },
          children: [
            { id: `q1`, name: 'Título Pregunta', type: 'heading', content: '❓ ¿Puedo usar mi propio dominio personalizado?', styles: { fontSize: '16px', color: '#818cf8' } },
            { id: `a1`, name: 'Respuesta', type: 'paragraph', content: 'Sí, puedes vincular tu propio dominio en cualquier momento desde la configuración del proyecto.', styles: { fontSize: '13px', color: '#a1a1aa' } },
          ],
        },
        {
          id: `faq-item-2`,
          name: 'Pregunta 2',
          type: 'container',
          styles: { backgroundColor: '#09090b', padding: '16px 20px', borderRadius: '12px', borderWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'column', gap: '6px' },
          children: [
            { id: `q2`, name: 'Título Pregunta', type: 'heading', content: '❓ ¿Requiere conocimientos de programación?', styles: { fontSize: '16px', color: '#818cf8' } },
            { id: `a2`, name: 'Respuesta', type: 'paragraph', content: 'No es necesario. Puedes editar visualmente todo el contenido con la interfaz arrastrar y soltar.', styles: { fontSize: '13px', color: '#a1a1aa' } },
          ],
        },
      ],
    },
  },

  // 6. FORMULARIO DE CONTACTO
  {
    id: 'contact-form-section',
    title: 'Formulario de Contacto',
    description: 'Bloque con campos de entrada (Nombre, Email, Mensaje) y botón de envío.',
    badge: 'Contacto',
    element: {
      id: `contact-${Date.now()}`,
      name: 'Sección Contacto',
      type: 'section',
      styles: {
        padding: '48px 32px',
        backgroundColor: '#0f0f13',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#1f1f2e',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '32px',
      },
      children: [
        { id: `c-title`, name: 'Título Contacto', type: 'heading', content: 'Contáctanos', styles: { fontSize: '28px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' } },
        { id: `c-desc`, name: 'Subtítulo Contacto', type: 'paragraph', content: 'Déjanos tu mensaje y te responderemos en menos de 24 horas.', styles: { fontSize: '14px', color: '#94a3b8', textAlign: 'center', marginBottom: '8px' } },
        { id: `c-in-1`, name: 'Input Nombre', type: 'paragraph', content: 'Tu nombre completo...', styles: { backgroundColor: '#181825', color: '#94a3b8', padding: '12px 16px', borderRadius: '10px', borderWidth: '1px', borderColor: '#313244', fontSize: '13px' } },
        { id: `c-in-2`, name: 'Input Email', type: 'paragraph', content: 'correo@ejemplo.com', styles: { backgroundColor: '#181825', color: '#94a3b8', padding: '12px 16px', borderRadius: '10px', borderWidth: '1px', borderColor: '#313244', fontSize: '13px' } },
        { id: `c-in-3`, name: 'Input Mensaje', type: 'paragraph', content: 'Escribe aquí tu consulta o mensaje...', styles: { backgroundColor: '#181825', color: '#94a3b8', padding: '16px', borderRadius: '10px', borderWidth: '1px', borderColor: '#313244', fontSize: '13px', minHeight: '80px' } },
        { id: `c-btn`, name: 'Botón Enviar', type: 'button', content: 'Enviar Mensaje ✉️', styles: { backgroundColor: '#6366f1', color: '#ffffff', padding: '12px', borderRadius: '10px', fontWeight: 'bold', textAlign: 'center', fontSize: '14px' } },
      ],
    },
  },

  // 7. PIE DE PÁGINA (FOOTER)
  {
    id: 'footer-modern',
    title: 'Pie de Página Corporativo (Footer)',
    description: 'Estructura inferior con marca, enlaces rápidos y derechos de autor.',
    badge: 'Footer',
    element: {
      id: `footer-${Date.now()}`,
      name: 'Pie de Página',
      type: 'section',
      styles: {
        padding: '32px 24px',
        backgroundColor: '#050508',
        borderTopWidth: '1px',
        borderColor: '#1e1e2e',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        borderRadius: '16px',
      },
      children: [
        {
          id: `f-top-row`,
          name: 'Fila Superior Footer',
          type: 'container',
          styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
          children: [
            { id: `f-brand`, name: 'Marca', type: 'heading', content: '⚡ TuMarca', styles: { fontSize: '20px', fontWeight: 'bold', color: '#6366f1' } },
            { id: `f-links`, name: 'Enlaces', type: 'paragraph', content: 'Inicio   ·   Servicios   ·   Precios   ·   Privacidad', styles: { fontSize: '13px', color: '#94a3b8' } },
          ],
        },
        { id: `f-copy`, name: 'Copyright', type: 'paragraph', content: '© 2026 TuMarca Inc. Todos los derechos reservados.', styles: { fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '12px' } },
      ],
    },
  },
];