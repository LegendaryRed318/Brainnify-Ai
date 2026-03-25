import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="text-center max-w-md px-6">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="font-heading text-2xl font-bold mb-3">Something went wrong</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Please refresh the page and try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
