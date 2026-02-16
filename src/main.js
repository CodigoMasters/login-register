import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="auth-wrap">
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <div class="auth-card">
      <div class="auth-tabs">
        <button type="button" class="auth-tab active" data-mode="login">Iniciar sesión</button>
        <button type="button" class="auth-tab" data-mode="register">Registrarse</button>
        <span class="auth-tab-slider"></span>
      </div>

      <form id="form-login" class="auth-form active" novalidate>
        <h2 class="auth-title">Bienvenido de nuevo</h2>
        <p class="auth-subtitle">Ingresa tus datos para continuar</p>
        <div class="field">
          <input type="email" id="login-email" name="email" placeholder=" " required autocomplete="email" />
          <label for="login-email">Correo electrónico</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <div class="field">
          <input type="password" id="login-password" name="password" placeholder=" " required autocomplete="current-password" />
          <label for="login-password">Contraseña</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <label class="checkbox-wrap">
          <input type="checkbox" name="remember" />
          <span class="checkmark"></span>
          Recordarme
        </label>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>

      <form id="form-register" class="auth-form" novalidate>
        <h2 class="auth-title">Crear cuenta</h2>
        <p class="auth-subtitle">Completa el formulario para registrarte</p>
        <div class="field">
          <input type="text" id="register-name" name="name" placeholder=" " required autocomplete="name" minlength="2" />
          <label for="register-name">Nombre completo</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <div class="field">
          <input type="email" id="register-email" name="email" placeholder=" " required autocomplete="email" />
          <label for="register-email">Correo electrónico</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <div class="field">
          <input type="password" id="register-password" name="password" placeholder=" " required autocomplete="new-password" minlength="6" />
          <label for="register-password">Contraseña</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <div class="field">
          <input type="password" id="register-confirm" name="confirm" placeholder=" " required autocomplete="new-password" />
          <label for="register-confirm">Confirmar contraseña</label>
          <span class="field-error" aria-live="polite"></span>
        </div>
        <label class="checkbox-wrap">
          <input type="checkbox" name="terms" required />
          <span class="checkmark"></span>
          Acepto los <a href="#">términos y condiciones</a>
        </label>
        <button type="submit" class="btn btn-primary">Registrarse</button>
      </form>
    </div>

    <p class="footer-text">Form Login & Register · Solo front-end</p>
  </div>
`

// --- Toggle Login / Register ---
const tabs = app.querySelectorAll('.auth-tab')
const slider = app.querySelector('.auth-tab-slider')
const formLogin = app.querySelector('#form-login')
const formRegister = app.querySelector('#form-register')

function setActiveTab(mode) {
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.mode === mode))
  slider.style.setProperty('--pos', mode === 'login' ? '0' : '1')
  formLogin.classList.toggle('active', mode === 'login')
  formRegister.classList.toggle('active', mode === 'register')
  formLogin.reset()
  formRegister.reset()
  app.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''))
  app.querySelectorAll('.field input').forEach((input) => input.classList.remove('error'))
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setActiveTab(tab.dataset.mode))
})

// --- Validación y mensajes ---
function showError(field, message) {
  const wrap = field.closest('.field')
  const errorEl = wrap?.querySelector('.field-error')
  if (errorEl) errorEl.textContent = message || ''
  field.classList.toggle('error', !!message)
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// --- Submit Login ---
formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = formLogin.querySelector('#login-email')
  const password = formLogin.querySelector('#login-password')
  let valid = true

  showError(email, '')
  showError(password, '')

  if (!email.value.trim()) {
    showError(email, 'El correo es obligatorio')
    valid = false
  } else if (!validateEmail(email.value)) {
    showError(email, 'Correo no válido')
    valid = false
  }
  if (!password.value) {
    showError(password, 'La contraseña es obligatoria')
    valid = false
  }

  if (valid) {
    console.log('Login:', { email: email.value, password: '***' })
    alert('¡Inicio de sesión simulado correctamente!')
  }
})

// --- Submit Register ---
formRegister.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = formRegister.querySelector('#register-name')
  const email = formRegister.querySelector('#register-email')
  const password = formRegister.querySelector('#register-password')
  const confirm = formRegister.querySelector('#register-confirm')
  let valid = true

  ;[name, email, password, confirm].forEach((f) => showError(f, ''))

  if (name.value.trim().length < 2) {
    showError(name, 'Mínimo 2 caracteres')
    valid = false
  }
  if (!email.value.trim()) {
    showError(email, 'El correo es obligatorio')
    valid = false
  } else if (!validateEmail(email.value)) {
    showError(email, 'Correo no válido')
    valid = false
  }
  if (password.value.length < 6) {
    showError(password, 'Mínimo 6 caracteres')
    valid = false
  }
  if (password.value !== confirm.value) {
    showError(confirm, 'Las contraseñas no coinciden')
    valid = false
  }
  if (!formRegister.querySelector('input[name="terms"]').checked) {
    valid = false
  }

  if (valid) {
    console.log('Register:', { name: name.value, email: email.value, password: '***' })
    alert('¡Registro simulado correctamente!')
  }
})
