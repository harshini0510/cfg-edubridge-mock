import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleSelector from './RoleSelector'

function RegisterForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim() || !form.role) {
      setError('Complete every field and choose a role to continue.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const email = form.email.trim().toLowerCase()
    const users = JSON.parse(localStorage.getItem('edubridge_users') || '[]')
    if (users.some((user) => user.email === email)) {
      setError('An account with this email already exists.')
      return
    }

    users.push({
      id: `${form.role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: form.name.trim(),
      email,
      password: form.password,
      role: form.role,
    })
    localStorage.setItem('edubridge_users', JSON.stringify(users))
    navigate('/login', { state: { message: 'Account created successfully. You can now log in.' } })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <label htmlFor="register-name">Full name</label>
      <input id="register-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" autoComplete="name" />
      <label htmlFor="register-email">Email address</label>
      <input id="register-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
      <label htmlFor="register-password">Password</label>
      <input id="register-password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" />
      <label htmlFor="register-confirm-password">Confirm password</label>
      <input id="register-confirm-password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" autoComplete="new-password" />
      <RoleSelector value={form.role} onChange={(event) => setForm((currentForm) => ({ ...currentForm, role: event.target.value }))} />
      <button className="auth-submit" type="submit">Create account</button>
    </form>
  )
}

export default RegisterForm
