var appAgenda = angular.module("appAgenda", ["ngMessages"]);

appAgenda.controller("contatoController", function($scope, $filter, $http) {
	$scope.app = "Lista Telefônica";
	
	$scope.contatos = [];
	
	$scope.operadoras = [
		{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
		{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
		{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
		{nome: "GVT", codigo: 15, categoria: "Fixo", preco: 1},
		{nome: "Embratel", codigo: 15, categoria: "Fixo", preco: 2}
	];
	
	var carregarContatos = function(){
		$http.get("http://localhost:8080/contatos").success(function(data){
			$scope.contatos = data;
		});
	};
	
	$scope.adicionarContato = function(contato){
		$http.post("http://localhost:8080/contatos", contato).success(function(data){
			$scope.contatos = data;
			delete $scope.contato;		
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	};
	
	$scope.apagarContatos = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if(!contato.selecionado) return contato;
		});
	};

	$scope.isContatoSelecionado = function(contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};

	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	carregarContatos();
});