angular.module("meuModuloMain")
    .controller("indexController", function ($scope) {

        $scope.titulo = "Home";
        $scope.editando = false;


        $scope.alunos = [
            { nome: "Murillo Pezzuol", email: "murillo@gmail.com", nota1: 10, nota2: 10, nota3: 9.5 },
            { nome: "Gaybriel Hideki", email: "gaybriel@outlook.com", nota1: 7, nota2: 5, nota3: 10 },
            { nome: "Egon Sintoatras", email: "egon@hotmail.com", nota1: 8, nota2: 5, nota3: 9 },
            { nome: "Tiago Master", email: "tiago@bol.com", nota1: 8, nota2: 7, nota3: 4 },
            { nome: "Raul Pezzuol", email: "raul@gmail.com", nota1: 3, nota2: 3, nota3: 10 }
        ];


        var init = function () {
            $scope.alunos.forEach(function (aluno) {
                //Para cada aluno eu crio uma nova propriedade 'media' que recebe o retorno da função que calcula media
                aluno.media = calcularMedia(aluno);
            });
            limpaForm();
        }


        var calcularMedia = function (aluno) {
            console.log("Calculando Média do Aluno: " + aluno.nome);
            var media = (parseFloat(aluno.nota1) + parseFloat(aluno.nota2) + parseFloat(aluno.nota3)) / 3;
            return media.toFixed(2);
        }


        //Método Abre Modal Adc Aluno
        $scope.abreAddAluno = function (aluno) {
            $scope.editando = false;
            limpaForm();
            $('#modalAdicionar').openModal();//Abrindo a Modal
        };


        //Método Adc Aluno
        $scope.addAluno = function (aluno) {
            aluno.media = calcularMedia(aluno);//Adc atributo média no objeto
            $scope.alunos.push(aluno)//adc Aluno novo na lista de Alunos
            $('#modalAdicionar').closeModal();//Fechando a Modal
            limpaForm();
        };


        var alunoEditar;//Verificar aluno para editar

        //Método Editar Aluno
        $scope.editarAluno = function (aluno) {
            $scope.editando = true;

            //Copy é exatamente uma cópia... Ele pega os dados do primeiro parametro e joga uma copia pro segundo parametro
            //Prmeiro parametro é oq veio do método, e o segundo é o Aluno do Scope que usamos nos inputs do formulário
            angular.copy(aluno, $scope.Aluno);
            alunoEditar = aluno;
            $('#modalAdicionar').openModal();//Fechando a Modal
        };

        //Método Salvar Aluno
        $scope.deletarAluno = function (aluno) {
            for (var index in $scope.alunos) {
                var aux = $scope.alunos[index];
                if (aluno === aux) {
                    $scope.alunos.splice(index, 1);//Splice remove no array. 1º param é o index, e o 2º é qts registro quero deletar
                }
            }

            $('#modalAdicionar').closeModal();//Fechando a Modal
        };


        //Método Salvar Aluno
        $scope.salvarAluno = function (aluno) {
            alunoEditar.nome = aluno.nome;
            alunoEditar.email = aluno.email;
            alunoEditar.nota1 = aluno.nota1;
            alunoEditar.nota2 = aluno.nota2;
            alunoEditar.nota3 = aluno.nota3;
            alunoEditar.media = calcularMedia(aluno);
            $('#modalAdicionar').closeModal();//Fechando a Modal
        };


        var limpaForm = function () {
            $scope.Aluno = { nome: "", email: "", nota1: '', nota2: '', nota3: '' };//Limpando formulário. Aluno do $scope
        };


        //Inicializa algumas configs (calcula média, limpa form etc...)
        init();

    });