
const fetchUser = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  };
  
  export default fetchUser;
  
  /*
  No arquivo api.js, a utilização dos termos "async" e "await" está relacionada ao uso de funções assíncronas (async/await) no JavaScript.

Quando uma função é declarada com a palavra-chave "async", ela se torna uma função assíncrona. Isso significa que essa função irá retornar uma Promessa (Promise) e pode conter operações assíncronas. As operações assíncronas podem incluir chamadas de API, acesso a bancos de dados, leitura/gravação de arquivos, entre outras.

A palavra-chave "await" é usada dentro de uma função assíncrona para esperar que uma Promessa seja resolvida antes de prosseguir para a próxima linha de código. O "await" pausa a execução da função assíncrona até que a Promessa seja resolvida ou rejeitada, e então retorna o resultado.*/