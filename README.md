## Daily Diet API



###### RF's (Requisitios Funcionais)

* [ ] Deve ser possível criar um usuário.
* [ ] Deve ser possível identificar o usuário entre as requisições.
* [ ] Deve ser possível registrar uma refeição feita.
* [ ] Deve ser possível editar uma refeição.
* [ ] Deve ser possível apagar uma refeição.
* [ ] Deve ser possível visualizar uma única refeição.
* [ ] Deve ser possível listar todas as refeições de um usuário.
* [ ] Deve ser possível recuperar as métricas de um usuário.

###### RN's (Regras de negócio)

* [ ] O usuário não deve poder se cadastrar com um e-mail duplicado.
* [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou.
* [ ] As refeições devem ser relacionadas a um usuário.

###### RNF's (Requisitos não-funcionais)

* [ ] A senha do usuário precisa estar criptografada.
* [ ] Os dados da aplicação precisam estar persistidos em um banco SQLite.
* [ ] Todas listas de dados precisam estar paginadas com 20 itens por página.
* [ ] O usuário deve ser identificado por um JWT(JSON Web Token).
