# Desafio programação - para vaga desenvolvedor

Preciso de um sistema que guarde as cotações do dólar versus real, euro e iene(JPY) e que as exibe em um gráfico, respeitando as seguintes especificações:

Inicialmente o gráfico deve conter as cotações dos últimos cinco dias úteis.

Deve ser possível alterar o período contanto que seja de no máximo 5 dias úteis.

Deve ser possível variar as moedas (real, euro e iene). 

### :memo: Sobre a aplicação

Esta é uma aplicação FullStack para um desafio de admissão de vaga. Consiste num sistema de consulta das cotações das moedas BRL, EUR e JPY dos últimos 5 dias úteis em base de dólar (USD)

### :bookmark_tabs: **Rotas**
A api pode ser acessada em http://localhost:8000 após subir e rodar o projeto</br>
'/prices' lista as cotações dos últimos 5 dias úteis. [**GET**]</br>


### :hammer: **Configurando o Projeto**

Clone o projeto</br>
Com o projeto aberto, vamos executar os seguintes comandos de configuração</br>


### :space_invader: BACKEND</br>
cd /backend/</br>
py -m venv venv</br>
.\venv\Scripts\Activate</br>
deverá aparecer um (venv) no início do seu console* </br>
pip install -r requirements.txt</br>
py src/manage.py migrate</br>
py src/manage.py runserver</br>


### :computer: FRONTEND</br>
na raiz do projeto vá para /frontend</br>
*cd frontend</br>
npm i</br>
npm start</br>*


### :wrench: Testando</br>
Para testar a aplicação é necessário abrir o terminal, ir para tests e executar o comando de teste.</br>
*cd backend</br>
py src/manage.py test app</br>*

