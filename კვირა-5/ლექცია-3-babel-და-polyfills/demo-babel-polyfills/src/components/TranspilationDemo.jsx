import React from 'react'
import CodeComparison from './CodeComparison'

const transpilationExamples = [
  {
    title: 'Arrow Functions',
    modern: `const greet = (name) => {
  return \`Hello, \${name}!\`;
};`,
    transpiled: `var greet = function(name) {
  return "Hello, " + name + "!";
};`
  },
  {
    title: 'Destructuring',
    modern: `const user = { name: 'Giorgi', age: 25 };
const { name, age } = user;`,
    transpiled: `var user = { name: 'Giorgi', age: 25 };
var name = user.name;
var age = user.age;`
  },
  {
    title: 'Template Literals',
    modern: `const name = 'Nino';
const greeting = \`Hello, \${name}!
Welcome to our site.\`;`,
    transpiled: `var name = 'Nino';
var greeting = "Hello, " + name + "!\\n" +
  "Welcome to our site.";`
  },
  {
    title: 'Async/Await',
    modern: `async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user;
}`,
    transpiled: `function fetchUser(id) {
  return regeneratorRuntime.async(function(context) {
    while (1) switch (context.prev = context.next) {
      case 0:
        context.next = 2;
        return fetch("/api/users/" + id);
      case 2:
        response = context.sent;
        context.next = 5;
        return response.json();
      case 5:
        user = context.sent;
        return context.abrupt("return", user);
    }
  });
}`
  },
  {
    title: 'Optional Chaining',
    modern: `const city = user?.address?.city;
const zip = user?.address?.zip ?? 'N/A';`,
    transpiled: `var _user$address, _user$address2;
var city = (_user$address = user.address) === null ||
  _user$address === void 0 ? void 0 : _user$address.city;
var zip = (_user$address2 = user.address) === null ||
  _user$address2 === void 0 ? void 0 : _user$address2.zip;
if (zip === null || zip === void 0) zip = 'N/A';`
  },
  {
    title: 'Nullish Coalescing',
    modern: `const volume = config.volume ?? 50;
const theme = config.theme ?? 'dark';`,
    transpiled: `var volume = config.volume !== null &&
  config.volume !== void 0 ? config.volume : 50;
var theme = config.theme !== null &&
  config.theme !== void 0 ? config.theme : 'dark';`
  },
  {
    title: 'Class Fields',
    modern: `class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}`,
    transpiled: `function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function() {
  this.count++;
};`
  },
  {
    title: 'Private Methods',
    modern: `class BankAccount {
  #balance = 0;

  #validate(amount) {
    return amount > 0;
  }

  deposit(amount) {
    if (this.#validate(amount)) {
      this.#balance += amount;
    }
  }
}`,
    transpiled: `var _balance = new WeakMap();
var _validate = new WeakMap();

function BankAccount() {
  _balance.set(this, 0);
  _validate.set(this, function(amount) {
    return amount > 0;
  });
}

BankAccount.prototype.deposit = function(amount) {
  if (_validate.get(this).call(this, amount)) {
    _balance.set(this, _balance.get(this) + amount);
  }
};`
  }
]

function TranspilationDemo() {
  return (
    <section className="transpilation-section">
      <h2 className="section-title">Babel ტრანსპილაცია</h2>
      <p className="section-desc">
        Babel გარდაქმნის თანამედროვე JavaScript-ს (ES2015+) ძველ ES5 სინტაქსად,
        რათა კოდი იმუშაოს ძველ ბრაუზერებში.
      </p>

      <div className="transpilation-grid">
        {transpilationExamples.map((example, index) => (
          <CodeComparison
            key={index}
            title={example.title}
            modern={example.modern}
            transpiled={example.transpiled}
          />
        ))}
      </div>
    </section>
  )
}

export default TranspilationDemo
