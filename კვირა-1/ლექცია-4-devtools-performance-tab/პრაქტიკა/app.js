/*
    ============================================================
    🧪 Performance Lab — მთავარი სკრიპტი
    ============================================================

    📊 Performance Tab-ში ნათლად დაინახავ ყველა ფუნქციის სახელს:
    ─────────────────────────────────────────────────────────────
    - runHeavyTask()       → Long Task (ყვითელი ზოლი, წითელი კუთხით)
    - runHeavySort()       → მძიმე სორტირება
    - addManyElements()    → DOM manipulation (იასამნისფერი Layout)
    - triggerReflowStorm() → Layout Thrashing (ბევრი იასამნისფერი ზოლი)
    - onScrollHandler()    → Scroll event (FPS drop)
    - animateBoxes()       → Scroll-ზე ანიმაცია
    - forceReflow()        → Forced Layout/Reflow

    📊 Bottom-Up Tab-ში:
    ────────────────────
    Self Time-ის მიხედვით დალაგდება. ის ფუნქცია რომელმაც ყველაზე
    მეტი "საკუთარი" დრო დახარჯა — ზემოთ იქნება.

    📊 Call Tree Tab-ში:
    ────────────────────
    ხეს ნახავ:
    Event: click → runHeavyTask() → blockingLoop()
    Event: scroll → onScrollHandler() → animateBoxes() → forceReflow()
    Timer Fired → blockingLoop()
*/

// ============================================================
// FPS მონიტორი — რეალური დროის FPS გვერდზე
// ============================================================
let frameCount = 0;
let lastFpsUpdate = performance.now();
const fpsElement = document.getElementById('fps-counter');

function updateFPS() {
    frameCount++;
    const now = performance.now();
    const elapsed = now - lastFpsUpdate;

    if (elapsed >= 500) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        fpsElement.textContent = `FPS: ${fps}`;

        if (fps >= 50) {
            fpsElement.style.color = '#10b981';
            fpsElement.style.borderColor = '#10b981';
        } else if (fps >= 30) {
            fpsElement.style.color = '#f59e0b';
            fpsElement.style.borderColor = '#f59e0b';
        } else {
            fpsElement.style.color = '#e94560';
            fpsElement.style.borderColor = '#e94560';
        }

        frameCount = 0;
        lastFpsUpdate = now;
    }

    requestAnimationFrame(updateFPS);
}
requestAnimationFrame(updateFPS);

