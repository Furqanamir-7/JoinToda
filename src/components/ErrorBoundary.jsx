import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center text-neutral-500 text-sm font-mono tracking-widest">
            COMPONENT FAILED TO LOAD
          </div>
        )
      );
    }
    return this.props.children;
  }
}
