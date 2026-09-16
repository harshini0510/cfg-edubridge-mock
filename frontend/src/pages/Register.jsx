import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

function Register() {
  return (
    <main className="auth-page">
      <section className="auth-card auth-card-register" aria-labelledby="register-heading">
        <a className="auth-brand" href="/login" aria-label="EduBridge home"><span className="auth-brand-mark">E</span><span>Edu<span>Bridge</span></span></a>
        <div className="auth-heading"><p className="auth-eyebrow">JOIN EDUBRIDGE</p><h1>Create your account</h1><p>Start building a brighter learning future together.</p></div>
        <RegisterForm />
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  )
}

export default Register
