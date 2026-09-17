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

export function getRegisteredUsers() {
  try {
    const storedUsers = localStorage.getItem('edubridge_users')
    const users = storedUsers ? JSON.parse(storedUsers) : []
    return Array.isArray(users) ? users.filter((user) => user && typeof user === 'object') : []
  } catch {
    return []
  }
}

export function getUserId(user) {
  return String(user?.id || user?.email || '')
}

export function getRegisteredMentors(currentUser) {
  const currentUserId = getUserId(currentUser)
  return getRegisteredUsers().filter((user) => user.role === 'mentor' && getUserId(user) !== currentUserId)
}

export function getRegisteredStudents(currentUser) {
  const currentUserId = getUserId(currentUser)
  return getRegisteredUsers().filter((user) => user.role === 'student' && getUserId(user) !== currentUserId)
}
