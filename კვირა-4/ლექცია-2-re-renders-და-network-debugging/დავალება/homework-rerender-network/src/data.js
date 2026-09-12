// ===== სუპორტის ტიკეტების ბაზა =====
export const tickets = [
  { id: 101, subject: 'ანგარიშზე შესვლა ვერ ხდება',        customer: 'ნინო ბერიძე',    priority: 'high',   channel: 'ელფოსტა', minutesOpen: 34,  messages: 4, firstResponse: 12 },
  { id: 102, subject: 'გადახდა ორჯერ ჩამოიჭრა',            customer: 'გიორგი კაპანაძე', priority: 'high',   channel: 'ჩატი',    minutesOpen: 96,  messages: 7, firstResponse: 41 },
  { id: 103, subject: 'ინვოისის PDF არ იხსნება',            customer: 'ანა ჩიქოვანი',    priority: 'medium', channel: 'ელფოსტა', minutesOpen: 210, messages: 3, firstResponse: 55 },
  { id: 104, subject: 'მობილურზე ღილაკი არ რეაგირებს',      customer: 'ლევან ხუციშვილი', priority: 'medium', channel: 'ჩატი',    minutesOpen: 18,  messages: 2, firstResponse: 6  },
  { id: 105, subject: 'შეტყობინებები აღარ მოდის',           customer: 'თამარ გელაშვილი', priority: 'low',    channel: 'ფორმა',   minutesOpen: 520, messages: 1, firstResponse: 180 },
  { id: 106, subject: 'ექსპორტი CSV-ში ცარიელია',           customer: 'დათო მაისურაძე',  priority: 'high',   channel: 'ელფოსტა', minutesOpen: 62,  messages: 5, firstResponse: 22 },
  { id: 107, subject: 'პაროლის აღდგენის ბმული ვადაგასულია', customer: 'მარიამ ჯანელიძე', priority: 'medium', channel: 'ფორმა',   minutesOpen: 145, messages: 2, firstResponse: 37 },
  { id: 108, subject: 'ანგარიშის წაშლა მინდა',              customer: 'ზურაბ ნოზაძე',    priority: 'low',    channel: 'ელფოსტა', minutesOpen: 300, messages: 1, firstResponse: 90 },
  { id: 109, subject: 'ორფაქტორიანი ავთენტიფიკაცია იკეტება', customer: 'ელენე კვარაცხელია', priority: 'high', channel: 'ჩატი',   minutesOpen: 12,  messages: 6, firstResponse: 3  },
  { id: 110, subject: 'ინტეგრაცია Slack-თან არ მუშაობს',    customer: 'ირაკლი წიკლაური',  priority: 'medium', channel: 'ფორმა',   minutesOpen: 410, messages: 4, firstResponse: 120 },
  { id: 111, subject: 'ანგარიშფაქტურაზე არასწორი მისამართი', customer: 'სოფო ლომიძე',     priority: 'low',    channel: 'ელფოსტა', minutesOpen: 180, messages: 2, firstResponse: 60 },
  { id: 112, subject: 'დაშბორდი ნელა იხსნება',              customer: 'ნიკა როსტიაშვილი', priority: 'medium', channel: 'ჩატი',    minutesOpen: 75,  messages: 3, firstResponse: 15 },
]

export const agents = ['ლიკა', 'საბა', 'ქეთი', 'ოთო']

export const priorities = [
  { value: 'all',    label: 'ყველა პრიორიტეტი' },
  { value: 'high',   label: 'მაღალი' },
  { value: 'medium', label: 'საშუალო' },
  { value: 'low',    label: 'დაბალი' },
]

export const priorityLabels = { high: 'მაღალი', medium: 'საშუალო', low: 'დაბალი' }
