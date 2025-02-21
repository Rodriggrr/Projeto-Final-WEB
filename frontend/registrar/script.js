
async function getPublicUserId(authToken) {
    try {
        let response = await fetch('http://localhost:1337/api/users/me?populate[0]=usuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuário.');
        let data = await response.json();
        return data.usuario.documentId;
    } catch (error) {
        console.log("Erro: " + error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const emailInput = document.getElementById("e-mail");
    const passwordInput = document.getElementById("senha");
    const usuarioInput = document.getElementById("usuario");
    const telefoneInput = document.getElementById("telefone");

    const emailError = document.getElementById("email-error");
    const senhaError = document.getElementById("senha-error");

    const params = new URLSearchParams(window.location.search);
    const parceriaValue = params.get('parceria') || '0';
    const isParceria = parceriaValue !== '0';

    const parceriaLink = document.querySelector(".parceria");

    if(parceriaLink){
        parceriaLink.addEventListener("click", function(event){
            event.preventDefault();
            window.location.href = "./registrar.html?parceria=true";
        });
    }


    if(isParceria){
        const telefoneDiv = document.createElement("div");
        const radioGuia = document.createElement("div");
        radioGuia.classList.add("radio");
        telefoneDiv.classList.add("telefone");

        parceriaLink.style.display = "none";
        telefoneDiv.innerHTML = `
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" required>
        `;

        radioGuia.innerHTML = `
            <label for="parceria">Quero ser um...</label>
            <div id="parceria-radio">
                <div>
                    <input type="radio" id="guia" name="parceria" value="guia" required>
                    <label for="guia">Guia</label>
                </div>
                <div>
                    <input type="radio" id="motorista" name="parceria" value="motorista" required>
                    <label for="motorista">Motorista</label>
                </div>
            </div>
        `

        const formFields = form.querySelector(".senha"); // Inserir antes do botão
        form.insertBefore(telefoneDiv, formFields.nextSibling);
        form.insertBefore(radioGuia, telefoneDiv.nextSibling);
    }


    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[A-Z]).{8,15}$/;
        return re.test(password);
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

        if (!validatePassword(passwordInput.value)) {
            senhaError.textContent = "A senha deve ter entre 8 e 15 caracteres, incluindo números e letras maiúsculas.";
            senhaError.style.display = "block";
            isValid = false;
        } else {
            senhaError.style.display = "none";
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

            console.log("Enviando dados para o Strapi:", userData);

            try {
                // Fazendo requisição para cadastrar usuário no Strapi
                const userResponse = await fetch("http://localhost:1337/api/auth/local/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const userDataResponse = await userResponse.json();
                
                if (!userResponse.ok) {
                    console.error("Erro na resposta do Strapi:", userDataResponse);
                    alert("Erro ao registrar: " + (userDataResponse.error?.message || "Verifique os dados e tente novamente."));
                }

                console.log("Usuário registrado:", userDataResponse);

                const userId = userDataResponse.user.id;

                // Parceria: 
                // 0 - Turista
                // 1 - Guia
                // 2 - Motorista

                // URL parceiro: ./registrar.html?parceria=true
                //como pegar?
                //const params = new URLSearchParams(window.location.search);
                //parceria = params.get('parceria');
                //window.location.href = `./registrar.html?parceria=true`;

                const publicProfileData = {
                    data: {
                        nome: usuarioInput.value, 
                        parceria: "guia",
                        contato: isParceria ? telefoneInput?.value.trim() || "" : null,
                    },
                };
                
                sessionStorage.setItem('jwtToken', userDataResponse.jwt);
                alert("Registro e perfil público criados com sucesso!");
                let publicUserId = await getPublicUserId(userDataResponse.jwt);
                sessionStorage.setItem('publicUserId', publicUserId);
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
