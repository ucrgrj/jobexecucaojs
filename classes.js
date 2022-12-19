class Calendario{
	constructor(){
		this.objData=new Date();
	}// contructor calendario
	
	getAno(){
		return this.objData.getFullYear();
	}
	
	getMes(){
		return this.objData.getMonth()+1;
	}
	
	getDia(){
		return this.objData.getDate();
	}
	
	getHora(){
		return this.objData.getHours();
	}
	
	getMinutos(){
		return this.objData.getMinutes();
	}
	
	getSegundos(){
		return this.objData.getSeconds();
	}
	
}// classe calendario


class ElementoSelect{
	// PARA PREENCHER DINAMICAMENTE QUALQUER SELECT A PARTIR DE UM DATASET//
	constructor(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao){
	this.resultado = DatasetFactory.getDataset(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao);
	}// construtor
	

	setSelectComArray(idDoSelect,arrayCampos){
		// os campos tem de estar na ordem VALUE,TITLE E TEXTO. Pode haver o
		// SUPLEMENTO também,...
		// ...No caso de pessoas do sisjuri os campos principais seriam
		// 'EMAIL','COD_ADVG','NOME',
		// ...que são os nomes dos campos na tabela, porque meu select seria
		// value=email,title=sigla e texto=nome
		jQuery(idDoSelect).empty();
		let resultado = this.resultado;
		 let concatena = '<option value="-1" title="-1">...</option>';
		 console.log("resultado", resultado);
	    // Monta os registros
	    for (var x = 0; x < resultado.values.length; x++) {
	        let atributoValue = "";
	        let atributoTitle = "";
	        let atributoTexto = "";
	        let suplemento = "";
	        let objLinha = resultado.values[x];
	        for (var y = 0; y < resultado.columns.length; y++) {
	        let nomeColunaVez = resultado.columns[y];
	        let valorLinha = objLinha[resultado.columns[y]];
	        if (nomeColunaVez==arrayCampos[0]) {
	        	atributoValue = valorLinha;// no índice zero do array foi
											// passado EMAIL
	        	// y = resultado.columns.length;
	        break;
	        }// if nomeColunaVez
	        }// for y
	        for (var y = 0; y < resultado.columns.length; y++) {
		        let nomeColunaVez = resultado.columns[y];
		        let valorLinha = objLinha[resultado.columns[y]];
		    if (nomeColunaVez==arrayCampos[1]){
		        atributoTitle = valorLinha;// no índice 1 do array foi passado
											// COD_ADVG
		    	// y = resultado.columns.length;
		    break;
	        }// if nomeColunaVez
		        }// for y
	        for (var y = 0; y < resultado.columns.length; y++) {
		        let nomeColunaVez = resultado.columns[y];
		        let valorLinha = objLinha[resultado.columns[y]];
		    if (nomeColunaVez==arrayCampos[2]) {
		        	atributoTexto = valorLinha;// no índice 1 do array foi
												// passado COD_ADVG
		        	// y = resultado.columns.length;
		    break;
		        }// if nomeColunaVez
		        }// for y
	        for (var y = 0; y < resultado.columns.length; y++) {
		        let nomeColunaVez = resultado.columns[y];
		        let valorLinha = objLinha[resultado.columns[y]];
		    if (nomeColunaVez==arrayCampos[3]) {
		        	suplemento = ' ('+valorLinha+')';
		 		    break;
		        }// if nomeColunaVez
		        }// for y
	        // console.log("no loop","coluna vez: "+nomeColunaVez+"/
			// arrayCampos: "+arrayCampos+"/ valor da linha: "+valorLinha);
	        // console.log(concatena);
	        if(atributoTexto != ""){
            concatena = concatena + '<option value="'+atributoValue+'" title="'+atributoTitle+'">'+atributoTexto+suplemento+'</option>';
            atributoValue = "";// limpa para não armazenar o valor velho
								// enquanto no loop do 'y'
	        atributoTitle = "";
	        atributoTexto = "";
	        suplemento="";
	       }// if atributoTexto
	    }// for x
	    console.log(concatena);
	     jQuery(idDoSelect).append(concatena);
	}// setSelect
	// --
}// ElementoSelect
class Chefes {
	// esta classe trata da relação entre estagiários e chefes
		constructor(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao){
			this.resultado = DatasetFactory.getDataset(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao);
	}// constructor
	getArrayChefes(){
			let arrayResposta=[];
			let i=0;
			let resultado = this.resultado;
			for (i;i<resultado.values.length;i++){
				arrayResposta.push(resultado.values[i].SIGLA_CHEFE);
			}//for i
			return arrayResposta;
	}// getArrayChefes
	getSiglaChefe(){
		let resultado="";
		//console.log("siglaChefe na classe",this.resultado.values.length);
		if(this.resultado.values.length>0){
			resultado=this.resultado.values[0].SIGLA_CHEFE;
		}//if this
		return resultado;
}// getSiglaChefe
	setTabelaChefes(idTabelaAlvo){
		jQuery(idTabelaAlvo).empty();
		let concatena = '<tr><th>Estagiário</th><th>Chefe</th><th>Status</th></tr>';
		let i=0;
		for(i;i<this.resultado.values.length;i++){
			let siglaEst = this.resultado.values[i].SIGLA_EST;
			let siglaChefe = this.resultado.values[i].SIGLA_CHEFE;
			let status = this.resultado.values[i].ATIVO;
			concatena = concatena + '<tr><td>'+siglaEst+'</td><td>'+siglaChefe+'</td><td>'+status+'</td></tr>';
		}//for i
		jQuery(idTabelaAlvo).append(concatena);
	}//setTabelaChefes
	getResultadoAtualizacao(){
		//o update foi feito?
		let retorno="0";
		if(this.resultado.values[0].update*1>0){
			retorno=this.resultado.values[0].update;
		}//if typeof
		return retorno;
	}//getResultadoAtualizacao
	getResultadoInsercao(){
		//se o insert foi feito
		return this.resultado.values[0].insercao;
	}//getResultadoInsercao
}// classe Chefes

