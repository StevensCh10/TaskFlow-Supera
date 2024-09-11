# Atividade realizada no processo seletivo da Supera

Título: TaskFlow <br>
Desenvolvedor: Stevens Wendell Marinho Chaves <br>

## Descrição do Projeto
TaskFlow é uma aplicação web de gerenciamento de tarefas desenvolvida para simplificar o acompanhamento de atividades e projetos. Com uma interface intuitiva e funcionalidades que permitem organizar, priorizar e visualizar tarefas de forma eficiente, o TaskFlow ajuda usuários a manterem-se produtivos e focados em suas metas.

### Observações
A aplicação desenvolvida não disponibiliza de todas as funcionalidades (por enquanto) que a priori deveria disponibilizar.

## Principais Tecnologias Utilizadas:

### Backend:
  - Java
  - Spring Boot
  - Spring Validation
  - Spring Doc
  - Maven
  - MySQL
  - Lombok
  - jpa

### Frontend:  
  - Typescript
  - React + vite
  - React-router-dom
  - Axios

## Funcionalidades:
  - Cadastro de Usuários.
  - Adição de Tarefas.
  - Adição de Etapas.
  - Visualização de Tarefas.
  - Visualização de Etapas.

## Como Utilizar a Aplicação:
Para utilizar o projeto, é necessário executar separadamente o frontend e o backend. Siga as instruções abaixo:

### Frontend:
1. Navegue até a pasta frontend.
2. Execute o comando npm install para instalar as dependências.
3. Execute o comando npm run dev para iniciar o servidor de desenvolvimento.

### Backend:
1. Navegue até a pasta backend.
2. Execute o comando ./mvnw spring-boot:run para iniciar o servidor backend.
3. Certifique-se de configurar corretamente as variáveis de ambiente e conexões de banco de dados conforme necessário na pasta /src/main/resources/application.properties.

## Documentação da API disponível (depois de inicializar a aplicação) em: 
  <a>http://localhost:8080/swagger-ui/index.html</a>