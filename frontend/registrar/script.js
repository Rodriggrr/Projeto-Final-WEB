document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const emailInput = document.getElementById("e-mail");
    const passwordInput = document.getElementById("senha");
    const usuarioInput = document.getElementById("usuario");

    const emailError = document.getElementById("email-error");
    const senhaError = document.getElementById("senha-error");
    const usuarioError = document.getElementById("usuario-error");

    const API_URL = "http://localhost:1337/api";

    function showError(inputField, errorField, message) {
        errorField.textContent = message;
        errorField.style.display = "block";
        inputField.classList.add("error");
    }

    function clearError(inputField, errorField) {
        errorField.style.display = "none";
        inputField.classList.remove("error");
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function validatePassword(password) {
        return /^(?=.*\d)(?=.*[A-Z]).{8,15}$/.test(password);
    }

    function validateUsername(username) {
        return /^[a-zA-Z0-9_]{3,16}$/.test(username);
    }

    function validateForm() {
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, "Digite um e-mail válido.");
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, senhaError, "A senha deve ter entre 8 e 15 caracteres, incluindo números e letras maiúsculas.");
            isValid = false;
        } else {
            clearError(passwordInput, senhaError);
        }

        if (!validateUsername(usuarioInput.value)) {
            showError(usuarioInput, usuarioError, "O usuário deve ter entre 3 e 16 caracteres e pode conter apenas letras, números e underscores (_).");
            isValid = false;
        } else {
            clearError(usuarioInput, usuarioError);
        }

        return isValid;
    }

    async function registerUser(userData) {
        try {
            const response = await fetch(`${API_URL}/auth/local/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Erro ao registrar usuário.");

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function createPublicProfile(userId, jwt) {
        try {
            const publicProfileData = {
                data: {
                    nome: usuarioInput.value,
                    usuario: userId,
                },
            };

            const response = await fetch(`${API_URL}/publics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(publicProfileData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Erro ao criar perfil público.");

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (validateForm()) {
            try {
                const userData = {
                    username: usuarioInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                };

                const registeredUser = await registerUser(userData);
                await createPublicProfile(registeredUser.user.id, registeredUser.jwt);

                alert("Registro e perfil público criados com sucesso!");
                window.location.href = "../login/login.html";

            } catch (error) {
                console.error("Erro:", error);
                alert(error.message);
            }
        }
    });
});
