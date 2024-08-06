class UserAuth {
  constructor() {
    this.users = [];
    this.loggedInUsers = [];
  }

  register(user) {
    this.users.push(user);
  }

  login(email, password) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.loggedInUsers.push(user);
      return "Login successful";
    } else {
      return "Invalid credentials";
    }
  }

  logout(email) {
    this.loggedInUsers = this.loggedInUsers.filter((u) => u.email !== email);
    return "Logout successful";
  }
}

const auth = new UserAuth();
auth.register({ email: "john@example.com", password: "123456" });
console.log(auth.login("john@example.com", "123456")); // Login successful
console.log(auth.logout("john@example.com")); // Logout successful
