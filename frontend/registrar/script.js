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
                // Fazendo requisição para cadastrar usuário no Strapi
                const userResponse = await fetch("http://localhost:1337/api/auth/local/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const userDataResponse = await userResponse.json();
                
                if (!userResponse.ok) {
                    throw new Error(userDataResponse.error?.message || JSON.stringify(userDataResponse));
                }

                console.log("Usuário registrado:", userDataResponse);

                const userId = userDataResponse.user.id;

                const publicProfileData = {
                    data: {
                        nome: usuarioInput.value, 
                        sexo: "Masculino",
                    },
                };

                // Criando perfil público do usuário
                const publicResponse = await fetch("http://localhost:1337/api/usuarios", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userDataResponse.jwt}`,
                    },
                    body: JSON.stringify(publicProfileData),
                });

                

                const publicDataResponse = await publicResponse.json();
                let publicId = publicDataResponse.id;

                const meRelationData = {
                    data: {
                        usuario: publicId,
                    },
                };

                console.log("🔍 Resposta da API do Strapi:", userDataResponse.user);

                const ownerResponse = await fetch("http://localhost:1337/api/users/"+ userDataResponse.user.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userDataResponse.jwt}`,
                    },
                    body: JSON.stringify(meRelationData),
                });
                
                console.log("🔍 Resposta da API do Strapi:", publicDataResponse);

                if (!publicResponse.ok) {
                    throw new Error(publicDataResponse.error?.message || JSON.stringify(publicDataResponse));
                }
                
                sessionStorage.setItem('jwtToken', userDataResponse.jwt);
                alert("Registro e perfil público criados com sucesso!");
                window.location.href = "../profile/profile.html";

            } catch (error) {
                console.error("Erro ao registrar usuário:", error);
            
                if (error instanceof Response) { // Se for um erro de resposta HTTP
                    error.json().then(errData => {
                        alert("Erro: " + JSON.stringify(errData));
                    });
                } else {
                    alert(error.message);
                }
            }
        }
    });
});