class Csv {
	constructor (idSemTralha){
		//classe para dar carga numa tabela do banco de dados a partir de um arquivo CSV
	this.idSemTralha=idSemTralha;//o id do elemento input type=file que seleciona o arquivo
		 	}//constructor
	 setInsere(nomeDataset,arrayColunasDesejadas,valorFixo) {
		 //nome do dataset em que será feita a inserção, número das colunas DESEJADAS...
		 //...no arquivo csv [0,1...],Valor fixo é um campo que vai inserir na tabela,...
		 //...mas que não está no csv. O arrayCampos são os valores que vão para o dataset para...
		 //...serem inseridos na tabela correspondente do banco de dados
		 //****O ARQUIVO CSV TEM DE ESTAR SEM CABEÇALHO DE COLUNAS****
		 let contador=0;
			var file = document.getElementById(this.idSemTralha).files[0];
			  var reader = new FileReader();
			  reader.onload = function(progressEvent){
			    var lines = this.result.split('\n');
			    for(var line = 0; line < lines.length; line++){
					 let arrayCampos=[];
			    let arrayColunasLinha = lines[line].split(";");
			    let j=0;
			    //rola as colunas que vieram na linha da vez
			    for(j;j<arrayColunasLinha.length;j++){
			    	let k=0;
			    	for(k;k<arrayColunasDesejadas.length;k++){
			    		if(j==arrayColunasDesejadas[k]){
			    			//a coluna da passagem na linha da vez é uma coluna desejada
			    				arrayCampos.push(arrayColunasLinha[j]);
			    		}//if j
			    	}//for k
			    }//for j
			    	arrayCampos.push(valorFixo);
			    	if(arrayCampos[0] != ''){
				    	console.log("o que vai gravar",arrayCampos)
			    	let arrayConstraints=null;
			    	let arrayOrdenacao=null;
			    let resultado = DatasetFactory.getDataset(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao);
			    	}//if arrayCampos.length
			    }//for var line
			  };//onload
			  reader.readAsText(file);
	}//setInsere
}//classe Csv
class ClasseLiquidoEspecial {
	constructor (fatuLida,casoLido,escritorio,recebLido){
		//esta classe verifica se a fatura da vez tem um valor líquido que foi...
		//...inserido manualmente porque é para pagamento de advogado externo...
		//...ou se deve ser o valor da última parcela. Se tiver valor especial...
		//...lançado na tabela ZJOBCLIENT_ESPECIAL, mostra este valor, do contrário..
		//...repete o valor líquido que foi calculado normalmente
		let c1 = DatasetFactory.createConstraint("FATURA",fatuLida,fatuLida,ConstraintType.MUST);
		let c2 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
		let c3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
		let c4 = DatasetFactory.createConstraint("RECEBIMENTO",recebLido,recebLido,ConstraintType.MUST);
		let c5 = DatasetFactory.createConstraint("STATUS","1","1",ConstraintType.MUST);
		let arrayConstraints = [c1,c2,c3,c4,c5];
		this.resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_especial",null,arrayConstraints,null);
	}//constructor
	pegaOcorrencias (){
		return this.resultado.values.length;
	}//pegaOcorrencias
	pegaValorBruto (){
		return this.resultado.values[0].BRUTO_AJUSTE;
	}//pegaValorBruto
	pegaValorLiquido (){
		return this.resultado.values[0].LIQUIDO_AJUSTE;
	}//pegaValorLiquido
	pegaValorJob (){
		return this.resultado.values[0].JOB_AJUSTE;
	}//pegaValorJob
	pegaEditor (){
		return this.resultado.values[0].EMAIL_EDITOR;
	}//pegaEditor
	pegaDataUltima (){
		return this.resultado.values[0].DATA_EDICAO;
	}//pegaDataUltima
}//class ClasseLiquidoEspecial
//---------------------------------------------------------------
class MeusDatasets {
	constructor(intOperacao, nomeDataset,arrayCamposValores,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacaoCampos){
		//intOperacao 1= select, 2 = insert, 3=update
		let arrayCampos=[];
		let arrayConstraints=[];
		let arrayOrdenacao=[];
		this.resultado=null;
		
		if(intOperacao==1){
			//pode ser um select ou um delete
			let i=0;
			for(i;i<arrayNomeConstraints.length;i++){
			//se tiver array, captura os nomes e os valores inicial e final
			let nomeVez=arrayNomeConstraints[i];
			let valorIniVez=arrayIniciais[i];
			let valorFinVez=arrayFinais[i];
			arrayConstraints.push(DatasetFactory.createConstraint(nomeVez,valorIniVez,valorFinVez,ConstraintType.MUST));
			}//for i
		}//intOperacao ==1 ou == 4
	
		if(intOperacao==2){
			//insert
			let i=0;
			for(i;i<arrayCamposValores.length;i++){
			let valorVez=arrayCamposValores[i];
				arrayCampos.push(valorVez);
			}//for i
		}//intOperacao ==2
		
		
		if(intOperacao==3){
			//update
			let i=0;
			for(i;i<arrayCamposValores.length;i++){
			let valorVez=arrayCamposValores[i];
				arrayCampos.push(valorVez);
			}//for i
			let j=0;
			for(j;j<arrayNomeConstraints.length;j++){
				//se tiver array, captura os nomes e os valores inicial e final
				let nomeVez=arrayNomeConstraints[j];
				let valorIniVez=arrayIniciais[j];
				let valorFinVez=arrayFinais[j];
				arrayConstraints.push(DatasetFactory.createConstraint(nomeVez,valorIniVez,valorFinVez,ConstraintType.MUST));
				}//for j
		}//intOperacao ==3
							
		this.resultado = DatasetFactory.getDataset(nomeDataset,arrayCampos,arrayConstraints,arrayOrdenacao);
	}//constructor
	pegaResultado(){
		return this.resultado;
	}//pegaResultado
}//classe MeusDatasets
//---------------------------------------------------------------
