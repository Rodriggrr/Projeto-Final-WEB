'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
    afterCreate: async (event) => {
        let roles = Array(3);
        let rolesJson = await strapi.entityService.findMany('plugin::users-permissions.role')
        rolesJson.forEach(role => {
            if(role.type == 'turista')   roles[0] = role;
            if(role.type == 'guia')      roles[1] = role;
            if(role.type == 'motorista') roles[2] = role;
        });

        console.log(roles);

        const { result, params } = event; // 'result' contém o usuário criado, 'params' contém os dados da requisição
        console.log(params)
        try {
            //   // A partir do 'result' (usuário criado), podemos agora criar o perfil público.
            const userId = result.id;
            const parceria = result.parceria;


            //   // Dados para o perfil público
            const publicProfileData = {
                data: {
                    nome: result.username,  // Utilizando o username como nome
                    sexo: "Outro",  // Ou qualquer outro dado necessário
                    owner: userId,  // Relacionando o perfil ao usuário recém-criado
                    parceria: parceria
                }
            };

            // Criando o perfil público associado ao usuário
            await strapi.entityService.create('api::usuario.usuario', publicProfileData);           
            await strapi.entityService.update('plugin::users-permissions.user', userId, { data: { role: roles[parceria] } });
            // Caminho para o arquivo de logs
            const logFilePath = path.join(__dirname, '../../../../../../logs.txt');

            // Escrevendo no arquivo de logs
            fs.appendFileSync(logFilePath, `Perfil público criado para usuário ${result.username}.\n`);
        } catch (error) {
            console.error('Erro ao criar perfil público ou escrever no log:', error);
        }
    }
};