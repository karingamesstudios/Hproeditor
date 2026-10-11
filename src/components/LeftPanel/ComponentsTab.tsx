import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import {
  LayoutTemplate,
  Sparkles,
  Type,
  AlignLeft,
  MousePointerClick,
  Image,
  Box,
  CreditCard,
  Minus,
  Tag,
  TextCursorInput,
  Quote,
  Columns2,
  Columns3,
  Navigation,
  ShoppingBag,
  ShoppingCart,
  Star,
  Percent,
  BadgePercent,
  Store,
  SlidersHorizontal,
  MessageCircle,
  CircleHelp,
  Mail,
  Truck,
  Tags,
  Heart,
  Images,
  Download,
  Table,
  ListChecks,
  Globe,
  Gamepad2,
  Smartphone,
  BadgeCheck,
  MonitorPlay,
} from 'lucide-react';

interface BlockItem {
  id: string;
  label: string;
  category: 'basic' | 'layout' | 'store' | 'form' | 'content' | 'media';
  icon: React.FC<{ size?: number; className?: string }>;
}

export const ComponentsTab: React.FC = () => {
  const { addSectionTemplate, setIsTemplatesModalOpen, getActiveDocument } = useEditorStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleAddBlock = (type: string) => {
    const defaultElements: Record<string, any> = {
      // --- TIENDA & E-COMMERCE ---
      productCard: {
        id: '',
        name: 'Ficha Producto',
        type: 'container',
        styles: {
          padding: '16px',
          backgroundColor: '#18181b',
          borderWidth: '1px',
          borderColor: '#27272a',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
        },
        children: [
          {
            id: '',
            name: 'Imagen',
            type: 'image',
            src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop',
            styles: { width: '100%', height: '180px', borderRadius: '12px', objectFit: 'cover' },
          },
          {
            id: '',
            name: 'Insignia',
            type: 'paragraph',
            content: 'ENVÍO GRATIS',
            styles: {
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 'bold',
              width: 'fit-content',
            },
          },
          {
            id: '',
            name: 'Título Producto',
            type: 'heading',
            content: 'Audífonos Bluetooth Pro',
            styles: { fontSize: '16px', fontWeight: 'bold', color: '#ffffff' },
          },
          {
            id: '',
            name: 'Precio',
            type: 'heading',
            content: '$ 39.990 CLP',
            styles: { fontSize: '20px', fontWeight: '900', color: '#818cf8' },
          },
          {
            id: '',
            name: 'Botón Comprar',
            type: 'button',
            content: 'Agregar al Carrito 🛒',
            styles: {
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '12px',
              textAlign: 'center',
              width: '100%',
            },
          },
        ],
      },

      productShowcase: {
        id: '',
        name: 'Showcase Producto',
        type: 'container',
        styles: {
          padding: '24px',
          backgroundColor: '#09090b',
          borderWidth: '1px',
          borderColor: '#27272a',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
        },
        children: [
          {
            id: '',
            name: 'Foto Principal',
            type: 'image',
            src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
            styles: { flex: '1 1 240px', height: '220px', borderRadius: '14px', objectFit: 'cover' },
          },
          {
            id: '',
            name: 'Detalles Producto',
            type: 'container',
            styles: { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '10px' },
            children: [
              {
                id: '',
                name: 'Colección',
                type: 'paragraph',
                content: 'EDICIÓN LIMITADA · 2026',
                styles: { color: '#fbbf24', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' },
              },
              {
                id: '',
                name: 'Nombre Producto',
                type: 'heading',
                content: 'Zapatillas Sport Run V2',
                styles: { fontSize: '24px', fontWeight: '900', color: '#ffffff' },
              },
              {
                id: '',
                name: 'Descripción',
                type: 'paragraph',
                content: 'Suela de alta amortiguación con material transpirable para máximo rendimiento.',
                styles: { fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5' },
              },
              {
                id: '',
                name: 'Precio y CTA',
                type: 'container',
                styles: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '6px' },
                children: [
                  {
                    id: '',
                    name: 'Precio',
                    type: 'heading',
                    content: '$ 59.990',
                    styles: { fontSize: '22px', fontWeight: 'bold', color: '#ffffff' },
                  },
                  {
                    id: '',
                    name: 'Botón Comprar',
                    type: 'button',
                    content: 'Comprar Ahora ↗',
                    styles: { backgroundColor: '#22c55e', color: '#ffffff', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' },
                  },
                ],
              },
            ],
          },
        ],
      },

      productGrid: {
        id: '',
        name: 'Grilla Tienda',
        type: 'container',
        styles: { display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' },
        children: [
          {
            id: '',
            name: 'Producto 1',
            type: 'container',
            styles: { flex: '1', padding: '14px', backgroundColor: '#18181b', borderRadius: '14px', borderWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'column', gap: '8px' },
            children: [
              { id: '', name: 'Foto 1', type: 'image', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop', styles: { width: '100%', height: '120px', borderRadius: '8px', objectFit: 'cover' } },
              { id: '', name: 'Título 1', type: 'heading', content: 'Reloj SmartFit', styles: { fontSize: '14px', fontWeight: 'bold', color: '#ffffff' } },
              { id: '', name: 'Precio 1', type: 'heading', content: '$ 29.990', styles: { fontSize: '16px', fontWeight: 'bold', color: '#818cf8' } },
            ],
          },
          {
            id: '',
            name: 'Producto 2',
            type: 'container',
            styles: { flex: '1', padding: '14px', backgroundColor: '#18181b', borderRadius: '14px', borderWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'column', gap: '8px' },
            children: [
              { id: '', name: 'Foto 2', type: 'image', src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop', styles: { width: '100%', height: '120px', borderRadius: '8px', objectFit: 'cover' } },
              { id: '', name: 'Título 2', type: 'heading', content: 'Audífonos Studio', styles: { fontSize: '14px', fontWeight: 'bold', color: '#ffffff' } },
              { id: '', name: 'Precio 2', type: 'heading', content: '$ 34.990', styles: { fontSize: '16px', fontWeight: 'bold', color: '#818cf8' } },
            ],
          },
        ],
      },

      promoBanner: {
        id: '',
        name: 'Banner Oferta',
        type: 'container',
        styles: {
          backgroundColor: '#e11d48',
          color: '#ffffff',
          padding: '16px 20px',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        },
        children: [
          {
            id: '',
            name: 'Texto Banner',
            type: 'paragraph',
            content: '🔥 30% OFF con el código: OFERTA30',
            styles: { fontSize: '13px', fontWeight: 'bold', color: '#ffffff' },
          },
          {
            id: '',
            name: 'Botón Copiar',
            type: 'button',
            content: 'Copiar Cupón',
            styles: { backgroundColor: '#ffffff', color: '#e11d48', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' },
          },
        ],
      },

      productReview: {
        id: '',
        name: 'Reseña Estrellas',
        type: 'container',
        styles: {
          padding: '16px',
          backgroundColor: '#18181b',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: '#27272a',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        },
        children: [
          {
            id: '',
            name: 'Estrellas',
            type: 'paragraph',
            content: '⭐⭐⭐⭐⭐ (5.0)',
            styles: { fontSize: '13px', color: '#f59e0b', fontWeight: 'bold' },
          },
          {
            id: '',
            name: 'Opinión',
            type: 'paragraph',
            content: '"Excelente calidad de sonido y despacho ultrarrápido."',
            styles: { fontSize: '13px', color: '#e4e4e7', fontStyle: 'italic' },
          },
          {
            id: '',
            name: 'Comprador',
            type: 'paragraph',
            content: '✓ Comprador Verificado — Mateo R.',
            styles: { fontSize: '11px', color: '#22c55e', fontWeight: 'bold' },
          },
        ],
      },

      priceTag: {
        id: '',
        name: 'Etiqueta Precio',
        type: 'container',
        styles: { display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '8px' },
        children: [
          {
            id: '',
            name: 'Precio Oferta',
            type: 'heading',
            content: '$ 24.990',
            styles: { fontSize: '24px', fontWeight: '900', color: '#22c55e' },
          },
          {
            id: '',
            name: 'Precio Anterior',
            type: 'paragraph',
            content: '$ 39.990',
            styles: { fontSize: '14px', color: '#71717a', textDecoration: 'line-through' },
          },
        ],
      },

      // --- BLOQUES PREHECHOS DE TIENDA Y PÁGINAS ---
      categoryTiles: {
        id: '', name: 'Categorías de tienda', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', padding: '18px', backgroundColor: '#09090b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Categoría Audio', type: 'container', styles: { flex: '1 1 130px', padding: '20px 12px', backgroundColor: '#18181b', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }, children: [
            { id: '', name: 'Icono Audio', type: 'heading', content: '🎧', styles: { fontSize: '28px', textAlign: 'center' } },
            { id: '', name: 'Nombre Audio', type: 'heading', content: 'Audio', styles: { fontSize: '15px', color: '#ffffff', textAlign: 'center' } },
            { id: '', name: 'Cantidad Audio', type: 'paragraph', content: '24 productos', styles: { fontSize: '11px', color: '#a1a1aa', textAlign: 'center' } },
          ]},
          { id: '', name: 'Categoría Tecnología', type: 'container', styles: { flex: '1 1 130px', padding: '20px 12px', backgroundColor: '#18181b', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }, children: [
            { id: '', name: 'Icono Tecnología', type: 'heading', content: '⌚', styles: { fontSize: '28px', textAlign: 'center' } },
            { id: '', name: 'Nombre Tecnología', type: 'heading', content: 'Wearables', styles: { fontSize: '15px', color: '#ffffff', textAlign: 'center' } },
            { id: '', name: 'Cantidad Tecnología', type: 'paragraph', content: '12 productos', styles: { fontSize: '11px', color: '#a1a1aa', textAlign: 'center' } },
          ]},
          { id: '', name: 'Categoría Hogar', type: 'container', styles: { flex: '1 1 130px', padding: '20px 12px', backgroundColor: '#18181b', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }, children: [
            { id: '', name: 'Icono Hogar', type: 'heading', content: '🏠', styles: { fontSize: '28px', textAlign: 'center' } },
            { id: '', name: 'Nombre Hogar', type: 'heading', content: 'Hogar', styles: { fontSize: '15px', color: '#ffffff', textAlign: 'center' } },
            { id: '', name: 'Cantidad Hogar', type: 'paragraph', content: '18 productos', styles: { fontSize: '11px', color: '#a1a1aa', textAlign: 'center' } },
          ]},
        ],
      },
      filterBar: {
        id: '', name: 'Barra de búsqueda y filtros', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '10px', padding: '14px', backgroundColor: '#18181b', borderRadius: '12px', borderWidth: '1px', borderColor: '#27272a' },
        children: [
          { id: '', name: 'Búsqueda', type: 'paragraph', content: '⌕  Buscar productos...', styles: { flex: '2 1 180px', backgroundColor: '#09090b', color: '#a1a1aa', padding: '11px 14px', borderRadius: '8px', fontSize: '13px' } },
          { id: '', name: 'Filtro categoría', type: 'button', content: 'Categoría ▾', styles: { backgroundColor: '#27272a', color: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '12px' } },
          { id: '', name: 'Filtro precio', type: 'button', content: 'Precio ▾', styles: { backgroundColor: '#27272a', color: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '12px' } },
          { id: '', name: 'Ordenar', type: 'button', content: 'Ordenar por ▾', styles: { backgroundColor: '#27272a', color: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '12px' } },
        ],
      },
      cartSummary: {
        id: '', name: 'Resumen del carrito', type: 'container',
        styles: { padding: '22px', backgroundColor: '#18181b', color: '#ffffff', borderRadius: '16px', borderWidth: '1px', borderColor: '#3f3f46', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px' },
        children: [
          { id: '', name: 'Título carrito', type: 'heading', content: 'Tu carrito', styles: { color: '#ffffff', fontSize: '22px', fontWeight: '800' } },
          { id: '', name: 'Productos carrito', type: 'paragraph', content: '2 productos · subtotal', styles: { color: '#a1a1aa', fontSize: '13px' } },
          { id: '', name: 'Subtotal', type: 'heading', content: '$ 64.980 CLP', styles: { color: '#ffffff', fontSize: '26px', fontWeight: '900' } },
          { id: '', name: 'Aviso despacho', type: 'paragraph', content: '🚚 Envío calculado en el siguiente paso.', styles: { color: '#a1a1aa', fontSize: '12px' } },
          { id: '', name: 'Ir a pagar', type: 'button', content: 'Continuar al pago →', styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '13px', borderRadius: '9px', textAlign: 'center', fontWeight: '800', width: '100%' } },
        ],
      },
      shippingBenefits: {
        id: '', name: 'Beneficios de compra', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', padding: '18px', backgroundColor: '#18181b', borderRadius: '12px' },
        children: [
          { id: '', name: 'Beneficio envío', type: 'container', styles: { flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '5px' }, children: [
            { id: '', name: 'Envío icono', type: 'heading', content: '🚚 Envío gratis', styles: { color: '#ffffff', fontSize: '14px', fontWeight: 'bold' } },
            { id: '', name: 'Envío texto', type: 'paragraph', content: 'En compras sobre $50.000', styles: { color: '#a1a1aa', fontSize: '12px' } },
          ]},
          { id: '', name: 'Beneficio pago', type: 'container', styles: { flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '5px' }, children: [
            { id: '', name: 'Pago icono', type: 'heading', content: '🔒 Pago seguro', styles: { color: '#ffffff', fontSize: '14px', fontWeight: 'bold' } },
            { id: '', name: 'Pago texto', type: 'paragraph', content: 'Tus datos protegidos', styles: { color: '#a1a1aa', fontSize: '12px' } },
          ]},
          { id: '', name: 'Beneficio soporte', type: 'container', styles: { flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '5px' }, children: [
            { id: '', name: 'Soporte icono', type: 'heading', content: '💬 Atención', styles: { color: '#ffffff', fontSize: '14px', fontWeight: 'bold' } },
            { id: '', name: 'Soporte texto', type: 'paragraph', content: 'Te ayudamos con tu compra', styles: { color: '#a1a1aa', fontSize: '12px' } },
          ]},
        ],
      },
      testimonial: {
        id: '', name: 'Testimonio de cliente', type: 'container',
        styles: { padding: '22px', backgroundColor: '#18181b', borderRadius: '14px', borderWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px' },
        children: [
          { id: '', name: 'Estrellas testimonio', type: 'paragraph', content: '★★★★★  5.0', styles: { color: '#fbbf24', fontSize: '14px', fontWeight: 'bold' } },
          { id: '', name: 'Comentario', type: 'paragraph', content: '“La calidad superó mis expectativas y el pedido llegó antes de lo esperado.”', styles: { color: '#f4f4f5', fontSize: '15px', lineHeight: '1.7' } },
          { id: '', name: 'Autor testimonio', type: 'paragraph', content: '— Camila R. · Cliente verificada', styles: { color: '#a1a1aa', fontSize: '12px' } },
        ],
      },
      faqBlock: {
        id: '', name: 'Preguntas frecuentes', type: 'container',
        styles: { padding: '22px', backgroundColor: '#18181b', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' },
        children: [
          { id: '', name: 'FAQ título', type: 'heading', content: 'Preguntas frecuentes', styles: { color: '#ffffff', fontSize: '24px', fontWeight: '800' } },
          { id: '', name: 'FAQ pregunta 1', type: 'heading', content: '¿Cuánto tarda el envío?', styles: { color: '#ffffff', fontSize: '15px', fontWeight: '700' } },
          { id: '', name: 'FAQ respuesta 1', type: 'paragraph', content: 'Normalmente entre 2 y 5 días hábiles, según tu ubicación.', styles: { color: '#a1a1aa', fontSize: '13px', lineHeight: '1.6' } },
          { id: '', name: 'FAQ pregunta 2', type: 'heading', content: '¿Puedo cambiar o devolver un producto?', styles: { color: '#ffffff', fontSize: '15px', fontWeight: '700' } },
          { id: '', name: 'FAQ respuesta 2', type: 'paragraph', content: 'Sí, revisa nuestra política de cambios y devoluciones.', styles: { color: '#a1a1aa', fontSize: '13px', lineHeight: '1.6' } },
        ],
      },
      contactForm: {
        id: '', name: 'Formulario de contacto', type: 'container',
        styles: { padding: '22px', backgroundColor: '#18181b', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '560px' },
        children: [
          { id: '', name: 'Formulario título', type: 'heading', content: 'Hablemos', styles: { color: '#ffffff', fontSize: '24px', fontWeight: '800' } },
          { id: '', name: 'Campo nombre', type: 'paragraph', content: 'Nombre completo', styles: { color: '#a1a1aa', backgroundColor: '#09090b', borderWidth: '1px', borderColor: '#3f3f46', padding: '12px', borderRadius: '8px', fontSize: '13px' } },
          { id: '', name: 'Campo correo', type: 'paragraph', content: 'Correo electrónico', styles: { color: '#a1a1aa', backgroundColor: '#09090b', borderWidth: '1px', borderColor: '#3f3f46', padding: '12px', borderRadius: '8px', fontSize: '13px' } },
          { id: '', name: 'Campo mensaje', type: 'paragraph', content: '¿En qué podemos ayudarte?', styles: { color: '#a1a1aa', backgroundColor: '#09090b', borderWidth: '1px', borderColor: '#3f3f46', padding: '22px 12px', borderRadius: '8px', fontSize: '13px' } },
          { id: '', name: 'Enviar formulario', type: 'button', content: 'Enviar mensaje →', styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 18px', borderRadius: '8px', fontWeight: 'bold', alignSelf: 'flex-start' } },
        ],
      },
      storeFooter: {
        id: '', name: 'Pie de página de tienda', type: 'container',
        styles: { padding: '28px 24px', backgroundColor: '#09090b', borderTopWidth: '1px', borderColor: '#27272a', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '18px' },
        children: [
          { id: '', name: 'Footer marca', type: 'heading', content: 'NORTH / GOODS', styles: { color: '#ffffff', fontSize: '18px', fontWeight: '900' } },
          { id: '', name: 'Footer navegación', type: 'paragraph', content: 'Ayuda · Envíos · Cambios · Contacto', styles: { color: '#a1a1aa', fontSize: '12px' } },
          { id: '', name: 'Footer copyright', type: 'paragraph', content: '© 2026 Tu tienda. Todos los derechos reservados.', styles: { color: '#71717a', fontSize: '11px' } },
        ],
      },
      promoHero: {
        id: '', name: 'Portada con llamada a la acción', type: 'container',
        styles: { padding: 'clamp(28px, 6vw, 72px)', background: 'linear-gradient(120deg, #18181b, #312e81)', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' },
        children: [
          { id: '', name: 'Etiqueta portada', type: 'paragraph', content: 'NUEVA COLECCIÓN · 2026', styles: { color: '#c4b5fd', fontSize: '11px', fontWeight: '900', letterSpacing: '1.5px' } },
          { id: '', name: 'Título portada', type: 'heading', content: 'Encuentra tu próximo favorito.', styles: { color: '#ffffff', fontSize: 'clamp(30px, 5vw, 58px)', lineHeight: '1.08', fontWeight: '900', maxWidth: '800px' } },
          { id: '', name: 'Texto portada', type: 'paragraph', content: 'Productos seleccionados, diseño cuidado y una experiencia de compra sencilla.', styles: { color: '#d4d4d8', fontSize: '16px', lineHeight: '1.7', maxWidth: '620px' } },
          { id: '', name: 'CTA portada', type: 'button', content: 'Explorar productos →', styles: { backgroundColor: '#a5b4fc', color: '#111827', padding: '13px 20px', borderRadius: '9px', fontWeight: '800' } },
        ],
      },

      // --- HERRAMIENTAS ESPECÍFICAS PARA PÁGINAS DE VIDEOJUEGOS ---
      gamePageHeader: {
        id: '', name: 'Cabecera de página de juego', type: 'container',
        styles: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '14px 20px', backgroundColor: '#3f4a54', color: '#ffffff' },
        children: [
          { id: '', name: 'Nombre del estudio', type: 'heading', content: 'TU ESTUDIO', styles: { color: '#ffffff', fontSize: '17px', fontWeight: '900', margin: '0' } },
          { id: '', name: 'Enlaces de navegación', type: 'paragraph', content: 'Juego · Capturas · Descargar · Comunidad', styles: { color: '#ffffff', fontSize: '12px', margin: '0' } },
        ],
      },
      gameDescription: {
        id: '', name: 'Descripción de videojuego', type: 'container',
        styles: { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', backgroundColor: 'rgba(183,212,240,.92)', color: '#162b62', borderRadius: '12px' },
        children: [
          { id: '', name: 'Etiqueta de descripción', type: 'paragraph', content: 'ACERCA DEL JUEGO', styles: { color: '#091637', fontSize: '10px', letterSpacing: '1.5px', fontWeight: '900', margin: '0' } },
          { id: '', name: 'Título de descripción', type: 'heading', content: 'Una aventura hecha para ti', styles: { color: '#162b62', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: '900', lineHeight: '1.2', margin: '0' } },
          { id: '', name: 'Texto de descripción', type: 'paragraph', content: 'Describe la experiencia, las mecánicas principales y qué hace especial a tu juego.', styles: { color: '#162b62', fontSize: '14px', lineHeight: '1.8', margin: '0' } },
        ],
      },
      gameDownloadItem: {
        id: '', name: 'Opción de descarga', type: 'container',
        styles: { width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: '#ffffff', border: '1px solid #82aed8', borderRadius: '10px' },
        children: [
          { id: '', name: 'Nombre de versión', type: 'container', styles: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 140px' }, children: [
            { id: '', name: 'Nombre archivo', type: 'heading', content: 'Versión para Windows', styles: { color: '#162b62', fontSize: '14px', fontWeight: '800', margin: '0' } },
            { id: '', name: 'Detalle archivo', type: 'paragraph', content: 'Instalador · Actualizado recientemente', styles: { color: '#58749b', fontSize: '11px', margin: '0' } },
          ]},
          { id: '', name: 'Botón descargar archivo', type: 'button', content: 'Descargar ↓', styles: { backgroundColor: '#091637', color: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800' } },
        ],
      },

      // --- CONTENIDO PROFESIONAL / PÁGINAS DE JUEGOS Y PRODUCTOS ---
      gameHero: {
        id: '', name: 'Portada de proyecto', type: 'container',
        styles: { width: '100%', display: 'flex', flexDirection: 'column', gap: '18px', padding: '0 0 22px', backgroundColor: '#71aadc', color: '#162b62', overflow: 'hidden' },
        children: [
          { id: '', name: 'Imagen principal', type: 'image', src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&auto=format&fit=crop', styles: { width: '100%', aspectRatio: '16 / 7', objectFit: 'cover', borderRadius: '0' } },
          { id: '', name: 'Título del proyecto', type: 'heading', content: 'Mi proyecto', styles: { fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: '1.12', fontWeight: '900', color: '#162b62', margin: '0 24px' } },
          { id: '', name: 'Descripción corta', type: 'paragraph', content: 'Presenta tu juego, aplicación o producto con una descripción clara y atractiva.', styles: { fontSize: '16px', lineHeight: '1.65', color: '#162b62', margin: '0 24px', maxWidth: '760px' } },
          { id: '', name: 'Acción principal', type: 'button', content: 'Descargar / Ver más', styles: { alignSelf: 'flex-start', margin: '0 24px', padding: '12px 20px', borderRadius: '8px', backgroundColor: '#091637', color: '#ffffff', fontWeight: '800' } },
        ],
      },
      downloadPanel: {
        id: '', name: 'Panel de descargas', type: 'container',
        styles: { width: '100%', padding: '20px', backgroundColor: '#18181b', border: '1px solid #34343b', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' },
        children: [
          { id: '', name: 'Título descargas', type: 'heading', content: 'Descargar', styles: { fontSize: '22px', color: '#ffffff', fontWeight: '800', margin: '0' } },
          { id: '', name: 'Descarga Android', type: 'container', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '14px', backgroundColor: '#222228', borderRadius: '10px' }, children: [
            { id: '', name: 'Nombre Android', type: 'paragraph', content: 'Versión Android · APK', styles: { color: '#e4e4e7', fontWeight: '700', margin: '0' } },
            { id: '', name: 'Botón Android', type: 'button', content: 'Descargar Android', styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '9px 14px', borderRadius: '8px', fontWeight: '700' } },
          ]},
          { id: '', name: 'Descarga PC', type: 'container', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '14px', backgroundColor: '#222228', borderRadius: '10px' }, children: [
            { id: '', name: 'Nombre PC', type: 'paragraph', content: 'Versión Windows · PC', styles: { color: '#e4e4e7', fontWeight: '700', margin: '0' } },
            { id: '', name: 'Botón PC', type: 'button', content: 'Descargar PC', styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '9px 14px', borderRadius: '8px', fontWeight: '700' } },
          ]},
        ],
      },
      screenshotGallery: {
        id: '', name: 'Galería de capturas', type: 'container',
        styles: { width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px', backgroundColor: '#18181b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Título galería', type: 'heading', content: 'Capturas de pantalla', styles: { fontSize: '22px', color: '#ffffff', fontWeight: '800', margin: '0' } },
          { id: '', name: 'Grilla capturas', type: 'container', styles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px', width: '100%' }, children: [
            { id: '', name: 'Captura 1', type: 'image', src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&auto=format&fit=crop', styles: { width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: '10px' } },
            { id: '', name: 'Captura 2', type: 'image', src: 'https://images.unsplash.com/photo-1493711662062-fa541d7f8fc8?w=700&auto=format&fit=crop', styles: { width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: '10px' } },
            { id: '', name: 'Captura 3', type: 'image', src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop', styles: { width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: '10px' } },
          ]},
        ],
      },
      videoEmbedCard: {
        id: '', name: 'Vídeo / tráiler', type: 'container',
        styles: { width: '100%', maxWidth: '850px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#18181b', borderRadius: '14px', border: '1px solid #303038' },
        children: [
          { id: '', name: 'Miniatura tráiler', type: 'image', src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&auto=format&fit=crop', styles: { width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '9px' } },
          { id: '', name: 'Título tráiler', type: 'heading', content: '▶ Mira el tráiler', styles: { fontSize: '18px', color: '#ffffff', fontWeight: '800', margin: '0' } },
          { id: '', name: 'Texto tráiler', type: 'paragraph', content: 'Cambia la miniatura y enlaza este bloque a tu vídeo de YouTube o Vimeo.', styles: { fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5', margin: '0' } },
        ],
      },
      projectInfoTable: {
        id: '', name: 'Ficha técnica', type: 'container',
        styles: { width: '100%', padding: '18px', display: 'flex', flexDirection: 'column', gap: '0', backgroundColor: '#18181b', border: '1px solid #34343b', borderRadius: '12px', color: '#e4e4e7' },
        children: [
          { id: '', name: 'Título ficha', type: 'heading', content: 'Información del proyecto', styles: { fontSize: '19px', color: '#ffffff', margin: '0 0 10px', fontWeight: '800' } },
          ...[['Estado','En desarrollo'],['Plataformas','Windows · Android'],['Género','Aventura · Casual'],['Idioma','Español'],['Desarrollador','Tu nombre']].map(([label, value], i) => ({ id: '', name: `Dato ${i+1}`, type: 'container', styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', padding: '11px 2px', borderBottom: '1px solid #34343b' }, children: [ { id: '', name: `Campo ${i+1}`, type: 'paragraph', content: label, styles: { color: '#a1a1aa', margin: '0', fontSize: '13px' } }, { id: '', name: `Valor ${i+1}`, type: 'paragraph', content: value, styles: { color: '#f4f4f5', margin: '0', fontSize: '13px', fontWeight: '700' } } ] })),
        ],
      },
      tagCloud: {
        id: '', name: 'Etiquetas / categorías', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '4px 0', width: '100%' },
        children: ['2D','Pixel Art','Aventura','Indie','Un jugador','Relajante'].map((label, i) => ({ id: '', name: `Etiqueta ${i+1}`, type: 'paragraph', content: label, styles: { display: 'inline-block', width: 'fit-content', padding: '6px 10px', borderRadius: '999px', border: '1px solid #4f46e5', backgroundColor: 'rgba(79,70,229,.12)', color: '#c7d2fe', fontSize: '11px', fontWeight: '700', margin: '0' } })),
      },
      creatorCard: {
        id: '', name: 'Tarjeta de creador', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '14px', padding: '16px', backgroundColor: '#18181b', border: '1px solid #34343b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Avatar creador', type: 'image', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces', styles: { width: '64px', height: '64px', objectFit: 'cover', borderRadius: '50%' } },
          { id: '', name: 'Datos creador', type: 'container', styles: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 180px' }, children: [
            { id: '', name: 'Nombre creador', type: 'heading', content: 'Tu estudio / nombre', styles: { color: '#ffffff', fontSize: '16px', fontWeight: '800', margin: '0' } },
            { id: '', name: 'Bio creador', type: 'paragraph', content: 'Desarrollador independiente. Descubre más proyectos y novedades.', styles: { color: '#a1a1aa', fontSize: '12px', lineHeight: '1.5', margin: '0' } },
          ]},
          { id: '', name: 'Ver perfil', type: 'button', content: 'Ver perfil ↗', styles: { backgroundColor: '#27272a', color: '#ffffff', borderRadius: '8px', padding: '9px 12px', fontWeight: '700' } },
        ],
      },
      platformBadges: {
        id: '', name: 'Plataformas compatibles', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', width: '100%' },
        children: ['🖥 Windows','📱 Android','🎮 Gamepad','🌐 Navegador'].map((label, i) => ({ id: '', name: `Plataforma ${i+1}`, type: 'paragraph', content: label, styles: { padding: '9px 12px', backgroundColor: '#222228', border: '1px solid #3f3f46', borderRadius: '9px', color: '#e4e4e7', fontSize: '12px', fontWeight: '700', margin: '0' } })),
      },
      contentSection: {
        id: '', name: 'Sección de contenido', type: 'container',
        styles: { width: '100%', padding: 'clamp(18px, 4vw, 36px)', display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#18181b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Etiqueta sección', type: 'paragraph', content: 'ACERCA DEL PROYECTO', styles: { color: '#818cf8', fontSize: '11px', fontWeight: '900', letterSpacing: '1.5px', margin: '0' } },
          { id: '', name: 'Título sección', type: 'heading', content: 'Una experiencia hecha para ti', styles: { color: '#ffffff', fontSize: 'clamp(24px, 3vw, 34px)', lineHeight: '1.15', fontWeight: '900', margin: '0' } },
          { id: '', name: 'Descripción sección', type: 'paragraph', content: 'Explica aquí qué hace especial tu proyecto, cuáles son sus características y por qué debería interesarle a tus visitantes.', styles: { color: '#c4c4cc', fontSize: '15px', lineHeight: '1.8', maxWidth: '780px', margin: '0' } },
        ],
      },

      // --- BÁSICOS Y ESTRUCTURA ---
      heading: {
        id: '',
        name: 'Título',
        type: 'heading',
        content: 'Nuevo Encabezado',
        styles: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff', marginBottom: '12px' },
      },
      paragraph: {
        id: '',
        name: 'Párrafo',
        type: 'paragraph',
        content: 'Escribe tu texto descriptivo aquí.',
        styles: { fontSize: '16px', color: '#a1a1aa', marginBottom: '12px', lineHeight: '1.6' },
      },
      button: {
        id: '',
        name: 'Botón',
        type: 'button',
        content: 'Haz Clic',
        styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' },
      },
      image: {
        id: '',
        name: 'Imagen',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
        styles: { width: '100%', borderRadius: '12px' },
      },
      container: {
        id: '',
        name: 'Contenedor',
        type: 'container',
        styles: { padding: '20px', backgroundColor: '#18181b', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' },
        children: [],
      },
      card: {
        id: '',
        name: 'Tarjeta',
        type: 'container',
        styles: {
          padding: '24px',
          backgroundColor: '#18181b',
          borderWidth: '1px',
          borderColor: '#27272a',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        },
        children: [
          { id: '', name: 'Título', type: 'heading', content: 'Título de Tarjeta', styles: { fontSize: '20px', fontWeight: 'bold', color: '#ffffff' } },
          { id: '', name: 'Texto', type: 'paragraph', content: 'Contenido descriptivo para destacar.', styles: { fontSize: '14px', color: '#a1a1aa' } },
        ],
      },
      badge: {
        id: '',
        name: 'Insignia',
        type: 'paragraph',
        content: '✦ NUEVO',
        styles: { backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderWidth: '1px', borderColor: 'rgba(99, 102, 241, 0.3)', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 'bold', width: 'fit-content' },
      },
      divider: {
        id: '',
        name: 'Divisor',
        type: 'container',
        styles: { width: '100%', height: '1px', backgroundColor: '#27272a', marginTop: '16px', marginBottom: '16px' },
      },
      input: {
        id: '',
        name: 'Input',
        type: 'paragraph',
        content: 'Escribe aquí...',
        styles: { backgroundColor: '#09090b', color: '#a1a1aa', borderWidth: '1px', borderColor: '#27272a', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', width: '100%' },
      },
      quote: {
        id: '',
        name: 'Cita',
        type: 'container',
        styles: { padding: '16px 20px', backgroundColor: '#18181b', borderLeftWidth: '4px', borderColor: '#6366f1', borderRadius: '0px 12px 12px 0px', display: 'flex', flexDirection: 'column', gap: '6px' },
        children: [
          { id: '', name: 'Texto Cita', type: 'paragraph', content: '"Excelente experiencia."', styles: { fontSize: '15px', fontStyle: 'italic', color: '#e4e4e7' } },
          { id: '', name: 'Autor', type: 'paragraph', content: '— Cliente Satisfecho', styles: { fontSize: '12px', fontWeight: 'bold', color: '#818cf8' } },
        ],
      },
      grid2: {
        id: '',
        name: '2 Columnas',
        type: 'container',
        styles: { display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' },
        children: [
          { id: '', name: 'Columna 1', type: 'container', styles: { flex: '1', padding: '16px', backgroundColor: '#18181b', borderRadius: '12px', minHeight: '80px' }, children: [] },
          { id: '', name: 'Columna 2', type: 'container', styles: { flex: '1', padding: '16px', backgroundColor: '#18181b', borderRadius: '12px', minHeight: '80px' }, children: [] },
        ],
      },
      grid3: {
        id: '',
        name: '3 Columnas',
        type: 'container',
        styles: { display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' },
        children: [
          { id: '', name: 'Columna 1', type: 'container', styles: { flex: '1', padding: '16px', backgroundColor: '#18181b', borderRadius: '12px', minHeight: '80px' }, children: [] },
          { id: '', name: 'Columna 2', type: 'container', styles: { flex: '1', padding: '16px', backgroundColor: '#18181b', borderRadius: '12px', minHeight: '80px' }, children: [] },
          { id: '', name: 'Columna 3', type: 'container', styles: { flex: '1', padding: '16px', backgroundColor: '#18181b', borderRadius: '12px', minHeight: '80px' }, children: [] },
        ],
      },
      featureList: {
        id: '', name: 'Lista de características', type: 'container',
        styles: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', backgroundColor: '#18181b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Característica 1', type: 'container', styles: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }, children: [
            { id: '', name: 'Icono 1', type: 'heading', content: '✓', styles: { color: '#a5b4fc', fontSize: '20px', margin: '0' } },
            { id: '', name: 'Detalle 1', type: 'paragraph', content: 'Fácil de personalizar y adaptar a tu proyecto.', styles: { color: '#e4e4e7', fontSize: '14px', margin: '0', lineHeight: '1.6' } },
          ]},
          { id: '', name: 'Característica 2', type: 'container', styles: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }, children: [
            { id: '', name: 'Icono 2', type: 'heading', content: '✓', styles: { color: '#a5b4fc', fontSize: '20px', margin: '0' } },
            { id: '', name: 'Detalle 2', type: 'paragraph', content: 'Diseño adaptable para distintos tamaños de pantalla.', styles: { color: '#e4e4e7', fontSize: '14px', margin: '0', lineHeight: '1.6' } },
          ]},
          { id: '', name: 'Característica 3', type: 'container', styles: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }, children: [
            { id: '', name: 'Icono 3', type: 'heading', content: '✓', styles: { color: '#a5b4fc', fontSize: '20px', margin: '0' } },
            { id: '', name: 'Detalle 3', type: 'paragraph', content: 'Contenido y estilos editables desde el inspector.', styles: { color: '#e4e4e7', fontSize: '14px', margin: '0', lineHeight: '1.6' } },
          ]},
        ],
      },
      galleryGrid: {
        id: '', name: 'Galería de imágenes', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', padding: '12px', backgroundColor: '#18181b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Foto galería 1', type: 'image', src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=700&auto=format&fit=crop', styles: { flex: '1 1 180px', width: '100%', height: '180px', borderRadius: '10px', objectFit: 'cover' } },
          { id: '', name: 'Foto galería 2', type: 'image', src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&auto=format&fit=crop', styles: { flex: '1 1 180px', width: '100%', height: '180px', borderRadius: '10px', objectFit: 'cover' } },
          { id: '', name: 'Foto galería 3', type: 'image', src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=700&auto=format&fit=crop', styles: { flex: '1 1 180px', width: '100%', height: '180px', borderRadius: '10px', objectFit: 'cover' } },
        ],
      },
      statsRow: {
        id: '', name: 'Estadísticas', type: 'container',
        styles: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', padding: '20px', backgroundColor: '#18181b', borderRadius: '14px' },
        children: [
          { id: '', name: 'Estadística 1', type: 'container', styles: { flex: '1 1 120px', padding: '14px', backgroundColor: '#27272a', borderRadius: '10px' }, children: [
            { id: '', name: 'Número 1', type: 'heading', content: '1.2k+', styles: { color: '#a5b4fc', fontSize: '28px', fontWeight: '900', margin: '0' } },
            { id: '', name: 'Etiqueta 1', type: 'paragraph', content: 'Clientes satisfechos', styles: { color: '#d4d4d8', fontSize: '12px', margin: '0' } },
          ]},
          { id: '', name: 'Estadística 2', type: 'container', styles: { flex: '1 1 120px', padding: '14px', backgroundColor: '#27272a', borderRadius: '10px' }, children: [
            { id: '', name: 'Número 2', type: 'heading', content: '98%', styles: { color: '#a5b4fc', fontSize: '28px', fontWeight: '900', margin: '0' } },
            { id: '', name: 'Etiqueta 2', type: 'paragraph', content: 'Valoraciones positivas', styles: { color: '#d4d4d8', fontSize: '12px', margin: '0' } },
          ]},
          { id: '', name: 'Estadística 3', type: 'container', styles: { flex: '1 1 120px', padding: '14px', backgroundColor: '#27272a', borderRadius: '10px' }, children: [
            { id: '', name: 'Número 3', type: 'heading', content: '24/7', styles: { color: '#a5b4fc', fontSize: '28px', fontWeight: '900', margin: '0' } },
            { id: '', name: 'Etiqueta 3', type: 'paragraph', content: 'Soporte disponible', styles: { color: '#d4d4d8', fontSize: '12px', margin: '0' } },
          ]},
        ],
      },
      notice: {
        id: '', name: 'Aviso destacado', type: 'container',
        styles: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '16px 18px', backgroundColor: '#1e1b4b', border: '1px solid #4338ca', borderRadius: '12px' },
        children: [
          { id: '', name: 'Título aviso', type: 'heading', content: '✦ Información importante', styles: { color: '#c7d2fe', fontSize: '15px', fontWeight: '800', margin: '0' } },
          { id: '', name: 'Texto aviso', type: 'paragraph', content: 'Usa este bloque para anunciar novedades, fechas o información que el visitante no debe pasar por alto.', styles: { color: '#e0e7ff', fontSize: '13px', lineHeight: '1.6', margin: '0' } },
        ],
      },
      videoPlaceholder: {
        id: '', name: 'Bloque de vídeo (portada)', type: 'container',
        styles: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '18px', backgroundColor: '#18181b', borderRadius: '14px', maxWidth: '720px' },
        children: [
          { id: '', name: 'Portada vídeo', type: 'image', src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1000&auto=format&fit=crop', styles: { width: '100%', height: '260px', borderRadius: '10px', objectFit: 'cover' } },
          { id: '', name: 'Título vídeo', type: 'heading', content: '▶  Presentación del proyecto', styles: { color: '#ffffff', fontSize: '18px', fontWeight: '800', margin: '0' } },
          { id: '', name: 'Descripción vídeo', type: 'paragraph', content: 'Reemplaza esta portada por la imagen de tu vídeo y añade el enlace correspondiente.', styles: { color: '#a1a1aa', fontSize: '13px', lineHeight: '1.5', margin: '0' } },
        ],
      },
      navbar: {
        id: '',
        name: 'Navegación',
        type: 'container',
        styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#18181b', borderRadius: '12px', width: '100%' },
        children: [
          { id: '', name: 'Logo', type: 'heading', content: '⚡ Marca', styles: { fontSize: '18px', fontWeight: 'bold', color: '#6366f1' } },
          { id: '', name: 'Enlaces', type: 'paragraph', content: 'Inicio   ·   Tienda   ·   Contacto', styles: { fontSize: '13px', color: '#a1a1aa' } },
        ],
      },
    };

    if (defaultElements[type]) {
      // Adapta las superficies y los textos neutros del bloque al fondo actual,
      // manteniendo los colores de acento de botones, insignias e imágenes.
      const document = getActiveDocument();
      const rootBackground = String(document?.styles?.backgroundColor || '#ffffff');
      const parseHex = (value: string) => {
        const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (!match) return null;
        const hex = match[1].length === 3 ? match[1].split('').map((c) => c + c).join('') : match[1];
        return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) };
      };
      const rgb = parseHex(rootBackground);
      const isLightBackground = rgb ? (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 155 : false;
      const blend = (base: string, target: string, amount: number) => {
        const a = parseHex(base);
        const b = parseHex(target);
        if (!a || !b) return base;
        const channel = (x: number, y: number) => Math.round(x * (1 - amount) + y * amount).toString(16).padStart(2, '0');
        return `#${channel(a.r, b.r)}${channel(a.g, b.g)}${channel(a.b, b.b)}`;
      };
      const palette = isLightBackground
        ? { surface: blend(rootBackground, '#ffffff', 0.82), surfaceAlt: blend(rootBackground, '#000000', 0.045), border: blend(rootBackground, '#000000', 0.13), text: '#172033', muted: '#526174', softText: '#334155' }
        : { surface: blend(rootBackground, '#ffffff', 0.10), surfaceAlt: blend(rootBackground, '#ffffff', 0.17), border: blend(rootBackground, '#ffffff', 0.24), text: '#f8fafc', muted: '#a1a1aa', softText: '#e4e4e7' };
      const adaptTheme = (node: any): any => {
        const next = { ...node, styles: { ...(node.styles || {}) } };
        const style = next.styles;
        const background = String(style.backgroundColor || '').toLowerCase();
        const isAccentSurface = /#4f46e5|#6366f1|#22c55e|#16a34a|#2563eb|#0ea5e9|#f59e0b|#ea580c|#ec4899|#8b5cf6/.test(background);
        if (['#09090b', '#0a0a0a', '#111827', '#18181b'].includes(background)) style.backgroundColor = palette.surface;
        else if (['#27272a', '#292524', '#1f2937'].includes(background)) style.backgroundColor = palette.surfaceAlt;
        if (style.borderColor && ['#27272a', '#3f3f46', '#4338ca', 'rgba(99, 102, 241, 0.3)'].includes(String(style.borderColor).toLowerCase())) {
          style.borderColor = palette.border;
        }
        if (style.color) {
          const color = String(style.color).toLowerCase();
          if (['#ffffff', '#fff', '#f4f4f5'].includes(color) && !isAccentSurface) style.color = palette.text;
          else if (['#a1a1aa', '#9ca3af', '#71717a'].includes(color)) style.color = palette.muted;
          else if (['#e4e4e7', '#d4d4d8', '#e0e7ff'].includes(color) && isLightBackground) style.color = palette.softText;
        }
        if (node.children) next.children = node.children.map(adaptTheme);
        return next;
      };
      addSectionTemplate(adaptTheme(defaultElements[type]));
    }
  };

  const allBlocks: BlockItem[] = [
    // Básicos
    { id: 'heading', label: 'Título', category: 'basic', icon: Type },
    { id: 'paragraph', label: 'Párrafo', category: 'basic', icon: AlignLeft },
    { id: 'button', label: 'Botón', category: 'basic', icon: MousePointerClick },
    { id: 'image', label: 'Imagen', category: 'basic', icon: Image },
    { id: 'badge', label: 'Insignia', category: 'basic', icon: Tag },
    { id: 'quote', label: 'Cita', category: 'basic', icon: Quote },
    { id: 'featureList', label: 'Lista de características', category: 'basic', icon: AlignLeft },
    { id: 'galleryGrid', label: 'Galería de imágenes', category: 'basic', icon: Image },
    { id: 'statsRow', label: 'Estadísticas', category: 'basic', icon: SlidersHorizontal },
    { id: 'notice', label: 'Aviso destacado', category: 'basic', icon: Tag },
    { id: 'videoPlaceholder', label: 'Bloque de vídeo', category: 'basic', icon: Image },
    { id: 'gamePageHeader', label: 'Cabecera de juego', category: 'content', icon: Gamepad2 },
    { id: 'gameDescription', label: 'Descripción de juego', category: 'content', icon: AlignLeft },
    { id: 'gameDownloadItem', label: 'Descarga individual', category: 'media', icon: Download },
    { id: 'contentSection', label: 'Sección de contenido', category: 'content', icon: ListChecks },
    { id: 'projectInfoTable', label: 'Ficha técnica', category: 'content', icon: Table },
    { id: 'tagCloud', label: 'Etiquetas / categorías', category: 'content', icon: Tags },
    { id: 'creatorCard', label: 'Tarjeta de creador', category: 'content', icon: BadgeCheck },
    { id: 'platformBadges', label: 'Plataformas', category: 'content', icon: Smartphone },
    { id: 'gameHero', label: 'Portada de proyecto', category: 'content', icon: Gamepad2 },
    { id: 'screenshotGallery', label: 'Galería de capturas', category: 'media', icon: Images },
    { id: 'videoEmbedCard', label: 'Vídeo / tráiler', category: 'media', icon: MonitorPlay },
    { id: 'downloadPanel', label: 'Panel de descargas', category: 'media', icon: Download },

    // Layout
    { id: 'container', label: 'Contenedor', category: 'layout', icon: Box },
    { id: 'card', label: 'Tarjeta', category: 'layout', icon: CreditCard },
    { id: 'grid2', label: '2 Columnas', category: 'layout', icon: Columns2 },
    { id: 'grid3', label: '3 Columnas', category: 'layout', icon: Columns3 },
    { id: 'navbar', label: 'Navegación', category: 'layout', icon: Navigation },
    { id: 'divider', label: 'Divisor', category: 'layout', icon: Minus },

    // Tienda / Productos
    { id: 'productCard', label: 'Ficha Producto', category: 'store', icon: ShoppingBag },
    { id: 'productShowcase', label: 'Showcase', category: 'store', icon: Store },
    { id: 'productGrid', label: 'Grilla Tienda', category: 'store', icon: ShoppingCart },
    { id: 'promoBanner', label: 'Banner Oferta', category: 'store', icon: Percent },
    { id: 'productReview', label: 'Reseñas', category: 'store', icon: Star },
    { id: 'priceTag', label: 'Etiqueta Precio', category: 'store', icon: BadgePercent },
    { id: 'categoryTiles', label: 'Categorías', category: 'store', icon: Tags },
    { id: 'filterBar', label: 'Búsqueda y filtros', category: 'store', icon: SlidersHorizontal },
    { id: 'cartSummary', label: 'Resumen carrito', category: 'store', icon: ShoppingCart },
    { id: 'shippingBenefits', label: 'Envíos y pagos', category: 'store', icon: Truck },
    { id: 'testimonial', label: 'Testimonio', category: 'store', icon: MessageCircle },
    { id: 'faqBlock', label: 'Preguntas frecuentes', category: 'store', icon: CircleHelp },
    { id: 'storeFooter', label: 'Footer tienda', category: 'store', icon: Heart },
    { id: 'promoHero', label: 'Portada + CTA', category: 'layout', icon: Sparkles },

    // Formularios
    { id: 'input', label: 'Input', category: 'form', icon: TextCursorInput },
    { id: 'contactForm', label: 'Formulario contacto', category: 'form', icon: Mail },
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'basic', label: 'Básicos' },
    { id: 'layout', label: 'Layout' },
    { id: 'store', label: 'Tienda' },
    { id: 'form', label: 'Formularios' },
    { id: 'content', label: 'Contenido' },
    { id: 'media', label: 'Multimedia' },
  ];

  const filteredBlocks =
    selectedCategory === 'all'
      ? allBlocks
      : allBlocks.filter((b) => b.category === selectedCategory);

  return (
    <div className="p-3 space-y-4 text-xs select-none">
      {/* Banner Acceso a Catálogo Completo */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-3 space-y-2">
        <div className="flex items-center space-x-2 text-indigo-300 font-bold">
          <Sparkles size={15} />
          <span>Catálogo de Plantillas</span>
        </div>
        <p className="text-[11px] text-zinc-400">
          Explora plantillas completas y páginas prediseñadas.
        </p>
        <button
          onClick={() => setIsTemplatesModalOpen(true)}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
        >
          <LayoutTemplate size={14} />
          <span>Ver Catálogo Completo</span>
        </button>
      </div>

      {/* Selector de Categorías (Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grilla de Bloques */}
      <div className="space-y-4">
        {selectedCategory === 'all' ? (
          <>
            {/* Sección Tienda */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                🛒 Tienda & Productos
              </span>
              <div className="grid grid-cols-2 gap-2">
                {allBlocks
                  .filter((b) => b.category === 'store')
                  .map((block) => {
                    const Icon = block.icon;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block.id)}
                        className="p-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 hover:border-indigo-400 rounded-xl text-left text-indigo-200 font-medium cursor-pointer transition-all flex items-center space-x-2 group"
                      >
                        <Icon size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="truncate">{block.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Sección Básicos */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                ✦ Básicos
              </span>
              <div className="grid grid-cols-2 gap-2">
                {allBlocks
                  .filter((b) => b.category === 'basic' || b.category === 'content' || b.category === 'media')
                  .map((block) => {
                    const Icon = block.icon;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block.id)}
                        className="p-2.5 bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-indigo-500/60 rounded-xl text-left text-zinc-300 font-medium cursor-pointer transition-all flex items-center space-x-2 group"
                      >
                        <Icon size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="truncate">{block.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Sección Layout */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                📐 Layout & Estructura
              </span>
              <div className="grid grid-cols-2 gap-2">
                {allBlocks
                  .filter((b) => b.category === 'layout')
                  .map((block) => {
                    const Icon = block.icon;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block.id)}
                        className="p-2.5 bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-indigo-500/60 rounded-xl text-left text-zinc-300 font-medium cursor-pointer transition-all flex items-center space-x-2 group"
                      >
                        <Icon size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="truncate">{block.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Sección Formularios */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                ✍️ Formularios
              </span>
              <div className="grid grid-cols-2 gap-2">
                {allBlocks
                  .filter((b) => b.category === 'form')
                  .map((block) => {
                    const Icon = block.icon;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block.id)}
                        className="p-2.5 bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-indigo-500/60 rounded-xl text-left text-zinc-300 font-medium cursor-pointer transition-all flex items-center space-x-2 group"
                      >
                        <Icon size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="truncate">{block.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredBlocks.map((block) => {
              const Icon = block.icon;
              const isStore = block.category === 'store';
              return (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block.id)}
                  className={`p-2.5 rounded-xl text-left font-medium cursor-pointer transition-all flex items-center space-x-2 group ${
                    isStore
                      ? 'bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-200'
                      : 'bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800/80 text-zinc-300 hover:border-indigo-500/60'
                  }`}
                >
                  <Icon size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{block.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};