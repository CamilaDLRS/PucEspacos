# PUC ESPAÇOS

## Visão Geral

O sistema é uma plataforma de reserva de espaços para a PUC, permitindo que colaboradores reservem espaços com diferentes permissões. Os usuários devem estar cadastrados e as reservas são controladas pelas secretarias. O sistema também impõe regras para evitar conflitos de reserva. O administrador é responsável pela gestão do sistema, incluindo a criação de espaços e controle de usuários.

### Problemas Resolvidos

- Facilidade no controle dos registros.
- Possibilidade de confirmação sem necessidade de aguardar retorno (como docente).
- Autonomia na solicitação da reserva.
- Disponibilidade para discentes, com aprovação.
- Informações sobre o espaço.
- Administração centralizada em um único sistema.

### Principais Atores Envolvidos

- Discente
- Docente
- Administrador
- Secretário

## Versão Inicial - MVP

Atualmente, o agendamento de espaços na PUC é gerenciado através da plataforma Magister. Na versão inicial do PUC Espaços, não será incorporada nenhuma integração com o Magister ou qualquer outro sistema da PUC para autenticação de usuários, por exemplo. Inicialmente, iremos simular exemplos de login de usuários, e as reservas não estarão vinculadas ao ensalamento de turmas, embora possam convergir no futuro. Essa abordagem é adotada devido ao caráter experimental desta versão, que serve como prova de conceito para a organização das reservas de espaços institucionais. Posteriormente, as versões completas do projeto poderão integrar-se à base de autenticação da PUCPR e decidir se irão se comunicar com o Magister ou se o PUC Espaços abarcará todo o controle de agendamento. A inclusão do agendamento exigiria a participação do Coordenador como ator. Nesta versão inicial, não haverá controle detalhado de campus, blocos e escolas, nem registros de tipos específicos de ativos e espaços, os quais serão pré-cadastrados no banco de dados para facilitar o início do uso do sistema.

Para acompanhar as histórias de usuários do projeto, consulte o quadro [aqui](https://trello.com/b/qXTuOJSh/puc-espa%C3%A7os).

## Tecnologias Utilizadas

O projeto Madero Cash é desenvolvido usando as seguintes tecnologias e serviços:

- **Linguagem de Programação**: Node.js com TypeScript.
- **Banco de Dados**: banco de dados será gerenciado a partir do MYSQL.
- **Hospedagem e Implantação**: ?.
- **Controle de Acesso e Autenticação**: ?.
- **Registros e Auditoria**: ?.

## Contribuições

Este projeto é parte integrante do trabalho final para a disciplina de Experiência Criativa - Projetando Soluções Computacionais do terceiro semestre do curso de Engenharia de Software da PUCPR e não está aberto a contribuições externas. Apenas membros da equipe de sistemas da disciplina têm permissão para contribuir e acessar o código-fonte.

Para mais informações ou dúvidas sobre o projeto, entre em contato com a equipe de desenvolvimento do projeto.

Agradecemos por seu interesse e apoio ao PUC Espaços!


# PUC ESPAÇOS API

### Configuração - VS CODE material-icon-theme

Press Ctrl-Shift-P

```json
{
    "material-icon-theme.files.associations": {
        "*.ts": "typescript",
        "**.json": "json",
        "**.repository.ts": "Database",
        "**.service.ts": "TypeScript",
        "**.cron.ts": "Robot",
        ".secret.local": "Key"
    },
    "material-icon-theme.folders.color": "#FFFFFF",
    "material-icon-theme.folders.associations": {
        "repositories": "Database",
        "firestore": "Firebase",
        "infra": "Context",
        "http": "Public",
        "crons": "Job",
        "entities": "Interface",
        "dtos": "Class",
        "mappers": "Mappings",
        "projections": "Mappings",
        "triggers": "Target",
        "enums": "Content",
        "payment": "Cart",
        "logger": "Log",
        "pubsub": "Fastlane"
    }
}
```

## Instalação

Para mais informações sobre o projeto, entre em contato com a equipe de desenvolvimento.