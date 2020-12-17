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

// let turma =
// document.getElementById("txtTurma").addEventListener("change", turma);

document.getElementById("txtTurmas").addEventListener("change", turma);

// let turmas = document.getElementById("txtTurmas");
// let txtTurma = turmas.options[turmas.selectedIndex].value;
// console.log(txtTurma);

// let nomeAluno =
document.getElementById("txtNome").addEventListener("change", aluno);

// let sobrenomeAluno =
document.getElementById("txtSobrenome").addEventListener("change", sobrenome);

// let nota1 =
document.getElementById("nota1").addEventListener("change", primeiraNota);

// let nota1 =
document.getElementById("nota2").addEventListener("change", segundaNota);

function turma() {
  let turmas = document.getElementById("txtTurmas");
  txtTurma = turmas.options[turmas.selectedIndex].value;
  // console.log(txtTurma);
}

turma();

function aluno() {
  nomeAluno = document.getElementById("txtNome").value;
  //   console.log(nomeAluno);
}

function sobrenome() {
  sobrenomeAluno = document.getElementById("txtSobrenome").value;
}

// function nota() {
//   notas = {
//     nota1: document.getElementById("nota1").value,
//     nota2: document.getElementById("nota2").value,
//   };
// }

function primeiraNota() {
  nota1 = parseInt(document.getElementById("nota1").value);
  //   console.log(nota1);
}

function segundaNota() {
  nota2 = parseInt(document.getElementById("nota2").value);
  //   console.log(nota2);
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

// function editarAluno() {
//   alert(
//     "Para editar um aluno, certifique-se de inserir a turma e o nome do aluno."
//   );

//   db.collection(txtTurma)
//     .doc(nomeAluno)
//     .update({
//       nome: `${nomeAluno}`,
//       sobrenome: `${sobrenomeAluno}`,
//       "notas.nota1": nota1,
//       "notas.nota2": nota2,
//     })
//     .then(() => {
//       console.log("Aluno atualizado com sucesso:");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   limpar();
// }

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
}

function alunosCadastrados() {
  db.collection("TurmaA")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let aluno = doc.data();
        // console.log(aluno.nome);
        // console.log(doc.data());
        // document.getElementById("res2").innerHTML +=
        //   "<ul> <li>" + aluno.nome + "</li> </ul>";
        let qual_turma = document.getElementById("qual_turma");
        qual_turma.style.display = "block";
        let res2 = document.getElementById("res2");
        res2.style.display = "block";
        document.getElementById("qual_turma").innerHTML = "TurmaA";
        document.getElementById("res2").innerHTML +=
          "📚" +
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
}

function alunosCadastradosB() {
  db.collection("TurmaB")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let aluno = doc.data();
        // console.log(aluno.nome);
        // console.log(doc.data());
        // document.getElementById("res2").innerHTML +=
        //   "<ul> <li>" + aluno.nome + "</li> </ul>";
        let qual_turma2 = document.getElementById("qual_turma2");
        qual_turma2.style.display = "block";
        let res3 = document.getElementById("res3");
        res3.style.display = "block";
        document.getElementById("qual_turma2").innerHTML = "TurmaB";
        document.getElementById("res3").innerHTML +=
          "📚" +
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
  // document.getElementById("txtTurma").value = "";
  document.getElementById("txtNome").value = "";
  document.getElementById("txtSobrenome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
}
