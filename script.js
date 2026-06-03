  const cepInput = document.getElementById("cepInput");

cepInput.addEventListener("input", function () {
  let valor = cepInput.value.replace(/\D/g, "");

  if (valor.length > 5) {
    valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
  }

  cepInput.value = valor;
});

cepInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    buscarCEP();
  }
});

async function buscarCEP() {
  const cep = document.getElementById("cepInput");

  const msgVazio   = document.getElementById("msgVazio");
  const msgErro    = document.getElementById("msgErro");
  const resultado  = document.getElementById("resultado");

  msgVazio.style.display  = "none";
  msgErro.style.display   = "none";
  resultado.style.display = "none";

  if (cep.value == "") {
    msgVazio.style.display = "block";
    return;
  }

  const apenasNumeros = cep.value.replace(/\D/g, "");
  if (apenasNumeros.length !== 8) {
    document.getElementById("msgErroText").textContent = "CEP errado. tente novamente.";
    msgErro.style.display = "block";
    return;
  }

  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + apenasNumeros + "/json/");
    const dados = await resposta.json();

    if (dados.erro) {
      document.getElementById("msgErroText").textContent = "CEP não encontrado. olhe o CEP e tente novamente.";
      msgErro.style.display = "block";
      return;
    }

    document.getElementById("cepFormatado").textContent = dados.cep;
    document.getElementById("rua").textContent    = dados.logradouro;
    document.getElementById("bairro").textContent = dados.bairro;
    document.getElementById("cidade").textContent = dados.localidade;
    document.getElementById("estado").textContent = dados.uf;
    document.getElementById("ddd").textContent    = dados.ddd;
    document.getElementById("ibge").textContent   = dados.ibge;

    resultado.style.display = "block";

  } catch (erro) {
    document.getElementById("msgErroText").textContent = "Erro ao conectar com a API. Verifique sua conexão.";
    msgErro.style.display = "block";
  }
}