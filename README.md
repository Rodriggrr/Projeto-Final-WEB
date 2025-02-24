# Quixadá Tour  

Quixadá Tour será uma plataforma online de agendamento de visitas a pontos turísticos de Quixadá. O objetivo é cadastrar turistas, exibir locais de interesse e recomendar transportes ou guias quando necessário, promovendo uma experiência mais prática e agradável.  

## Membros da equipe  

- **Rodrigo Farinon** - 535790  
- **Rodrigo Cauã** - 539234  
- **Caio Cezar** - 542322

## Objetivo Geral  

Fomentar o turismo na cidade de Quixadá, melhorando a acessibilidade a serviços como mototáxis e gerando novas oportunidades no mercado de guias turísticos. Um exemplo é a facilitação do acesso a locais emblemáticos, como a Pedra da Galinha Choca.  

## Público-Alvo  

Pessoas que desejam explorar e conhecer melhor a belíssima cidade de Quixadá.  

## Impacto Esperado  

A plataforma trará:  
- **Planejamento Simplificado**: Auxílio na organização de visitas a Quixadá.  
- **Melhor Experiência**: Facilidade ao escolher transportes recomendados e ao localizar pontos turísticos menos acessíveis.  
- **Acervo de Guias**: Disponibilidade de profissionais para guiar os visitantes em passeios personalizados.  

## Papéis ou Tipos de Usuário da Aplicação  

- **Turista**: O público principal da plataforma, interessado em explorar Quixadá.  
- **Administrador**: Responsável por cadastrar pontos turísticos e gerenciar feedbacks dos usuários.  
- **Guia**: Profissional que promoverá seus serviços, indicando dias e horários disponíveis para tours, permitindo que turistas agendem passeios diretamente.  
- **Taxista ou Mototaxista**: Profissionais que facilitarão o transporte dos turistas até os destinos escolhidos.  
- **Usuário não logado**: Visitantes que poderão visualizar pontos turísticos, mas não terão acesso a interações como agendamentos ou contato com guias e motoristas.  

## Principais Funcionalidades da Aplicação  

1. **Disponível para Todos os Usuários**:  
   - Visualizar pontos turísticos, guias, motoristas e suas avaliações.  

2. **Funcionalidades para Profissionais**:  
   - Adicionar novos pontos turísticos.  
   - Apresentar agendas de tours.  
   - Cadastrar-se como motorista ou guia.

3. **Funcionalidades para Turistas**:  
   - Agendar passeios com guias.  
   - Recrutar veículos para transporte.  
   - Avaliar pontos turísticos, guias e motoristas.  


## Entidades ou tabelas do sistema

Liste as principais entidades do sistema.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |

## Funcionalidades do Sistema
1. Login
   
   Como funciona:
   O usuário insere email e senha para acessar o sistema.
   Após o login: O usuário é redirecionado para a página inicial (home), onde pode avaliar outros usuários ou pontos turísticos.

3. Home
   Usuário não logado:
   
      - Pode visualizar pontos turísticos.
      - Pode listar guias e localizar motoristas.
      - Pode fazer login ou se registrar.
   
   Usuário logado:
   
      - Pode avaliar pontos turísticos e outros usuários.

4. Registrar
   
   - Turista: Na primeira tela, o usuário pode se registrar como turista.
   
   - Parceiro (Guia ou Motorista): Ao clicar em "Quero ser um parceiro", o usuário pode se registrar como guia ou motorista, fornecendo informações de contato.
   
   - Após o registro: O usuário é redirecionado para o perfil, onde pode visualizar e editar suas informações.

5. Listar
   
   - Guias: Ao clicar em "Guias > Listar", todos os guias cadastrados serão exibidos.
   
   - Turistas: Ao clicar em "Turistas > Localizar", todos os turistas cadastrados serão listados.

6. Perfil
    
   Informações disponíveis: O usuário pode visualizar e editar suas informações, como:
   
      Sobre mim
      Nome completo
      Data de nascimento (editável)
      Sexo
      Email
      Senha (editável)
      Avaliações: O usuário pode ver as avaliações que recebeu.

7. Usuários não logados
    
   O que podem fazer:
   
      Listar guias, motoristas e pontos turísticos.
      Restrições:
         - Não podem avaliar usuários ou pontos turísticos.
         - Não podem ser avaliados.

8. Pontos Turísticos

   - Avaliar: Somente usuários logados podem avaliar pontos turísticos.   
   - Agendar: Usuários logados podem agendar serviços com guias disponíveis.

9. Admin
    
   Acesso restrito: Somente administradores podem logar como admin.
   
   Funcionalidades:
   
      - Gerenciar atrações (pontos turísticos).  
      - Gerenciar usuários (turistas, guias, motoristas).
      - Gerenciar avaliações.

**Fluxo de Uso**

      Registro:
      
         Escolha entre se registrar como turista ou parceiro (guia/motorista).
         
         Preencha os dados necessários e conclua o registro.
      
      Login:
      
         Insira email e senha para acessar o sistema.
         
         Navegação:
      
         Turistas: Podem avaliar pontos turísticos, agendar guias e visualizar perfis.
         
         Guias/Motoristas: Podem gerenciar seu perfil e serem avaliados por turistas.
         
         Admin: Gerenciar o sistema (atrações, usuários e avaliações).
      
      Avaliações:
      
         Somente usuários logados podem avaliar pontos turísticos e outros usuários.
      
      Perfil:
      
         Edite suas informações pessoais e visualize suas avaliações.
      
      Restrições
      
            Usuários não logados: Apenas visualizam informações, sem permissão para avaliar ou ser avaliados.
            
            Admin: Acesso exclusivo para gerenciamento do sistema.






























