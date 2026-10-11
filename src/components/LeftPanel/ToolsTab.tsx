import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { SECTION_TEMPLATES, type SectionTemplateItem } from '../../utils/sectionTemplates';
import { Type, Square, Image, Box, Sparkles, Plus } from 'lucide-react';

export const ToolsTab: React.FC = () => {
  const { addSectionTemplate } = useEditorStore();

  const basicElements = [
    {
      id: 'heading',
      name: 'Título',
      icon: Type,
      element: {
        id: `heading-${Date.now()}`,
        type: 'heading',
        name: 'Título',
        content: 'Nuevo Encabezado',
        styles: { fontSize: '28px', fontWeight: 'bold', color: '#ffffff' },
      },
    },
    {
      id: 'paragraph',
      name: 'Párrafo',
      icon: Type,
      element: {
        id: `para-${Date.now()}`,
        type: 'paragraph',
        name: 'Párrafo',
        content: 'Escribe aquí tu texto descriptivo.',
        styles: { fontSize: '14px', color: '#a1a1aa' },
      },
    },
    {
      id: 'button',
      name: 'Botón',
      icon: Square,
      element: {
        id: `btn-${Date.now()}`,
        type: 'button',
        name: 'Botón',
        content: 'Haz clic aquí',
        styles: {
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: '8px',
          fontWeight: 'bold',
        },
      },
    },
    {
      id: 'image',
      name: 'Imagen',
      icon: Image,
      element: {
        id: `img-${Date.now()}`,
        type: 'image',
        name: 'Imagen',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
        styles: { width: '100%', borderRadius: '12px', height: 'auto' },
      },
    },
    {
      id: 'container',
      name: 'Contenedor',
      icon: Box,
      element: {
        id: `box-${Date.now()}`,
        type: 'container',
        name: 'Contenedor Vacio',
        styles: {
          backgroundColor: '#18181b',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: '#27272a',
          minHeight: '80px',
        },
        children: [],
      },
    },
  ];

  return (
    <div className="p-4 space-y-6 select-none">
      {/* Elementos Básicos */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
          Elementos Básicos
        </span>

        <div className="grid grid-cols-2 gap-2">
          {basicElements.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => addSectionTemplate(item.element as any)}
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 rounded-xl flex flex-col items-center justify-center space-y-2 text-zinc-300 hover:text-indigo-300 transition-all cursor-pointer group"
              >
                <Icon size={20} className="text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs font-semibold">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secciones Pre-diseñadas */}
      <div className="space-y-3 pt-2 border-t border-zinc-800">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Sparkles size={15} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Secciones Pre-diseñadas
          </span>
        </div>

        <div className="space-y-2.5">
          {SECTION_TEMPLATES.map((tpl: SectionTemplateItem) => (
            <div
              key={tpl.id}
              onClick={() => addSectionTemplate(tpl.element)}
              className="p-3 bg-zinc-900 border border-zinc-800/90 hover:border-indigo-500 rounded-xl cursor-pointer transition-all hover:scale-[1.01] group relative"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-indigo-300 transition-colors">
                  {tpl.title}
                </h4>
                {tpl.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded">
                    {tpl.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 leading-relaxed pr-5">
                {tpl.description}
              </p>
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                <Plus size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};