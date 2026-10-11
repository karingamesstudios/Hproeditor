import React, { useState, useEffect, useRef } from 'react';
import { PRESET_TEMPLATES, type TemplateItem } from '../data/templates';
import { useEditorStore } from '../store/useEditorStore';
import { getEmergencySave, type EmergencyBackup } from '../utils/storage';
import { Plus, Sparkles, ArrowRight, Save, RotateCcw, Eye, X, Search, LayoutTemplate, Image as ImageIcon } from 'lucide-react';
import type { EditorElement } from '../types/editor';



/** Mini render del documento de la plantilla para mostrar una vista previa visual en el dashboard. */
const previewStyle = (styles: Record<string, any> | undefined): React.CSSProperties => {
  const ignored = new Set(['position', 'left', 'right', 'top', 'bottom', 'transform', 'zIndex', 'cursor', 'userSelect', 'width', 'height', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth']);
  const result: Record<string, any> = { boxSizing: 'border-box', flexShrink: 0 };
  if (!styles) return result as React.CSSProperties;
  Object.entries(styles).forEach(([key, value]) => {
    if (!ignored.has(key) && value !== undefined && value !== null && typeof value !== 'object') result[key] = value;
  });
  return result as React.CSSProperties;
};

const PreviewNode: React.FC<{ element: EditorElement; depth?: number }> = ({ element, depth = 0 }) => {
  if (depth > 5) return null;
  const type = (element.type || '').toLowerCase();
  const styles = previewStyle(element.styles as Record<string, any> | undefined);
  const children = element.children || [];
  if (type.includes('image') || type === 'img') {
    return element.src
      ? <img src={element.src} alt="" style={{ ...styles, display: 'block', width: '100%', height: 'auto', maxHeight: 190, objectFit: 'cover' }} />
      : <div style={{ ...styles, minHeight: 70, background: 'linear-gradient(135deg,#27272a,#3f3f46)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa' }}><ImageIcon size={22} /></div>;
  }
  const content = element.content || '';
  if (type === 'button' || type === 'link' || type === 'a') {
    return <div style={{ ...styles, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', maxWidth: '100%', minHeight: 20, whiteSpace: 'normal' }}>{content || 'Botón'}</div>;
  }
  if (type.includes('heading') || /^h[1-6]$/.test(type)) {
    return <div style={{ ...styles, fontSize: styles.fontSize || (depth < 2 ? 32 : 18), fontWeight: styles.fontWeight || 800, lineHeight: styles.lineHeight || 1.15, overflowWrap: 'anywhere' }}>{content || 'Título de ejemplo'}</div>;
  }
  if (type.includes('paragraph') || type === 'text' || type === 'p') {
    return <div style={{ ...styles, fontSize: styles.fontSize || 13, lineHeight: styles.lineHeight || 1.5, overflowWrap: 'anywhere' }}>{content || 'Descripción de ejemplo para esta sección.'}</div>;
  }
  return <div style={{ ...styles, width: '100%', minWidth: 0, overflow: 'hidden' }}>
    {content ? <div style={{ overflowWrap: 'anywhere' }}>{content}</div> : null}
    {children.map((child, index) => <PreviewNode key={child.id || `${element.id}-${index}`} element={child} depth={depth + 1} />)}
  </div>;
};

const TemplatePreview: React.FC<{ template: TemplateItem; large?: boolean }> = ({ template, large = false }) => {
  const rootStyles = template.document.styles || {};
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const measure = () => setContainerWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Escala proporcional según el ancho real disponible: nunca estira ni deja una franja vacía lateral.
  const scale = containerWidth > 0
    ? Math.min(containerWidth / 1000, 1)
    : (large ? 0.96 : 0.36);

  return <div ref={containerRef} className={large ? 'hpro-template-preview-large' : 'hpro-template-preview'}>
    <div className="hpro-template-preview-inner" style={{ transform: `scale(${scale})`, backgroundColor: rootStyles.backgroundColor || '#ffffff', color: rootStyles.color || '#18181b' }}>
      <PreviewNode element={template.document} />
    </div>
    {!large && <div className="hpro-template-preview-label"><Eye size={13} /> Vista previa del diseño</div>}
  </div>;
};

interface DashboardProps {
  onStartEditing: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartEditing }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState<'inicio' | 'plantillas'>('inicio');
  const [emergencyBackup, setEmergencyBackup] = useState<EmergencyBackup | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const { setDocumentForActivePage } = useEditorStore();

  useEffect(() => {
    const checkEmergencySave = async () => {
      const backup = await getEmergencySave();
      if (backup && backup.pages) setEmergencyBackup(backup);
    };
    checkEmergencySave();
  }, []);

  const categories = ['Todas', 'Exclusivo', 'E-commerce', 'SaaS', 'Ventas', 'Agencia', 'Streaming', 'Servicios', 'Portafolio', 'Básico'];
  const filteredTemplates = PRESET_TEMPLATES.filter((template) => {
    const matchesCategory = selectedCategory === 'Todas' || template.category === selectedCategory;
    const searchable = `${template.title} ${template.description} ${template.category} ${template.tag}`.toLocaleLowerCase();
    return matchesCategory && searchable.includes(searchQuery.trim().toLocaleLowerCase());
  });

  const scrollTo = (id: string, nav: 'inicio' | 'plantillas') => {
    setActiveNav(nav);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    setDocumentForActivePage(JSON.parse(JSON.stringify(template.document)));
    onStartEditing();
  };

  const handleCreateBlank = () => {
    const blankTemplate = PRESET_TEMPLATES.find((t) => t.id === 'blank-canvas');
    if (blankTemplate) {
      setDocumentForActivePage(JSON.parse(JSON.stringify(blankTemplate.document)));
    } else {
      setDocumentForActivePage({
        id: 'root-body',
        type: 'container',
        name: 'Cuerpo Principal',
        styles: {
          backgroundColor: '#09090b', color: '#f4f4f5',
          paddingTop: '40px', paddingBottom: '40px', paddingLeft: '32px', paddingRight: '32px',
          minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px',
        },
        children: [],
      });
    }
    onStartEditing();
  };

  const handleResumeEmergencySave = () => {
    if (emergencyBackup) {
      useEditorStore.setState({
        pages: emergencyBackup.pages,
        activePageId: emergencyBackup.pages[0]?.id || 'page-home',
      });
      onStartEditing();
    }
  };

  const quickStarts = [
    { title: 'Tienda online', description: 'Productos, precios y llamadas a la acción', category: 'E-commerce', icon: '🛍️' },
    { title: 'Portafolio', description: 'Muestra proyectos y trabajos destacados', category: 'Portafolio', icon: '✦' },
    { title: 'Sitio profesional', description: 'Servicios, contacto y presentación', category: 'Servicios', icon: '◫' },
    { title: 'Landing de producto', description: 'Una página para presentar tu idea', category: 'Ventas', icon: '↗' },
  ];

  return (
    <>
      <div className="hpro-home">
        <aside className="hpro-home-sidebar">
          <button className="hpro-home-brand" onClick={() => scrollTo('hpro-home-top', 'inicio')} aria-label="Ir al inicio">
            <span className="hpro-home-logo">H</span>
            <span><strong>Hproeditor</strong><small>Constructor web visual</small></span>
          </button>

          <div className="hpro-home-nav-label">ESPACIO DE TRABAJO</div>
          <nav className="hpro-home-nav" aria-label="Navegación principal">
            <button className={activeNav === 'inicio' ? 'active' : ''} onClick={() => scrollTo('hpro-home-top', 'inicio')}>
              <span className="hpro-nav-icon">⌂</span> Inicio
            </button>
            <button className={activeNav === 'plantillas' ? 'active' : ''} onClick={() => scrollTo('hpro-templates', 'plantillas')}>
              <span className="hpro-nav-icon">▦</span> Explorar plantillas
            </button>
            <button onClick={handleCreateBlank}>
              <span className="hpro-nav-icon">＋</span> Crear en blanco
            </button>
            {emergencyBackup && (
              <button onClick={handleResumeEmergencySave}>
                <span className="hpro-nav-icon">↶</span> Continuar proyecto
              </button>
            )}
          </nav>

          <div className="hpro-home-sidebar-divider" />
          <div className="hpro-home-nav-label">EMPIEZA RÁPIDO</div>
          <div className="hpro-home-shortcuts">
            {quickStarts.map((item) => (
              <button key={item.title} onClick={() => {
                setSelectedCategory(item.category);
                setSearchQuery('');
                scrollTo('hpro-templates', 'plantillas');
              }}>
                <span>{item.icon}</span>{item.title}
              </button>
            ))}
          </div>

          <div className="hpro-home-sidebar-bottom">
            <div className="hpro-home-status-dot" />
            <span>Tu espacio de diseño</span>
            <small>Hproeditor</small>
          </div>
        </aside>

        <main className="hpro-home-main">
          <header className="hpro-home-topbar" id="hpro-home-top">
            <div className="hpro-home-breadcrumb"><span>H</span><span>/</span><strong>{activeNav === 'plantillas' ? 'Plantillas' : 'Inicio'}</strong></div>
            <div className="hpro-home-top-actions">
              <label className="hpro-home-search">
                <Search size={17} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    if (event.target.value) {
                      setSelectedCategory('Todas');
                      setActiveNav('plantillas');
                    }
                  }}
                  onFocus={() => setActiveNav('plantillas')}
                  placeholder="Buscar plantillas, tiendas, portafolios..."
                  aria-label="Buscar plantillas"
                />
                {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda"><X size={14} /></button>}
              </label>
              <button className="hpro-home-create" onClick={handleCreateBlank}><Plus size={16} /> Nuevo proyecto</button>
            </div>
          </header>

          <div className="hpro-home-content">
            <section className="hpro-home-hero">
              <div className="hpro-home-hero-glow" />
              <div className="hpro-home-hero-copy">
                <span className="hpro-eyebrow"><Sparkles size={14} /> DISEÑO WEB, SIN COMPLICACIONES</span>
                <h1>¿Qué vamos a crear<br className="hpro-desktop-break" /> hoy?</h1>
                <p>Empieza con una plantilla profesional o construye tu sitio desde cero. Después podrás editar textos, imágenes, colores y distribución.</p>
                <div className="hpro-home-hero-actions">
                  <button className="hpro-home-primary" onClick={() => scrollTo('hpro-templates', 'plantillas')}><Sparkles size={16} /> Explorar plantillas <ArrowRight size={16} /></button>
                  <button className="hpro-home-secondary" onClick={handleCreateBlank}><Plus size={16} /> Empezar en blanco</button>
                </div>
              </div>
              <div className="hpro-home-hero-art" aria-hidden="true">
                <div className="hpro-art-window">
                  <div className="hpro-art-window-bar"><i /><i /><i /><span>vista previa</span></div>
                  <div className="hpro-art-window-body">
                    <div className="hpro-art-line short" />
                    <div className="hpro-art-title" />
                    <div className="hpro-art-line" />
                    <div className="hpro-art-line medium" />
                    <div className="hpro-art-cards"><i /><i /><i /></div>
                  </div>
                </div>
                <div className="hpro-art-float hpro-art-float-one">Aa <small>Tipografía</small></div>
                <div className="hpro-art-float hpro-art-float-two"><span /> <small>Colores</small></div>
              </div>
            </section>

            {emergencyBackup && (
              <section className="hpro-home-resume">
                <div className="hpro-resume-icon"><Save size={18} /></div>
                <div className="hpro-resume-copy">
                  <strong>Continúa donde lo dejaste</strong>
                  <p>Hay un guardado de emergencia disponible · {emergencyBackup.pages.length} página(s) guardadas.</p>
                </div>
                <button onClick={handleResumeEmergencySave}><RotateCcw size={15} /> Reanudar edición</button>
              </section>
            )}

            <section className="hpro-home-quick-section" aria-labelledby="hpro-quick-title">
              <div className="hpro-section-heading">
                <div><h2 id="hpro-quick-title">Empieza con una idea</h2><p>Accesos rápidos para los tipos de sitio más comunes.</p></div>
              </div>
              <div className="hpro-quick-grid">
                {quickStarts.map((item) => (
                  <button className="hpro-quick-card" key={item.title} onClick={() => {
                    setSelectedCategory(item.category);
                    setSearchQuery('');
                    scrollTo('hpro-templates', 'plantillas');
                  }}>
                    <span className="hpro-quick-card-icon">{item.icon}</span>
                    <span className="hpro-quick-card-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                    <ArrowRight size={16} className="hpro-quick-arrow" />
                  </button>
                ))}
              </div>
            </section>

            <section className="hpro-home-templates-section" id="hpro-templates" aria-labelledby="hpro-templates-title">
              <div className="hpro-section-heading hpro-templates-heading">
                <div><span className="hpro-eyebrow"><LayoutTemplate size={14} /> BIBLIOTECA DE DISEÑOS</span><h2 id="hpro-templates-title">Explorar plantillas</h2><p>Previsualiza el diseño antes de abrirlo en el editor.</p></div>
                <span className="hpro-template-count">{filteredTemplates.length} diseños</span>
              </div>

              <div className="hpro-category-row" aria-label="Filtrar por categoría">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? 'active' : ''}>{cat}</button>
                ))}
              </div>

              {filteredTemplates.length > 0 ? (
                <div className="hpro-template-grid">
                  {filteredTemplates.map((template) => (
                    <article key={template.id} className={`hpro-template-card ${template.category === 'Exclusivo' ? 'featured' : ''}`}>
                      <div className="hpro-template-card-preview" onClick={() => setPreviewTemplate(template)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setPreviewTemplate(template); }} aria-label={`Ver vista previa de ${template.title}`}>
                        <TemplatePreview template={template} />
                      </div>
                      <div className="hpro-template-card-content">
                        <div className="hpro-template-meta"><span className="hpro-template-tag">{template.tag}</span><span>{template.category}</span></div>
                        <h3>{template.title}</h3>
                        <p>{template.description}</p>
                        <div className="hpro-template-card-actions">
                          <button className="hpro-template-preview-button" onClick={() => setPreviewTemplate(template)}><Eye size={14} /> Vista previa</button>
                          <button className="hpro-template-use-button" onClick={() => handleSelectTemplate(template)}>Usar plantilla <ArrowRight size={15} /></button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="hpro-empty-search"><Search size={24} /><strong>No encontramos plantillas</strong><p>Prueba con otra palabra o cambia la categoría.</p><button onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}>Mostrar todas</button></div>
              )}
            </section>

            <footer className="hpro-home-footer"><span className="hpro-home-logo mini">H</span><span>Hproeditor</span><span>Diseña · Organiza · Publica</span></footer>
          </div>
        </main>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`Vista previa: ${previewTemplate.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewTemplate(null); }}>
          <div className="w-full max-w-5xl max-h-[92vh] bg-zinc-950 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between gap-4 p-4 border-b border-zinc-800 shrink-0">
              <div className="min-w-0"><h2 className="font-bold text-white truncate">{previewTemplate.title}</h2><p className="text-xs text-zinc-400">Vista previa aproximada de la plantilla antes de aplicarla</p></div>
              <button type="button" onClick={() => setPreviewTemplate(null)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300" aria-label="Cerrar vista previa"><X size={18} /></button>
            </div>
            <div className="overflow-auto p-3 sm:p-5 bg-zinc-900"><TemplatePreview template={previewTemplate} large /></div>
            <div className="flex justify-end gap-2 p-3 border-t border-zinc-800 shrink-0">
              <button type="button" onClick={() => setPreviewTemplate(null)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700">Cancelar</button>
              <button type="button" onClick={() => { handleSelectTemplate(previewTemplate); setPreviewTemplate(null); }} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500">Usar esta plantilla</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .hpro-home{min-height:100vh;background:#08090e;color:#f4f4f5;display:flex;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;isolation:isolate}
        .hpro-home *{box-sizing:border-box}
        .hpro-home-sidebar{width:236px;flex:0 0 236px;min-height:100vh;height:100vh;position:sticky;top:0;display:flex;flex-direction:column;padding:22px 14px 16px;background:rgba(12,13,20,.92);border-right:1px solid rgba(148,163,184,.13);backdrop-filter:blur(22px);z-index:5}
        .hpro-home-brand{display:flex;align-items:center;gap:11px;text-align:left;padding:0 8px 24px;border:0;background:transparent;color:inherit;cursor:pointer}
        .hpro-home-logo{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:13px;background:linear-gradient(135deg,#6755ff,#4830e8);color:white;font-weight:900;font-size:20px;box-shadow:0 7px 24px #4f46e544}
        .hpro-home-brand strong{display:block;font-size:15px;letter-spacing:-.02em}.hpro-home-brand small{display:block;color:#8e93a6;font-size:10px;margin-top:2px}
        .hpro-home-nav-label{font-size:9px;letter-spacing:.14em;font-weight:800;color:#71778b;padding:12px 11px 8px}
        .hpro-home-nav{display:grid;gap:5px}
        .hpro-home-nav button{display:flex;align-items:center;gap:11px;width:100%;padding:11px 12px;border:1px solid transparent;border-radius:11px;background:transparent;color:#aeb3c4;font-size:12px;font-weight:650;text-align:left;cursor:pointer;transition:background .18s,border-color .18s,color .18s}
        .hpro-home-nav button:hover{background:rgba(255,255,255,.055);color:#fff}.hpro-home-nav button.active{background:linear-gradient(100deg,rgba(91,73,255,.2),rgba(91,73,255,.07));border-color:rgba(117,102,255,.24);color:#fff}
        .hpro-nav-icon{width:20px;text-align:center;font-size:20px;line-height:18px;color:#a69cff}
        .hpro-home-sidebar-divider{height:1px;background:rgba(148,163,184,.13);margin:18px 8px 8px}
        .hpro-home-shortcuts{display:grid;gap:4px}
        .hpro-home-shortcuts button{display:flex;align-items:center;gap:9px;padding:9px 11px;border:0;border-radius:9px;background:transparent;color:#aeb3c4;font-size:11px;text-align:left;cursor:pointer}.hpro-home-shortcuts button span{font-size:16px;color:#b3aaff;width:18px;text-align:center}.hpro-home-shortcuts button:hover{background:rgba(255,255,255,.055);color:white}
        .hpro-home-sidebar-bottom{margin-top:auto;padding:15px 8px 0;border-top:1px solid rgba(148,163,184,.13);display:grid;grid-template-columns:8px 1fr;gap:3px 8px;align-items:center;color:#a0a6b8;font-size:10px}.hpro-home-status-dot{width:7px;height:7px;border-radius:50%;background:#43d9a3;box-shadow:0 0 12px #43d9a366}.hpro-home-sidebar-bottom small{grid-column:2;color:#60677c;font-size:9px}
        .hpro-home-main{min-width:0;flex:1;min-height:100vh;background:radial-gradient(ellipse at 76% 9%,rgba(60,49,157,.13),transparent 36%),#08090e}
        .hpro-home-topbar{position:sticky;top:0;z-index:4;min-height:70px;padding:12px clamp(18px,3vw,42px);display:flex;align-items:center;justify-content:space-between;gap:18px;background:rgba(8,9,14,.84);border-bottom:1px solid rgba(148,163,184,.12);backdrop-filter:blur(20px)}
        .hpro-home-breadcrumb{display:flex;align-items:center;gap:10px;color:#697087;font-size:12px;white-space:nowrap}.hpro-home-breadcrumb>span:first-child{display:inline-flex;align-items:center;justify-content:center;background:#5141e9;color:white;border-radius:6px;width:22px;height:22px;font-weight:900}.hpro-home-breadcrumb strong{color:#dfe2ec}
        .hpro-home-top-actions{display:flex;align-items:center;justify-content:flex-end;gap:10px;flex:1;min-width:0}
        .hpro-home-search{width:min(100%,480px);height:40px;display:flex;align-items:center;gap:10px;padding:0 13px;border:1px solid rgba(148,163,184,.2);border-radius:12px;background:rgba(255,255,255,.045);color:#81879a;transition:border-color .2s,background .2s}.hpro-home-search:focus-within{border-color:#7061ff;background:rgba(255,255,255,.07)}.hpro-home-search input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:#f4f4f5;font-size:12px}.hpro-home-search input::placeholder{color:#747a8d}.hpro-home-search button{border:0;background:transparent;color:#aaa;cursor:pointer}
        .hpro-home-create,.hpro-home-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;border:1px solid #6958ff;border-radius:11px;padding:11px 14px;background:linear-gradient(135deg,#6856ff,#4e38ed);color:#fff;font-size:11px;font-weight:750;cursor:pointer;box-shadow:0 7px 24px #4f46e522;transition:transform .18s,filter .18s}.hpro-home-create:hover,.hpro-home-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}
        .hpro-home-content{width:min(1480px,100%);margin:0 auto;padding:26px clamp(18px,3vw,42px) 20px}
        .hpro-home-hero{position:relative;min-height:270px;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:22px;padding:clamp(24px,4vw,48px);border:1px solid rgba(137,126,255,.24);border-radius:22px;background:linear-gradient(115deg,rgba(24,24,43,.98),rgba(17,18,31,.95) 56%,rgba(31,24,69,.85));box-shadow:0 24px 70px #0003}
        .hpro-home-hero-glow{position:absolute;width:350px;height:350px;right:12%;top:-210px;border-radius:50%;background:#5b4bff;filter:blur(100px);opacity:.28;pointer-events:none}
        .hpro-home-hero-copy{position:relative;z-index:1;max-width:620px}.hpro-eyebrow{display:inline-flex;align-items:center;gap:7px;color:#a69dff;font-size:9px;font-weight:850;letter-spacing:.12em}
        .hpro-home-hero h1{font-size:clamp(30px,3.4vw,48px);line-height:1.08;letter-spacing:-.055em;margin:14px 0 12px;font-weight:850;color:#fff}.hpro-home-hero p{max-width:560px;color:#aeb3c5;font-size:13px;line-height:1.8;margin:0}
        .hpro-home-hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.hpro-home-secondary{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;border:1px solid rgba(148,163,184,.23);border-radius:11px;background:rgba(255,255,255,.045);color:#e4e6ee;font-size:11px;font-weight:700;cursor:pointer}.hpro-home-secondary:hover{background:rgba(255,255,255,.09)}
        .hpro-home-hero-art{position:relative;flex:0 1 350px;min-width:220px;height:205px;display:flex;align-items:center;justify-content:center;perspective:800px}
        .hpro-art-window{width:100%;max-width:330px;height:190px;border-radius:13px;overflow:hidden;background:rgba(10,12,23,.88);border:1px solid rgba(179,173,255,.38);box-shadow:0 20px 60px #0007;transform:rotateY(-12deg) rotateX(4deg)}
        .hpro-art-window-bar{height:28px;display:flex;align-items:center;gap:5px;padding:0 10px;background:rgba(255,255,255,.055);border-bottom:1px solid #ffffff13}.hpro-art-window-bar i{width:6px;height:6px;border-radius:50%;background:#7266ff}.hpro-art-window-bar i:nth-child(2){background:#8e94a8}.hpro-art-window-bar i:nth-child(3){background:#4dd4a5}.hpro-art-window-bar span{margin-left:auto;color:#7f8498;font-size:8px}
        .hpro-art-window-body{padding:16px}.hpro-art-line{height:6px;width:85%;margin-top:9px;border-radius:10px;background:#44465e}.hpro-art-line.short{width:30%;margin-top:0;background:#7669ff}.hpro-art-line.medium{width:62%}.hpro-art-title{width:70%;height:18px;border-radius:5px;background:linear-gradient(90deg,#f0efff,#8b83ff);margin-top:13px}.hpro-art-cards{display:flex;gap:8px;margin-top:18px}.hpro-art-cards i{height:48px;flex:1;border:1px solid #ffffff20;border-radius:6px;background:linear-gradient(135deg,#292c4a,#5145a8)}.hpro-art-cards i:nth-child(2){background:linear-gradient(135deg,#1e4a55,#3f9b91)}.hpro-art-float{position:absolute;display:flex;align-items:center;gap:7px;padding:10px 12px;border:1px solid #a49aff45;border-radius:11px;background:rgba(22,23,40,.9);box-shadow:0 10px 28px #0005;backdrop-filter:blur(14px);font-size:15px;font-weight:850;color:#e8e5ff}.hpro-art-float small{font-size:9px;color:#a9aec0;font-weight:600}.hpro-art-float-one{top:2px;right:0}.hpro-art-float-two{bottom:0;left:-3px}.hpro-art-float-two span{width:12px;height:12px;border-radius:4px;background:linear-gradient(135deg,#7868ff,#42d7b0)}
        .hpro-home-resume{display:flex;align-items:center;gap:13px;margin-top:20px;padding:16px 18px;border:1px solid rgba(111,97,255,.32);border-radius:15px;background:linear-gradient(100deg,rgba(43,36,93,.5),rgba(20,20,31,.75));}.hpro-resume-icon{width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:11px;background:#6654ff25;color:#a69cff}.hpro-resume-copy{flex:1;min-width:0}.hpro-resume-copy strong{font-size:12px}.hpro-resume-copy p{font-size:10px;color:#8d93a7;margin:4px 0 0}.hpro-home-resume button{display:flex;align-items:center;gap:7px;border:0;border-radius:9px;padding:10px 12px;background:#5947ef;color:white;font-size:10px;font-weight:750;cursor:pointer}
        .hpro-home-quick-section,.hpro-home-templates-section{margin-top:32px;scroll-margin-top:88px}.hpro-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:15px}.hpro-section-heading h2{margin:0;color:#f5f5fa;font-size:19px;font-weight:800;letter-spacing:-.035em}.hpro-section-heading p{margin:5px 0 0;color:#82889b;font-size:11px}
        .hpro-quick-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}.hpro-quick-card{min-width:0;display:flex;align-items:center;gap:11px;text-align:left;padding:15px 13px;border:1px solid rgba(148,163,184,.14);border-radius:14px;background:linear-gradient(145deg,rgba(26,27,39,.86),rgba(16,17,26,.86));color:#fff;cursor:pointer;transition:transform .18s,border-color .18s,background .18s}.hpro-quick-card:hover{transform:translateY(-2px);border-color:#7163ff77;background:linear-gradient(145deg,#20213a,#171725)}.hpro-quick-card-icon{display:flex;align-items:center;justify-content:center;flex:0 0 37px;width:37px;height:37px;border-radius:11px;background:#6b5cff1d;color:#b5acff;font-size:18px}.hpro-quick-card-copy{min-width:0;flex:1}.hpro-quick-card-copy strong{display:block;font-size:11px}.hpro-quick-card-copy small{display:block;margin-top:4px;color:#888ea2;font-size:9px;line-height:1.45}.hpro-quick-arrow{color:#777d92;flex-shrink:0}
        .hpro-templates-heading{align-items:flex-end}.hpro-templates-heading .hpro-eyebrow{margin-bottom:7px}.hpro-template-count{white-space:nowrap;border:1px solid rgba(148,163,184,.17);border-radius:99px;padding:6px 10px;color:#a0a6ba;font-size:10px;background:rgba(255,255,255,.03)}
        .hpro-category-row{display:flex;gap:7px;overflow-x:auto;padding:2px 0 13px;scrollbar-width:thin;scrollbar-color:#39394f transparent}.hpro-category-row button{white-space:nowrap;padding:8px 12px;border:1px solid rgba(148,163,184,.13);border-radius:999px;background:rgba(255,255,255,.035);color:#9298aa;font-size:10px;font-weight:700;cursor:pointer;transition:all .18s}.hpro-category-row button:hover{color:white;border-color:#7163ff66}.hpro-category-row button.active{background:#5947ef;border-color:#7768ff;color:white;box-shadow:0 5px 16px #4f46e533}
        .hpro-template-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.hpro-template-card{min-width:0;overflow:hidden;border:1px solid rgba(148,163,184,.15);border-radius:17px;background:linear-gradient(145deg,rgba(25,26,34,.96),rgba(17,18,24,.96));box-shadow:0 10px 32px #0002;transition:transform .18s,border-color .18s,box-shadow .18s}.hpro-template-card:hover{transform:translateY(-3px);border-color:#7768ff88;box-shadow:0 18px 40px #0004}.hpro-template-card.featured{border-color:#6254ff88;background:linear-gradient(145deg,rgba(31,27,67,.95),rgba(16,17,26,.98))}.hpro-template-card-preview{height:170px;overflow:hidden;position:relative;background:#0b0c12;border-bottom:1px solid rgba(148,163,184,.13);cursor:pointer}.hpro-template-card-preview .hpro-template-preview{height:170px;margin:0;border:0}.hpro-template-card-preview .hpro-template-preview-label{display:none}.hpro-template-card-content{padding:15px 16px 13px}.hpro-template-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}.hpro-template-meta>span:last-child{font-size:9px;color:#7f8598}.hpro-template-tag{display:inline-flex;padding:5px 8px;border:1px solid #6254ff66;border-radius:99px;background:#5b4bff19;color:#b4abff;font-size:8px;font-weight:850;letter-spacing:.04em;text-transform:uppercase}.hpro-template-card h3{margin:0 0 7px;color:#f1f1f7;font-size:13px;line-height:1.45;font-weight:800}.hpro-template-card-content>p{margin:0;min-height:46px;color:#9ba1b4;font-size:10px;line-height:1.7}.hpro-template-card-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(148,163,184,.12)}.hpro-template-card-actions button{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;font-size:10px;font-weight:750;cursor:pointer}.hpro-template-preview-button{color:#b6bbcb;padding:7px 0}.hpro-template-preview-button:hover{color:white}.hpro-template-use-button{color:#a69cff;padding:7px 0}.hpro-template-use-button:hover{color:white}
        .hpro-empty-search{display:flex;flex-direction:column;align-items:center;gap:8px;padding:45px 15px;border:1px dashed #39394f;border-radius:16px;color:#888ea2;text-align:center}.hpro-empty-search strong{color:#e7e8ef;font-size:13px}.hpro-empty-search p{font-size:11px;margin:0}.hpro-empty-search button{margin-top:7px;padding:8px 12px;border:1px solid #5d50e9;border-radius:9px;background:#5141e9;color:white;font-size:10px;cursor:pointer}
        .hpro-home-footer{display:flex;align-items:center;gap:8px;margin-top:42px;padding:17px 0 5px;border-top:1px solid rgba(148,163,184,.12);color:#666d80;font-size:10px}.hpro-home-logo.mini{width:22px;height:22px;border-radius:7px;font-size:12px}.hpro-home-footer span:last-child{margin-left:auto}
        .hpro-template-preview { height: 142px; margin: -20px -20px 16px; position: relative; overflow: hidden; background: #09090b; border-bottom: 1px solid rgba(113,113,122,.25); }
        .hpro-template-preview-inner { width: 1000px; min-height: 420px; transform-origin: top left; pointer-events: none; overflow: hidden; }
        .hpro-template-preview-inner > div { min-height: 420px; }
        .hpro-template-preview-label { position: absolute; right: 8px; bottom: 8px; display: flex; align-items: center; gap: 5px; border: 1px solid rgba(161,161,170,.3); background: rgba(9,9,11,.82); color: #e4e4e7; padding: 4px 7px; border-radius: 7px; font-size: 10px; opacity: .92; }
        .hpro-template-preview-large { min-height: 55vh; max-height: 70vh; width: 100%; overflow: auto; border-radius: 14px; border: 1px solid rgba(148,163,184,.22); background: #09090b; display: block; box-shadow: 0 14px 38px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06); scrollbar-gutter: stable; }
        .hpro-template-preview-large .hpro-template-preview-inner { width: 1000px; min-height: 800px; transform-origin: top left; pointer-events: none; overflow: hidden; border-radius: 12px; }
        .hpro-template-preview-large .hpro-template-preview-inner > div { min-height: 800px; }
        @media (max-width: 1180px) { .hpro-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hpro-template-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hpro-home-hero-art{flex-basis:290px} }
        @media (max-width: 800px) { .hpro-home-sidebar{width:74px;flex-basis:74px;padding:16px 9px}.hpro-home-brand{padding:0 8px 22px}.hpro-home-brand>span:last-child,.hpro-home-nav-label,.hpro-home-shortcuts,.hpro-home-sidebar-divider,.hpro-home-sidebar-bottom span,.hpro-home-sidebar-bottom small{display:none}.hpro-home-nav button{justify-content:center;padding:12px 5px;font-size:0}.hpro-nav-icon{font-size:21px}.hpro-home-sidebar-bottom{display:flex;justify-content:center;padding-top:14px}.hpro-home-topbar{align-items:flex-start;flex-direction:column;padding:12px 18px;gap:10px}.hpro-home-top-actions{width:100%;justify-content:stretch}.hpro-home-search{flex:1}.hpro-home-create{padding:10px}.hpro-home-create{font-size:0;gap:0}.hpro-home-create svg{width:18px;height:18px}.hpro-home-hero-art{min-width:180px;flex-basis:230px}.hpro-home-hero{padding:24px}.hpro-home-hero h1{font-size:32px}.hpro-template-grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
        @media (max-width: 560px) { .hpro-home-sidebar{width:58px;flex-basis:58px;padding:12px 6px}.hpro-home-logo{width:34px;height:34px}.hpro-home-hero{min-height:0}.hpro-home-hero-art{display:none}.hpro-home-hero h1{font-size:31px}.hpro-desktop-break{display:none}.hpro-home-content{padding:16px 12px}.hpro-home-topbar{padding:11px 12px}.hpro-home-top-actions{gap:6px}.hpro-home-search{height:38px;padding:0 9px}.hpro-home-search input{font-size:10px}.hpro-home-create{width:39px;height:38px;padding:0}.hpro-quick-grid{grid-template-columns:1fr}.hpro-template-grid{grid-template-columns:1fr}.hpro-template-card-preview,.hpro-template-card-preview .hpro-template-preview{height:180px}.hpro-template-card-content{padding:14px}.hpro-home-resume{align-items:flex-start;flex-wrap:wrap}.hpro-home-resume button{margin-left:51px}.hpro-section-heading h2{font-size:17px}.hpro-home-footer span:last-child{display:none} }
        @media (prefers-reduced-motion: reduce) { .hpro-home *{scroll-behavior:auto!important;transition:none!important;animation:none!important} }
      `}</style>
    </>
  );
};
