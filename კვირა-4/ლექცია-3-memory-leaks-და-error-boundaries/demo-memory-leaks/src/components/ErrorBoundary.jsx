import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `%c ErrorBoundary დაიჭირა:`,
      'color: #e74c3c; font-weight: bold; font-size: 13px;',
      '\n  Error:', error.message,
      '\n  Component Stack:', errorInfo.componentStack
    );
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-fallback-icon">!</div>
          <h3 className="error-fallback-title">რაღაც შეცდომა მოხდა!</h3>
          <div className="error-fallback-details">
            <p>
              <strong>შეცდომა:</strong> {this.state.error?.message}
            </p>
            {this.props.showStack && this.state.errorInfo && (
              <pre className="error-stack">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
          <button className="btn btn-retry" onClick={this.handleRetry}>
            ხელახლა ცდა
          </button>
          {this.props.boundaryName && (
            <p className="error-boundary-name">
              Boundary: <code>{this.props.boundaryName}</code>
            </p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
