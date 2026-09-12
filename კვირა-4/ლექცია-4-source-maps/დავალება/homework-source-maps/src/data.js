// ===== შეკვეთების ბაზა =====
// ყურადღება: ჩანაწერები განზრახ არ არის ერთი ფორმის — რეალურ პროექტში
// მონაცემები სხვადასხვა ვერსიის API-დან ზუსტად ასე „არათანაბრად" მოდის.
export const orders = [
  {
    id: 'ORD-1001',
    customer: { name: 'ნინო ბერიძე', address: 'თბილისი, ჭავჭავაძის 13' },
    status: 'ახალი',
    items: [
      { sku: 'KB-01', title: 'კლავიატურა', price: 149.9, quantity: 1 },
      { sku: 'MS-04', title: 'მაუსი', price: 79.5, quantity: 2 },
    ],
    totals: { discount: 0, shipping: 9.9 },
  },
  {
    id: 'ORD-1002',
    customer: { name: 'გიორგი კაპანაძე', address: 'ბათუმი, ჩავჭავაძის 22' },
    status: 'აწყობილი',
    items: [
      { sku: 'MN-27', title: 'მონიტორი 27"', price: 899, quantity: 1 },
    ],
    totals: { discount: 50, shipping: 0 },
  },
  {
    id: 'ORD-1003',
    customer: { name: 'ანა ჩიქოვანი', address: 'ქუთაისი, რუსთაველის 4' },
    status: 'გაგზავნილი',
    items: [
      { sku: 'HD-02', title: 'ყურსასმენი', price: 249, quantity: 1 },
      { sku: 'CB-11', title: 'კაბელი USB-C', price: 19.9, quantity: 3 },
    ],
    totals: { discount: 15, shipping: 5 },
  },
  {
    id: 'ORD-1004',
    customer: { name: 'ლევან ხუციშვილი', address: 'რუსთავი, მშენებლების 8' },
    status: 'ახალი',
    items: [
      { sku: 'DK-09', title: 'დოკ-სადგური', price: 329, quantity: 1 },
    ],
    // ⚠️ ეს ჩანაწერი ძველი API-დან მოვიდა
    totals: { shipping: 12 },
  },
  {
    id: 'ORD-1005',
    customer: {
      name: 'თამარ გელაშვილი',
      address: { city: 'თბილისი', street: 'აღმაშენებლის 105', zip: '0102' },
    },
    status: 'აწყობილი',
    items: [
      { sku: 'PR-03', title: 'პრინტერი', price: 459, quantity: 1 },
      { sku: 'PA-01', title: 'ქაღალდი A4', price: 12.5, quantity: 4 },
    ],
    totals: { discount: 25, shipping: 7.5 },
  },
]

export const coupons = {
  WELCOME10: 10,
  DESK20: 20,
  BLACKFRIDAY: 30,
}
