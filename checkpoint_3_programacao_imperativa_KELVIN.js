/*1- Crie uma função construtora que tenha como atributos: nome (string), quantidade de faltas (number) e notas (array de números). 
2- Na função construtora crie o método calcularMedia que retorna a média de suas notas. Também terá um método chamado faltas, que simplesmente aumenta o número de faltas em 1. 
Crie alguns alunos para testar a sua função construtora. 
*/

function Aluno(nome, quantidadeFaltas, notas) {
    this.nome = nome
    this.quantidadeFaltas = quantidadeFaltas
    this.notas = notas
    this.calculaMedia = function () {
      let soma = 0
      for (let i = 0; i < this.notas.length; i++) {
        soma = soma + this.notas[i]
      }
      const media = soma / this.notas.length
      return media
    }
    this.faltas = function () {
      this.quantidadeFaltas += 1
      return this.quantidadeFaltas
    }
  }
  
  let Fulano = new Aluno('Fulano', 2, [10, 9, 8, 7, 6])
  let Sicrano = new Aluno('Sicrano', 5, [5, 6, 7, 8, 9])
  let Beltrano = new Aluno('Beltrano', 4, [5.5, 9.5, 3.5, 10, 6])
  let Paulo = new Aluno('Paulo', 10, [3.5, 5, 10, 2.3, 0])
  let Maria = new Aluno('Maria', 0, [10, 8.2, 6, 7.3, 10])

  console.log('A média do aluno é: ' + Paulo.calculaMedia()) // Irá retornar o calculo da média das notas do aluno informado.
  console.log('O numero de faltas é: ' + Fulano.faltas()) // Irá retornar o número de flatas do aluno informado.

  /* 3- crie o objeto literal curso que tem como atributos: nome do curso (string), 
nota de aprovação (number), faltas máximas (number) e uma lista de estudantes (um array composto pelos alunos criados no passo 2).
*/
  
  let listaAlunos = [Fulano, Sicrano, Beltrano, Paulo, Maria]
  let curso = {
    nomeDoCurso: '',
    notaDeAprovacao: 7,
    faltasMaximas: 5,
    listaAlunos: listaAlunos,

    /*4- Crie o método que permite adicionar alunos à lista do curso, ou seja, 
    quando chamamos nosso método em nosso objeto curso, deverá adicionar um aluno a mais na propriedade 
    lista de estudantes do objeto curso. */
    cadastrarAluno(nome, quantidadeFaltas, notas) {
      let aluno = new Aluno(nome, quantidadeFaltas, notas)
      this.listaAlunos.push(aluno)
    },

    /*5- 	Crie um método para o objeto curso que receba um aluno (como parâmetro) e retorne true se ele 
    aprovou no curso ou false em caso de reprovação. Para ser aprovado, o aluno tem que ter uma média igual ou 
    acima da nota de aprovação  e ter menos faltas que faltas máximas. 
    Se tiver a mesma quantidade, tem que estar 10% acima da nota de aprovação.*/
    consultarAluno(nome) {
      for (let i = 0; i < this.listaAlunos.length; i++) {
        const aluno = this.listaAlunos[i]
        if (aluno.nome === nome) {
          console.log('--Aluno '+ aluno.nome + ' encontrado!')
          return aluno
        }
      }
      console.log('Aluno nao encontrado')
    },
    situacaoFinal(nome) {
      let aluno = this.consultarAluno(nome)
      let media = aluno.calculaMedia()
      let situacaoFinalAluno = false
      if (
        media >= this.notaDeAprovacao &&
        aluno.quantidadeFaltas < this.faltasMaximas
      ) {
        console.log('O Aluno foi Aprovado--')
        situacaoFinalAluno = true
      } else if (
        aluno.quantidadeFaltas === this.faltasMaximas &&
        media > this.notaDeAprovacao * 1.1
      ) {
        console.log('O Aluno foi Aprovado--')
        situacaoFinalAluno = true
      } else {
        console.log('O Aluno foi Reprovado--')
      }
      return situacaoFinalAluno
    },

    /* 6- Crie um método para o objeto curso que percorra a lista de estudantes e retorne um array de booleanos 
    com os resultados se os alunos aprovaram ou não. */

    listao() {
      const listaAprovados = []
      for (let i = 0; i < this.listaAlunos.length; i++) {
        const aluno = this.listaAlunos[i]
        const situacaoAluno = this.situacaoFinal(aluno.nome)
        listaAprovados.push(situacaoAluno)
      }
      return listaAprovados
    }
  }
    
  
  console.log(curso.listao()) // Irá retornar a lista de alunos aprovados e reprovados.
  curso.cadastrarAluno('Rafael', 1, [10, 10, 10, 8]) // Irá cadastrar um novo aluno ao curso
  console.log(curso.listao()) // Irá retornar a lista de alunos aprovados e reprovados com o acrescimo do ultimo aluno cdastrado.
  console.log(curso.situacaoFinal('Rafael')) // Irá retornar a situação (aprovado ou reprovado) do aluno informado.
