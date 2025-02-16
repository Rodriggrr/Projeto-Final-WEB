document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const emailInput = document.getElementById("e-mail");
    const passwordInput = document.getElementById("senha");
    const usuarioInput = document.getElementById("usuario");

    const emailError = document.getElementById("email-error");
    const senhaError = document.getElementById("senha-error");
    const usuarioError = document.getElementById("usuario-error");

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[A-Z]).{8,15}$/;
        return re.test(password);
    }

    function validateUsername(username) {
        const re = /^[a-zA-Z0-9_]{3,16}$/;
        return re.test(username);
    }

    function validateForm() {
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Digite um e-mail válido.";
            emailError.style.display = "block";
            isValid = false;
        } else {
            emailError.style.display = "none";
        }

        if (passwordInput.value.trim().length === 0) {
            senhaError.textContent = "A senha não pode ficar em branco.";
            senhaError.style.display = "block";
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            senhaError.textContent = "A senha deve ter entre 8 e 15 caracteres, incluindo números e letras maiúsculas.";
            senhaError.style.display = "block";
            isValid = false;
        } else {
            senhaError.style.display = "none";
        }

        if (usuarioInput.value.trim().length === 0) {
            usuarioError.textContent = "O usuário não pode ficar em branco.";
            usuarioError.style.display = "block";
            isValid = false;
        } else if (!validateUsername(usuarioInput.value)) {
            usuarioError.textContent = "O usuário deve ter entre 3 e 16 caracteres e pode conter apenas letras, números e underscores (_).";
            usuarioError.style.display = "block";
            isValid = false;
        } else {
            usuarioError.style.display = "none";
        }

        return isValid;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (validateForm()) {
            const userData = {
                username: usuarioInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            };

            try {
                const userResponse = await fetch("http://localhost:1337/api/auth/local/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const userDataResponse = await userResponse.json();

                if (!userResponse.ok) {
                    throw new Error(userDataResponse.error?.message || "Erro desconhecido ao registrar usuário.");
                }

                const userId = userDataResponse.user.id;

                const publicProfileData = {
                    data: {
                        nome: usuarioInput.value,
                        usuario: userId, 
                    },
                };

                const publicResponse = await fetch("http://localhost:1337/api/public", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userDataResponse.jwt}`,
                    },
                    body: JSON.stringify(publicProfileData),
                });

                const publicDataResponse = await publicResponse.json();

                if (!publicResponse.ok) {
                    throw new Error(publicDataResponse.error?.message || "Erro ao criar perfil público.");
                }

                alert("Registro e perfil público criados com sucesso!");
                window.location.href = "../login/login.html";

            } catch (error) {
                console.error("Erro:", error);
                alert(error.message);
            }
        }
    });
});