// ============================================================
// Scroll Boxes — FPS Drop-ის დემო
// ============================================================
const scrollBoxesContainer = document.getElementById('scroll-boxes');
const colors = ['#e94560', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6', '#ec4899'];

for (let i = 0; i < 200; i++) {
    const box = document.createElement('div');
    box.className = 'scroll-box';
    box.style.background = colors[i % colors.length];
    box.textContent = i + 1;
    scrollBoxesContainer.appendChild(box);
}

/*
    ❌ SCROLL EVENT — Frame Drop-ის მიზეზი
    ════════════════════════════════════════

    📊 Performance Tab-ში დაინახავ:
    - FPS ზოლი: წითელი ადგილები scroll-ის დროს
    - Main Thread: "Event: scroll" ყვითელი ზოლები
    - CPU ზოლი: ყვითელი პიკები (JS execution)

    ❌ რა პრობლემებია:
    1. scroll event-ზე ყოველ ფრეიმში იძახება (throttle-ის გარეშე)
    2. animateBoxes() ყველა box-ს ცვლის სტილს
    3. forceReflow() ითხოვს offsetHeight-ს — ბრაუზერი იძულებულია
       ხელახლა გამოთვალოს layout (forced reflow / layout thrashing)
*/
function onScrollHandler() {
    animateBoxes();
}

function animateBoxes() {
    const boxes = document.querySelectorAll('.scroll-box');
    const scrollY = window.scrollY;

    boxes.forEach((box, index) => {
        const offset = Math.sin((scrollY + index * 20) * 0.01) * 10;
        box.style.transform = `translateY(${offset}px) rotate(${scrollY * 0.1 + index}deg)`;
        box.style.opacity = 0.5 + Math.abs(Math.sin((scrollY + index * 30) * 0.005)) * 0.5;

        forceReflow(box);
    });
}

function forceReflow(element) {
    /*
        ❌ FORCED REFLOW / LAYOUT THRASHING
        ════════════════════════════════════
        offsetHeight-ის წაკითხვა აიძულებს ბრაუზერს
        ხელახლა გამოთვალოს layout.
        ამას 200 box-ისთვის ვაკეთებთ = 200 forced reflow!

        📊 Performance Tab-ში:
        - იასამნისფერი "Layout" ზოლები Main Thread-ზე
        - Warning: "Forced reflow is a likely performance bottleneck"
    */
    const height = element.offsetHeight;
    element.style.height = height + 'px';
}

window.addEventListener('scroll', onScrollHandler);

// ============================================================
// კარტების გენერაცია (სქროლის კონტენტისთვის)
// ============================================================
function generateCards() {
    const container = document.getElementById('cards-container');
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 50; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>პროდუქტი #${i}</h3>
            <p>ეს არის სატესტო პროდუქტის აღწერა. გამოიყენება სქროლის კონტენტისთვის.</p>
            <div class="price">₾${(Math.random() * 500).toFixed(2)}</div>
        `;
        fragment.appendChild(card);
    }

    container.appendChild(fragment);
}
generateCards();

// ============================================================
// ღილაკის ფუნქციები — Long Tasks
// ============================================================

/*
    🔴 LONG TASK — Main Thread-ის ბლოკი
    ════════════════════════════════════

    📊 Performance Tab-ში დაინახავ:
    - Main Thread: გრძელი ყვითელი ზოლი "runHeavyTask" წარწერით
    - ზოლის ზედა მარჯვენა კუთხეში წითელი სამკუთხედი (Long Task marker)
    - Bottom-Up: blockingLoop() — ყველაზე დიდი Self Time
    - Call Tree: Event: click → runHeavyTask() → blockingLoop()

    💡 ყურადღება: ღილაკზე დაჭერისას ანიმაცია (animation-box) გაჩერდება!
    ეს იმიტომ რომ main thread ბლოკირებულია და ბრაუზერი ვერ ხატავს ფრეიმებს.
*/
function runHeavyTask() {
    const resultBox = document.getElementById('task-result');
    resultBox.textContent = '⏳ მძიმე გამოთვლა მიმდინარეობს... (main thread ბლოკირებულია!)';

    const result = blockingLoop(15000000);

    resultBox.textContent = `✅ დასრულდა! შედეგი: ${result.toFixed(2)} — ნახე Performance Tab!`;
}

function blockingLoop(iterations) {
    /*
        ❌ ეს ფუნქცია ბლოკავს Main Thread-ს
        Bottom-Up-ში ამ ფუნქციის Self Time ყველაზე დიდი იქნება
    */
    let result = 0;
    for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
    }
    return result;
}

/*
    🟡 მძიმე სორტირება
    ══════════════════

    📊 Performance Tab-ში დაინახავ:
    - Main Thread: "runHeavySort" → sortArray()
    - Self Time-ის უმეტესობა sortArray()-ში იქნება
*/
function runHeavySort() {
    const resultBox = document.getElementById('task-result');
    resultBox.textContent = '⏳ მძიმე სორტირება...';

    const data = [];
    for (let i = 0; i < 200000; i++) {
        data.push({
            id: i,
            value: Math.random() * 10000,
            name: 'item_' + Math.floor(Math.random() * 5000),
            nested: { score: Math.random() * 100 }
        });
    }

    sortArray(data);

    resultBox.textContent = `✅ ${data.length} ელემენტი დასორტირდა! — ნახე Performance Tab!`;
}

function sortArray(arr) {
    for (let round = 0; round < 5; round++) {
        arr.sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            if (nameCompare !== 0) return nameCompare;
            return a.nested.score - b.nested.score;
        });
    }
}

/*
    🟣 DOM MANIPULATION — ბევრი ელემენტის დამატება
    ═══════════════════════════════════════════════

    📊 Performance Tab-ში დაინახავ:
    - Main Thread: "addManyElements" ყვითელი ზოლი
    - მის შემდეგ: იასამნისფერი "Layout" (ბრაუზერი ითვლის 2000 ელემენტის პოზიციას)
    - მის შემდეგ: მწვანე "Paint" (ბრაუზერი ხატავს 2000 ელემენტს)

    ეს კარგი მაგალითია JS → Layout → Paint ჯაჭვის სანახავად.
*/
function addManyElements() {
    const container = document.getElementById('dom-container');
    container.innerHTML = '';

    const resultBox = document.getElementById('task-result');
    resultBox.textContent = '⏳ 2000 DOM ელემენტის შექმნა...';

    for (let i = 0; i < 2000; i++) {
        const el = document.createElement('div');
        el.className = 'dom-item';
        el.style.background = `hsl(${(i * 0.18) % 360}, 70%, 50%)`;
        el.textContent = i;
        container.appendChild(el);
    }

    resultBox.textContent = `✅ 2000 ელემენტი დაემატა! — ნახე Layout და Paint ზოლები Performance Tab-ში`;
}

/*
    🟢 LAYOUT THRASHING — იძულებითი reflow
    ═══════════════════════════════════════

    📊 Performance Tab-ში დაინახავ:
    - Main Thread: "triggerReflowStorm"
    - მის შიგნით: ბევრი იასამნისფერი "Layout" ზოლი
    - Warning icon: "Forced reflow is a likely performance bottleneck"
    - ეს არის ყველაზე კარგი მაგალითი Layout Thrashing-ის სანახავად

    ❌ რა ხდება: ყოველ iteration-ში:
    1. ვკითხულობთ offsetWidth-ს (ბრაუზერი იძულებულია Layout გააკეთოს)
    2. ვცვლით style-ს (ბრაუზერი invalidate-ს აკეთებს Layout-ს)
    3. ისევ ვკითხულობთ → ისევ Layout → ისევ ვცვლით...
    = ბევრი არასაჭირო Layout გამოთვლა!
*/
function triggerReflowStorm() {
    const boxes = document.querySelectorAll('.reflow-box');
    const resultBox = document.getElementById('task-result');
    resultBox.textContent = '⏳ Layout Thrashing...';

    for (let round = 0; round < 100; round++) {
        boxes.forEach((box) => {
            const width = box.offsetWidth;
            box.style.width = (width + Math.sin(round) * 2) + 'px';

            const height = box.offsetHeight;
            box.style.height = (height + Math.cos(round) * 2) + 'px';

            const left = box.offsetLeft;
            box.style.marginLeft = (Math.sin(round * 0.5) * 5) + 'px';
        });
    }

    boxes.forEach(box => {
        box.style.width = '';
        box.style.height = '';
        box.style.marginLeft = '';
    });

    resultBox.textContent = `✅ Layout Thrashing დასრულდა! — ნახე იასამნისფერი Layout ზოლები Performance Tab-ში`;
}

// ============================================================
// ავტომატური Long Task — გვერდის ჩატვირთვისას
// ============================================================
/*
    📊 Performance Tab-ში დაინახავ:
    - Timer Fired → blockingLoop()
    - ეს 1 წამის შემდეგ გაეშვება ავტომატურად
    - Call Tree-ში: Timer Fired (setTimeout callback) → blockingLoop()
*/
setTimeout(() => {
    console.time('Auto Long Task');
    blockingLoop(8000000);
    console.timeEnd('Auto Long Task');
    console.log('Auto Long Task completed — check Performance Tab!');
}, 1000);

// ============================================================
// Console ინფორმაცია
// ============================================================
console.log('%c🧪 Performance Lab — Ready!', 'font-size: 16px; color: #e94560; font-weight: bold;');
console.log('%cინსტრუქცია:', 'font-size: 14px; color: #f59e0b; font-weight: bold;');
console.log('1. გახსენი Performance Tab');
console.log('2. დააჭირე Record (⏺)');
console.log('3. დააჭირე ღილაკებს ან დასქროლე');
console.log('4. შეაჩერე Recording');
console.log('5. გაანალიზე: Main Thread, Bottom-Up, Call Tree');
console.log('');
console.log('%cCoverage Tab:', 'font-size: 14px; color: #8b5cf6; font-weight: bold;');
console.log('Cmd+Shift+P → "Coverage" → Start instrumenting coverage');
console.log('ნახე unused-library.js — 90%+ გამოუყენებელი!');
