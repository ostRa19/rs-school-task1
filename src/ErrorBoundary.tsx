import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleThrowError = () => {
        throw new Error('This is a test error');
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <button onClick={() => window.location.reload()}>Reload</button>
                </div>
            );
        }

        return (
            <div>
                {this.props.children}
                <button onClick={this.handleThrowError}>Throw Error</button>
            </div>
        );
    }
}

export default ErrorBoundary;
