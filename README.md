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

# Como utilizar o Sistema?
**Login**
Email e senha, ao logar você será redirecionado para a home, onde poderá avaliar outros usuarios ou pontos turisticos.
**Home**
Ao abrir a home o usuário(não-logado) poderá ver os pontos turisticos, as avaliações dele, poderá listar guias e localizar motoristas.
O usuário poderá fazer o login ou se registrar.
**Registrar**
Na primeira tela você irá se registrar como turista.
Ao clicar em Quero ser um parceiro, você irá se registrar como guia ou como motorista além de colocar o contato.
Ao concluir o registro o usuario irá ser redirecionado para o perfil onde tem suas informações.
**Listar**
Ao clicar em guias > listar todos os guias cadastrados irão ser listados.
Ao clicar em turistas > localizar todos os turistas irão ser listados.
**Perfil**
Ao clicar em perfil o usuário poderá ver suas informações como sobre mim, nome completo, data de nascimento(pode ser alterado), sexo, email e senha(pode ser alterado), além de ver suas avaliações.
**Usuarios não-logados**
Usuários não-logados podem listar guias ou motoristas e pontos turisticos.
NÃO PODEM avaliar usuários e pontos turisticos.
NãO PODEM ser avaliados.
**Pontos turisticos**
Para avaliar é necessário estar logado.
Ao logar o usuario poderá avaliar um ponto turistico, agendar com um guia disponivel.
**ADMIN**
APENAS ADMINS PODEM LOGAR.
Ao logar como admin o usuario poderá gerenciar atrações, usuarios e avaliações.






























