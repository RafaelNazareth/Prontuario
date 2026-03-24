// =============================================
//   BANCO DE DADOS SIMULADO DE USUÁRIOS
// =============================================
const users = [
    { username: "admin",   password: "123456",   name: "Administrador" },
    { username: "usuario", password: "senha123", name: "Usuário Comum"  },
    { username: "teste",   password: "teste123", name: "Usuário Teste"  }
];

// =============================================
//   AUTENTICAÇÃO
// =============================================
function authenticate(username, password) {
    return users.find(user =>
        user.username === username && user.password === password
    );
}

// =============================================
//   MENSAGEM DE FEEDBACK
// =============================================
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;

    clearTimeout(messageDiv._timer);
    messageDiv._timer = setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3500);
}

// =============================================
//   VALIDAÇÃO DE CAMPOS
// =============================================
function validateFields(username, password) {
    if (!username || !password) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return false;
    }
    if (username.length < 3) {
        showMessage('Usuário deve ter pelo menos 3 caracteres.', 'error');
        return false;
    }
    if (password.length < 4) {
        showMessage('Senha deve ter pelo menos 4 caracteres.', 'error');
        return false;
    }
    return true;
}

// =============================================
//   TOGGLE MOSTRAR / ESCONDER SENHA
// =============================================
function setupPasswordToggle() {
    const toggleBtn  = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener('click', function () {
        const isHidden = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isHidden ? 'text' : 'password');

        if (toggleIcon) {
            toggleIcon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
        }

        // Mantém foco no campo após clique
        passwordInput.focus();
    });
}

// =============================================
//   ESTADO DE LOADING NO BOTÃO
// =============================================
function setLoading(isLoading) {
    const btn = document.querySelector('.btn-login');
    if (!btn) return;

    if (isLoading) {
        btn.classList.add('loading');
        btn.querySelector('span').textContent = 'Verificando...';
        btn.querySelector('i').className = 'bi bi-hourglass-split';
    } else {
        btn.classList.remove('loading');
        btn.querySelector('span').textContent = 'Entrar';
        btn.querySelector('i').className = 'bi bi-arrow-right';
    }
}

// =============================================
//   SUBMIT DO FORMULÁRIO
// =============================================
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!validateFields(username, password)) return;

    // Simula um pequeno delay de autenticação (realista)
    setLoading(true);

    setTimeout(() => {
        setLoading(false);

        const user = authenticate(username, password);

        if (user) {
            showMessage(`Bem-vindo, ${user.name}! Redirecionando...`, 'success');

            // Limpa os campos
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password').setAttribute('type', 'password');
            const icon = document.getElementById('toggleIcon');
            if (icon) icon.className = 'bi bi-eye';

            console.log('Usuário autenticado:', user);

            // Redirecionar após login bem-sucedido
            // setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);

        } else {
            showMessage('Usuário ou senha inválidos.', 'error');

            // Destaca os campos com erro
            document.getElementById('username').focus();
        }
    }, 700);
});

// =============================================
//   INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    setupPasswordToggle();

    // Recupera "lembrar acesso" do localStorage
    const saved = localStorage.getItem('rememberedUser');
    if (saved) {
        document.getElementById('username').value = saved;
        document.getElementById('remember').checked = true;
    }

    // Salva usuário se "lembrar" estiver marcado
    document.getElementById('loginForm').addEventListener('submit', function () {
        const username = document.getElementById('username').value.trim();
        const remember = document.getElementById('remember').checked;
        if (remember && username) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
    });
});