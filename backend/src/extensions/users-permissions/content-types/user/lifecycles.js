'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  afterCreate: async (event) => {
    const { result, params } = event; // 'result' contém o usuário criado, 'params' contém os dados da requisição

    try {
    //   // A partir do 'result' (usuário criado), podemos agora criar o perfil público.
      const userId = result.id;

    //   // Dados para o perfil público
      const publicProfileData = {
        data: {
          nome: result.username,  // Utilizando o username como nome
          sexo: "Outro",  // Ou qualquer outro dado necessário
          owner: userId  // Relacionando o perfil ao usuário recém-criado
        }
      };

      // Criando o perfil público associado ao usuário
      await strapi.entityService.create('api::usuario.usuario', publicProfileData);

      // Caminho para o arquivo de logs
      const logFilePath = path.join(__dirname, '../../../../../../logs.txt');

      // Escrevendo no arquivo de logs
      fs.appendFileSync(logFilePath, `Perfil público criado para usuário ${result.username}.\n`);
    } catch (error) {
      console.error('Erro ao criar perfil público ou escrever no log:', error);
    }
  }
};