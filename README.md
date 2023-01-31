<h1 align="center">LaBrincante</h1>

**pt.** Um microssistema de gerenciamento de matrícula escolares, criado para ajudar a resolver um problema de organização de uma escola de música.

**en.** A school enrollment management microsystem that seeks to help solving a music school's organization problem.

<hr/>

## Objetivo (Goal)

**pt.** O objetivo deste projeto é auxiliar na organização das matrículas de uma pequena escola de música, à partir da lógica já utilizada no sistema interno existente. O *frontend* consiste de uma simples interface web (ainda não muito bela, porém funcional), que faz o papel de interface homem-máquina. Já o *backend* é uma API que processa as requisições, realizando a comunicação com o banco de dados.

**en.** This project's goal is to help managing the enrollment from a small music school, based on its existing system. The *frontend* consists of a simple web interface (new yet pretty, but functional), that acts as the human-machine interface. The *backend* is and API that processes the requests, querying the database.

## Próximos Passos (Next Steps)

**pt.**
- Implementação de um gerador de PDF, possibilitando a impressão de todos horários de aula, bem estruturados, com o clique de um botão.
- Refatoração.

**en.**
- Implementation of a PDF generator, making possible to print a structured class timesheet with the press of a button.
- Refactoring.

## Tecnologias utilizadas (Tecnologies used)

### *Frontend*

- HTML e CSS
- Javascript
- React
    
### *Backend*

- Typescript
- Express
- MySQL

## Instalação (Installation)

**pt.**
1. Clone o repositorio localmente.
2. No terminal, entre no diretório do *backend*, instale as dependências e execute.

**en.**
1. Clone the repository localy.
2. In terminal, go into the *backend* directory, install the dependencies and run it.

```bash
cd backend
npm install
npm run dev

cd web
npm install
npm run dev

ou/or

cd backend
yarn
yarn dev

cd web
yarn
yarn dev
```

### License
<a href="https://choosealicense.com/licenses/mit/#">MIT</a>