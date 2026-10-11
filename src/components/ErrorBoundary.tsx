import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Hproeditor Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Algo salió mal en el Editor</h2>
          <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
            Ocurrió un error inesperado al renderizar la interfaz. Haz clic en el botón para restaurar la sesión.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('hproeditor_current_project');
              window.location.reload();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Restaurar y Reiniciar Editor
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}