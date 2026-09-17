import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleSelector from './RoleSelector'

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }

    const users = JSON.parse(localStorage.getItem('edubridge_users') || '[]')
    if (users.length === 0) {
      setError('No registered users found. Create an account first.')
      return
    }

    const user = users.find((registeredUser) => (
      registeredUser.email === email.trim().toLowerCase()
      && registeredUser.password === password
      && registeredUser.role === role
    ))
    if (!user) {
      setError('Incorrect email, password, or role.')
      return
    }

    localStorage.setItem('edubridge_current_user', JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role,
    }))
    navigate(role === 'student' ? '/student/dashboard' : '/mentor/dashboard')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <label htmlFor="login-email">Email address</label>
      <input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />
      <label htmlFor="login-password">Password</label>
      <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" />
      <RoleSelector value={role} onChange={(event) => setRole(event.target.value)} />
      <button className="auth-submit" type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
