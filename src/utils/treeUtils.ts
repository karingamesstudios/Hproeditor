import type { EditorElement } from '../types/editor';

export function moveNodeInTree(
  root: EditorElement,
  draggedId: string,
  targetId: string,
  position: 'inside' | 'before' | 'after'
): EditorElement {
  if (draggedId === targetId || draggedId === 'root-body') return root;

  let draggedNode: EditorElement | null = null;

  // 1. Extraer el nodo arrastrado del árbol
  function removeNode(node: EditorElement): EditorElement {
    if (node.children) {
      const found = node.children.find((child) => child.id === draggedId);
      if (found) {
        draggedNode = found;
        return {
          ...node,
          children: node.children.filter((child) => child.id !== draggedId),
        };
      }
      return {
        ...node,
        children: node.children.map(removeNode),
      };
    }
    return node;
  }

  const cleanedTree = removeNode(JSON.parse(JSON.stringify(root)));
  if (!draggedNode) return root;

  const nodeToInsert = draggedNode;

  // 2. Insertar el nodo en la nueva posición de destino
  function insertNode(node: EditorElement): EditorElement {
    if (position === 'inside' && node.id === targetId) {
      return {
        ...node,
        children: [...(node.children || []), nodeToInsert],
      };
    }

    if (node.children && node.children.length > 0) {
      const targetIndex = node.children.findIndex((child) => child.id === targetId);

      if (targetIndex !== -1) {
        const newChildren = [...node.children];
        const insertIdx = position === 'before' ? targetIndex : targetIndex + 1;
        newChildren.splice(insertIdx, 0, nodeToInsert);
        return { ...node, children: newChildren };
      }

      return {
        ...node,
        children: node.children.map(insertNode),
      };
    }

    return node;
  }

  return insertNode(cleanedTree);
}