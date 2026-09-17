import { Link, useLocation } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'

function Login() {
  const location = useLocation()

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-heading">
        <a className="auth-brand" href="/login" aria-label="EduBridge home"><span className="auth-brand-mark">E</span><span>Edu<span>Bridge</span></span></a>
        <div className="auth-heading"><p className="auth-eyebrow">WELCOME BACK</p><h1 id="login-heading">Continue your learning journey</h1><p>Sign in to access your EduBridge workspace.</p></div>
        {location.state?.message && <p className="auth-success" role="status">{location.state.message}</p>}
        <LoginForm />
        <p className="auth-switch">New to EduBridge? <Link to="/register">Create an account</Link></p>
      </section>
    </main>
  )
}

export default Login
