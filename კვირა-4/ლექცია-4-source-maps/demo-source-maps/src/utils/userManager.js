/**
 * UserManager კლასი
 * მომხმარებლების მართვის სისტემა — CRUD ოპერაციებით
 *
 * ფუნქციონალი:
 * - მომხმარებლების დამატება, წაშლა, რედაქტირება
 * - ძიება სახელით/ემაილით
 * - სორტირება სხვადასხვა კრიტერიუმით
 * - სტატისტიკის გამოთვლა
 */

export class UserManager {
  constructor() {
    // მომხმარებლების მასივი
    this.users = [
      { id: 1, name: 'გიორგი მელაძე', email: 'giorgi@example.com', age: 28, active: true },
      { id: 2, name: 'ნინო ხარატიშვილი', email: 'nino@example.com', age: 34, active: true },
      { id: 3, name: 'დავით ქავთარაძე', email: 'davit@example.com', age: 25, active: false },
      { id: 4, name: 'მარიამ გელაშვილი', email: 'mariam@example.com', age: 31, active: true },
      { id: 5, name: 'ლევან ბერიძე', email: 'levan@example.com', age: 42, active: true },
    ];
    this.nextId = 6;
  }

  /**
   * ახალი მომხმარებლის დამატება
   */
  addUser(name, email, age, active = true) {
    // ვალიდაცია
    if (!name || name.trim().length === 0) {
      throw new Error('სახელი სავალდებულოა');
    }

    if (!email || !email.includes('@')) {
      throw new Error('არასწორი ემაილის ფორმატი');
    }

    if (age < 0 || age > 120) {
      throw new Error('ასაკი უნდა იყოს 0-დან 120-მდე');
    }

    // ვამოწმებთ არსებობს თუ არა იგივე ემაილი
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('ეს ემაილი უკვე გამოყენებულია');
    }

    const newUser = {
      id: this.nextId++,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: parseInt(age, 10),
      active: Boolean(active),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * მომხმარებლის წაშლა ID-ით
   */
  deleteUser(userId) {
    const index = this.users.findIndex(user => user.id === userId);

    if (index === -1) {
      throw new Error('მომხმარებელი ვერ მოიძებნა');
    }

    const deletedUser = this.users.splice(index, 1)[0];
    return deletedUser;
  }

  /**
   * მომხმარებლის განახლება
   */
  updateUser(userId, updates) {
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      throw new Error('მომხმარებელი ვერ მოიძებნა');
    }

    // ვალიდაცია განახლებული მონაცემებისთვის
    if (updates.name !== undefined && updates.name.trim().length === 0) {
      throw new Error('სახელი არ შეიძლება იყოს ცარიელი');
    }

    if (updates.email !== undefined && !updates.email.includes('@')) {
      throw new Error('არასწორი ემაილის ფორმატი');
    }

    if (updates.age !== undefined && (updates.age < 0 || updates.age > 120)) {
      throw new Error('ასაკი უნდა იყოს 0-დან 120-მდე');
    }

    // განახლება
    Object.assign(user, updates);
    return user;
  }

  /**
   * ძიება — სახელით ან ემაილით
   */
  search(query) {
    if (!query || query.trim().length === 0) {
      return this.users;
    }

    const lowerQuery = query.toLowerCase().trim();

    return this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(lowerQuery);
      const emailMatch = user.email.toLowerCase().includes(lowerQuery);
      return nameMatch || emailMatch;
    });
  }

  /**
   * სორტირება
   * field: 'name' | 'email' | 'age' | 'active'
   * order: 'asc' | 'desc'
   */
  sort(field = 'name', order = 'asc') {
    const sorted = [...this.users].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      // სტრინგებისთვის — toLowerCase
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  /**
   * სტატისტიკის გამოთვლა
   */
  getStatistics() {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(u => u.active).length;
    const inactiveUsers = totalUsers - activeUsers;

    const ages = this.users.map(u => u.age);
    const averageAge = ages.length > 0
      ? (ages.reduce((sum, age) => sum + age, 0) / ages.length).toFixed(1)
      : 0;

    const minAge = ages.length > 0 ? Math.min(...ages) : 0;
    const maxAge = ages.length > 0 ? Math.max(...ages) : 0;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      averageAge: parseFloat(averageAge),
      minAge,
      maxAge,
    };
  }

  /**
   * ყველა მომხმარებლის მიღება
   */
  getAllUsers() {
    return [...this.users];
  }

  /**
   * მომხმარებლის მიღება ID-ით
   */
  getUserById(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('მომხმარებელი ვერ მოიძებნა');
    }
    return user;
  }

  /**
   * განზრახ შეცდომის გენერირება — სავარჯიშოებისთვის
   * ეს ფუნქცია დემონსტრაციისთვისაა, როგორ გამოიყურება stack trace
   */
  triggerIntentionalError() {
    // ვიწვევთ რამდენიმე nested ფუნქციას
    this.levelOne();
  }

  levelOne() {
    console.log('Level 1: გადავდივართ Level 2-ზე');
    this.levelTwo();
  }

  levelTwo() {
    console.log('Level 2: გადავდივართ Level 3-ზე');
    this.levelThree();
  }

  levelThree() {
    console.log('Level 3: ახლა მოხდება განზრახ შეცდომა...');
    // განზრახ შეცდომა — undefined-ზე property-ზე წვდომა
    const undefinedVariable = undefined;
    // eslint-disable-next-line no-unused-vars
    const result = undefinedVariable.someProperty; // 💥 TypeError
  }
}
