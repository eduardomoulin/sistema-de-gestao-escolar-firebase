var firebaseConfig = {
  apiKey: "AIzaSyDlkmj3x2xVM1HX2nJb-ytpidj5m-NgxNY",
  authDomain: "colegio-fd8a1.firebaseapp.com",
  projectId: "colegio-fd8a1",
  storageBucket: "colegio-fd8a1.appspot.com",
  messagingSenderId: "812334476582",
  appId: "1:812334476582:web:748250aa987cfb9882a5e7",
  measurementId: "G-SM76WRLCR8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

document.getElementById("txtTurmas").addEventListener("change", turma);

// let nomeAluno =
document.getElementById("txtNome").addEventListener("change", aluno);

// let sobrenomeAluno =
document.getElementById("txtSobrenome").addEventListener("change", sobrenome);

// let nota1 =
document.getElementById("nota1").addEventListener("change", primeiraNota);

// let nota1 =
document.getElementById("nota2").addEventListener("change", segundaNota);

document.getElementById("txtID").addEventListener("change", idAluno);

function idAluno() {
  idDoAluno = document.getElementById("txtID").value;
}

function turma() {
  let turmas = document.getElementById("txtTurmas");
  txtTurma = turmas.options[turmas.selectedIndex].value;
}

turma();

function aluno() {
  nomeAluno = document.getElementById("txtNome").value;
}

function sobrenome() {
  sobrenomeAluno = document.getElementById("txtSobrenome").value;
}

function primeiraNota() {
  nota1 = parseInt(document.getElementById("nota1").value);
}

function segundaNota() {
  nota2 = parseInt(document.getElementById("nota2").value);
}

function cadastrarAluno() {
  // Criando documento com ID gerado automaticamente
  db.collection(txtTurma)
    .add({
      nome: nomeAluno,
      sobrenome: sobrenomeAluno,
      notas: { nota1: nota1, nota2: nota2 },
    })
    .then((doc) => {
      console.log("Aluno inserido com sucesso:", doc);
    })
    .catch((err) => {
      console.log(err);
    });
  alert("Aluno cadastrado com sucesso!");
  limpar();
}

function excluirAluno() {
  db.collection(txtTurma)
    .doc(idDoAluno)
    .delete()
    .then(() => {
      alert("Aluno excluído com sucesso");
    })
    .catch((err) => {
      console.log(err);
    });
  limpar();
}

function pesquisarAluno() {
  db.collection(txtTurma)
    .where("nome", "==", nomeAluno)
    // Podemos usar <, >, <=, >=
    // Podemos usar mais de um where desde que estejamos buscando o mesmo campo, no caso o "nome"
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let aluno = doc.data();
        let res = document.getElementById("res");
        res.style.display = "block";
        document.getElementById("res").innerHTML +=
          `${aluno.nome}` +
          " " +
          `${aluno.sobrenome}` +
          "<br>" +
          `Notas: ${aluno.notas.nota1}, ${aluno.notas.nota2}.` +
          "<br>" +
          "<br>";
      });
    });
}

function alunosCadastrados() {
  db.collection("TurmaA")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let aluno = doc.data();

        let qual_turma = document.getElementById("qual_turma");
        qual_turma.style.display = "block";
        let res2 = document.getElementById("res2");
        res2.style.display = "block";
        document.getElementById("qual_turma").innerHTML = "TurmaA";
        document.getElementById("res2").innerHTML +=
          "📚" +
          doc.id +
          " - " +
          " " +
          " " +
          aluno.nome +
          " " +
          aluno.sobrenome +
          " - " +
          aluno.notas.nota1 +
          ", " +
          aluno.notas.nota2 +
          "<br>";
      });
    });
  alunosCadastradosB();
  esconderElementos();
}

function alunosCadastradosB() {
  db.collection("TurmaB")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let aluno = doc.data();

        let qual_turma2 = document.getElementById("qual_turma2");
        qual_turma2.style.display = "block";
        let res3 = document.getElementById("res3");
        res3.style.display = "block";
        document.getElementById("qual_turma2").innerHTML = "TurmaB";
        document.getElementById("res3").innerHTML +=
          "📚" +
          doc.id +
          " - " +
          " " +
          " " +
          aluno.nome +
          " " +
          aluno.sobrenome +
          " - " +
          aluno.notas.nota1 +
          ", " +
          aluno.notas.nota2 +
          "<br>";
      });
    });
}

function limpar() {
  document.getElementById("txtNome").value = "";
  document.getElementById("txtSobrenome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("txtID").value = "";
}

function limparPesquisa() {
  document.getElementById("res").innerHTML = "";
  document.getElementById("res2").innerHTML = "";
  document.getElementById("res3").innerHTML = "";
  document.getElementById("qual_turma").innerHTML = "";
  document.getElementById("qual_turma2").innerHTML = "";
  qual_turma.style.display = "none";
  qual_turma2.style.display = "none";
  res3.style.display = "none";
  res2.style.display = "none";
  res.style.display = "none";

  limpar();
  turma();
  mostrarElementos();
}

function esconderElementos() {
  let txts = document.querySelectorAll(".txts");
  var i;

  for (var i = 0; i < txts.length; i++) {
    txts[i].style.display = "none";
  }

  let botaoCadastro = document.getElementById("btn_cadastro");
  botaoCadastro.style.display = "none";

  let botaoPesquisa = document.getElementById("btn_pesquisa");
  botaoPesquisa.style.display = "none";

  let botaoExcluir = document.getElementById("btn_Excluir");
  botaoExcluir.style.display = "none";
}

function mostrarElementos() {
  let txts = document.querySelectorAll(".txts");
  var i;

  for (var i = 0; i < txts.length; i++) {
    txts[i].style.display = "block";
  }

  let botaoCadastro = document.getElementById("btn_cadastro");
  botaoCadastro.style.display = "block";

  let botaoPesquisa = document.getElementById("btn_pesquisa");
  botaoPesquisa.style.display = "block";

  let botaoExcluir = document.getElementById("btn_Excluir");
  botaoExcluir.style.display = "block";
}
