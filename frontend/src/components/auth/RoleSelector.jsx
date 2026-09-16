function RoleSelector({ value, onChange }) {
  return (
    <fieldset className="auth-role-selector">
      <legend>Continue as</legend>
      <div className="auth-role-options">
        <label className={value === 'student' ? 'auth-role-option selected' : 'auth-role-option'}>
          <input type="radio" name="role" value="student" checked={value === 'student'} onChange={onChange} />
          <span>Student</span>
        </label>
        <label className={value === 'mentor' ? 'auth-role-option selected' : 'auth-role-option'}>
          <input type="radio" name="role" value="mentor" checked={value === 'mentor'} onChange={onChange} />
          <span>Mentor</span>
        </label>
      </div>
    </fieldset>
  )
}

export default RoleSelector
