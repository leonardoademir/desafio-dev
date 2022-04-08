# Desafio programação - para vaga desenvolvedor

Por favor leiam este documento do começo ao fim, com muita atenção.
O intuito deste teste é avaliar seus conhecimentos técnicos em programação.
O teste consiste em parsear [este arquivo de texto(CNAB)](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt) e salvar suas informações(transações financeiras) em uma base de dados a critério do candidato.
Este desafio deve ser feito por você em sua casa. Gaste o tempo que você quiser, porém normalmente você não deve precisar de mais do que algumas horas.

### :memo: Sobre a aplicação

Esta é uma aplicação FullStack para um desafio de admissão de vaga. Consiste num sistema de upload de arquivos CNAB e leitura dos mesmos, parseando adequadamentoe os arquivos e os listando em tela.

### :bookmark_tabs: **Rotas**
A api pode ser acessada em https://pokedex-jacto-admission.herokuapp.com/api </br>
No qual:</br>
'/stores' lista todas as lojas cadastradas. [GET]</br>
'/transactions/' lista todas as transações. [GET]</br>
'/transactions/<id>' lista todas as transações de uma loja específica. [GET]</br>
'/uploader' recebe um arquivo CNAB e o cadastra respectivamente nas transações, o arquivo precisa seguir o exemplo abaixo. [POST]</br>

# Documentação do CNAB

| Descrição do campo  | Inicio | Fim | Tamanho | Comentário
| ------------- | ------------- | -----| ---- | ------
| Tipo  | 1  | 1 | 1 | Tipo da transação
| Data  | 2  | 9 | 8 | Data da ocorrência
| Valor | 10 | 19 | 10 | Valor da movimentação. *Obs.* O valor encontrado no arquivo precisa ser divido por cem(valor / 100.00) para normalizá-lo.
| CPF | 20 | 30 | 11 | CPF do beneficiário
| Cartão | 31 | 42 | 12 | Cartão utilizado na transação 
| Hora  | 43 | 48 | 6 | Hora da ocorrência atendendo ao fuso de UTC-3
| Dono da loja | 49 | 62 | 14 | Nome do representante da loja
| Nome loja | 63 | 81 | 19 | Nome da loja

### :hammer: **Configurando o Projeto**

clone o projeto
vá para a branch -dev-: git checkout dev
com o projeto aberto, vamos executar os seguintes comandos de configuração


BACKEND
cd /backend/
py -m venv venv
.\venv\Scripts\Activate
* deverá aparecer um (venv) no início do seu console *
pip install -r requirements.txt
py  run.py

Caso esteja familizariado com Docker, na raiz do projeto digite:
docker build -t python-app
docker run python-app
OU
docker-compose up

Configurando o banco:
DB - MySQL
No terminal digite:
CREATE DATABASE cnab_bycoders CHARACTER SET utf8 COLLATE utf8_general_ci;
(o nome fica a sua escolha, apenas atente-se a alterá-lo em config.py)

flask db init
flask db migrate -m "Initial Migrate"
flask db upgrade

Você deverá visualizar as tabelas sendo detectadas e criadas...
Se atente aos dados de usuário e senha do banco em config.py
Rode esses comandos no terminal do MySQL
INSERT INTO transaction_type (id, description, nature, type) VALUES (1, 'Débito', 'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (2, 'Boleto', 'Saída', '-');
INSERT INTO transaction_type (id, description, nature, type) VALUES (3, 'Financiamento', 'Saída', '-');
INSERT INTO transaction_type (id, description, nature, type) VALUES (4, 'Crédito', 'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (5, 'Recebimento Empréstimo', 'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (6, 'Vendas',	'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (7, 'Recebimento TED', 'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (8, 'Recebimento DOC', 'Entrada', '+');
INSERT INTO transaction_type (id, description, nature, type) VALUES (9, 'Aluguel', 'Saída', '-');

Esta é a tabela de-para para consulta dos tipos de transações.
# Documentação sobre os tipos das transações
| Tipo | Descrição | Natureza | Sinal |
| ---- | -------- | --------- | ----- |
| 1 | Débito | Entrada | + |
| 2 | Boleto | Saída | - |
| 3 | Financiamento | Saída | - |
| 4 | Crédito | Entrada | + |
| 5 | Recebimento Empréstimo | Entrada | + |
| 6 | Vendas | Entrada | + |
| 7 | Recebimento TED | Entrada | + |
| 8 | Recebimento DOC | Entrada | + |
| 9 | Aluguel | Saída | - |

E é isso ! Você já pode acessar localhost:5000/ com as rotas descritas acima.

FRONTEND
na raiz do projeto vá para /frontend
cd frontend
npm i
npm start
