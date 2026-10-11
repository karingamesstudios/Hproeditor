import React from 'react';
import type { CustomFont } from '../utils/fontLoader';

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile' | 'custom';

export interface EditorElement {
  id: string;
  name: string;
  type: string;
  content?: string;
  src?: string;
  targetPageId?: string; // ID de la página/hoja a la que está enlazado este elemento
  linkUrl?: string; // URL externa opcional para botones/enlaces
  styles?: Partial<React.CSSProperties> & Record<string, any>;
  tabletStyles?: Partial<React.CSSProperties> & Record<string, any>;
  mobileStyles?: Partial<React.CSSProperties> & Record<string, any>;
  children?: EditorElement[];
}

export interface Page {
  id: string;
  name: string;
  slug?: string;
  path?: string;
  document: EditorElement;
}

export interface EditorState {
  pages: Page[];
  activePageId: string;
  selectedElementId: string | null;
  selectedElementIds: string[];
  textCorrectorElementId: string | null;
  deviceViewport: 'desktop' | 'tablet' | 'mobile' | 'custom';
  customViewportWidth: number | null;
  zoomLevel: number;
  history: Page[][];
  historyIndex: number;
  isCodeModalOpen: boolean;
  isImportModalOpen: boolean;
  isTemplatesModalOpen: boolean;
  customFonts: CustomFont[];

  // Acciones
  setTextCorrectorElementId: (id: string | null) => void;
  setIsCodeModalOpen: (open: boolean) => void;
  setIsImportModalOpen: (open: boolean) => void;
  setIsTemplatesModalOpen: (open: boolean) => void;
  addCustomFont: (font: CustomFont) => void;
  getActiveDocument: () => EditorElement;
  selectElement: (id: string | null, additive?: boolean) => void;
  updateMultipleElementStyles: (updates: Record<string, Record<string, any>>) => void;
  setDeviceViewport: (viewport: 'desktop' | 'tablet' | 'mobile' | 'custom') => void;
  setCustomViewportWidth: (width: number | null) => void;
  setActivePage: (id: string) => void;
  addPage: (name: string, customPath?: string) => void;
  deletePage: (id: string) => void;
  setDocumentForActivePage: (doc: EditorElement) => void;
  setElementTargetPage: (id: string, targetPageId: string | null) => void;
  setElementLinkUrl: (id: string, linkUrl: string) => void;
  setElementType: (id: string, type: string) => void;
  updateElementStyles: (id: string, newStyles: any) => void;
  updateElementContent: (id: string, content: string) => void;
  duplicateElement: (id: string) => void;
  deleteElement: (id: string) => void;
  addSectionTemplate: (templateElement: EditorElement) => void;
  undo: () => void;
  redo: () => void;
  setZoomLevel: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}