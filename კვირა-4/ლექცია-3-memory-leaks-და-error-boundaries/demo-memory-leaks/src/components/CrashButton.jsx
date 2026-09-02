import { Component, useState } from 'react';

// Class component რომელიც "ვარდება" render-ის დროს
export class CrashableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldCrash: false };
  }

  render() {
    if (this.state.shouldCrash) {
      throw new Error('CrashableComponent შეცდომა: კომპონენტი "ჩავარდა" render-ის დროს!');
    }

    return (
      <div className="crashable-component">
        <h4>CrashableComponent</h4>
        <p>ეს კომპონენტი შეიძლება "ჩავარდეს" render-ის დროს.</p>
        <button
          className="btn btn-crash"
          onClick={() => this.setState({ shouldCrash: true })}
        >
          Crash!
        </button>
      </div>
    );
  }
}

// უსაფრთხო კომპონენტი რომელიც გააგრძელებს მუშაობას
export function SafeComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="safe-component">
      <h4>SafeComponent</h4>
      <p>ეს კომპონენტი ნორმალურად მუშაობს და "გადარჩება" მეზობლის crash-ს.</p>
      <div className="safe-counter">
        <button className="btn btn-safe" onClick={() => setCount(c => c + 1)}>
          +1
        </button>
        <span className="safe-count">{count}</span>
        <button className="btn btn-safe" onClick={() => setCount(c => c - 1)}>
          -1
        </button>
      </div>
    </div>
  );
}
