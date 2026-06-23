export const users = {
  validUser: {
    email: process.env.USERNAME!,
    password: process.env.PASSWORD!,
  },

  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },

  invalidPassword: {
    email: process.env.USERNAME!,
    password: 'wrongpassword',
  },

  invalidEmail: {
    email: 'invalid@test.com',
    password: process.env.PASSWORD!,
  },
};