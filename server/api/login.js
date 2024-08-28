export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  const user = users.find(
    (u) => u.username === body.username && u.password === body.password
  );

  if (user) {
    await setUserSession(event, {
      user: {
        username: user.username,
      },
      loggedInAt: new Date().toISOString(),
    })
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
});