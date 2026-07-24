// PROBLEM: this script is in <head> without defer/async
// so it blocks HTML parsing until it finishes executing

// PROBLEM: heavy synchronous computation that blocks main thread
function heavyComputation() {
    let result = 0;
    for (let i = 0; i < 5000000; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    return result;
}

// PROBLEM: runs immediately, blocking page render
heavyComputation();

// PROBLEM: generates excessive DOM elements
function generateComments() {
    const container = document.getElementById('comments-container');
    if (!container) return;

    for (let i = 0; i < 200; i++) {
        const comment = document.createElement('div');
        comment.className = 'comment-item';

        // PROBLEM: unnecessary DOM nesting
        const wrapper = document.createElement('div');
        const inner = document.createElement('div');
        const content = document.createElement('div');
        const meta = document.createElement('div');
        const avatar = document.createElement('div');
        const name = document.createElement('span');
        const date = document.createElement('span');
        const text = document.createElement('p');
        const actions = document.createElement('div');
        const likeBtn = document.createElement('button');
        const replyBtn = document.createElement('button');

        name.textContent = 'მომხმარებელი ' + (i + 1);
        date.textContent = '2024-01-' + ((i % 28) + 1);
        text.textContent = 'ეს არის კომენტარი ნომერი ' + (i + 1) + '. ძალიან საინტერესო სტატიაა!';
        likeBtn.textContent = 'მომწონს';
        replyBtn.textContent = 'პასუხი';

        meta.appendChild(avatar);
        meta.appendChild(name);
        meta.appendChild(date);
        actions.appendChild(likeBtn);
        actions.appendChild(replyBtn);
        content.appendChild(meta);
        content.appendChild(text);
        content.appendChild(actions);
        inner.appendChild(content);
        wrapper.appendChild(inner);
        comment.appendChild(wrapper);
        container.appendChild(comment);
    }
}

// PROBLEM: using multiple event listeners instead of one
window.addEventListener('load', function() {
    generateComments();
});

window.addEventListener('load', function() {
    heavyComputation();
});

window.addEventListener('load', function() {
    // PROBLEM: unnecessary forced layout/reflow
    const elements = document.querySelectorAll('.article-wrapper');
    elements.forEach(function(el) {
        // reading offsetHeight then writing style causes layout thrashing
        const h = el.offsetHeight;
        el.style.minHeight = h + 'px';
    });
});

// PROBLEM: console error (Best Practices)
console.error('Configuration error: API key not found');

// PROBLEM: unused functions (dead JavaScript code)
function unusedFunction1() {
    return 'this function is never called';
}
function unusedFunction2() {
    return 'this function is also never called';
}
function unusedFunction3() {
    const data = [1, 2, 3, 4, 5];
    return data.map(x => x * 2).filter(x => x > 4).reduce((a, b) => a + b, 0);
}
function unusedFunction4() {
    return fetch('/api/data').then(r => r.json());
}
function unusedFunction5() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
    return canvas.toDataURL();
}
function unusedHelper(a, b, c) {
    return a + b + c;
}
function unusedValidator(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function unusedFormatter(date) {
    return new Date(date).toLocaleDateString('ka-GE');
}
function unusedSorter(arr) {
    return arr.sort((a, b) => a - b);
}
function unusedDebounce(fn, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}
