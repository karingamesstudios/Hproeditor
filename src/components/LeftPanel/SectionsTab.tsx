import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { SECTION_TEMPLATES } from '../../utils/sectionTemplates';
import { Sparkles, Plus } from 'lucide-react';

export const SectionsTab: React.FC = () => {
  const { addSectionTemplate } = useEditorStore();

  return (
    <div className="p-4 space-y-4 select-none">
      <div className="flex items-center space-x-2 text-indigo-400 mb-2">
        <Sparkles size={16} />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
          Secciones Pre-diseñadas
        </span>
      </div>

      <div className="space-y-3">
        {SECTION_TEMPLATES.map((item) => (
          <div
            key={item.id}
            onClick={() => addSectionTemplate(item.element)}
            className="p-3.5 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/80 rounded-xl cursor-pointer transition-all hover:scale-[1.01] group relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              {item.badge && (
                <span className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-md">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed pr-6">
              {item.description}
            </p>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
              <Plus size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};