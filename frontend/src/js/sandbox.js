async function createPublicProfile() {
    try {
        // const publicProfileData = {
        //     data: {
        //         nome_completo: usuarioInput.value, 
        //         sexo: "Masculino",
        //         owner : userId,
        //     },
        // };

        // Criando perfil público do usuário
        const publicResponse = await fetch("http://localhost:1337/api/users/me?populate=role", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQwMDk1MTc3LCJleHAiOjE3NDI2ODcxNzd9.ninFr1x8TI61CZzSR4X1XbrjdrhfH-A7_WFvYrw7m_8`
            },
            // body: JSON.stringify(publicProfileData),
        });

        const publicDataResponse = await publicResponse.json();

        console.log("🔍 Resposta da API do Strapi:", publicDataResponse);

        if (!publicResponse.ok) {
            throw new Error(publicDataResponse.error?.message || JSON.stringify(publicDataResponse));
        }

        // sessionStorage.setItem('jwtToken', userDataResponse.jwt);
        // alert("Registro e perfil público criados com sucesso!");
        // window.location.href = "../profile/profile.html";

    } catch (error) {
        console.error("Erro ao registrar usuário:", error);

        if (error instanceof Response) { // Se for um erro de resposta HTTP
            error.json().then(errData => {
                //alert("Erro: " + JSON.stringify(errData));
            });
        } else {
            //alert(error.message);
        }
    }
}

createPublicProfile();