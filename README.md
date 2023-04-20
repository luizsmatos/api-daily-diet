## Daily Diet API

###### RF's (Requisitios Funcionais)

* [X] Deve ser possível criar um usuário.
* [ ] Deve ser possível identificar o usuário entre as requisições.
* [X] Deve ser possível registrar uma refeição feita.
* [X] Deve ser possível editar uma refeição.
* [ ] Deve ser possível apagar uma refeição.
* [ ] Deve ser possível visualizar uma única refeição.
* [ ] Deve ser possível listar todas as refeições de um usuário.
* [ ] Deve ser possível recuperar as métricas de um usuário.

###### RN's (Regras de negócio)

* [X] O usuário não deve poder se cadastrar com um e-mail duplicado.
* [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou.
* [ ] As refeições devem ser relacionadas a um usuário.

###### RNF's (Requisitos não-funcionais)

* [X] A senha do usuário precisa estar criptografada.
* [X] Os dados da aplicação precisam estar persistidos em um banco SQLite.
* [ ] Todas listas de dados precisam estar paginadas com 20 itens por página.
* [ ] O usuário deve ser identificado por um JWT(JSON Web Token).
