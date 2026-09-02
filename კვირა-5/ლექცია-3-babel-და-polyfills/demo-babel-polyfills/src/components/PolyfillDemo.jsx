import React from 'react'
import PolyfillCard from './PolyfillCard'

const polyfills = [
  {
    name: 'Array.prototype.at()',
    nativeSupport: typeof Array.prototype.at === 'function',
    implementation: `if (!Array.prototype.at) {
  Array.prototype.at = function(index) {
    const len = this.length;
    const relativeIndex = index >= 0 ? index : len + index;
    if (relativeIndex < 0 || relativeIndex >= len) {
      return undefined;
    }
    return this[relativeIndex];
  };
}`,
    example: () => {
      const fruits = ['apple', 'banana', 'cherry', 'date'];
      const last = fruits.at(-1);
      const first = fruits.at(0);
      const secondToLast = fruits.at(-2);
      return `fruits = ['apple', 'banana', 'cherry', 'date']

fruits.at(-1) => "${last}"
fruits.at(0) => "${first}"
fruits.at(-2) => "${secondToLast}"`;
    }
  },
  {
    name: 'Object.hasOwn()',
    nativeSupport: typeof Object.hasOwn === 'function',
    implementation: `if (!Object.hasOwn) {
  Object.hasOwn = function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}`,
    example: () => {
      const data = { name: 'Tbilisi', population: 1200000 };
      const hasName = Object.hasOwn(data, 'name');
      const hasZip = Object.hasOwn(data, 'zip');

      const objNoProto = Object.create(null);
      objNoProto.key = 'value';
      const safeCheck = Object.hasOwn(objNoProto, 'key');

      return `data = { name: 'Tbilisi', population: 1200000 }

Object.hasOwn(data, 'name') => ${hasName}
Object.hasOwn(data, 'zip') => ${hasZip}

// Safe for null-prototype objects:
objNoProto = Object.create(null)
objNoProto.key = 'value'
Object.hasOwn(objNoProto, 'key') => ${safeCheck}`;
    }
  },
  {
    name: 'structuredClone()',
    nativeSupport: typeof structuredClone === 'function',
    implementation: `if (typeof structuredClone !== 'function') {
  window.structuredClone = function(obj) {
    // Simple polyfill (limited functionality)
    // Full polyfill would handle Date, Map, Set, etc.
    return JSON.parse(JSON.stringify(obj));
  };
}`,
    example: () => {
      const original = {
        name: 'Project A',
        tags: ['web', 'optimization'],
        scores: [95, 88, 72]
      };

      const clone = structuredClone(original);
      clone.tags.push('cloned');
      clone.scores[0] = 999;

      return `original = { name: 'Project A', tags: [...], scores: [...] }
clone = structuredClone(original)

clone.tags.push('cloned')
clone.scores[0] = 999

original.tags => [${original.tags}]
clone.tags => [${clone.tags}]

original.scores[0] => ${original.scores[0]}
clone.scores[0] => ${clone.scores[0]}

✓ Deep clone created successfully!`;
    }
  },
  {
    name: 'Array.prototype.findLast()',
    nativeSupport: typeof Array.prototype.findLast === 'function',
    implementation: `if (!Array.prototype.findLast) {
  Array.prototype.findLast = function(predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  };
}`,
    example: () => {
      const numbers = [5, 12, 8, 130, 44, 88];
      const lastEven = numbers.findLast(n => n % 2 === 0);
      const lastOver50 = numbers.findLast(n => n > 50);
      const lastNegative = numbers.findLast(n => n < 0);

      return `numbers = [5, 12, 8, 130, 44, 88]

findLast(n => n % 2 === 0) => ${lastEven}
findLast(n => n > 50) => ${lastOver50}
findLast(n => n < 0) => ${lastNegative}`;
    }
  },
  {
    name: 'Promise.withResolvers()',
    nativeSupport: typeof Promise.withResolvers === 'function',
    implementation: `if (!Promise.withResolvers) {
  Promise.withResolvers = function() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}`,
    example: () => {
      const { promise, resolve } = Promise.withResolvers();

      setTimeout(() => {
        resolve('Resolved after 100ms');
      }, 100);

      return `const { promise, resolve, reject } = Promise.withResolvers()

// Later:
resolve('Resolved after 100ms')

✓ Promise object created with external resolve/reject
✓ Useful for creating Promises outside of constructor`;
    }
  },
  {
    name: 'String.prototype.replaceAll()',
    nativeSupport: typeof String.prototype.replaceAll === 'function',
    implementation: `if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(search, replace) {
    if (search instanceof RegExp) {
      if (!search.global) {
        throw new TypeError('RegExp must have global flag');
      }
      return this.replace(search, replace);
    }
    return this.split(search).join(replace);
  };
}`,
    example: () => {
      const text = 'Hello world! Hello everyone!';
      const replaced = text.replaceAll('Hello', 'Hi');

      const code = 'let x = 10; let y = 20;';
      const updated = code.replaceAll('let', 'const');

      return `text = 'Hello world! Hello everyone!'
text.replaceAll('Hello', 'Hi')
=> "${replaced}"

code = 'let x = 10; let y = 20;'
code.replaceAll('let', 'const')
=> "${updated}"`;
    }
  }
]

function PolyfillDemo() {
  return (
    <section className="polyfill-section">
      <h2 className="section-title">Polyfills</h2>
      <p className="section-desc">
        Polyfill-ები ემატება JavaScript-ის თანამედროვე API-ებს ძველ ბრაუზერებში.
        ყოველი კარტი აჩვენებს polyfill-ის იმპლემენტაციას და მაგალითს.
      </p>

      <div className="polyfill-grid">
        {polyfills.map((polyfill, index) => (
          <PolyfillCard
            key={index}
            name={polyfill.name}
            implementation={polyfill.implementation}
            example={polyfill.example}
            nativeSupport={polyfill.nativeSupport}
          />
        ))}
      </div>
    </section>
  )
}

export default PolyfillDemo
