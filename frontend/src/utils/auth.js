export function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem('edubridge_current_user')
    if (!storedUser) return null

    const user = JSON.parse(storedUser)
    return user && typeof user === 'object' ? user : null
  } catch {
    return null
  }
}
