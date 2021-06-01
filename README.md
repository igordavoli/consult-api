# camp-21 | Time 2

<img src="https://github.com/ajalvesneto/campioasys2fase/blob/main/CampIoasys2Fase/Resources/Assets.xcassets/logo.png"/>

#

- [x] Cadastro de Usuários
- [x] Alteração do Perfil 
- [x] Listagem de Profissionais
- [x] Solicitação de Consulta
- [x] Confirmar Consulta
- [x] Cancelar de Consulta
- [x] Histórico de Consulta
- [x] Avaliação de consulta

# Instruções

- Crie um banco de dados para desenvolvimento
- Crie um banco de dados para testes
- Ronomeie o arquivo .env.exemple para .env
- Coloque as respecivas informações no arquivo .env
- execute "yarn test" dentro do diretorio raiz do projeto
  - Se algum teste falhar será nescessario apagar os dados escritos no banco manualmente
  - Se todos os teste passarem execute as migrations com "yarn migrate"
- Execute os seeders com "yarn seedAll"
- "yarn start:dev" e a aplicação já estará rodando em ambiente de desenvolvimento 

# Observações

- No arquivo .env, os valores das variáveis precisam ser de acordo com as que você possui no seu ambiante, o arquivo .env.example é so um modelo de quais variáveis são necessárias para o projeto.

# Sequelize

- O Sequelize é o ORM que utilizamos nesse projeto, ele nos ajuda facilitando a comunicação entre nossa aplicação e o banco de dados. Ele possui uma documentação bem completa que pode ser consultada no link abaixo.

- [Documentação](https://sequelize.org/master/)

- Lembrete: Para o Sequelize funcionar, você já precisa ter criado o banco que será utilizado, inclusive o banco de testes, e depois só passar os nomes desses bancos no arquivo .env, a sua aplicação também vai precisar ter a lib do banco que você está utilizando, (caso seja Postgresql o driver já está instalado) é possível ver um exemplo neste [link](https://sequelize.org/master/manual/getting-started.html) da documentação.


# Postman

- Este é o link da collection que criei no postman com as rotas de login e listagem de usuários, para utiliza-la basta abrir o postman e importar via link e colocar o seguinte link `https://www.getpostman.com/collections/079c561b35bb6e1cbc11`.
