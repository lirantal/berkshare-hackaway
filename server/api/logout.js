export default defineEventHandler(async (event) => {
    await removeUserSession(event);
    return { success: true, message: 'Logout successful' };
});