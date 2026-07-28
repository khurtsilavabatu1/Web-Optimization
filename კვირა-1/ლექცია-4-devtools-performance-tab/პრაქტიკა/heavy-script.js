/*
    ============================================================
    ❌ RENDER-BLOCKING SCRIPT
    ============================================================

    📊 Performance Tab-ში დაინახავ:
    ─────────────────────────────
    - Main Thread-ზე: "Evaluate script" → heavySort()
    - ეს ხდება გვერდის ჩატვირთვისას, HTML-ის parsing-ს ბლოკავს
    - Call Tree-ში: Evaluate script (Total: 300ms+)
                      └── heavySort (Self: 300ms+)

    💡 გამოსწორება: ამ script-ს <head>-ში defer ატრიბუტი უნდა ჰქონდეს
       ან <body>-ის ბოლოში გადატანა — მაშინ HTML-ს არ დაბლოკავს
*/

function heavySort() {
    console.time('heavySort — Long Task');

    const bigArray = [];
    for (let i = 0; i < 100000; i++) {
        bigArray.push({
            id: i,
            value: Math.random() * 10000,
            name: 'item_' + Math.floor(Math.random() * 1000),
            category: ['A', 'B', 'C', 'D', 'E'][i % 5]
        });
    }

    for (let round = 0; round < 3; round++) {
        bigArray.sort((a, b) => {
            const catCompare = a.category.localeCompare(b.category);
            if (catCompare !== 0) return catCompare;
            return a.name.localeCompare(b.name) || a.value - b.value;
        });
    }

    console.timeEnd('heavySort — Long Task');
    return bigArray.length;
}

heavySort();
