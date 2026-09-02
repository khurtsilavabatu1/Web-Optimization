// ===== სამაგალითო მომხმარებლები =====
export const sampleUsers = [
  { id: 1, name: 'ნინო გელაშვილი',   email: 'nino@example.com',    role: 'დეველოპერი' },
  { id: 2, name: 'გიორგი ბერიძე',    email: 'giorgi@example.com',  role: 'დიზაინერი' },
  { id: 3, name: 'მარიამ წიკლაური',   email: 'mariam@example.com',  role: 'PM' },
  { id: 4, name: 'დავითი ხარაიშვილი', email: 'daviti@example.com',  role: 'დეველოპერი' },
  { id: 5, name: 'ანა ჯაფარიძე',     email: 'ana@example.com',     role: 'QA' },
  { id: 6, name: 'ლუკა მეგრელიშვილი', email: 'luka@example.com',   role: 'DevOps' },
];

// ===== მძიმე გამოთვლა — მარტივი რიცხვების დათვლა =====
export function countPrimes(limit) {
  let count = 0;
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }
  return count;
}
