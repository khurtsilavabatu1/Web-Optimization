function generateComments() {
    const container = document.getElementById('comments-container');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 20; i++) {
        const comment = document.createElement('div');
        comment.className = 'comment-item';

        const name = document.createElement('strong');
        name.textContent = 'მომხმარებელი ' + (i + 1);

        const date = document.createElement('span');
        date.textContent = ' — 2024-01-' + ((i % 28) + 1);

        const text = document.createElement('p');
        text.textContent = 'ეს არის კომენტარი ნომერი ' + (i + 1) + '. ძალიან საინტერესო სტატიაა!';

        comment.appendChild(name);
        comment.appendChild(date);
        comment.appendChild(text);
        fragment.appendChild(comment);
    }

    container.appendChild(fragment);
}

if ('requestIdleCallback' in window) {
    requestIdleCallback(generateComments);
} else {
    setTimeout(generateComments, 200);
}
