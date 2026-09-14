import { Component } from 'react';

// ლოგირების დამხმარეები — ლექციაზე Console-ში თანმიმდევრობის დასანახად
const tag = 'color: #8e44ad; font-weight: bold;';
const render = 'color: #2980b9; font-weight: bold;';
const commit = 'color: #e67e22; font-weight: bold;';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
    console.log(`%c[EB:${props.boundaryName}] 0. constructor — boundary იქმნება`, tag);
  }

  // RENDER ფაზა · სუფთა (pure) · static — აქ side effect-ები დაუშვებელია
  static getDerivedStateFromError(error) {
    console.log(
      `%c[EB] 2. getDerivedStateFromError — RENDER ფაზა`,
      render,
      '\n   შეცდომა დაიჭირა:', error.message,
      '\n   ვაბრუნებ: { hasError: true, error } — errorInfo ჯერ არ არის!'
    );
    return { hasError: true, error };
  }

  // COMMIT-ის შემდეგ · side effect-ები ნებადართულია (ლოგირება, Sentry)
  componentDidCatch(error, errorInfo) {
    console.log(
      `%c[EB:${this.props.boundaryName}] 4. componentDidCatch — COMMIT-ის მერე`,
      commit,
      '\n   ჩავარდნილი subtree უკვე მოშლილია, fallback ეკრანზეა',
      '\n   ახლა setState({ errorInfo }) → გამოიწვევს მეორე რენდერს'
    );
    console.error(
      `%c ErrorBoundary დაიჭირა:`,
      'color: #e74c3c; font-weight: bold; font-size: 13px;',
      '\n  Error:', error.message,
      '\n  Component Stack:', errorInfo.componentStack
    );
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    console.log(
      `%c[EB:${this.props.boundaryName}] 5. handleRetry — hasError: false`,
      tag,
      '\n   შვილი ხელახლა mount-დება, ახალი constructor-ით'
    );
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      console.log(
        `%c[EB:${this.props.boundaryName}] 3. render → FALLBACK`,
        render,
        `\n   errorInfo: ${this.state.errorInfo ? 'არის → component stack ჩანს' : 'null → stack ჯერ არ ჩანს'}`
      );

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

    console.log(
      `%c[EB:${this.props.boundaryName}] 1. render → children (გამჭვირვალე რეჟიმი)`,
      render
    );

    return this.props.children;
  }
}

export default ErrorBoundary;
