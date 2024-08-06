class UserProfile {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  updateUser(userId, updatedInfo) {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedInfo };
    }
  }

  getUserProfile(userId) {
    return this.users.find((user) => user.id === userId);
  }
}

const profile = new UserProfile();
profile.addUser({ id: 1, name: "John Doe", email: "john@example.com" });
profile.updateUser(1, { name: "John Smith" });
console.log(profile.getUserProfile(1)); // Updated profile
console.log("Hello");
