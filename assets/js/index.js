let inputCpf = document.querySelector('.cpf');
let result = document.getElementById('result');

inputCpf.addEventListener('keypress', (e) => {
  if (e.which == 13) {
    startCal(inputCpf.value);
  }
});
inputCpf.addEventListener('blur', (e) => {
  startCal(inputCpf.value);
});

function ValidaCpf(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function () {
      return cpfEnviado.replace(/\D+/g, '');
    },
  });
}

ValidaCpf.prototype.valida = function () {
  if (typeof this.cpfLimpo === 'undefined') return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;
  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  const novoCpf = cpfParcial + digito1 + digito2;

  return novoCpf === this.cpfLimpo;
};

ValidaCpf.prototype.criaDigito = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);
  const digito = 11 - (total % 11);
  return digito > 10 ? '0' : String(digito);
};

ValidaCpf.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
};
function startCal(number) {
  let cpf = new ValidaCpf(number);

  if (cpf.valida()) {
    result.innerHTML = 'CPF Válido';
    result.style.color = '#E8A03A';
  } else {
    result.innerHTML = 'CPF inválido';
    result.style.color = 'red';
  }
}
