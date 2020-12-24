# Compasso Times

## Execução

Para executar a aplicação basta adicionar a chave da api do nytimes no arquivo ./environments/environments.js. Feito isso, basta executar npm install e posteriormente npm start.

## Components

A aplicação foi construída baseado em dois components, o 'Header' e o 'News'. 
## Component Header:

Como deveria pegar noticias de duas categorias, e a api ainda retornava a 'seção' onde a notícia se encontrava, optei por criar um component 'header', com base nessas 'seções' e nos tipos das notícias, permitindo que o usuário 'navegue' através dessas categorias e dessas seções.
## Component News:

O component news se refere às notícias exibidas na tela e no modal que é carregado ao clicar na notícia.

## Outras escolhas

Foi utilizado o axios para comunicação com a api e o reactstrap para auxiliar na criação do layout.

Não vi a necessidade de criar navegação por página, já que dava pra resolver apenas manipulando o dom. Não vou dizer que é a melhor abordagem já que aumenta um pouco o consumo de dados(pelas duas requests), mas garante que as informações fiquem centralizadas em um único local para o usuário.
