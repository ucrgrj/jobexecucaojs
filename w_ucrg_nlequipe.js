var globalArrayNLRAFilesMinhaResponsa=[];//files que transferiram para eu fazer o rateio
var globalArrayNLRAFilesDeleguei=[];//files que eu transferi para OUTRO para eu fazer o rateio
var globalNaMaquina="";
//--
var globalArrayCasosValorTransferido=[];//armazena o caso que teve o valor transferido (não o file)
var globalArrayFaturasValorTransferido=[];//armazena a fatura ligada ao cliente que teve o valor transferido (não o file)
var globalArrayBPValorTransferido=[];//armazena o BP para o qual o valor foi transferido (não o file)
//--
/*
UPLOAD FEITO PARA O 10.200.20.4 EM 25/09/2022 16:38 POR MAURO
*/
jQuery(document).ready(function (){
	//-------------------------INICIALIZAÇÕES APÓS O CARREGAMENTO DA PÁGINA------------
	fCarregaSCNLRE();
	jQuery("#idDivNLRESC").hide();
	jQuery("#idDivNLRESpinner").hide();
	jQuery("#idDivRDSpinner").hide();
	fPegaBPNaMaquinaNLE();
	fDeletaRateiosInvalidosNLE();
	jQuery("#idDivNLRAMensagem").hide();
	jQuery("#idArtNLREExtra").hide();
	jQuery("#idArtNLRETransf").hide();
	jQuery("#idArtNLRADET").hide();
	jQuery("#idDivNLREAnula").hide();
	jQuery("#idH3NLRotuloTabela").hide();
	jQuery(".claFiltroNLRE").hide();
	jQuery(".grupoAdminJobExec").hide();
	jQuery(".FecharadmJobExec").hide();
	jQuery(".claTBNLRAROTULO").hide();
	jQuery("#claTBNLREDETROTULO").hide();
	jQuery("#idBtnAdmGrupoJobExec").hide();
	//---
	jQuery("#idDivEspecial").hide();
	jQuery("#idDivEspecial").draggable();
	jQuery("#idDivNLTRANSF").hide();
	jQuery("#idDivNLTRANSF").draggable();
	jQuery("#idBtnNLTRANSFSalvar").prop("disabled",true);//não deixa salvar enquanto tudo estiver pendente
	//--
	fCarregaAdvsNLE();
	fSugereDataNLE();
	fVerificaGrupoJobExecucaoNLE();//a princípio esconde a área da administração a quem não pertecer
//-----------------fim da área de inicialização -----
	jQuery("#idFilNLRETeste").change(function (){
		//tentando refazer a sugestão de timesheets pelo valor e não pelas uts só
	});//idFilNLRETeste
//------------------------------------------------------------------	
	jQuery(document).on("click","#idBtnNLRETeste",function (){
		/*
		jQuery("#idDivRDSpinner").hide();
		jQuery(".claTBNLRAROTULO").show();
		jQuery("#idH3NLREROTULOPESQUISA").show();
		jQuery("#idSelNLRETransf option[value='-1']").prop('selected', true);
		jQuery("#idSpaNLRAAvisoTransferir").text('');
		jQuery(".claGridNLRERateio").show();
		jQuery("#idDivNLREAnula").hide();
		//sugere rateio de equipe
		//Primeiro a rotina vai na tabela de rateios feita (custom_apa.ZJOBCLIENT e vê...
		//...se já não existe um rateio. Se existir, carrega na tabela de sugestões. Se não existir,
		//...cria na tabela do fluig de sugestões ao mesmo tempo que insere na custom_apa.ZJOBCLIENT
		let objSpaAlerta =jQuery("#idSpaNLRASUGAlerta");
		objSpaAlerta.text('');//aviso no rodapé da sugestão
		objSpaAlerta.css({"color":"initial","font-weight":"initial","background-color":"initial"});
		jQuery("#idArtNLREExtra").show();
			jQuery("#idArtNLRETransf").show();
			jQuery("#idH3NLREROTULOPESQUISA").show();
			jQuery("#idArtNLRADET").hide();
		let objInp = jQuery(".claBtnFaturaRA");
		   let faturaLida = objInp[0].dataset.tagfatura;
		   let clieLido = objInp[0].dataset.tagcliente;
		jQuery("#idH3NLRACLIENTE").text(clieLido+" (FATURA "+faturaLida+")");
		   let objH3 = jQuery("#idH3NLREROTULOPESQUISA");
			objH3.text("Rateio para Equipe/Advogados");
		   let recebimentoLido=objInp[0].dataset.tagreceb;
		   let escritorioLido=objInp[0].dataset.tagescritorio;
		   let casoLido=objInp[0].dataset.tagcaso;
		   let formathtml = document.createElement('a');
		  
		   //---
		   //jQuery("#idLblNLRERot").text("Transferir rateios do file "+casoLido+" para o Conselheiro abaixo:");

		   jQuery("#idLblNLRERot").text("Selecionar BP:");
		   //---
		   let jobLido=objInp[0].dataset.tagjob;
		   jobLido = jobLido.replace(/\./,"");
		   jobLido = jobLido.replace(/,/,".");
		  //console.log("Na hora em que aperta o botão de rateio, valor do job",jobLido);
		   let bpLido=objInp[0].dataset.tagbp;
		   jQuery("#idHidNLREFaturaSelecionada").val(faturaLida);
		   jQuery("#idHidNLREEscritorioSelecionado").val(escritorioLido);
		   jQuery("#idHidNLREJobSelecionado").val(jobLido);
		   jQuery("#idHidNLREFileSelecionado").val(casoLido);
		   jQuery("#idHidNLRERecebSelecionado").val(recebimentoLido);
		   jQuery("#idHidNLREBPSelecionado").val(bpLido);
		   jQuery("#idHidNLREClienteSelecionado").val(clieLido);
		   let jobTotal=jobLido*1;
		   let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		   if(resultadoR.values.length==0){
		   //ainda não foi feita. Carrega a tabela de sugestão com dados da tabela de resposta da pesquisa
			   fInauguraSugestoesNLEADHOC(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido);
		   }else{
			   let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
				//console.log("booTemPreservacao",booTemPreservacao);
				if(!booTemPreservacao){
			   //carrega direto da tabela de rateios já feitos
			   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
				}//if !boo
		   }//if resultadoR
		  // fPulaParaElementoRANLE('idArtNLREExtra');
		  */
	});//idBtnNLRETeste de teste click
//-------------------fim da ÁREA DE TESTE ---------
	jQuery(document).on("click","#idBtnNLTRANSFReset",function (){
	//deletando registros
		let arrayCampos=null;
		let arrayOrdenacao=null;
		let fatura = jQuery("#idSpaNLTRANSFFatura").text();
		let pasta = jQuery("#idSpaNLTRANSFCaso").text();
		let escritorio = jQuery("#idSpaNLTRANSFEscritorio").text();
		let recebimento = jQuery("#idSpaNLTRANSFReceb").text();
		arrayNomeConstraints=[];
		arrayNomeConstraints.push("FATURA");
		arrayNomeConstraints.push("PASTA");
		arrayNomeConstraints.push("ESCRITORIO");
		arrayNomeConstraints.push("RECEBIMENTO");
		//--
		arrayIniciais=[];
		arrayIniciais.push(fatura);
		arrayIniciais.push(pasta);
		arrayIniciais.push(escritorio);
		arrayIniciais.push(recebimento);
		//--
		arrayFinais=[];
		arrayFinais.push(fatura);
		arrayFinais.push(pasta);
		arrayFinais.push(escritorio);
		arrayFinais.push(recebimento);
		//--
		intOperacao='1';//selectionar/deletar
		nomeDataset='ds_ucrg_notasliquidadas_transf_del';
		let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
		alert ("Eliminação de indicações percentuais: "+objDataset.pegaResultado().values[0].delecao);
		//----limpa a tabela depois do reset
		let bruto = jQuery("#idSpaNLTRANSFBruto").text();
		jQuery("#idSpaNLTRANSFRes").text(bruto);
		jQuery("#idSpaNLTRANSFJaA").text("100");
		let objTab = jQuery("#idTabNLTRANSFFeito");
		objTab.empty();
		jQuery("#idDivNLTRANSF").hide();
	});//idBtnNLTRANSFReset click
//---------------------------------------------------
	jQuery(document).on("click",".claBtnNLTRANSFRetira",function (){
		//recarrega a tabela sem a sigla clicada, porque pula se a encontrar
		jQuery("#idSpaNLTRANSFAviso").text('');
		let siglaClicada=jQuery(this).attr("id");
		let valorBruto=jQuery("#idSpaNLTRANSFBruto").text();
		valorBruto = valorBruto.replace(/\./,"");
		valorBruto = valorBruto.replace(/,/,".");
		//---
		let concatena='<thead><tr><th>Transferido para</th><th>Percentual atribuído</th><th>Novo Valor Bruto</th></tr></thead><tbody>';
		//----Rolar a tabela e guardar num objeto
		let arrayExistentes = [];
		jQuery('#idTabNLTRANSFFeito tr').each(function() {
			let siglaBenef = jQuery(this).find("td").eq(0).find("button[type='button']").attr("id");
			if(typeof siglaBenef != 'undefined'){
			let percJa = jQuery(this).find("td").eq(1).html();
			let valorJa = jQuery(this).find("td").eq(2).html();
			//console.log("no loop",siglaBenef);
			arrayExistentes.push({"siglaBenef":siglaBenef,"percJa":percJa,"valorJa":valorJa});
			}
		});//each
		//console.log(arrayExistentes);
		//----agora limpa a tabela
		let objTab = jQuery("#idTabNLTRANSFFeito");
		objTab.empty();
		//---agora repõe a tabela, mas sem a sigla 
		let j=0;
		let estiloDireita="text-align:right;";
		let somaPercentuais=0;
		for(j;j<arrayExistentes.length;j++){
			let siglaVez = arrayExistentes[j].siglaBenef;
			let percJa = arrayExistentes[j].percJa;
			let valorJa = arrayExistentes[j].valorJa;
			if(siglaVez != siglaClicada){
				concatena=concatena+'<tr><td><button type="button" id="'+siglaVez+'" class="btn btn-danger claBtnNLTRANSFRetira" title="Clicando neste botão, você retira este beneficiário da lista">'+siglaVez+'</button></td><td style="'+estiloDireita+'">'+percJa*1+'</td><td style="'+estiloDireita+'">'+valorJa*1+'</td></tr>';
				somaPercentuais=somaPercentuais+percJa*1;
			}//if siglaVez
		}//for j
		//---
		objTab.append(concatena);
		//---Refaz o resíduo
		let saldo = valorBruto - (somaPercentuais/100*valorBruto);
		let falta = 100 - somaPercentuais*1;
		jQuery("#idSpaNLTRANSFRes").text(saldo);
		jQuery("#idSpaNLTRANSFJaA").text(falta);
		if(falta*1 > 0){
			jQuery("#idBtnNLTRANSFSalvar").prop("disabled",true);//não deixa salvar enquanto tudo estiver pendente
			jQuery("#idBtnNLTRANSFSalvar").prop("title","Bloqueado até que os percentuais sejam todos atribuídos");//não deixa salvar enquanto tudo estiver pendente
		}//if falta
	});//claBtnNLTRANSFRetira click
//--------------------------------------------------
	jQuery(document).on("click","#idBtnNLTRANSFSalvar",function (){
		//alert ("Ainda em programação");
		//preciso passar um array de valores, além dos campos, para salvar
		//---valores default
		let arrayCampos=null;
		let arrayNomeConstraints=null;
		let arrayIniciais=null;
		let arrayFinais=null;
		let arrayOrdenacao=null;
		let editor = WCMAPI.userEmail.toLowerCase();
		//---
		let fatura = jQuery("#idSpaNLTRANSFFatura").text();
		let pasta = jQuery("#idSpaNLTRANSFCaso").text();
		let escritorio = jQuery("#idSpaNLTRANSFEscritorio").text();
		let recebimento = jQuery("#idSpaNLTRANSFReceb").text();
		let captador = jQuery("#idSpaNLTRANSFCap").text();
		//---DELETA ANTES DE SALVAR, PORQUE NÃO VOU TER UPDATE
		arrayNomeConstraints=[];
		arrayNomeConstraints.push("FATURA");
		arrayNomeConstraints.push("PASTA");
		arrayNomeConstraints.push("ESCRITORIO");
		arrayNomeConstraints.push("RECEBIMENTO");
		//--
		arrayIniciais=[];
		arrayIniciais.push(fatura);
		arrayIniciais.push(pasta);
		arrayIniciais.push(escritorio);
		arrayIniciais.push(recebimento);
		//--
		arrayFinais=[];
		arrayFinais.push(fatura);
		arrayFinais.push(pasta);
		arrayFinais.push(escritorio);
		arrayFinais.push(recebimento);
		//---deletar o que tiver como segurança
		let intOperacao='1';//selecionar ou deletar (no caso, vai ser deletar por causa do nome do dataset)
		let nomeDataset='ds_ucrg_notasliquidadas_transf_del';
		let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
		//---
		intOperacao='2';//insert
		nomeDataset='ds_ucrg_notasliquidadas_transf_insert';
		arrayNomeConstraints=[];
		arrayIniciais=[];		
		arrayFinais=[];
		objDataset="";
		jQuery('#idTabNLTRANSFFeito tr').each(function() {
			let arrayCamposGrava=[];
			let siglaBenef = jQuery(this).find("td").eq(0).find("button[type='button']").attr("id");
			if(typeof siglaBenef != 'undefined'){		
			arrayCamposGrava.push(fatura);
			arrayCamposGrava.push(pasta);
			arrayCamposGrava.push(escritorio);
			arrayCamposGrava.push(recebimento);			
			let percJa = jQuery(this).find("td").eq(1).html();
			let valorJa = jQuery(this).find("td").eq(2).html();
			//console.log("no loop",siglaBenef);
			arrayCamposGrava.push(siglaBenef);
			arrayCamposGrava.push(percJa);
			arrayCamposGrava.push(valorJa);
			arrayCamposGrava.push(captador);
			arrayCamposGrava.push(editor);
			let insercao = new Date().toLocaleDateString();//dd/mm/yyyy
			let diaIns=insercao.substr(0,2);
			let mesIns=insercao.substr(3,2);
			let anoIns=insercao.substr(6,4);
			let dataInsercao = anoIns+""+mesIns+""+diaIns;
			arrayCamposGrava.push(dataInsercao);
			objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCamposGrava,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
			}//if typeof
		});//each
		alert ("Operação salva: "+objDataset.pegaResultado().values[0].insercao);
	});//idBtnNLTRANSFSalvar click
//-------------------------------------------------	
	jQuery(document).on("click","#idBtnNLTRansfAdd",function (){
		//adiciona percentuais de transferência de fatura (não de file) para um bp
		let objRes=jQuery("#idSpaNLTRANSFRes");
		let residuo = objRes.text();
		//residuo = residuo.replace(/\./g,'');
		residuo = residuo.replace(/,/,'.');
		//---
		let objJa=jQuery("#idSpaNLTRANSFJaA");
		let faltaAtribuir = objJa.text();
		//---
		let objAvi = jQuery("#idSpaNLTRANSFAviso");
		objAvi.css({"background-color":"initial","color":"initial"});
		objAvi.text('');
		//---
		let bruto = jQuery("#idSpaNLTRANSFBruto").text();
		bruto = bruto.replace(/\./g,'');
		bruto = bruto.replace(/,/,'.');
		let benef=jQuery("#idSelNLTRANSFBenef option:selected").val();
		//---estar se o BP já está contemplado. Só pode ser uma vez
		let intPodeContinuar=1;//default Sim
		jQuery('#idTabNLTRANSFFeito tr').each(function() {
			let siglaAdv = jQuery(this).find("td").eq(0).find("button[type='button']").attr("id");
			if (siglaAdv==benef) intPodeContinuar=0;//NÃO
			//console.log("siglaAdv e benef e intPodeContinuar: ",siglaAdv+"/"+benef+"/"+intPodeContinuar);
		});
		if(benef== "-1") intPodeContinuar=-1;//NÃO (Não foi selecionado um beneficiário)
		//---
		let perc = jQuery("#idNumNLTRANSFPerc").val();
		//---
		let intPodePerc=0;//default NÃO
		if(perc*1>0){
			intPodePerc=1;//Sim
		}
		//---
		let valor = perc/100*bruto;
	//console.log("resíduo: "+residuo+" / valor: "+valor);
		let intPercFalta=0;//'NÃO' é default
		if(faltaAtribuir*1 > 0){
		intPercFalta=1;//Sim
		}
		if(intPercFalta==0){
		objAvi.css({"background-color":"red","color":"white"});
			objAvi.text('Este percentual ultrapassa o valor possível');
			objSalva.prop("disabled",true);//tranca, porque não pode salvar, enquanto não der zero a fazer
			objSalva.prop("title","Bloqueado até que os percentuais sejam todos atribuídos");
		}
		
		if(intPodeContinuar==0){
			objAvi.css({"background-color":"red","color":"white"});
			objAvi.text('A sigla '+benef+" já consta na tabela de adição");
		}
		if(intPodeContinuar==-1){
			objAvi.text("A indicação do nome a transferir não é válida");
			objSalva.prop("disabled",true);//tranca, porque não pode salvar, enquanto não der zero a fazer
			objSalva.prop("title","Bloqueado até que os percentuais sejam todos atribuídos");
		}
		if(intPodePerc==0){
			objAvi.css({"background-color":"brown","color":"white"});
				objAvi.text('O percentual tem de ser um valor maior que zero');
				objSalva.prop("disabled",true);//tranca, porque não pode salvar, enquanto não der zero a fazer
				objSalva.prop("title","Bloqueado até que os percentuais sejam todos atribuídos");
			}
		if(intPercFalta==1 && intPodeContinuar==1 && intPodePerc==1){
			let objTab = jQuery("#idTabNLTRANSFFeito");
			let estiloDireita="text-align:right;";
			let concatena = '<tr><td><button type="button" id="'+benef+'" class="btn btn-danger claBtnNLTRANSFRetira" title="Clicando neste botão, você retira este beneficiário da lista">'+benef+'</button></td><td style="'+estiloDireita+'">'+perc*1+'</td><td style="'+estiloDireita+'">'+valor+'</td></tr>';
			objTab.append(concatena);
			//cálculo do resíduo
			let residuoValor = residuo*1 - valor*1;
			objRes.text(residuoValor);
			faltaAtribuir=faltaAtribuir*1 - perc*1;
			objJa.text(faltaAtribuir);
			let objSalva = jQuery("#idBtnNLTRANSFSalvar");
			if(faltaAtribuir*1>0){
				objSalva.prop("disabled",true);//tranca, porque não pode salvar, enquanto não der zero a fazer
				objSalva.prop("title","Bloqueado até que os percentuais sejam todos atribuídos");
			}else{
				objSalva.prop("disabled",false);//Liberado: chegou a zero de percentuais que faltam ser atribuídos
				objSalva.prop("title","");
			}//if faltaAtribuir
			//---
		}
	});//idBtnNLTRansfAdd click)
//-------------------------------------------------	
jQuery(document).on("click",".claNLTransf",function (){
	//abre a tela para que o BP possa transferir somente ESTA FATURA...
	//...para outros ou um bp com percentuais discretos
	jQuery("#idNumNLTRANSFPerc").val("");
	jQuery("#idSpaNLTRANSFJaA").text('100');
	//---
	let objAvi = jQuery("#idSpaNLTRANSFAviso");
	objAvi.css({"background-color":"initial","color":"initial"});
	objAvi.text('');
	//---
	let objTab = jQuery("#idTabNLTRANSFFeito");
	objTab.empty();
	var p = jQuery(this).offset();
	  let objInp = jQuery(this);
	   let fatura = objInp[0].dataset.tfatura;
	  let pasta =  objInp[0].dataset.tfile;
	  let escritorio =  objInp[0].dataset.tescr;
	  let receb =  objInp[0].dataset.treceb;
	  //console.log("RECEB NO CLICK DO BOTÃO de transf",receb);
	  let captador =  objInp[0].dataset.tcap;
	  let bruto = objInp[0].dataset.tbruto;
	  //---
	  jQuery("#idSpaNLTRANSFFatura").text(fatura);
	  jQuery("#idSpaNLTRANSFCaso").text(pasta);
	  jQuery("#idSpaNLTRANSFEscritorio").text(escritorio);
	  jQuery("#idSpaNLTRANSFReceb").text(receb);
	  jQuery("#idSpaNLTRANSFCap").text(captador);
	  jQuery("#idSpaNLTRANSFBruto").text(bruto);
	  //---carrega o que já foi transferido
	  let intOperacao="1";
	  let nomeDataset="ds_ucrg_notasliquidadas_transf";
	  let arrayCampos=null;
	  let arrayNomeConstraints =['FATURA','PASTA','ESCRITORIO','RECEBIMENTO'];
	  //console.log("recebimento",receb);//dd/mm/yyyy
	  //---
	  let diaRe = receb.substring(0,2);
	  let mesRe = receb.substring(3,5);
	  let anoRe = receb.substring(6);
	  receb = anoRe+"-"+mesRe+"-"+diaRe;//refazendo o receb para ajustar ao que o dataset espera
	  //---
	  let arrayIniciais =[fatura,pasta,escritorio,receb];
	  let arrayFinais =[fatura,pasta,escritorio,receb];
	  let arrayOrdenacao=null;
	  let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
		let resultado = objDataset.pegaResultado();
	let concatena='<thead><tr><th>Transferido para</th><th>Percentual atribuído</th><th>Valor</th></tr></thead><tbody>';
	  let i=0;
	  let qtd=resultado.values.length;
	  let somaPerc=0;
	  for(i;i < qtd;i++){
		  let benef=resultado.values[i].ADV_BENEF;
		  let percJa=resultado.values[i].PERCENTUAL;
		  let valorJa=resultado.values[i].VALOR;
		  somaPerc=somaPerc+percJa*1;
		  concatena=concatena+'<tr><td><button type="button" id="'+benef+'" class="btn btn-danger claBtnNLTRANSFRetira" title="Clicando neste botão, você retira este beneficiário da lista">'+benef+'</button></td><td>'+percJa+'</td><td style="text-align:right;">'+valorJa+'</td></tr>';
	  }//for i
	  //---
	  concatena=concatena+'</tbody>';
	  objTab.append(concatena);
	  //---
	  let objRes=jQuery("#idSpaNLTRANSFRes");
		if(qtd==0){
			//valor default do resíduo
		jQuery("#idSpaNLTRANSFRes").text(bruto);
		}
		let falta = 100 - somaPerc;
		jQuery("#idSpaNLTRANSFJaA").text(falta);
		if(falta*1==0){
			jQuery("#idBtnNLTRANSFSalvar").prop("disabled",false);
			jQuery("#idBtnNLTRANSFSalvar").prop("title","");
		}
	  //---
	   let objDiv = jQuery("#idDivNLTRANSF");
		objDiv.css({"position":"absolute","left":p.left*0.40,"top":p.top*0.90,"z-index":"1","background-color":"#98FB98","padding":"10px","border-radius":"5px","width":"80%","box-shadow":"5px 10px #AFBBBB"});
		objDiv.show();
});//claNLTransf click
//-------------------------------------------------
jQuery(document).on("click","#idBtnNLTRANSFFechar",function (){
	jQuery("#idNumNLTRANSFPerc").val("");
	jQuery("#idSelNLTRANSFBenef option[value='-1']").prop('selected', true);
	jQuery("#idDivNLTRANSF").hide();
});//idBtnNLTRANSFFechar click
//-------------------------------------------------	
jQuery(document).on("click",".claBtnRAReset",function (){
	//este botão apaga todos os rateios feitos (faz recomeçar pela sugestão padrão)
	let faturaLida=jQuery("#idHidNLREFaturaSelecionada").val();
	let escritorioLido = jQuery("#idHidNLREEscritorioSelecionado").val();
	let casoLido = jQuery("#idHidNLREFileSelecionado").val();
	let recebimentoLido = jQuery("#idHidNLRERecebSelecionado").val();
	let bpLido = jQuery("#idHidNLREBPSelecionado").val();
	let booConfirma = confirm("Quer recomeçar do zero o rateio da fatura "+faturaLida+"? (Em caso de dúvida, cancele esta janela)");
	if(booConfirma){
	//---deleta a preservação existente
		fPreservacaoDeleta(casoLido);		
	//---deleta todo o rateio feito para esta fatura
	let d1 = DatasetFactory.createConstraint("FAT",faturaLida,faturaLida,ConstraintType.MUST);
	let d2 = DatasetFactory.createConstraint("CASO",casoLido,casoLido,ConstraintType.MUST);
	let d3 = DatasetFactory.createConstraint("ESC",escritorioLido,escritorioLido,ConstraintType.MUST);
	let d4 = DatasetFactory.createConstraint("FLAG","3","3",ConstraintType.MUST);//flag 3 deleta, mas tem de passar esses constraints acima
	let arrayConstraintsD=[];
	arrayConstraintsD.push(d1);
	arrayConstraintsD.push(d2);
	arrayConstraintsD.push(d3);
	arrayConstraintsD.push(d4);
	let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_deleterateio_avanc",null,arrayConstraintsD,null);
	if(resultadoD.values[0].deletado=="Ok"){
		let c1Ap = DatasetFactory.createConstraint("CASO",casoLido,casoLido,ConstraintType.MUST);
		let c2Ap = DatasetFactory.createConstraint("FAT",faturaLida,faturaLida,ConstraintType.MUST);
		let c3Ap = DatasetFactory.createConstraint("ESC",escritorioLido,escritorioLido,ConstraintType.MUST);
		let c4Ap = DatasetFactory.createConstraint("RECEB",recebimentoLido,recebimentoLido,ConstraintType.MUST);
		let arrayConstApr = [c1Ap,c2Ap,c3Ap,c4Ap];
		let resultadoApro = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria_deleta",null,arrayConstApr,null);
	//console.log("deletou apropriação ",resultadoApro.values[0].deletado);
		alert ("Repôs todos os valores de acordo com as regras iniciais. (No novo rateio desta fatura, torne a ativar a regra de preservação, caso tenha existido neste file)");
	}//if resultadoD
	//console.log("resultadoD",resultadoD);
	//---Depois de deletado, recria com o padrão
	fInauguraSugestoesNLE(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido);
	}else{
		alert ("Operação cancelada");
	}//if booConfirma
});//claBtnRAReset click
//---------------------------------------------------	
jQuery(document).on("click","#idBtnNLRETransTopo",function (){
fExecutaIdaParaTopoNLE();
});//idBtnNLRETransTopo click
//---------------------------------------------------------	
	jQuery(document).on("change","#idSelNLRETransf",function (){
		let objSpaAl=jQuery("#idSpaNLRAAvisoTransferir");
		objSpaAl.text('');
	});//idSelNLRETransf change
//------------------------------------------------------------
jQuery(document).on("click","#idBtnAdmSubExecuta",function (){
	let objTab=jQuery("#idTabAdmSubSubs");
	objTab.empty();
	let bpSel = jQuery("#idSelNLREEmissores option:selected").val();
	if(bpSel !='-1'){
let concatena='<thead><tr><th>PASTA</th><th>CAP ORIGINAL</th><th>SUBST</th>'+
			'<th>ATIVO</th><th>EDITOR</th><th>DATA</th></tr></thead><tbody>';
let c1=DatasetFactory.createConstraint("INT_OPER","8","8",ConstraintType.MUST);
let c2=DatasetFactory.createConstraint("BP_ORIGEM",bpSel,bpSel,ConstraintType.MUST);
let arrayConstraints = [];
arrayConstraints.push(c1);
arrayConstraints.push(c2);
let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraints,null);
let i=0;
for(i;i< resultado.values.length;i++){
	let caso = resultado.values[i].PASTA;
	let orig = resultado.values[i].BP_ORIGINAL;
	let subs = resultado.values[i].BP_SUBSTITUTO;
	let ativo = resultado.values[i].ATIVO;
	let emailEditor = resultado.values[i].EMAIL_EDITOR;
	let dataEdicao = resultado.values[i].DATA_EDICAO;
concatena = concatena + '<tr><td>'+caso+'</td><td>'+orig+'</td><td>'+subs+'</td>'+
'<td>'+ativo+'</td><td>'+emailEditor+'</td><td>'+dataEdicao+'</td></tr>';
}//for i
concatena=concatena+'</tbody>';
objTab.append(concatena);
}//if bpSel
//int operação 8
});//idBtnAdmSubExecuta click
//----------------------------------------------------
jQuery(document).on("click","#idBtnNLRECANCELAR",function (){
		//este botão anula a transferência de atribuição para fazer o rateio e volta ao bp original do file
	let objAviT=jQuery("#idSpaNLRETRAnulaAviso");
		let captadorNota = jQuery("#idSpaNLREAnulaCaptador").text();
		let fileLido=jQuery("#idSpaNLREAnulaFile").text();
		if(fileLido.length>0){
			let c1 = DatasetFactory.createConstraint("PASTA",fileLido,fileLido,ConstraintType.MUST);
			let c2 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
			let arrayConstraints = [];
			arrayConstraints.push(c1);
			arrayConstraints.push(c2);
			//---
			let arrayCampos=[];
			arrayCampos.push(WCMAPI.userEmail.toUpperCase());
			arrayCampos.push(new Date().toLocaleDateString());
			let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidas_bpsubs_update",arrayCampos,arrayConstraints,null);
			let resultadoU=resultado.values[0].update;
			let sucesso=resultadoU;
			if(resultadoU=="OK") resultadoU="Ok... Por favor, feche esta janela e faça uma nova pesquisa geral para ver o resultado";
			objAviT.text("Cancelamento "+resultadoU);
		//	//console.log("ResultadoU",resultadoU);
			if(sucesso=="OK"){
				//console.log("vai bloquear?");
			if(jQuery(".claBtnNLRADelegado").attr("id")==fileLido) {
			//	//console.log('bloqueou os botões de transferênciia');
				jQuery(".claBtnNLRADelegado").prop("disabled",true);
				jQuery(".claBtnNLRADelegado").prop("title","Botão inibido porque todas as visualizações não estão mais ativas. Por favor, refaça sua pesquisa geral para liberar estes botões.");
			}//if jquery
			}//if resultadoU
		}//if fileLido.length
			/*
			//console.log("resultado da anulação da transferência",resultado);
			//----recarrega a tabela principal para mostrar que a nota já foi transferida
			let dataPesquisaI=jQuery("#idDatNLREDAI").val();
			let dataPesquisaF=jQuery("#idDatNLREDAF").val();
			//console.log(dataPesquisaI+" "+dataPesquisaF+" "+captadorNota);
			fPegaBPNaMaquinaNLE();//para refazer os arrays globais que armazenam as transferências
			fCompoeTabelaNLRE(dataPesquisaI,dataPesquisaF,"-1",captadorNota);
			*/
});//idBtnNLRECANCELAR click
	//----------------------------------------
	jQuery(document).on("click","#idBtnNLRETRFECHAR",function (){
		jQuery("#idDivNLREAnula").hide();
		 fPulaParaElementoRANLE("idDatNLREDAI");
	});//idBtnNLRETRFECHAR click
	//--------------FIM DA ÁREA DE TESTE----	
	jQuery(document).on("click","#idBtnNLREAdmin",function (){
		alert ("Este botão é de uso dos Administradores da página");
		//esta rotina atualiza a tabela CUSTOM_APA.ZJOBCLIENTSCSUBST inserindo,
		//...ou fazendo update de seus registros. Estes registros são os...
		//...controles de qual BP está substituindo qual.
		//...Neste caso, esta rotina registra todos os files que o captador...
		//...é UCRG, apontando o EMISSOR do file como substituto
		let dataPesquisa=jQuery("#idDatNLREAdmin").val();
		let insertUpdate = jQuery('input:radio[name=namRadNLREOperacao]:checked').val();
		if(insertUpdate*1==1){
			if(dataPesquisa.length == 10){
			//procura na tabela de participação do sisjuri os files com captador UCRG
			let d1 = DatasetFactory.createConstraint("INT_OPER","7","7",ConstraintType.MUST);
			let d2 = DatasetFactory.createConstraint("DATA_PESQUISA",dataPesquisa,dataPesquisa,ConstraintType.MUST);
			let arrayConstraintsD=[];
			arrayConstraintsD.push(d1);
			arrayConstraintsD.push(d2);
			let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsD,null);
			//----de posse de todos os files cujo BP captador é UCRG, gravar/atualizar na tabela de substitutos como...
			//...o bp emissor como substituto destes
			let i=0;
			let qtdFiles=resultadoD.values.length;
			let conta=0;
			//console.log("Encontrou "+qtdFiles+" que têm UCRG como captador");
			for(i;i<qtdFiles;i++){
				let pasta = resultadoD.values[i].PASTA;
				let emissor = resultadoD.values[i].SOCIO_RESPONSAVEL;
				//de posse da pasta, perguntar se já existe substituto na tabela. Se não existir, insert. Se existir, update
				let e1 = DatasetFactory.createConstraint("INT_OPER","3","3",ConstraintType.MUST);
				let e2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
				let arrayConstraintsE=[];
				arrayConstraintsE.push(e1);
				arrayConstraintsE.push(e2);
				let resultadoE=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsE,null);
				let qtdSubs=resultadoE.values.length;
				if(qtdSubs == 0){
					//é insert, porque não existe
					 fFazInsertSubstitutoNLE(pasta,"UCRG",emissor);
					// let booConfirma = confirm("Fazendo criação de substituto "+pasta+" "+emissor+". Continua?");
					//console.log("Criando "+pasta+" "+emissor);
					// if(!booConfirma) i = qtdFiles;//Para parar o processo
					 conta++;
				}//if resultadoE
			}//for i
			alert ("Fez a transferência para o Emissor "+conta+" files quem têm o BP Captador como UCRG");
		}else{
			alert ("Data inválida");
		}//if data
		}//if insert Update ==1
		if(insertUpdate*1==2){
			//é update.***** 
			let fileUp=prompt("Entre com o número do file","12345");
			let siglaEmissor=jQuery("#idSelNLREEmissores option:selected").val();
			if(siglaEmissor != '-1'){
				let booConfirma = confirm("Fazendo ATUALIZAÇÃO do file "+fileUp+", emissor "+siglaEmissor+". Continua?");
				if(booConfirma){
				fFazUpdateSubstitutosNLE(fileUp,"UCRG",siglaEmissor);
				alert ("Executada a atualização. Faça uma pesquisa nas notas do Emissor, no mês da data escolhida,  para ver a coleta neste file");
				}else{
					alert ('Operação cancelada');
				}//if booConfirma
				}//is siglaEmissor			
			
		}//if insertUpdate ==2
	});//idBtnNLREAdmin click
//---------------------------------------------------------
	jQuery(document).on("click","#idBtnNLRETopo",function (){
		fExecutaIdaParaTopoNLE();
	});//idBtnNLRETopo click
//--------------------------------------------------------------
	jQuery(document).on("blur","#idDatNLREDAF",function (){
		let objSpa = jQuery("#idSpaAvisosNLRE");
		objSpa.css({"color":"initial","font-weight":"initial"});
		objSpa.text("");
		let mesF=jQuery(this).val().substr(5,2);
		let txtDataI=jQuery("#idDatNLREDAI").val();
		//yyyy-mm-dd
		let mesI=txtDataI.substr(5,2);
		if (mesF*1 != mesI*1){
			//toda a rotina desta widget só funciona no mesmo mês da data inicial e final
			alert("As data inicial e final têm de estar dentro do mesmo mês/ano, do contrário a consulta não irá retornar valores");
		}//if mesF
	});//idDatNLREDAI blur
//--------------------------------------------------------
	jQuery("#idBtnNLRAAnular").on("click",function (){
		/*
		//este botão anula a transferência de atribuição para fazer o rateio e volta ao bp original do file
		let captadorNota=jQuery("#idHidNLREBPSelecionado").val();
		let booConfirma = confirm("Quer mesmo anular esta transferência de atribuição do rateio, voltando ao BP original do file? (Na dúvida, cancele esta janela)");
		if(booConfirma){
			let fileLido=jQuery("#idSpaNLRAFileLido").text();
			let c1 = DatasetFactory.createConstraint("PASTA",fileLido,fileLido,ConstraintType.MUST);
			let c2 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
			let arrayConstraints = [];
			arrayConstraints.push(c1);
			arrayConstraints.push(c2);
			//---
			let arrayCampos=[];
			arrayCampos.push(WCMAPI.userEmail.toUpperCase());
			arrayCampos.push(new Date().toLocaleDateString());
			let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidas_bpsubs_update",arrayCampos,arrayConstraints,null);
			//console.log("anulou, fez update?",resultado.values[0].update)
			//console.log("resultado da anulação da transferência",resultado);
			//----recarrega a tabela principal para mostrar que a nota já foi transferida
			fPegaBPNaMaquinaNLE();//para refazer os arrays globais que armazenam as transferências
			let dataPesquisaI=jQuery("#idDatNLREDAI").val();
			let dataPesquisaF=jQuery("#idDatNLREDAF").val();
			fCompoeTabelaNLRE(dataPesquisaI,dataPesquisaF,"-1",captadorNota);
			jQuery("#idDivNLRAMensagem").hide();
			}//booConfirma
			*/
	});//idBtnNLRAAnular click
//----------------------------------------------------------	
	jQuery(document).on("click",".claBtnNLRADelegado",function (){
		//console.log("clicou");
		var p = jQuery(this).offset();
		//console.log("left completo: " + p.left + ", top: " + p.top );
	//	//console.log("left: " + p.left*0.50 + ", top: " + p.top );
		let objBtnCan=jQuery("#idBtnNLRECANCELAR");
		objBtnCan.show();
		jQuery("#idSpaNLRETRAnulaAviso").text('');
		let objDiv = jQuery("#idDivNLREAnula");
		objDiv.css({"position":"absolute","left":p.left*0.50,"top":p.top*0.80,"z-index":"1"});
		objDiv.show();
		let texto="";
		//--------------------------
		let fileLido=jQuery(this).attr("id");
		let captadorSelecionado = jQuery("#idHidNLREBPSelecionado").val();
		jQuery("#idSpaNLREAnulaCaptador").text(captadorSelecionado);
		//--
		jQuery("#idSpaNLREAnulaFile").text(fileLido);
		//alert ("Em desenvolvimento. Quando o BP clicar neste botão ele vai saber para quem foi delegado o rateio deste file "+fileLido);
		let c1 = DatasetFactory.createConstraint("PASTA",fileLido,fileLido,ConstraintType.MUST);
		let c2 = DatasetFactory.createConstraint("INT_OPER","3","3",ConstraintType.MUST);
		let c3 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
		let arrayConstraints = [];
		arrayConstraints.push(c1);
		arrayConstraints.push(c2);
		arrayConstraints.push(c3);
		//---
		let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraints,null);
		if(resultado.values.length>0){
		let bpOrig = resultado.values[0].BP_ORIGINAL;
		let bpSubs = resultado.values[0].BP_SUBSTITUTO;
		if(bpSubs=='UCRG') objBtnCan.hide();//As notas como despesas têm o substituto como UCRG. O BP não pode cancelar esta atribuição
		let emailEditor = resultado.values[0].EMAIL_EDITOR;
		let dataEdicao = resultado.values[0].DATA_EDICAO;
		//---
		let e1 = DatasetFactory.createConstraint("EMAIL",emailEditor,emailEditor,ConstraintType.MUST);
		let arrayConstraintsE=[];
		arrayConstraintsE.push(e1);
		let resultadoE=DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraintsE,null);
		let siglaEditor = resultadoE.values[0].COD_ADVG;
		let categoriaEditor = resultadoE.values[0].CATEGORIA;
		//---
		texto = "O BP original ("+bpOrig+") está sendo substituído neste file por ";
		texto = texto + bpSubs+".\r\n A atribuição foi feita por "+siglaEditor+" ("+categoriaEditor+"), em "+dataEdicao;
		//---
		}else{
			objBtnCan.hide();
			texto = "O BP Captador original está sendo substituído na tarefa de fazer o rateio neste file pelo Emissor. Isto é feito automaticamente pelo sistema por ser uma captação múltipla.";
		}//if resultado
		jQuery("#idSpaNLREAnulaTexto").text(texto);
	});//claBtnNLRADelegado click
//------------------------------------------------------------
	jQuery(document).on("click",".claBtnNLRARemover",function (){
		let sigla=jQuery(this).attr("id");
		//---
		let faturaLida = jQuery("#idHidNLREFaturaSelecionada").val();
		let casoLido = jQuery("#idHidNLREFileSelecionado").val();
		let escritorioLido = jQuery("#idHidNLREEscritorioSelecionado").val();
		let recebimentoLido = jQuery("#idHidNLRERecebSelecionado").val();
		let bpLido=jQuery("#idHidNLREBPSelecionado").val();
		  //----deletando este advogado na custom_apa.ZJOBCLIENT que tiver esses dados
		   let d1 = DatasetFactory.createConstraint("CASO",casoLido,casoLido,ConstraintType.MUST);
		   let d2 = DatasetFactory.createConstraint("FAT",faturaLida,faturaLida,ConstraintType.MUST);
		   let d3 = DatasetFactory.createConstraint("ESC",escritorioLido,escritorioLido,ConstraintType.MUST);
		   let d4 = DatasetFactory.createConstraint("BP",bpLido,bpLido,ConstraintType.MUST);
		   let d5 = DatasetFactory.createConstraint("RECEB",recebimentoLido,recebimentoLido,ConstraintType.MUST);
		   let d6 = DatasetFactory.createConstraint("ADV",sigla,sigla,ConstraintType.MUST);
		   let d7 = DatasetFactory.createConstraint("FLAG","1","1",ConstraintType.MUST);
		   let arrayConstraintsD=[];
		   arrayConstraintsD.push(d1);
		   arrayConstraintsD.push(d2);
		   arrayConstraintsD.push(d3);
		   arrayConstraintsD.push(d4);
		   arrayConstraintsD.push(d5);
		   arrayConstraintsD.push(d6);
		   arrayConstraintsD.push(d7);
		  //console.log("Array para deletar ADVOGADO",arrayConstraintsD);
		   let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_deleterateio_avanc",null,arrayConstraintsD,null);
		   let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		  //console.log("Linha 307 resultadoR",resultadoR);
		   if(resultadoR.values.length>0){
			   //ainda tem rateio feito. Recarrega os feitos
			  //console.log("Tinha rateio para deletar com esse arrayConstraints");
			   let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
				//console.log("booTemPreservacao",booTemPreservacao);
				if(!booTemPreservacao){
		   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
				}//if !boo
		   }else{
			   //deletou todos os advogados, carrega como se começasse agora através da tabela de pesquisas
			  //console.log("Tinha deletado todos os adv e refez: arrayConstraints");
			   fInauguraSugestoesNLE(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido);
		   }//if resultadoR
	});// claBtnNLRARemover click
//-----------------------------------------------------
	jQuery(document).on("click","#idBtnNLREIncluir",function (){
		//alert ("Entrou na inclusão");
		//insere na tabela de rateios um advogado que não estava na lista de sugestões e já lê a tabela para...
		//...carregar a tabela de sugestões.
		let jobTotal = jQuery("#idHidNLREJobSelecionado").val();
		//---
		//VOU PRECISAR DE FATURA, PASTA,ESCRITORIO,DATA DO RECEBIMENTO,ADV,PERC,VALOR RATEADO, CAPTADOR E DATA ATUAL
		let adv = jQuery("#idSelNLREAdvs option:selected").val();
		let perc = jQuery("#idNumNLRETaxa").val();
		if(adv != '-1'){
		let vlr = perc*1 * jobTotal*1;
		let arrayObjs=[];
		let meuObj={"adv":adv,"perc":perc};
		arrayObjs.push(meuObj);
		fRecalculaProporcaoRateioNLE(arrayObjs);//RBM pediu para tirar o recálculo em email de 12/12/2022
		fSomaPercentuaisNLE();
		}else{
			alert ("Escolha um advogado, antes de pressionar este botão");
		}//if adv
	});//idBtnNLREIncluir click
//-----------------------------------------------------
	jQuery(document).on("click",".claRateioDetalhe",function (){
		jQuery("#claTBNLREDETROTULO").show();
		jQuery("#idArtNLRADET").show();
		   let objInp = jQuery(this);
		   let faturaLida = objInp[0].dataset.tagfadet;
		   let casoLido=objInp[0].dataset.tagcasodet;
		   //jQuery("#idH3NLREDETROT").text("DETALHE DOS TIMESHEETS");
		   fExibeTS(casoLido,faturaLida);
		   fPulaParaElementoRANLE('idArtNLRADET');
	});//claRateioDetalhe click
//------------------------------------------------------
	jQuery(document).on("click","#idBtnNLRATransferir",function (){
		window.confirm("Você deseja transferir a fatura para outro BP?");
		let objSpaAl=jQuery("#idSpaNLRAAvisoTransferir");
		objSpaAl.css({"background-color":"initial","color":"initial","font-weight":"initial","text-align":"right"});
		//alert ("(Em desenvolvimento) Este botão serve, para fins de rateio por equipe, transferir para outro BP a responsabilidade de fazer rateio");
		let pasta=jQuery("#idHidNLREFileSelecionado").val();
		let captadorNota = jQuery("#idHidNLREBPSelecionado").val();
		//let captadorSubst=prompt("Entre com a sigla do responsável pelo rateio desta nota","XXX");
		let captadorSubst=jQuery("#idSelNLRETransf option:selected").val();
		if(captadorSubst != "-1"){
		captadorSubst=captadorSubst.trim().toUpperCase();
		if(captadorNota != captadorSubst){
			//console.log("Captador da nota e substituto são diferentes:",captadorNota+" -> "+captadorSubst);
		let b1 = DatasetFactory.createConstraint("COD_ADVG",captadorSubst,captadorSubst,ConstraintType.MUST);
		let b2 = DatasetFactory.createConstraint("CATEGORIA","S%","S%",ConstraintType.MUST,true);
		let arrayConstraintsB=[];
		arrayConstraintsB.push(b1);
		arrayConstraintsB.push(b2);
		//console.log("arrayConstraintsB",arrayConstraintsB);
		let resultadoB=DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraintsB,null);
		if(resultadoB.values.length>0){
		//é uma sigla de BP que foi informada. Pode prosseguir
		let s1 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
		let s2 = DatasetFactory.createConstraint("INT_OPER","3","3",ConstraintType.MUST);
		let arrayConstraintsS=[];
		arrayConstraintsS.push(s1);
		arrayConstraintsS.push(s2);
		//console.log("arrayConstraintsS",arrayConstraintsS);
		let resultadoS=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsS,null);
		//console.log("resultadoS",resultadoS.values.length);
		if(resultadoS.values.length==0){
			fFazInsertSubstitutoNLE(pasta,captadorNota,captadorSubst);
			//é para fazer INSERT porque não existe
		}else{
			//já existe  substituto.
			//----dados para potencial alteração do registro
			let bpSubstitutoLido = captadorSubst;
			let bpFile = captadorNota;
			let marcarAtivo="1";
			let ativoBusca="-1";//não importa o estado do registro na tabela de substitutos
			let intFazer=0;
			//---
			if(resultadoS.values[0].ATIVO=="1"){
				//o substituto está ativo. precisa saber se vai substituir
			let booConfirma = confirm("Já existe para este caso como substituto. A sigla dele é "+bpSubstitutoLido+". Quer substitui-lo por "+captadorSubst+"? (Na dúvida, cancele esta janela)");
			if(booConfirma){
				intFazer=1;//vai alterar a tabela
			}else{
				alert ("Operação cancelada");
			}//if booConfirma
			}else{
				//o substituto está desativado, logo pode refazer os dados do file em questão e ativar
				intFazer=1;//vai alterar a tabela
			}//if resultadoS
		}//if resultadoS
		//-----feitos os testes, se a variável intFazer==1, executar o update sem precisar de status
		let ativoBusca="-1";//não importa o estado do registro na tabela de substitutos
		fFazUpdateSubstitutosNLE(pasta,captadorNota,captadorSubst);
		jQuery("#idDivNLRAMensagem").hide();
		objSpaAl.text(pasta+" atribuída a "+captadorSubst+" com sucesso. Por favor, clique no botão 'Ir para o topo' e faça uma nova pesquisa geral para ver o resultado");
		objSpaAl.css({"background-color":"green","color":"white","font-weight":"900"});
		} else {
			objSpaAl.text("A sigla "+captadorSubst+" não é a de um Sócio Conselheiro");
		}//if resultadoB
		}else{
			objSpaAl.text("O captador substituto não pode ser o atual captador deste file");
		}//if captadorNota
            }else{
            	objSpaAl.text("Por favor, indique um Sócio Conselheiro na caixa acima");
            	objSpaAl.css({"background-color":"red","color":"white","font-weight":"900"});
            }//if captadorSubst
			fExecutaIdaParaTopoNLE();
	});//idBtnNLRATransferir click
//-------------------------------------------------------
jQuery(document).on("blur",".claRARateioReal",function (){
		//recalcula a coluna job proporcional de acordo com a taxa e o job total
	let objBtn=jQuery(".claRateioConfirma");
	objBtn.prop("title","");
	objBtn.prop("disabled",false);	
	let objSpa=jQuery("#idSpaRASomaJob");
	objSpa.text("");
		let jobTotal=jQuery("#idHidNLREJobSelecionado").val();
		//console.log("Linha 875 blur do campo do percentual efetivo, valor jobTotal",jobTotal);
		let somaJobs=0;
		jQuery('#idTabNLRENLRA tr').each(function() {
			 let efetivo = jQuery(this).find("td").eq(2).find("input[type='text']").val();
				if(!isNaN(efetivo)){
			 let novoValor=efetivo*1/100*jobTotal;
			 somaJobs=somaJobs+novoValor;
		jQuery(this).find("td").eq(3).html(parseFloat(novoValor).toFixed(2));
				}//if !isNaN
	});//each
		let diferencaJobs = jobTotal*1 - somaJobs;
		//console.log("O que vai entrar em idSpaRASomaJob",parseFloat(somaJobs).toFixed(2));
		let msg = "Diferença entre os jobs proporcionais e o total: R$"+diferencaJobs;
		//console.log("diferencaJobs",diferencaJobs);
		if(Math.abs(diferencaJobs*1) > 0.002){
		objSpa.text(msg);
		objBtn.prop("title","Desabilitado porque o total de jobs calculados é diferente do total do job da nota");
		objBtn.prop("disabled",true);	
		}
		
//---------------------------
	fSomaPercentuaisNLE();
});//claRARateioReal blur
//---------------------------------------------------


	

jQuery(document).on("click",".claRateioConfirma",function (){
	let operador = WCMAPI.userEmail.toUpperCase();
		//CLICK. faz insert na tabela de 'rateios-feitos' com os valores constantes nas células da tabela de sugestão...
		//...,mas primeiro deleta todos os lançamentos existentes. Se tiver preservação, deleta o que tem...
		//...na tabela e faz nova inserção
		//-----------é para preservar o rateio da vez, a fim de nas próximas emissões usar sua regra?
	let pastad='-1';
		let objInp = jQuery(".claChkPreservaRateio:checked");
		let intPreservaSim=0;
		if(jQuery(".claChkPreservaRateio:checked").length>0){
			let booConfirma=confirm("Você optou por guardar este modelo de rateio para as próximas faturas neste file. Confirma? (Na dúvida, cancele)");
			if(booConfirma){
			//é para preservar
		intPreservaSim=1;
	    pastad = objInp[0].dataset.numerofile;
	   fPreservacaoDeleta(pastad);
			}else{
				alert ("Preservação ignorada, vai prosseguir com o salvamento normalmente");
			}//if booConfirma
		}//if objInp
		//------------
		jQuery("#idSpaNLRAAvisoTransferir").text("");
		let booConfirma=true;
		//----------------------------------------------------
		let faturaLida=jQuery("#idHidNLREFaturaSelecionada").val();
		let casoLido=jQuery("#idHidNLREFileSelecionado").val();
		let escritorioLido=jQuery("#idHidNLREEscritorioSelecionado").val();
		let recebimentoLido=jQuery("#idHidNLRERecebSelecionado").val();
		let bpLido=jQuery("#idHidNLREBPSelecionado").val();
		let jobTotal=jQuery("#idHidNLREJobSelecionado").val();
		 //----deletando todos os rateios na custom_apa.ZJOBCLIENT que tiver esses dados
		   let d1 = DatasetFactory.createConstraint("CASO",casoLido,casoLido,ConstraintType.MUST);
		   let d2 = DatasetFactory.createConstraint("FAT",faturaLida,faturaLida,ConstraintType.MUST);
		   let d3 = DatasetFactory.createConstraint("ESC",escritorioLido,escritorioLido,ConstraintType.MUST);
		   let d4 = DatasetFactory.createConstraint("BP",bpLido,bpLido,ConstraintType.MUST);
		   let d5 = DatasetFactory.createConstraint("RECEB",recebimentoLido,recebimentoLido,ConstraintType.MUST);
		   let d6 = DatasetFactory.createConstraint("FLAG","0","0",ConstraintType.MUST);
		   let arrayConstraintsD=[];
		   arrayConstraintsD.push(d1);
		   arrayConstraintsD.push(d2);
		   arrayConstraintsD.push(d3);
		   arrayConstraintsD.push(d4);
		   arrayConstraintsD.push(d5);
		   arrayConstraintsD.push(d6);
		  //console.log("Array para deletar o que tiver de rateio",arrayConstraintsD);
		   let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_deleterateio_avanc",null,arrayConstraintsD,null);
		//console.log("Na confirmação, deleta os rateios da inauguração: ",resultadoD.values[0].deletado);
		//-------
		let arrayConstraintsU=[];
		//-------	
		let arrayTabAdv=[];
		let arrayTabEfetivo=[];
		let arrayTabValor=[];

		   jQuery('#idTabNLRENLRA tr').each(function() {
			   let adv =  jQuery(this).find("td").eq(0).html();
			//console.log('linha 492, adv',adv);
			//  if(typeof adv !=="undefined"){
				//  //console.log("tipo do adv 494",typeof adv+" comprimento:"+adv.length+" coonteúdo: "+adv);
				//   if(adv.length<5){
			  let efetivo = jQuery(this).find("td").eq(2).find("input[type='text']").val();
			  let valor  = jQuery(this).find("td").eq(3).html();
			//console.log("tentando adv e percentual",adv+","+efetivo);
			  if (arrayTabAdv.includes(adv)){
				  let index = arrayTabAdv.indexOf(adv);
				 //console.log("Achou ja registrado: "+adv+" no index "+index);
				  //este advogado já apareceu na lista. Assim, vamos somar o percentual e o valor
				  //descubro o índex do array que tem a ocorrência e substituo o valor pela soma
				  let efetivoAnterior = arrayTabEfetivo[index]*1;
				  let valorAnterior = arrayTabValor[index]*1;
				 //console.log("efetivoAnterior",efetivoAnterior);
				 //console.log("valorAnterior",valorAnterior);
				  //---somar com os valores correntes
				  arrayTabEfetivo[index]=efetivoAnterior+efetivo*1;
				  arrayTabValor[index]=valorAnterior+valor*1;
				 //console.log("efetivo atual",efetivo);
				 //console.log("Valor atual",valor);
				 //console.log("Soma efetivo",efetivoAnterior+efetivo*1);
				 //console.log("Soma valor: "+valorAnterior+valor*1);
			  }else{
				  //primeira vez, faz push
				 //console.log("Primeira vez",adv);
				  if(typeof adv != "undefined" && adv.length<6){
			  arrayTabAdv.push(adv);
			  arrayTabEfetivo.push(efetivo);
			  arrayTabValor.push(valor);
			 //console.log("Pondo primeira vez "+adv+" "+efetivo+" "+valor);
				  }//if typeof
			  }//if arrayTab
		   });//each
		  //console.log("Quantidade de ocorrências no loop da tabela: ",arrayTabAdv.length);
		   let iA=0;
		   for(iA;iA < arrayTabAdv.length;iA++){
			  //if(typeof efetivo !="undefined" && !isNaN(efetivo)){
				  jQuery("#idSpaRASomaJob").css({"color":"initial"});
				  let adv = arrayTabAdv[iA];
				  let efetivo = arrayTabEfetivo[iA];
				  let valor = arrayTabValor[iA];
				 //console.log("adv no loop",adv+" "+efetivo+" "+valor);
				   let arrayCampos=[];
						arrayCampos.push(faturaLida);
						arrayCampos.push(casoLido);
						arrayCampos.push(escritorioLido);
						arrayCampos.push(recebimentoLido);
						arrayCampos.push(adv);
						arrayCampos.push((efetivo*1/100).toString());
						arrayCampos.push((valor).toString());
						arrayCampos.push(bpLido);
						arrayCampos.push(new Date().toLocaleDateString());
						if(intPreservaSim*1==1){
							 //---vai inserir na preservação para a próxima emissão no file
						    let pastaIns = pastad;
						    let advIns = adv;
						    let percIns = (efetivo*1/100).toString();
						    let operadorIns = operador;
						    let dataPresHoje =  new Date();
						    let dataIns = dataPresHoje.getFullYear()+"-"+(dataPresHoje.getMonth()*1+1).toString()+"-"+dataPresHoje.getDate();
						    let statusIns="1";
						    fPreservaInsert(pastaIns,advIns,percIns,operadorIns,dataIns,statusIns);
						    //console.log("após o insert: adv no loop",adv+" "+efetivo+" "+valor);
						}//if preservaSim == 1
						//----preciso pegar a sigla do estagiário se houver apropriação e inserir na tabela de rateios
						let cA1 = DatasetFactory.createConstraint("FATURA",faturaLida,faturaLida,ConstraintType.MUST);
						let cA2 = DatasetFactory.createConstraint("ESCRITORIO",escritorioLido,escritorioLido,ConstraintType.MUST);
						let cA3 = DatasetFactory.createConstraint("RECEBIMENTO",recebimentoLido,recebimentoLido,ConstraintType.MUST);
						let cA4 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
						let cA5 = DatasetFactory.createConstraint("CHEFE",adv,adv,ConstraintType.MUST);
						let arrayConsA =[cA1,cA2,cA3,cA4,cA5];
						//console.log("Procurando a apropriação da vez (arrayConsA): ",arrayConsA);
						let resultadoA = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria",null,arrayConsA,null);
						let  indiceApr="";
									//console.log("resultadoA",resultadoA);
						if(resultadoA.values.length>0){
							indiceApr = resultadoA.values[0].INDICE_APR;
						}
						arrayCampos.push(indiceApr.toString());
						//----
						//console.log("O que vai para o insert",arrayCampos);
						let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_insert_avanc",arrayCampos,null,null);
						//console.log("inseriu rateio claRateioConfirma: ",resultado);
						if(resultado.values[0].insercao=="Ok"){
							/*
							//uma vez que foi inserido, preciso verificar se existe apropriação na tabela inserida...
							//...uts apropriadas. Se tiver, leio a coluna da tabela inserida que mostra a sigla apropriada e 
							//...insiro aqui a linha correspondente na tabela abaixo.
									let cS1 = DatasetFactory.createConstraint("FATURA",faturaLida,faturaLida,ConstraintType.MUST);
					             let cS2 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
					             let cS3 = DatasetFactory.createConstraint("ESCRITORIO",escritorioLido,escritorioLido,ConstraintType.MUST);
					             let cS4 = DatasetFactory.createConstraint("RECEB",recebimentoLido,recebimentoLido,ConstraintType.MUST);
					             let arrayConstS =[cS1,cS2,cS3,cS4];
					             let resultadoS = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateiosfeitos_avanc",null,arrayConstS,null,null);
					             let s = 0;
					            //console.log("resultadoS",resultadoS);
					             for(s;s < resultadoS.values.length;s++){
					            	 let estApr = resultadoS.values[s].EST_APR.trim();
					            	 if(estApr != ""){
					            		 //existe uma entrada no rateio feito que é de um estagiário que cedeu UTS para seus chefe
					            		//console.log("EstApr=== ",estApr);
					            		 //FATURA,ESCRITORIO,SIGLA_EST,SIGLA_CHEFE,DTRECEBIMENTO,PASTA
					            		 let arrayCamposApr=[];
											arrayCamposApr.push(faturaLida);
											arrayCamposApr.push(escritorioLido);
											arrayCamposApr.push(estApr);
											arrayCamposApr.push(adv);
											arrayCamposApr.push(recebimentoLido);
											arrayCamposApr.push(casoLido);
											let resultadoApr = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria_ins",arrayCamposApr,null,null);
											//console.log("Salvou a apropriação claRateioConfirma click: ",resultadoApr.values[0].insercao);
					            	 }//ifr estApr
					             }//for s
					             */
						}//if resultado.values[0]
						jQuery("#idSelNLREAdvs option[value='-1']").prop('selected', true);
						jQuery("#idNumNLRETaxa").val("");
			 // }//if typeof
				   //}else{
					  // alert ("Ok. Cancelada a operação. Pode indicar um novo advogado escolhendo um novo nome na lista 'Advogados a incluir no rateio, acima");
					 //    return false;//para parar de rolar o each
			//	   }//if adv.length
			 //  }//if typeof adv
		   }//for iA
		   intPreservaSim=0; 
		   let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		   let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
			//console.log("booTemPreservacao",booTemPreservacao);
			if(!booTemPreservacao){
		   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
			}//if !boo
		   fRefazOStatusTabelaPrincipalNLE();
			let objSpa=jQuery("#idSpaRASomaPercentual");
			objSpa.text("Rateio salvo");
			fAtualizaColunaStatus(casoLido,faturaLida);
			alert ("Rateio salvo");
});//claRateioConfirma click
//----------------------------------------------------
jQuery(document).on("click",".claBtnEspecial",function (){
	//este botão está dentro da tabela e é dinâmico. Ele serve para carregar uma...
	//...janela para poder prover os valores a salvar na tabela especial
	let objInp = jQuery(this);
	   let faturaLida = objInp[0].dataset.fatesp;
	   let casoLido = objInp[0].dataset.casoesp;
	   let escLido = objInp[0].dataset.escesp;
	   let recebLido = objInp[0].dataset.recesp;
	   let liqLido = objInp[0].dataset.liqesp;
	   let ultimo = objInp[0].dataset.ultimo;
	   let dataUltima = objInp[0].dataset.dataultima;
	   //tirando as vírgulas e os pontos decimais
	   //liqLido = liqLido.toString().replace(/\./g,"");
	   //liqLido = liqLido.toString().replace(/,/g,".");
	  //console.log("fatura: "+faturaLida+" casoLido: "+casoLido+" escLido: "+escLido+" recebLido: "+recebLido+" liqLido: "+liqLido);
	   jQuery("#idSpaEspFatura").text(faturaLida);
	   jQuery("#idSpaEspCaso").text(casoLido);
	   jQuery("#idSpaEspEscritorio").text(escLido);
	   jQuery("#idSpaEspReceb").text(recebLido);
	   jQuery("#idNumEspLiquido").val(liqLido);
	   jQuery("#idSpaEspUltimo").text(ultimo);
	   jQuery("#idSpaEspData").text(dataUltima);
		var p = jQuery(this).offset();
	   let objDiv = jQuery("#idDivEspecial");
		objDiv.css({"position":"absolute","left":p.left*0.40,"top":p.top*0.90,"z-index":"1","background-color":"#778899","padding":"10px","border-radius":"5px","box-shadow":"5px 10px #AFBBBB"});
		objDiv.show();
});//claBtnEspecial click
//----------------------------------------------------
jQuery(document).on("click","#idBtnEspSalvar",function (){
	//salvando o líquido especial, quando o líquido calculado não é o que deveria ser
	let emailEditor = WCMAPI.userEmail.toLowerCase();
	//---
	  let faturaLida = jQuery("#idSpaEspFatura").text();
	  let casoLido = jQuery("#idSpaEspCaso").text();
	  let escLido =  jQuery("#idSpaEspEscritorio").text();
	  let recebLido = jQuery("#idSpaEspReceb").text();
	  let liqLido =  jQuery("#idNumEspLiquido").val();
	//---
	  let booConfirma = confirm("Quer realmente alterar o valor líquido da fatura "+faturaLida+"? (Na dúvida, cancele)");
	  if(booConfirma){
	let arrayCampos=[];
	let arrayNomeConstraints = ["FATURA","PASTA","ESCRITORIO","RECEBIMENTO","STATUS"];
	let arrayIniciais = [faturaLida,casoLido,escLido,recebLido,"1"];
	let arrayFinais = [faturaLida,casoLido,escLido,recebLido,"1"];
	let arrayOrdenacao=[];
	//---
	let intOperacao=1;
	let nomeDataset="ds_ucrg_notasliquidadas_especial";
	let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
	let resultado = objDataset.pegaResultado();
	//console.log("Achou líquido especial?",resultado);
	if(resultado.values.length==0){
	/*
		 let fatura = fields[0];
let pasta = fields[1];
let escritorio = fields[2];
let dataReceb = fields[3];
let novoLiquido= fields[4];
		 */
		intOperacao=2;//insert
		let nomeDataset="ds_ucrg_notasliquidadas_especial_insers";
		arrayCampos=[faturaLida,casoLido,escLido,recebLido,liqLido,emailEditor];
		arrayNomeConstraints =[];
		arrayIniciais=[];
		arrayFinais=[];
		arrayOrdenacao=[];
		let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
		resultado = objDataset.pegaResultado();
		//console.log("é INSERT",resultado);
	}else{
	//é update
		intOperacao=3;
		let novoStatus='1';//ativo
		let nomeDataset="ds_ucrg_notasliquidadas_especial_update";
		arrayCampos=[liqLido,emailEditor,novoStatus];
		arrayNomeConstraints =["FATURA","PASTA","ESCRITORIO","RECEBIMENTO"];
		arrayIniciais = [faturaLida,casoLido,escLido,recebLido];
		arrayFinais = [faturaLida,casoLido,escLido,recebLido];
		arrayOrdenacao=[];
		let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
		resultado = objDataset.pegaResultado();
		//console.log("é update",resultado);
	}//if resultado
	
	if(intOperacao==2){
	alert ("Inserção "+resultado.values[0].insercao);
	jQuery("#idBtnNLREExecuta").trigger("click");
	}
	if(intOperacao==3){
	alert ("Atualização "+resultado.values[0].update);
	jQuery("#idBtnNLREExecuta").trigger("click");
	}
	jQuery("#idDivEspecial").hide();
	  }else{
		  alert ("Operação cancelada");
	  }//if booConfirma
});//idBtnEspSalvar click
//------------------------------------------------------------------
jQuery(document).on("click","#idBtnEspecialFechar",function (){
	jQuery("#idDivEspecial").hide();
});//idBtnEspecialFechar
//------------------------------------------------------------------
jQuery(document).on("click","#idBtnEspecialReset",function (){
	//equivale a deletar a situação especial do valor líquido, valor do job
	//é update (status = 0)
	let booConfirma = confirm("Quer mesmo anular o valor líquido especial e repôr o valor original da nota? (Na dúvida, cancele esta janela)");
	if(booConfirma){
	let intOperacao=3;//update
	let faturaLida = jQuery("#idSpaEspFatura").text();
	let casoLido = jQuery("#idSpaEspCaso").text();
	let escLido = jQuery("#idSpaEspEscritorio").text();
	let recebLido = jQuery("#idSpaEspReceb").text();
	let liqLido = jQuery("#idNumEspLiquido").val();
	let emailEditor = WCMAPI.userEmail.toLowerCase();
	let novoStatus="0";//desativa o registro
	let nomeDataset="ds_ucrg_notasliquidadas_especial_update";
	arrayCampos=[liqLido,emailEditor,novoStatus];
	arrayNomeConstraints =["FATURA","PASTA","ESCRITORIO","RECEBIMENTO"];
	arrayIniciais = [faturaLida,casoLido,escLido,recebLido];
	arrayFinais = [faturaLida,casoLido,escLido,recebLido];
	arrayOrdenacao=[];
	let objDataset = new MeusDatasets(intOperacao, nomeDataset,arrayCampos,arrayNomeConstraints,arrayIniciais,arrayFinais,arrayOrdenacao);
	let resultado = objDataset.pegaResultado();
	
	
alert ("Atualização "+resultado.values[0].update);
jQuery("#idBtnNLREExecuta").trigger("click");
jQuery("#idDivEspecial").hide();
	}else{
		alert ("Operação cancelada");
	}
});//idBtnEspecialReset click
//------------------------------------------------------------------
	jQuery(document).on("click",".claBtnFaturaRA",function (){
		jQuery("#idDivRDSpinner").hide();
		jQuery(".claTBNLRAROTULO").show();
		jQuery("#idH3NLREROTULOPESQUISA").show();
		jQuery("#idSelNLRETransf option[value='-1']").prop('selected', true);
		jQuery("#idSpaNLRAAvisoTransferir").text('');
		jQuery(".claGridNLRERateio").show();
		jQuery("#idDivNLREAnula").hide();
		//sugere rateio de equipe
		//Primeiro a rotina vai na tabela de rateios feita (custom_apa.ZJOBCLIENT e vê...
		//...se já não existe um rateio. Se existir, carrega na tabela de sugestões. Se não existir,
		//...cria na tabela do fluig de sugestões ao mesmo tempo que insere na custom_apa.ZJOBCLIENT
		let objSpaAlerta =jQuery("#idSpaNLRASUGAlerta");
		objSpaAlerta.text('');//aviso no rodapé da sugestão
		objSpaAlerta.css({"color":"initial","font-weight":"initial","background-color":"initial"});
		jQuery("#idArtNLREExtra").show();
			jQuery("#idArtNLRETransf").show();
			jQuery("#idH3NLREROTULOPESQUISA").show();
			jQuery("#idArtNLRADET").hide();
		let objInp = jQuery(this);
		   let faturaLida = objInp[0].dataset.tagfatura;
		   let clieLido = objInp[0].dataset.tagcliente;
		jQuery("#idH3NLRACLIENTE").text(clieLido+" (FATURA "+faturaLida+")");
		   let objH3 = jQuery("#idH3NLREROTULOPESQUISA");
			objH3.text("Rateio para Equipe/Advogados");
		   let recebimentoLido=objInp[0].dataset.tagreceb;
		   let escritorioLido=objInp[0].dataset.tagescritorio;
		   let casoLido=objInp[0].dataset.tagcaso;
		   let formathtml = document.createElement('a');
		  
		   //---
		   //jQuery("#idLblNLRERot").text("Transferir rateios do file "+casoLido+" para o Conselheiro abaixo:");

		   jQuery("#idLblNLRERot").text("Selecionar BP:");
		   //---
		   let jobLido=objInp[0].dataset.tagjob;
		   let jobEspecialAdhoc = objInp[0].dataset.tagjobespec;
		   let jobFinal=jobLido;
		   if(jobLido*1 != jobEspecialAdhoc*1) jobFinal=jobEspecialAdhoc;
		   //console.log("jobLido: ",jobLido);
		 //  jobLido = jobLido.replace(/\./,"");
		  // jobLido = jobLido.replace(/,/,".");
		  //console.log("Na hora em que aperta o botão de rateio, valor do job",jobLido);
		   let bpLido=objInp[0].dataset.tagbp;
		  //console.log("linha 1244 job que veio de data-tagjob: ",jobLido);
		   jQuery("#idHidNLREFaturaSelecionada").val(faturaLida);
		   jQuery("#idHidNLREEscritorioSelecionado").val(escritorioLido);
		   jQuery("#idHidNLREJobSelecionado").val(jobFinal);
		   jQuery("#idHidNLREFileSelecionado").val(casoLido);
		   jQuery("#idHidNLRERecebSelecionado").val(recebimentoLido);
		   jQuery("#idHidNLREBPSelecionado").val(bpLido);
		   jQuery("#idHidNLREClienteSelecionado").val(clieLido);
		   let jobTotal=jobLido*1;
		   let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		   if(resultadoR.values.length==0){
		   //ainda não foi feita. Carrega a tabela de sugestão com dados da tabela de resposta da pesquisa
			   fInauguraSugestoesNLE(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido);
		   }else{
			   let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
				//console.log("booTemPreservacao",booTemPreservacao);
				if(!booTemPreservacao){
			   //carrega direto da tabela de rateios já feitos
			   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
				}//if !boo
		   }//if resultadoR
		   fPulaParaElementoRANLE('idArtNLREExtra');
	});//claBtnFaturaRA click
//------------------------------------------------
	jQuery(document).on("keyup","#idTxtNLREVerTab", function() {
		//console.log(jQuery(this).attr("id"));
	    var value = jQuery(this).val().toLowerCase();
	    jQuery("#idTabNLRENL tr").filter(function() {
	      jQuery(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });//busca de ocorrências
//-------------------------------------------------	
	jQuery(document).on("click","#idBtnNLREExecuta",function (){
	fExecutaPesquisaPrincipalNLE();
		});//idBtnNLREExecuta
//---------------------------------------	
	jQuery(document).on("click","#idBtnNLREExecuta", function() {
		jQuery(".claFiltroNLRE").show();
	});
//-----------------------------------
	jQuery(document).on("click","#idBtnAdmGrupoJobExec", function() {
		jQuery(".grupoAdminJobExec").show();
		jQuery(".FecharadmJobExec").show();
		jQuery("#idDivBlocoAdmin").show();
		fCarregaEstagsNLE();		

		jQuery(".admJobExec").hide();
	});
	//-----------------------------------
	jQuery(document).on("click","#idBtnAdmFecharGrupoJobExec", function() {
		jQuery(".grupoAdminJobExec").hide();
		jQuery(".FecharadmJobExec").hide();
		jQuery(".admJobExec").show();
	});	
	//-----------------------------------
	jQuery(document).on("click",".claBtnRARearranjo",function (){
		let rateioGeral = jQuery("#idHidNLREJobSelecionado").val();
		let somaPerc=0;
		//primeiro rola a tabela toda em busca percentuais para somar todos
		jQuery('#idTabNLRENLRA tr').each(function() {
			let percSug = jQuery(this).find("td").eq(1).html();
			if(!isNaN(percSug)){
			somaPerc=somaPerc+percSug*1;
			//console.log("linha 617, percSug e somaPerc",percSug+" "+somaPerc);
			}
		});
		//console.log("linha 618, somaPerc: ",somaPerc);
		//---rola de novo para calcular a participação de cada um sobre o total...
		//...e já substitui NA MESMA TABELA
		jQuery('#idTabNLRENLRA tr').each(function() {
			let percSug = jQuery(this).find("td").eq(1).html();
			if(!isNaN(percSug)){
			let novaParPerc =  percSug*1/somaPerc;
			let valorRelativo =novaParPerc*rateioGeral;
			//console.log("linha 625, percSug, novaParPerc e valorRelativo: ",percSug+" "+novaParPerc+" "+valorRelativo);
			//jQuery(this).find("td").eq(1).html(novaParPerc);//não quero matar a sugestão inical dos TS
			jQuery(this).find("td").eq(2).find("input[type='text']").val(novaParPerc*100);
			jQuery(this).find("td").eq(3).html(valorRelativo);
			}//if !isNaN
		});//each
		fSomaPercentuaisNLE();	
	});//claBtnRARearranjo click
//------------------------------------------------------------	
	jQuery(document).on("click","#idBtnAdmCCarregar",function (){
		let objChefe = new Chefes("ds_ucrg_notasliquidadadas_chefes",null,null,null);
		objChefe.setTabelaChefes("#idTabAdmCLista");
	});//idBtnAdmCCarregar click
	//-------------------------------------------------------
	jQuery(document).on("click","#idBtnAdmCUpdate",function (){
		let siglaE = jQuery("#idSelAdmCEst option:selected").val();
		let siglaC = jQuery("#idSelAdmCChefe option:selected").val();
		if(siglaE != "-1" && siglaC != "-1"){
		let c1P = DatasetFactory.createConstraint("SIGLA_ESTAG",siglaE,siglaE,ConstraintType.MUST);
		let arrayConstraintsP=[c1P];
		//--primeiro pergunta se existe. Se existir sigla do Chefe é update. Do contrário, insert
		let objPergunta = new Chefes ("ds_ucrg_notasliquidadadas_chefes",null, arrayConstraintsP,null);
		let siglaChefe = objPergunta.getSiglaChefe();
		//console.log("siglaChefe",siglaChefe);
		if(siglaChefe.length !=""){
			let arrayCampos=[siglaE,siglaC,"-1","1"];
			let c1 = DatasetFactory.createConstraint("SIGLA_EST",siglaE,siglaE,ConstraintType.MUST);
			let arrayConstraints=[c1];
		let objUp = new Chefes("ds_notasliquidadas_chefes_update",arrayCampos,arrayConstraints,null);
		//console.log("resultado do update",objUp.getResultadoAtualizacao());
		jQuery("#idSpaAdmCAviso").text("Atualizou");
		}else{
			//não havia o que atualizar, fazer inserção
			let arrayCamposP =[siglaE,siglaC,"-1","1"];
			let objIns = new Chefes("ds_ucrg_notasliquidadas_chefes_ins",arrayCamposP,null);
			//console.log("resultado da inserção",objIns.getResultadoInsercao());
			jQuery("#idSpaAdmCAviso").text("Inseriu");
		}//if objUp
		}else{
			alert ("Escolha um estagiário e um chefe, antes de pressionar este botão");
		}
	});//idBtnAdjCUpdate click
	//-------------------------------------------------------
	jQuery(document).on("blur","#idNumBrutoBruto",function (){
		let valorBruto = jQuery(this).val();
		let objSpaLiq = jQuery("#idSpaBrutoLiquido");
		objSpaLiq.text(0);
		let objSpaJob = jQuery("#idSpaBrutoJob");
		objSpaJob.text(0);
		
		if(!isNaN(valorBruto)){
			let liquido = valorBruto * 0.8547;
			let job = valorBruto * 0.8547 * 0.05;
			objSpaLiq.text(liquido);
			objSpaJob.text(job);
			
		}//if isNaN
	});//idNumBrutoBruto blur
//--------------------------------------------------
	jQuery(document).on("click","#idBtnBrutoSalvar",function (){
		//esta rotina a Administração altera o valor bruto da nota para o BP enxergar o verdadeiro valor...
		//..ou nem ver porque seria zero
		let objAviso = jQuery("#idSpaBrutoAviso");
		objAviso.css({"background-color":"initial","color":"initial"});
		objAviso.text("");
		let fatura = jQuery("#idTxtBrutoFatura").val();
		let caso = jQuery("#idTxtBrutoCaso").val();
		let escr = jQuery("#idSelBrutoEscritorio option:selected").val();
		let receb = jQuery("#idDatBrutoReceb").val();
		let bruto = jQuery("#idNumBrutoBruto").val();
		let liquido = jQuery("#idSpaBrutoLiquido").text();
		let job = jQuery("#idSpaBrutoJob").text();
		if(fatura.length>0 && caso.length>0 && escr.length>0 && receb.length>0 && bruto*1>=0){
			//fazer um dataset para insert e outro para update na tabela ZJOBCLIENT_BRUTO
			let resposta = fInsereUpdateBrutoNLE(fatura,caso,escr,receb,bruto,liquido,job);
			if(resposta*1==1){
				objAviso.text ("Fatura "+fatura+" registrada com sucesso");
			objAviso.css({"background-color":"green","color":"white"});
			}else if (resposta*1==2){
				objAviso.text ("Fatura "+fatura+" atualizada com sucesso");
				objAviso.css({"background-color":"blue","color":"white"});
			}else{
				objAviso.text ("Houve um erro no registro desta fatura");	
				objAviso.css({"background-color":"red","color":"white"});
			}//if resposta
		}else{
			objAviso.text ("Preencha todos os campos. Também, obrigatoriamente, o valor do Bruto tem de ser numérico");	
			objAviso.css({"background-color":"red","color":"white"});
		}//if fatura
		
	});//idBtnBrutoSalvar click
//----------------------------------------------------------
jQuery(document).on("blur","#idTxtBrutoCaso",function (){
	let objAvi = jQuery("#idSpaBrutoAviso");
	objAvi.text("");
	objAvi.css({"background-color":"red","color":"white"});
	let caso =jQuery(this).val();
	let c1 = DatasetFactory.createConstraint("CASO",caso,caso,ConstraintType.MUST);
	let arrayConstraints = [];
	arrayConstraints.push(c1);
	let resultado = DatasetFactory.getDataset("ds_ucrg_casos_historicos",null,arrayConstraints,null);
	let nomeCliente = "File "+caso+" não encontrado...";
	let materia = "...";
	if(resultado.values.length>0){
		nomeCliente = resultado.values[0].RAZAO_SOCIAL;
		materia = resultado.values[0].TITULO;
		objAvi.css({"background-color":"green","color":"white"});
	}//if resultado
	objAvi.text(nomeCliente+" / "+materia);
});//idTxtBrutoCaso blur
//-------------------------------------------------
jQuery(document).on("click","#idBtnBrutoReset",function (){
	let fatura = jQuery("#idTxtBrutoFatura").val();
	if(fatura.length>0){
	let booConfirma = confirm("Quer mesmo anular o valor bruto imposto à fatura "+fatura+"? (Na dúvida, cancele esta janela)");
	if(booConfirma){
	//deleta um valor bruto que a Administração imppôs a uma fatura
	let objAviso = jQuery("#idSpaBrutoAviso");
	objAviso.css({"background-color":"initial","color":"initial"});
	objAviso.text("");
	let caso = jQuery("#idTxtBrutoCaso").val();
	let escr = jQuery("#idSelBrutoEscritorio option:selected").val();
	let receb = jQuery("#idDatBrutoReceb").val();
	//--
	if(fatura.length>0 && caso.length>0 && escr.length>0 && receb.length>0){
		//fazer um dataset para insert e outro para update na tabela ZJOBCLIENT_BRUTO
		let resposta = fDeletaBrutoNLE(fatura,caso,escr,receb);
		if(resposta*1==1){
			objAviso.text ("Fatura "+fatura+" retirada da lista de brutos alterados");
		objAviso.css({"background-color":"brown","color":"white"});
		jQuery("#idBtnBrutoVerTabela").trigger("click");
		}else{
			objAviso.text ("Houve um erro no 'resset' esta fatura");	
			objAviso.css({"background-color":"red","color":"white"});
		}//if resposta
	}else{
		objAviso.text ("Preencha todos os campos, antes de 'ressetar'");	
		objAviso.css({"background-color":"red","color":"white"});
	}//if fatura
	}else{
		objAviso.text ("Operação cancelada");	
		objAviso.css({"background-color":"red","color":"white"});
	}//if booConfirma
	}else{
		alert ("Indique a Fatura, o caso, o escritório e a data do recebimento antes de ressetar");
	}//if fatura
});//idBtnBrutoReset click
//----------------------------------------------------------
jQuery(document).on("click","#idBtnBrutoVerTabela",function (){
	let emailCaptador = globalNaMaquina;
	let dataRecebimento1 = jQuery("#idDatNLREDAI").val();
	let dataRecebimento2 = jQuery("#idDatNLREDAF").val();
	fMostraTabelaBrutosNLE(dataRecebimento1,dataRecebimento2,emailCaptador);
});//idBtnBrutoVerTabela click
//-----------------------------------------------------------
jQuery(document).on("change","#idSelNLRESC",function (){
	//esta rotina faz guardar o email do SC escolhido pelo administrador para...
	//...pesquisar, já que a aplicação está preparada para esperar o SC na máquina...
	//...quando entrar e, assim, inteligentemente, já apontar pra ele na hora da pesquisa
	let objBtn = jQuery("#idBtnNLREExecuta");
	objBtn.prop("disabled",false);
	objBtn.prop("title","");
	let emailForcado = jQuery("option:selected",this).val();
	if(emailForcado=='-1'){
		objBtn.prop("disabled",true);
		objBtn.prop("title","Botão bloqueado porque a lista de SC no alto está sem seleção. Selecione um nome");
		let objTab=jQuery("#idTabNLRENL");
		objTab.empty();
	}
	globalNaMaquina=emailForcado.toUpperCase();
});//
//-----------------------------------------------------------
jQuery(document).on("click","#idBtnTValorPesquisar",function (){
	let objTab = jQuery("#idTabTValorTabela");
	objTab.empty();
	let bp = jQuery("#idTxtTValorBP").val();
	let fatura = jQuery("#idTxtTValorFatura").val();
	let pasta = jQuery("#idTxtTValorPasta").val();
	let escritorio = jQuery("#idSelTValorEscritorio option:selected").val();
	//--a data precisa ser passada como dd/mm/yyyy
	let recebInicial = jQuery("#idDatTValorRecebInicial").val();
	let recebFinal = jQuery("#idDatTValorRecebFinal").val();
	//--
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let c4 = DatasetFactory.createConstraint("RECEBIMENTO",recebInicial,recebFinal,ConstraintType.MUST);
	let c5 = DatasetFactory.createConstraint("BP",bp,bp,ConstraintType.MUST);
	let arrayConstraints = [c1,c2,c3,c4,c5];
	//console.log("CONSTRAINTS",arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_transf",null,arrayConstraints,null);
let concatena='<tr><th>FATURA</th><th>PASTA</th><th>ESCRITÓRIO</th><th>RECEBIMENTO</th>';
concatena=concatena+'<th>BP INDICADO</th><th>PERCENTUAL</th><th>VALOR</th><th>CAPTADOR ORIGINAL</th>';
concatena=concatena+'<th>EDITOR</th><th>DATA DA TRANSFERÊNCIA</th><th>STATUS</th></tr>';
	if(resultado.values.length>0){
		let i=0;
		for(i;i<resultado.values.length;i++){
	let fatura = resultado.values[i].FATURA;
	let pasta = resultado.values[i].PASTA;
	let escritorio = resultado.values[i].ESCRITORIO;
	let recebimento = resultado.values[i].DTRECEBIMENTO;
	recebimento = recebimento.substr(0,10);
	recebimento = new Date(recebimento).toLocaleDateString();
	let bp = resultado.values[i].ADV_BENEF;
	let percentual = resultado.values[i].PERCENTUAL;
	let valor = resultado.values[i].VALOR;
	let captador = resultado.values[i].CAPTADOR;
	//--
	let dataTransf = resultado.values[i].DTTRANSF;
	let diaT=dataTransf.substr(6,2);
	let mesT=dataTransf.substr(4,2);
	let anoT=dataTransf.substr(0,4);
	dataTransf = diaT+"/"+mesT+"/"+anoT;
	let editor = resultado.values[i].EDITOR_EMAIL;
	//--
	let status = resultado.values[i].STATUS;
	concatena=concatena+'<tr><td>'+fatura+'</td><td>'+pasta+'</td><td>'+escritorio+'</td><td>'+recebimento+'</td>';
	concatena=concatena+'<td>'+bp+'</td><td>'+percentual+'</td><td>'+valor+'</td><td>'+captador+'</td>';
	concatena=concatena+'<td>'+editor+'</td><td>'+dataTransf+'</td><td>'+status+'</td></tr>';
		}//for i
	}//if resultado
	objTab.append(concatena);
});//idBtnTValorPesquisar click
//-----------------------------------------------------------
jQuery(document).on("click","#idBtnTValorReset",function (){
	alert ("Em programação (Será necessário informar Captador, Fatura,Caso,Escritório e data do recebimento para anular a transferência");
});//idBtnTValorReset click
//----------------------------------------------------
jQuery(document).on("click","#idBtnRTPesq",function (){
	let dataInicial = jQuery("#idDatRTInicial").val();
	let dataFinal = jQuery("#idDatRTFinal").val();
	let advogado = jQuery("#idSelRTBP option:selected").val();
	fPesquisaRateiosFeitos(dataInicial,dataFinal,advogado);
});//idBtnRTPesq click
//----------------------------------------------------
jQuery(document).on("click",".claChkPreservaRateio",function (){
	//código desativado. A pergunta fica no salvamento do rateio
	/*
	//este botão pega o número do caso
	//quando o BP salvar o rateio, se esta caixa estiver marcada, vai criar ou atualizar uma tabela de controle...
	//...que oferecerá esta distribuição no mesmo file em emissões futuras.
	//Na carga da inauguração, se houver preenchimento desta tabela de controle no file da vez, vai sugerir estes percentuais.
	//Se o BP NÃO MARCAR a caixa, qualquer registro na tabela de controel será alterado para 'desconsiderar'.
	let booResposta = confirm("Quer preservar este modelo de rateio do file (caso) em questão para as futuras emissões?");
	if(booResposta){
		let objInp = jQuery(".claChkPreservaRateio");
		   let pasta = objInp[0].dataset.numerofile;
		   //---
	}else{
	alert ("Preservação cancelada");	
	}
	*/
});//claChkPreservaRateio click
});//ready
//====================================READY
function fDescobreLogadoNLE(emailUpper){
	//emailUpper = prompt("Para fins de teste, vamos supor que é um SC que entrou. Informe o email dele","GREZENDE@ULHOACANTO.COM.BR");//ativado para teste
	emailUpper = globalNaMaquina;//ativado para teste
	emailUpper = emailUpper.toUpperCase();
	let c1 = DatasetFactory.createConstraint("EMAIL",emailUpper,emailUpper,ConstraintType.MUST);
	let arrayConstraints = [];
	arrayConstraints.push(c1);
	//console.log(arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
	if(resultado.values.length>0){
		return resultado.values[0].COD_ADVG.trim();
	}else{
		return "XXX";
	}//if resultado
}//fDescobreLogadoNLE
//------------------------------------------------------------
function fSugereDataNLE(){
	//console.log("Entrou na função");
			let objDataHoje = new Date();
			let diaSemana=objDataHoje.getDay();//0=domingo, 6=sábado
			let hojeMiliss=objDataHoje.getTime();
			//---
			/*
			let dataLocaleHoje = objDataHoje.toLocaleDateString();
			let diaF=dataLocaleHoje.substr(0,2);
			let mesF=dataLocaleHoje.substr(3,2);
			let anoF=dataLocaleHoje.substr(6,4);
			*/
			//---
			//quatro dias são 4 * (1 dia em milissegundos)
			let umDia=3600*24*1000;
			let quatroAtrasMili=hojeMiliss - (4*umDia);
			let objNovaData = new Date(quatroAtrasMili);
			//console.log("objNovaData",objNovaData);
			if (diaSemana==3) objNovaData = new Date(hojeMiliss-5*umDia);
			if (diaSemana==4) objNovaData = new Date(hojeMiliss-6*umDia);
			let dataInicial=objNovaData.toLocaleDateString();//dd/mm/aaaa
			let diaI=dataInicial.substr(0,2);
			let mesI=dataInicial.substr(3,2);
			let anoI=dataInicial.substr(6,4);
			//jQuery("#idDatNLREDAI").val(anoI+"-"+mesI+"-"+diaI);
			jQuery("#idDatNLREDAI").val(anoI+"-"+mesI+"-01");
			jQuery("#idDatRTInicial").val(anoI+"-"+mesI+"-01");
			//---calcula o fim deste mês
			let d = new Date(anoI*1, mesI*1, 0);
			let txtUltimaData = d.toLocaleDateString();
			let diaF=txtUltimaData.substr(0,2);
			let mesF=txtUltimaData.substr(3,2);
			let anoF=txtUltimaData.substr(6,4);
			jQuery("#idDatNLREDAF").val(anoF+"-"+mesF+"-"+diaF);
			jQuery("#idDatRTFinal").val(anoF+"-"+mesF+"-"+diaF);
			//---
			if(mesI*1 != mesF*1){
				alert ("Atenção. Refaça as datas inicial e final. Elas têm de estar no mesmo mês, do contrário a pesquisa não retornará resultados");
			}
			if(anoI*1 != anoF*1){
				alert ("Atenção. Refaça as datas inicial e final. Elas têm de estar no mesmo mês, do contrário a pesquisa não retornará resultados");
			}
			//---
		
			
		}//fSugereDataNLE
//--------------------------------------------------
//--------------------------------------------------
async function fCompoeTabelaNLRE(dataPesquisaI,dataPesquisaF,fatura,sc){
			//para funcionar a totalizacao o dataset ordena somente por número de fatura
	//---limpando
	globalArrayCasosValorTransferido=[];//armazena o caso que teve o valor transferido (não o file)
	globalArrayFaturasValorTransferido=[];//armazena a fatura ligada ao cliente que teve o valor transferido (não o file)
	globalArrayBPValorTransferido=[];//armazena o BP para o qual o valor foi transferido (não o file)
	//----------
			jQuery("#idDivNLRESpinner").show();
			let faturaVez="";
			let faturaAnterior="";
			//---
			let totalBruto=0;
			let totalLiq=0;
			let totalJob=0;
			//---
			let totalParcialBruto=0;
			let totalParcialLiq=0;
			let totalParcialJob=0;
			//---
			let objTab=jQuery("#idTabNLRENL");
			objTab.empty();
		//	let concatena='<thead><tr><th></th><th>CLIENTE</th><th>FATURA</th><th>EMISSÃO</th><th>VENCIMENTO</th><th>RECEBIMENTO</th>'+
			let concatena='<thead><tr><th></th><th title="Status do rateio por equipe">STATUS</th><th>CLIENTE</th><th>RATEIO DA FATURA</th><th>RECEBIMENTO</th>'+
			'<th>BRUTO</th><th>LÍQUIDO</th><th>JOB EXEC</th><th>AJUSTE LIQ</th><th>AJUSTE JOB</th><th>CAPTADOR</th><th>EMISSOR</th><th>ÁREA</th>'+
			'<th>FILE</th>'+
			'<th>MATÉRIA</th></tr></thead><tbody>';
			let concatenaCSV=jQuery("#idSpaAvisosNLRE").text()+"\r\n";
			//concatenaCSV=concatenaCSV+"CLIENTE;FATURA;EMISSÃO;VENCIMENTO;RECEBIMENTO;BRUTO;LÍQUIDO;JOB EXEC;CAPTADOR;EMISSOR;ÁREA;FILE;MATÉRIA\r\n";
			concatenaCSV=concatenaCSV+"CLIENTE;FATURA;RECEBIMENTO;BRUTO;LÍQUIDO;JOB EXEC;AJUSTE LÍQ;AJUSTE JOB;CAPTADOR;EMISSOR;ÁREA;FILE;MATÉRIA\r\n";
			let c1 = DatasetFactory.createConstraint("DATA_BUSCA",dataPesquisaI,dataPesquisaF,ConstraintType.MUST);
			let c2 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
			let c3 = DatasetFactory.createConstraint("SC",sc,sc,ConstraintType.MUST);
			let arrayConstraints = [];
			arrayConstraints.push(c1);
			arrayConstraints.push(c2);
			arrayConstraints.push(c3);
			//let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_sel",null,arrayConstraints,null);
		//	try{
			 let resultado = await fEncapsulaDatasetNLE(
			            "ds_ucrg_notasliquidadas_sel", 
			            null, 
			            arrayConstraints,
			            null
			        );

			let qtd = resultado.values.length;
			//console.log("resultado",resultado);
			let txtAviso = 	jQuery("#idSpaAvisosNLRE").text();
			jQuery("#idSpaAvisosNLRE").text(txtAviso);
			let i=0;
			//console.log("arrayConstraints dentro de FCompoe",arrayConstraints);
			//console.log("qtd",qtd);
			let estiloDelegado="";
			let titleDelegado="";
			let obs="";
			let contadorSucesso=0;
			let cotacao=0;
			for(i;i<qtd;i++){
				let intTrancaRateio=0;
				let concatenaSiglasMult="";
				//let situacao = resultado.values[i].SITUACAO.trim();
				let clieLido = resultado.values[i].CLIENTE;
				let codCliente = resultado.values[i].COD_CLIENTE;
				let escritorio = resultado.values[i].ESCRITORIO;
				let fatuLida = resultado.values[i].FATURA;
				//jQuery("#idSpaAvisosNLRE").text("Fatura lida: "+fatuLida);
				let capLido = resultado.values[i].CAPTADOR;
				let emiLido = resultado.values[i].EMISSOR;
				let areaLida = resultado.values[i].AREA;
				let mateLida = resultado.values[i].MATERIA;
				//---
				let casoLido = resultado.values[i].PASTA;
				//console.log("fatura e situacao ",fatuLida+" "+situacao);
				//---
				let emissLida = resultado.values[i].EMISSAO;
				emissLida = fConverteFormatoDataNLRE(emissLida);
				//---
				let vencLido = resultado.values[i].VENCIMENTO;
				vencLido = fConverteFormatoDataNLRE(vencLido);
				//--
				let recebLido = resultado.values[i].RECEBIMENTO;
				recebLido = fConverteFormatoDataNLRE(recebLido);
				//---
				let moeda = resultado.values[i].MOEDA;
				cotacao = resultado.values[i].COTACAO;
				cotacao.toString().replace(',',".");
				if(moeda =="R") cotacao=1;
				//--
				
				let estiloMoeda="";
				let titleMoeda="";
				let nomeMoeda=fTxtPegaNomeMoedaNLE(moeda);
				//--bruto lido na FINANCE.CONTASRECEBER
				brutoLido = resultado.values[i].BRUTO;
				//console.log("Linha 1690, brutoLido:",brutoLido);
				liqLido = resultado.values[i].LIQUIDO;
				jobLido = resultado.values[i].JOB;
				//console.log("moeda",moeda+" "+moeda.toString().length);
				if(moeda != 'R'){
					//é faturamento em moeda estrangeira.
					estiloMoeda="border-width:5px;border-style:solid;border-top-color:orange;border-right-color:orange;border-left-color:orange;";
					let valorAdhoc = brutoLido;
					titleMoeda="Bruto originalmente faturado em "+nomeMoeda+" "+valorAdhoc+" na cotação de "+cotacao;
					brutoLido = brutoLido*cotacao;
					liqLido = brutoLido*0.8547;
					jobLido = liqLido*0.05;
					/*
					let resultadoM=fDSConverteParaRealNLE(fatuLida,recebLido,escritorio);
					if(resultadoM.values.length>0){
						estiloMoeda="border: 5px solid orange;";
						titleMoeda="Bruto originalmente faturado em "+nomeMoeda+": "+brutoLido;
						brutoLido = resultadoM.values[0].BRUTO;
						liqLido = resultadoM.values[0].LIQUIDO;
						jobLido = resultadoM.values[0].JOB;
						}
						*/
				}//if moeda
				//---
				let estiloCap="";
				let titleCap="";
				//----SERÁ QUE ESTE FILE TEM MAIS DE UM CAPTADOR?
				//...Se tiver, tranca o botão, mas só se o emissor for diferente deste captador da vez
				let concatenaBP=fTxtMultiploCaptadorPercentualNLE(recebLido,casoLido);
				if(concatenaBP != ""){
					concatenaSiglasMult=fTxtConcatenaCaptadorMultiploSiglaNLE(recebLido,casoLido);
					 estiloCap="border:2px solid green;";
					 titleCap="Por ser uma captação múltipla, a tarefa de ratear fica com o SC Emissor";
					 if(capLido != emiLido){
					intTrancaRateio=1;//não deixa este bp fazer rateio
					 }//if capLido
				}//if concatenaBP
				//---SERÁ QUE A TAREFA DE RATEAR ESTE FILE FOI TRANSFERIDA PARA OUTRO BP?
				if(globalArrayNLRAFilesDeleguei.includes(casoLido)) intTrancaRateio=1;//não deixa este bp fazer rateio
				//let estiloRateio="background-color:#FAFAD2;";
				let estiloRateio="";
				let txtRateioFeito="i";//default 'i' de incompleto, 'f' de feito, 'a' a fazer
				let txtRotuloRateio="Rateio incompleto (feito parcialmente)";//default igual ao de cima
				txtRateioFeito = fVerificaStatusRateioNLE(fatuLida,casoLido,escritorio,recebLido);
				//console.log("txtRateioFeito - linha 767", txtRateioFeito);
				/*if(txtRateioFeito=="<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>") {
					estiloRateio="background-color:#f3ffe8;";
					txtRotuloRateio="Rateio completo, terminado";
				}
				if(txtRateioFeito=="<img src='/w_ucrg_nlequipe/resources/images/multiplicar.png' height='20' width='20'/>") {
					estiloRateio="background-color:#fff0f0;";
					txtRotuloRateio="Rateio ainda por fazer";
				}*/
				/*
				if(situacao=='V'){
					//se a situação é V, é parcelado. O valor, então, não vem da tabela rcr.fatpasta, mas da...
					//...finance.contasreceber e os valores capturados da fatpasta são substituídos
					//console.log("data do recebimento",recebLido);
					let resultadoP = fDSPegaBrutoOutroNLE(recebLido,fatuLida,codCliente,escritorio);
					let valorP=resultadoP.values[0].CRCNVALORHONORARIO;
					brutoLido=valorP;
					liqLido=valorP*0.8547;
					jobLido=valorP*0.8547*0.05;
					//console.log("novos valores",brutoLido+" "+liqLido+" "+jobLido);
				}//if situacao
				*/
				//---
				//--Substituindo o bruto da FINANCE.CONTASRECEBER
				//A busca dos dados é toda em cima da finance.contasreceber, mas se o valor da fatpasta for menor interessa
				let resultadoFP = fProcuraNotaFATPASTANLE(fatuLida,casoLido,escritorio);
				let brutoLidoFP = resultadoFP.values[0].VALORH_FATURADO;
				if(brutoLidoFP*1 <= brutoLido*1){
				let valorAdhoc = brutoLidoFP;
				brutoLido = brutoLidoFP*cotacao;
				liqLido=brutoLido*0.8547;
				jobLido=liqLido*0.05;
				if(moeda != 'R'){
					estiloMoeda="border-width:5px;border-style:solid;border-top-color:orange;border-right-color:orange;border-left-color:orange;";
					titleMoeda="Bruto originalmente faturado em "+nomeMoeda+" "+valorAdhoc+" na cotação de "+cotacao;
				}//if moeda
				}//if brutoLidoFP
				//--
				//---------SERÁ QUE A ADMINISTRAÇÃO ALTEROU O BRUTO PORQUE O VALOR AQUI ESTÁ ERRADO?--BRU
				//console.log("recebBru",recebLido);
				let diaBru = recebLido.substr(0,2);
				let mesBru = recebLido.substr(3,2);
				let anoBru = recebLido.substr(6,4);
				let recebB = anoBru+"-"+mesBru+"-"+diaBru;
				let c1Bru = DatasetFactory.createConstraint("FATURA",fatuLida,fatuLida,ConstraintType.MUST);
				let c2Bru = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
				let c3Bru = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
				let c4Bru = DatasetFactory.createConstraint("RECEBIMENTO",recebB,recebB,ConstraintType.MUST);
				let c5Bru = DatasetFactory.createConstraint("STATUS","1","1",ConstraintType.MUST);
				let arrayConstraintsBru = [c1Bru,c2Bru,c3Bru,c4Bru,c5Bru];
				//console.log("CONSTRAINTS Bru",arrayConstraintsBru);
				let resultadoBru = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_sel",null,arrayConstraintsBru,null);
				//console.log("resultadoBru",resultadoBru);
				if(resultadoBru.values.length>0){
					//foi alterado. Então, mostra para todos que o valor bruto/liq/job é este
				brutoLido=resultadoBru.values[0].BRUTO_NOVO;
				liqLido=resultadoBru.values[0].LIQUIDO_NOVO;
				jobLido=resultadoBru.values[0].JOB_NOVO;
				titleMoeda=titleMoeda+" (O valor original desta nota foi alterado pelo administrador)";
				}//if resultadoBru
				//-----------------------------------------------------------------------------------/BRU
				let brutoFormatado=brutoLido;
				//if(brutoFormatado.toString().indexOf(",")==-1) brutoFormatado=brutoFormatado+",00";
				//---Os valores de líquido e de job, se forem diferentes da regra, ficam na tabela ZJOBCLIENT_ESPECIAL
				let objClasse = new ClasseLiquidoEspecial (fatuLida,casoLido,escritorio,recebLido);
				let ocorr = objClasse.pegaOcorrencias();
				let liquidoEspec = liqLido*1;//valor default, caso seja igual ao calculado
				let jobEspec = liqLido*1*0.05;
				jQuery("#idHidNLREJobSelecionado").val(jobEspec);
				let editor = "";
				let dataUltima="";
				//console.log("ocorrencia linhas 1886",ocorr);
				if(ocorr*1>0){
				liquidoEspec = objClasse.pegaValorLiquido();//refaz o líquido especial porque existe na tabelaespecial
				jobEspec = objClasse.pegaValorJob();
				editor = objClasse.pegaEditor();
				dataUltima = objClasse.pegaDataUltima();
				}//if ocorr
				//--------------------------------------------
				totalBruto=totalBruto + brutoLido*1;
				totalLiq=totalLiq + liqLido*1;
				totalJob=totalJob + jobLido*1;
				//---
				let liqFormatado=liqLido;
				//if(liqFormatado.toString().indexOf(",")==-1) liqFormatado=liqFormatado+",00";
				//---
				let jobFormatado=jobLido;
				//if(jobFormatado.toString().indexOf(",")==-1) jobFormatado=jobFormatado+",00";
				//---Especial
				let liquidoEspecF=liquidoEspec;
				//if(liquidoEspecF.toString().indexOf(",")==-1) liquidoEspecF=liquidoEspecF+",00";
				//if(jobEspec.toString().indexOf(",")==-1) jobEspec=jobEspec+",00";
					//---
				if (faturaAnterior != fatuLida && faturaAnterior != "" && totalParcialBruto>0){
				//	concatena=concatena+'<tr style="background-color:tomato;font-weight:900;"><td colspan="5"></td><td style="font-size:80%;">Total da fatura '+faturaAnterior+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialBruto.toFixed(2)).toLocaleString('pt-BR')+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialLiq.toFixed(2)).toLocaleString('pt-BR')+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialJob.toFixed(2)).toLocaleString('pt-BR')+'</td></tr>';
					//concatenaCSV=concatenaCSV+";;;;Total da fatura "+faturaAnterior+";"+parseFloat(totalParcialBruto.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialLiq.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialJob.toFixed(2)).toLocaleString('pt-BR')+"\r\n";
					totalParcialBruto=0;
					totalParcialLiq=0;
					totalParcialJob=0;
				}
				//---somo o total após a exibição na tabela porque quando preciso dele é o valor que passou por último...
				//...antes do valor da vez
				totalParcialBruto=totalParcialBruto+brutoLido*1;
				totalParcialLiq=totalParcialLiq+liqLido*1;
				totalParcialJob=totalParcialJob+jobLido*1;
				//---
				//console.log("Linha 1839 antes de chamar a plotagem",brutoFormatado);
				concatena=fTxtPlotaTabelaNLE(contadorSucesso,concatena,intTrancaRateio,estiloDelegado, titleDelegado,estiloRateio,txtRotuloRateio,txtRateioFeito,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,estiloMoeda,titleMoeda,brutoFormatado,liqFormatado,jobFormatado,emiLido,mateLida,estiloCap,titleCap,areaLida,obs,concatenaSiglasMult,liquidoEspecF,jobEspec,editor,dataUltima);
				concatenaCSV=fTxtPlotaCSVNLE(concatenaCSV,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,brutoFormatado,liqFormatado,jobFormatado,liquidoEspec,jobEspec,emiLido,mateLida,estiloCap,titleCap,areaLida);
				//---
				faturaAnterior=fatuLida;
				contadorSucesso++;
				titleMoeda="";
			}//for i
			let contadorProprio=contadorSucesso;
			//------BUSCANDO NOTAS ATRIBUÍDAS AO BP QUE ESTÁ NA MÁQUINA---B
			let emailEditorSubs="";
			let y=0;
			let contadorSubs=0;
			//console.log("notas como substituto: "+globalArrayNLRAFilesMinhaResponsa);
			for(y;y<globalArrayNLRAFilesMinhaResponsa.length;y++){
			let pastaR=globalArrayNLRAFilesMinhaResponsa[y];
			//---só para pegar o BP que passou para este
			//console.log("y",pastaR);
			let b1 = DatasetFactory.createConstraint("PASTA",pastaR,pastaR,ConstraintType.MUST);
			let b2 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
			let b3 = DatasetFactory.createConstraint("INT_OPER","3","3",ConstraintType.MUST);
			let arrayConstraintsB=[];
			arrayConstraintsB.push(b1);
			arrayConstraintsB.push(b2);
			arrayConstraintsB.push(b3);
			let resultadoB = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsB,null);
			let siglaBPOriginal=resultadoB.values[0].BP_ORIGINAL;
			emailEditorSubs=resultadoB.values[0].EMAIL_EDITOR;
			//------------------------------------------
			let s1 = DatasetFactory.createConstraint("DATA_BUSCA",dataPesquisaI,dataPesquisaF,ConstraintType.MUST);
			let s2 = DatasetFactory.createConstraint("PASTA",pastaR,pastaR,ConstraintType.MUST);
			let s3 = DatasetFactory.createConstraint("SC",siglaBPOriginal,siglaBPOriginal,ConstraintType.MUST);
			let arrayConstraintsX = [];
			arrayConstraintsX.push(s1);
			arrayConstraintsX.push(s2);
			arrayConstraintsX.push(s3);
			let resultadoS = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_sel",null,arrayConstraintsX,null);
			let qtdS = resultadoS.values.length;
			//console.log("arrayConstraintsX",arrayConstraintsX);
			//console.log("resultadoS",resultadoS);
			let j=0;
			//console.log("arrayConstraints (2) dentro de FCompoe",arrayConstraints);
			//console.log("qtdS",qtdS);
			let fatuLida="";
			let recebLido="";
			let capLido="";
			let escritorio="";
			let casoLido="";
			for(j;j<qtdS;j++){
				estiloDelegado="border:2px solid blue;";
				titleDelegado="Para efeitos de rateio de equipe, este file foi transferido a você por "+emailEditorSubs;
				if(siglaBPOriginal=='UCRG'){
					estiloDelegado="border:2px solid purple;";
					titleDelegado="Para efeitos de rateio de equipe, este file de captação do UCRG foi transferido automaticamente a você pelo sistema";
				}//if siglaBPOriginal
				let intTrancaRateio=0;
				let concatenaSiglasMult="";
				//let situacao = resultadoS.values[j].SITUACAO.trim();
				let clieLido = resultadoS.values[j].CLIENTE;
				let codCliente = resultadoS.values[j].COD_CLIENTE;
				escritorio = resultadoS.values[j].ESCRITORIO;
				fatuLida = resultadoS.values[j].FATURA;
				//console.log("fatura e situacao ",fatuLida+" "+situacao);
				//---
				let emissLida = resultadoS.values[j].EMISSAO;
				emissLida = fConverteFormatoDataNLRE(emissLida);
				//---
				let vencLido = resultadoS.values[j].VENCIMENTO;
				vencLido = fConverteFormatoDataNLRE(vencLido);
				//--
				recebLido = resultadoS.values[j].RECEBIMENTO;
				recebLido = fConverteFormatoDataNLRE(recebLido);
				//---
				let moeda = resultadoS.values[j].MOEDA;
				cotacao = resultadoS.values[j].COTACAO;
				cotacao.toString().replace(',',".");
				if(moeda == "R") cotacao=1;
				let estiloMoeda="";
				let titleMoeda="";
				let nomeMoeda=fTxtPegaNomeMoedaNLE(moeda);
				//--
				brutoLido = resultadoS.values[j].BRUTO;
				//--
				liqLido = resultadoS.values[j].LIQUIDO;
				jobLido = resultadoS.values[j].JOB;
				//console.log("moeda",moeda+" "+moeda.toString().length);
				if(moeda != 'R'){
					//é faturamento em moeda estrangeira.
					//console.log("fatura, moeda,bruto: ",fatuLida+", "+moeda+", "+brutoLido);
					estiloMoeda="border-width:5px;border-style:solid;border-top-color:orange;border-right-color:orange;border-left-color:orange;";
					let valorAdhoc = brutoLido;
					titleMoeda="Bruto originalmente faturado em "+nomeMoeda+" "+brutoLidoOriginal+" na cotação de "+cotacao;
					brutoLido = brutoLido*cotacao;
					liqLido = brutoLido*0.8547;
					jobLido = liqLido*0.05;
					/*
					let resultadoM=fDSConverteParaRealNLE(fatuLida,recebLido,escritorio);
					if(resultadoM.values.length>0){
						estiloMoeda="border: 5px solid orange;";
						titleMoeda="Bruto originalmente faturado em "+nomeMoeda+": "+brutoLido;
						brutoLido = resultadoM.values[0].BRUTO;
						liqLido = resultadoM.values[0].LIQUIDO;
						jobLido = resultadoM.values[0].JOB;
						}
						*/
				}//if moeda
				//---
				capLido = resultadoS.values[j].CAPTADOR;
				let emiLido = resultadoS.values[j].EMISSOR;
				let areaLida = resultadoS.values[j].AREA;
				let mateLida = resultadoS.values[j].MATERIA;
				//---
				casoLido = resultadoS.values[j].PASTA;
				let estiloCap="";
				let titleCap="";
				//----SERÁ QUE ESTE FILE TEM MAIS DE UM CAPTADOR? (2)
				//...Se tiver, tranca o botão, mas só se o emissor for diferente deste captador da vez
				let concatenaBP=fTxtMultiploCaptadorPercentualNLE(recebLido,casoLido);
				if(concatenaBP != ""){
					concatenaSiglasMult=fTxtConcatenaCaptadorMultiploSiglaNLE(recebLido,casoLido);
					 estiloCap="border:2px solid green;";
					 titleCap="Por ser uma captação múltipla, a tarefa de ratear fica com o SC Emissor";
					 if(capLido != emiLido){
					intTrancaRateio=1;//não deixa este bp fazer rateio
					 }//if capLido
				}//if concatenaBP
				//---SERÁ QUE A TAREFA DE RATEIO DESTE FILE FOI TRANSFERIDO PARA OUTRO BP?
				if(globalArrayNLRAFilesDeleguei.includes(casoLido)) intTrancaRateio=1;//não deixa este bp fazer rateio
				let estiloRateio="";
				//let estiloRateio="background-color:#FAFAD2;";
				let txtRateioFeito="i";//default 'i' de incompleto, 'f' de feito, 'a' a fazer
				let txtRotuloRateio="Rateio incompleto (feito parcialmente)";//default igual ao de cima
				txtRateioFeito = fVerificaStatusRateioNLE(fatuLida,casoLido,escritorio,recebLido);
				//console.log("txtRateioFeito - linha 926", txtRateioFeito);
				/*if(txtRateioFeito=="<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>") {
					estiloRateio="background-color:#f3ffe8;";
					txtRotuloRateio="Rateio completo, terminado";
				}
				if(txtRateioFeito=="<img src='/w_ucrg_nlequipe/resources/images/multiplicar.png' height='20' width='20'/>") {
					estiloRateio="background-color:ffe6e6;";
					txtRotuloRateio="Rateio ainda por fazer";
				}*/
				/*
				if(situacao=='V'){
					//se a situação é V, é parcelado. O valor, então, não vem da tabela rcr.fatpasta, mas da...
					//...finance.contasreceber e os valores capturados da fatpasta são substituídos
					//console.log("data do recebimento",recebLido);
					let resultadoP = fDSPegaBrutoOutroNLE(recebLido,fatuLida,codCliente,escritorio);
					let valorP=resultadoP.values[0].CRCNVALORHONORARIO;
					brutoLido=valorP;
					liqLido=valorP*0.8547;
					jobLido=valorP*0.8547*0.05;
					//console.log("novos valores",brutoLido+" "+liqLido+" "+jobLido);
				}//if situacao
				*/
				//--Substituindo o bruto da FINANCE.CONTASRECEBER
				//A busca dos dados é toda em cima da finance.contasreceber, mas se o valor da fatpasta for menor interessa
				let resultadoFP = fProcuraNotaFATPASTANLE(fatuLida,casoLido,escritorio);
				let brutoLidoFP = resultadoFP.values[0].VALORH_FATURADO;
				let valorAdhoc = brutoLidoFP;
				if(brutoLidoFP*1 <= brutoLido*1){
				brutoLido = brutoLidoFP*cotacao;
				liqLido=brutoLido*0.8547;
				jobLido=liqLido*0.05;
				if(moeda != 'R'){
				estiloMoeda="border-width:5px;border-style:solid;border-top-color:orange;border-right-color:orange;border-left-color:orange;";
				titleMoeda="Bruto originalmente faturado em "+nomeMoeda+" "+valorAdhoc+" na cotação de "+cotacao;
				}//if moeda
				}//if brutoLidoFP
				//---------SERÁ QUE A ADMINISTRAÇÃO ALTEROU O BRUTO PORQUE O VALOR AQUI ESTÁ ERRADO?--BRU2
				//console.log("recebBru2",recebLido);
				let diaBru2 = recebLido.substr(0,2);
				let mesBru2 = recebLido.substr(3,2);
				let anoBru2 = recebLido.substr(6,4);
				let recebB2 = anoBru2+"-"+mesBru2+"-"+diaBru2;
				let c1Bru2 = DatasetFactory.createConstraint("FATURA",fatuLida,fatuLida,ConstraintType.MUST);
				let c2Bru2 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
				let c3Bru2 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
				let c4Bru2 = DatasetFactory.createConstraint("RECEBIMENTO",recebB2,recebB2,ConstraintType.MUST);
				let c5Bru2 = DatasetFactory.createConstraint("STATUS","1","1",ConstraintType.MUST);
				let arrayConstraintsBru2 = [c1Bru2,c2Bru2,c3Bru2,c4Bru2,c5Bru2];
				//console.log("CONSTRAINTS Bru2",arrayConstraintsBru2);
				let resultadoBru2 = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_sel",null,arrayConstraintsBru2,null);
				//console.log("resultadoBru2",resultadoBru2);
				if(resultadoBru2.values.length>0){
					//foi alterado. Então, mostra para todos que o valor bruto/liq/job é este
				brutoLido=resultadoBru2.values[0].BRUTO_NOVO;
				liqLido=resultadoBru2.values[0].LIQUIDO_NOVO;
				jobLido=resultadoBru2.values[0].JOB_NOVO;
				titleMoeda=titleMoeda+" (O valor original desta nota foi alterado pelo administrador)";
				}//if resultadoBru
				//-----------------------------------------------------------------------------------/BRU2
				//---Os valores de líquido e de job, se forem diferentes da regra, ficam na tabela ZJOBCLIENT_ESPECIAL
				let objClasse = new ClasseLiquidoEspecial (fatuLida,casoLido,escritorio,recebLido);
				let ocorr = objClasse.pegaOcorrencias();
				let liquidoEspec = liqLido*1;//valor default, caso seja igual ao calculado
				let jobEspec=liqLido*1*0.05;
					let editor = "";
				let dataUltima="";
				//console.log("ocorr na linha 212o: ",ocorr);
				if(ocorr*1>0){
				liquidoEspec = objClasse.pegaValorLiquido();//refaz o líquido especial porque existe na tabelaespecial
				jobEspec = objClasse.pegaValorJob();
				editor = objClasse.pegaEditor();
				dataUltima = objClasse.pegaDataUltima();
				}//if ocorr
				//console.log('Valor bruto e total Bruto: '+brutoLido+" "+totalBruto);
				totalBruto=totalBruto + brutoLido*1;
				totalLiq=totalLiq + liqLido*1;
				totalJob=totalJob + jobLido*1;
				//---
				let brutoFormatado=brutoLido;
				//if(brutoFormatado.toString().indexOf(",")==-1) brutoFormatado=brutoFormatado+",00";
				//---
				let liqFormatado=liqLido;
				//if(liqFormatado.toString().indexOf(",")==-1) liqFormatado=liqFormatado+",00";
				//---
				let jobFormatado=jobLido;
				//if(jobFormatado.toString().indexOf(",")==-1) jobFormatado=jobFormatado+",00";
				//---Especial
				let liquidoEspecF=liquidoEspec;
				//if(liquidoEspecF.toString().indexOf(",")==-1) liquidoEspecF=liquidoEspec+",00";
				//if(jobEspec.toString().indexOf(",")==-1) jobEspec=jobEspec+",00";
				
				if (faturaAnterior != fatuLida && faturaAnterior != "" && totalParcialBruto>0){
				//	concatena=concatena+'<tr style="background-color:tomato;font-weight:900;"><td colspan="5"></td><td style="font-size:80%;">Total da fatura '+faturaAnterior+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialBruto.toFixed(2)).toLocaleString('pt-BR')+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialLiq.toFixed(2)).toLocaleString('pt-BR')+'</td><td class="claAlinhaDireita">'+parseFloat(totalParcialJob.toFixed(2)).toLocaleString('pt-BR')+'</td></tr>';
					//concatenaCSV=concatenaCSV+";;;;Total da fatura "+faturaAnterior+";"+parseFloat(totalParcialBruto.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialLiq.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialJob.toFixed(2)).toLocaleString('pt-BR')+"\r\n";
					totalParcialBruto=0;
					totalParcialLiq=0;
					totalParcialJob=0;
				}
				//---somo o total após a exibição na tabela porque quando preciso dele é o valor que passou por último...
				//...antes do valor da vez
				totalParcialBruto=totalParcialBruto+brutoLido*1;
				totalParcialLiq=totalParcialLiq+liqLido*1;
				totalParcialJob=totalParcialJob+jobLido*1;
				//---
				concatena=fTxtPlotaTabelaNLE(contadorSucesso,concatena,intTrancaRateio,estiloDelegado,titleDelegado,estiloRateio,txtRotuloRateio,txtRateioFeito,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,estiloMoeda,titleMoeda,brutoFormatado,liqFormatado,jobFormatado,emiLido,mateLida,estiloCap,titleCap,areaLida,obs,concatenaSiglasMult,liquidoEspec,jobEspec,editor,dataUltima);
				concatenaCSV=fTxtPlotaCSVNLE(concatenaCSV,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,brutoFormatado,liqFormatado,jobFormatado,liquidoEspec,jobEspec,emiLido,mateLida,estiloCap,titleCap,areaLida);
				//--
				faturaAnterior=fatuLida;
				contadorSucesso++;
				titleMoeda="";
			}//for j
			}//for y globalArrayNLRAFilesMinhaResponsa
			//-----------------------------------------------------------------------------------------------------/B
			let txtPreservado = jQuery("#idSpaAvisosNLRE").text();
			jQuery("#idSpaAvisosNLRE").text(txtPreservado + " ["+(contadorProprio)+" ocorrência(s) de notas de sua captação e "+(contadorSucesso-contadorProprio*1)+" ocorrências como substituto(a)]");
			//--
			let estiloLinha="background-color:initial;color:initial";
			if(qtd == 0){
				if (fatura=='-1') fatura='Fatura não pesquisada';
				estiloLinha="background-color:	#fff2f2;color:#FFF;";
				//console.log("estiloLinha",estiloLinha);
				concatena=concatena+'<tr style="'+estiloLinha+'"><td colspan="12">Sem resultado para esta pesquisa (Entre '+ fConverteFormatoDataNLRE(dataPesquisaI)+' e '+ fConverteFormatoDataNLRE(dataPesquisaF)+'/'+fatura+')</td><td></td><td></td></tr>';
			}//if qtdL
			concatena=concatena+'<tr><td colspan="4"><td>Total Geral</td><td class="claAlinhaDireita">'+parseFloat(totalBruto).toFixed(2)+'</td><td class="claAlinhaDireita">'+parseFloat(totalLiq).toFixed(2)+'</td><td class="claAlinhaDireita">'+parseFloat(totalJob).toFixed(2)+'</td><td colspan="5"></td></tr>';
			concatena=concatena+'</tbody>';
			objTab.append(concatena);
			//------agora que procurou as notas 'normais', vai procurar as notas transferidas (não os files) para ver se este BP teve alguma atribuição e concatenar na tabela
			fTxtCompoeTransfNLE();
			//------agora vai desabilitar o botão de transferência de file porque o valor foi transferido
			fDesabilitaBotaoTransferenciaFile();
			//---
			let meuRotulo="<img src='/w_ucrg_nlequipe/resources/images/excel.png' height='30' width='30'/>";
			let objExportar=jQuery("#idPNLREExportarCSV");
			objExportar.text('');//se for um elemento que aceite text como propriedade
			var universalBOM = "\uFEFF";
			 let a = document.createElement('a');
			    a.href        = 'data:attachment/csv; charset=utf-8,' +  encodeURIComponent(universalBOM+concatenaCSV);
			    a.target      = '_blank';
			    a.innerHTML = meuRotulo;
			    a.download    = 'umNomeParaOArquivo.csv';
			    objExportar.html(a);
//}catch(e){
	//if(e.message.indexOf("length")){
	//alert ("Provavelmente, não há lançamentos para este BP neste período: "+e.message);	//pode ser que não haja mesmo lançamentos...
	//...ou pode ser um problema de compilação de dataset
	//}//if e.message
//}finally{
	  jQuery("#idDivNLRESpinner").hide();
//}//try catch finally
}//fCompoeTabelaNLRE
//---------------------------------------------
function fTxtCompoeTransfNLE(){
	//esta função cria uma tabela ao  procurar pela data do recebimento e do bp na máquina...
	//...(se existe nota transferida (não file))
	let objTab = jQuery("#idTabNLTRANSF");
	objTab.empty();
	let concatena='';
	let bpNaMaquina=jQuery("#idHidNLREBPNaMaquina").val();
	let dataInicialReceb = jQuery("#idDatNLREDAI").val();
	let dataFinalReceb=jQuery("#idDatNLREDAF").val();
	let arrayTFCampos=[];
	let arrayTFNomeCons=['BP_DESTINO','RECEBIMENTO'];
	let arrayTFInicial = [bpNaMaquina,dataInicialReceb];
	let arrayTFFinal = [bpNaMaquina,dataFinalReceb];
	let arrayFTOrdenacao=[];
	let objTFDataset = new MeusDatasets("1",'ds_ucrg_notasliquidadas_transf',arrayTFCampos,arrayTFNomeCons,arrayTFInicial,arrayTFFinal,arrayFTOrdenacao);
	let resTF = objTFDataset.pegaResultado();
	let i=0;
	let qtdT=resTF.values.length;
	//console.log("arrayTFInicial",arrayTFInicial);
	if(qtdT>0){
		jQuery("#idH2NLTRANSF").text("VALORES TRANSFERIDOS PARA VOCÊ");
		concatena=concatena+'<thead><tr><th></th><th title="Status do rateio por equipe">STATUS</th><th>CLIENTE</th><th>RATEIO DA FATURA</th><th>RECEBIMENTO</th>'+
		'<th>BRUTO</th><th>LÍQUIDO</th><th>JOB EXEC</th><th>AJUSTE LIQ</th><th>AJUSTE JOB</th><th>CAPTADOR</th><th>EMISSOR</th><th>ÁREA</th>'+
		'<th>FILE</th>'+
		'<th>MATÉRIA</th></tr></thead><tbody>';
	}else{
		jQuery("#idH2NLTRANSF").text("");
	}//if qtdT
	//-------------------------
	for(i;i<qtdT;i++){
		let bpBenef = resTF.values[i].ADV_BENEF;
		//console.log("i / beneficiário / bpNaMaquina",i+" / "+bpBenef+" / "+bpNaMaquina);
			//só mostra notas atribuídas se o BP que está na máquina 
			//...Isto porque o BP que está na máquina, sendo o captador, esta nota já aparece na tabela principal
		let fatura=resTF.values[i].FATURA;
		let capta = resTF.values[i].CAPTADOR;
		let cas = resTF.values[i].PASTA;
		//--
		globalArrayCasosValorTransferido.push(cas);//armazena o caso que teve o valor transferido (não o file)
		globalArrayFaturasValorTransferido.push(fatura);//armazena a fatura ligada ao cliente que teve o valor transferido (não o file)
		globalArrayBPValorTransferido.push(bpBenef);//armazena, neste caso, o BP beneficiário
		//--
		if(bpNaMaquina == bpBenef){
		let datReceb=resTF.values[i].DTRECEBIMENTO.substr(0,10);//yyyy-mm-dd
		let anoRe=datReceb.substr(0,4);
		let mesRe=datReceb.substr(5,2);
		let diaRe=datReceb.substr(8,2);
		datReceb = diaRe+"/"+mesRe+"/"+anoRe;
		//---
		let bruto = resTF.values[i].VALOR;
		let escr = resTF.values[i].ESCRITORIO;
		let liq = bruto*0.8547;
		let job = liq*0.05;
		let aj = liq;
		let ajJob=job;
		//---
		let brutoF = bruto;
		let liqF = liq;
		let liqE = liq;//o líquido especial é igual ao líquido da fatura, por default
		let jobF =job;
		let jobE = job;//o job especial é igual ao job da fatura, por default
		let ajF = liqF;
		let ajJobF=jobF;
		//---
		//-pega matéria e cliente

		let arrayTFNomeConsT=["PASTA"];
		arrayTFInicial=[];
		arrayTFFinal=[];
		arrayTFInicial=[cas];
		arrayTFFinal=[cas];
		let objF = new MeusDatasets("1","ds_ucrg_notasliquidadas_file",arrayTFCampos,arrayTFNomeConsT,arrayTFInicial,arrayTFFinal,arrayFTOrdenacao);
		let qtdF = objF.pegaResultado().values.length;
		//console.log("Quantidade de ocorrências de valor transferido",qtdF);
		if(qtdF>0){
			//PROCURANDO O NOME DO CLIENTE
		let cliente=objF.pegaResultado().values[0].RAZAO_SOCIAL;
		let emiss =objF.pegaResultado().values[0].SOCIO_RESPONSAVEL;
		let are = objF.pegaResultado().values[0].ID_AREA;
		let mat = objF.pegaResultado().values[0].TITULO;
		let editor = "-";
		let dataUltima="-";
		//--se o valor líquido foi modificado manualmente, pega este valor modificado
		let objMeuLiquido = new ClasseLiquidoEspecial(fatura,cas,escr,datReceb);
		//console.log("tem valor líquido modificado:",objMeuLiquido.pegaOcorrencias());
		if (objMeuLiquido.pegaOcorrencias()>0){
			//tem líquido modificado
			bruE=objMeuLiquido.pegaValorBruto();
			liqE=objMeuLiquido.pegaValorLiquido();
			jobE=objMeuLiquido.pegaValorJob();
			//jobE = jobE.replace(/\./,",");
			//console.log("Valor do jobE dentro da carga",jobE);
		}
		//console.log("Linha 2222, jobE",jobE);
		concatena=concatena+'<tr><td>'+(i*1+1)+'</td><td>(Transf. de '+capta+')</td><td>'+cliente+'</td>';
		concatena=concatena+'<td id="'+fatura+'td"><button type="button" class="claBtnFaturaRA" ';
		concatena=concatena+'data-tagcliente = "'+cliente+'" data-tagfatura = "'+fatura+'" ';
		concatena=concatena+'data-tagescritorio = "'+escr+'" ';
		concatena=concatena+'data-tagreceb="'+datReceb+'" data-tagcaso="'+cas+'" data-jobespec = "'+jobE+'" data-tagjob="'+jobE+'" ';
		concatena=concatena+'data-tagbp="'+bpBenef+'" title="Para fazer o rateio desta fatura ou transferir o ';
		concftena=concatena+'file e todas as faturas a ele ligadas para outro ';
		concatena=concatena+'SC fazê-lo">Ratear/Transferir '+fatura+'</button></td>';
		concatena=concatena+'<td>'+datReceb+'</td>';
		concatena=concatena+'<td>'+parseFloat(brutoF).toFixed(2)+'</td>';
		concatena=concatena+'<td>'+parseFloat(liqF).toFixed(2)+'</td>';
		concatena=concatena+'<td>'+parseFloat(jobF).toFixed(2)+'</td>';
		concatena=concatena+'<td><button type="button" class="btn btn-warning claBtnEspecial" data-fatesp = "'+fatura+'" ';
		concatena=concatena+'data-casoesp="'+cas+'" data-escesp="'+escr+'" data-recesp="'+datReceb+'" ';
		concatena=concatena+'data-liqesp="'+liqE+'" data-ultimo ="'+editor+'" data-dataultima ="'+dataUltima+'" ';
		concatena=concatena+'title="Ajusta manualmente o valor bruto (ou o bruto e o líquido) e, ';
		concatena=concatena+'consequentemente, o valor do job" >'+parseFloat(liqE).toFixed(2)+'</button></td>';
		concatena=concatena+'<td style="text-align:right;">'+parseFloat(jobE).toFixed(2)+'</td>';
		concatena=concatena+'<td>'+bpBenef+'</td><td>'+emiss+'</td><td>'+are+'</td><td>'+cas+'</td><td>'+mat+'</td></tr>';
		//console.log("Linha 2173 compondo concatena",concatena);
		}//if qtdF
		}//if bpNaMaquina
	}//for i
	objTab.append(concatena);
	//console.log("Valores das globais dentro de fTxtCompoeTransfNLE:caso,fatura,bpBenef",globalArrayCasosValorTransferido+"/"+globalArrayFaturasValorTransferido+"/"+globalArrayBPValorTransferido);
}//fTxtCompoeTransfNLE
//-------------------------------------------------------------------------------------------
function fConverteFormatoDataNLRE(dataPassadaYMD){
			//yyyy-mm-dd
			//console.log(dataPassadaYMD);
			let ano=dataPassadaYMD.substr(0,4);
			let mes=dataPassadaYMD.substr(5,2);
			let dia=dataPassadaYMD.substr(8,2);
			return dia+"/"+mes+"/"+ano;
		}//fConverteFormatoDataNLRE
//----------------------------------
function fSomaPercentuaisNLE(){
	//verifica se a soma dá 100% e também calcula o valor proporcional do job
	let somaPercentual=0;
	let somaJobs=0;
	let objSpa=jQuery("#idSpaRASomaPercentual");
	objSpa.css({"background-color":"initial","color":"initial"});
	let objSpaAvi=jQuery("#idSpaRASomaIndevida");
	objSpaAvi.text('');
	let objBtn=jQuery(".claRateioConfirma");
	objBtn.prop("title","");
	objBtn.prop("disabled",false);
	let jobTotal=jQuery("#idHidNLREJobSelecionado").val();
	let objTab=jQuery("#idTabNLRENLRA");
	let jobTabela=jQuery("#idHidNLREJobSelecionado").val();
	//-----------------------------------
	var tripaIntAreas = jQuery(".claRARateioReal").each(function(){
		let valorInputado=jQuery(this).val();
		if(isNaN(valorInputado)) valorInputado=0;
		valorInputado = valorInputado.toString().replace(/,/g,".");
		//console.log("valorInputado a somar",valorInputado);
		somaPercentual = somaPercentual+valorInputado*1;
		//console.log("somaPercentual",somaPercentual);
      }); 
	//console.log("diferença entre a soma e oa 100% ideais: ",somaPercentual-100);
if(somaPercentual != 100 && (Math.abs(somaPercentual-100) > 0.01) ){
		objSpaAvi.text("Soma dos percentuais diferente de 100%!!!");
		objSpaAvi.css({"background-color":"red","color":"white"});
		objSpa.css({"background-color":"red","color":"white"});
		objBtn.prop("disabled",true);
		objBtn.prop("title","Bloqueado por segurança, uma vez que o percentual é diferente de 100");
		jQuery(".claBtnRARearranjo").show();//mostra o botão de rearranjo
}else{
	let msgAdhoc="Ok 100%";
	if(somaPercentual-100 != 0) {
		msgAdhoc = 'Ok 100% (com tolerância decimal)';
		jQuery(".claBtnRARearranjo").show();//mostra o botão de rearranjo
	}
	objSpaAvi.text(msgAdhoc);
	objSpaAvi.css({"background-color":"green","color":"white"});
	jQuery(".claBtnRARearranjo").hide();//oculta o botão de rearranjo
}//if somaPercentual != 100
objSpa.text(somaPercentual);
}//fSomaPercentuaisNLE		
//--------------------------------------
function fPulaParaElementoRANLE(idSemTralha) {
	document.getElementById(idSemTralha).scrollIntoView(false);
	//console.log(idSemTralha);
}//fPulaParaElementoRANLE
//-------------------------------
		function fCarregaSCNLRE(){
			let resultado = DatasetFactory.getDataset("ds_ucrg_conselheiros_avanc",null,null,null);
			let objSel=jQuery("#idSelNLREEmissores");
			objSel.empty();
			let objSelTransf=jQuery("#idSelNLTRANSFBenef");
			objSelTransf.empty();
			let concatena='<option value="-1" title="-1">-</option>';
			let qtd=resultado.values.length;
			let i=0;
			for(i;i<qtd;i++){
				let sigla = resultado.values[i].COD_ADVG;
				let nome = resultado.values[i].NOME;
				concatena = concatena +'<option value="'+sigla+'" title="'+sigla+'">'+nome+'</option>';
			}//for i
			objSel.append(concatena);
			objSelTransf.append(concatena);
		}//fCarregaSCNLRE
//-------------------------------------------------		
function fReformataDataBR(dataPassada){
	if(dataPassada.length==10){
	//yyyy-mm-dd
	let ano = dataPassada.substr(0,4);
	let mes = dataPassada.substr(5,2);
	let dia = dataPassada.substr(8,2);
	return dia+"/"+mes+"/"+ano;
	}else{
		return "-1";
	}//if dataPassada
}//fReformataDataBR
//---------------------------------------------------
async function fExibeTS(caso,fatura){
	jQuery("#idDivRDSpinner").show();
	let objTab=jQuery("#idTabNLRENLDET");
	objTab.empty();
	/*
	let concatena='<thead><tr><th>ADV</th><th>DATA</th><th>DESCRIÇÃO</th>'+
	'<th>UTS</th><th>Valor ($)</th><th>TS</th></tr></thead><tbody>';
	*/
	let concatena='<thead><tr><th>ADV</th><th>DATA</th><th>DESCRIÇÃO</th>'+
	'<th>UTS</th><th>Valor ($)</th></tr></thead><tbody>';
	let c1 = DatasetFactory.createConstraint("NUM_CASO",caso,caso,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("NUM_FAT",fatura,fatura,ConstraintType.MUST);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	arrayConstraints.push(c2);
	//let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_ts",null,arrayConstraints,null);
	let resultado = await fEncapsulaDatasetNLE(
            "ds_ucrg_notasliquidadas_ts", 
            null, 
            arrayConstraints,
            null
        );
	let qtd = resultado.values.length;
	let i=0;
	let totalParcial=0;
	let nomeAnterior="";
	let qtdLinhas=0;
	let siglaAnterior="";
	let nomeP="";
	let siglaLida="";
	for(i;i<qtd;i++){
		let numTS = resultado.values[i].TS;
		siglaLida = resultado.values[i].ADV;
		//----procurando o nome de quem debitou uts para pôr no title da tabela detalhes
		let p1 = DatasetFactory.createConstraint("SIGLA",siglaLida,siglaLida,ConstraintType.MUST);
		let arrayConstraintsP=[];
		arrayConstraintsP.push(p1);
		let resultadoP=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_pessoas",null,arrayConstraintsP,null);
		nomeP=resultadoP.values[0].NOME;
		//----
		let dataLida = resultado.values[i].DATA;
		dataLida = fConverteFormatoDataNLRE(dataLida);
		let descrLida = resultado.values[i].DESCRICAO;
		let valor = resultado.values[i].VALOR;
		let utsLidas = resultado.values[i].UT;
		if(utsLidas == 'null') {
			utsLidas="0";
			valor="0";
		}
		if(nomeAnterior != nomeP ){
			//a fatura atual é diferente da anterior
		if(i==0){
			//como é primeira passagem, armazena os subtotais
			totalParcial=valor*1;
			qtdLinhas=1;
		}//if i==0
		if(qtdLinhas>1){
			//----a fatura anterior é diferente da atual e, como não é a primeira fez, plota o valor anterior acumulado
			concatena=concatena+'<tr><td colspan="2" style="background-color:tomato;">Total de '+nomeAnterior+' ('+siglaAnterior+'): '+totalParcial+'</td><td  colspan="4"></td</tr>';
			//concatenaCSV=concatenaCSV+";;;;Total da fatura "+nomeAnterior+";"+parseFloat(totalParcial.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialLiq.toFixed(2)).toLocaleString('pt-BR')+";"+parseFloat(totalParcialJob.toFixed(2)).toLocaleString('pt-BR')+"\r\n";
			//põe a fatura atual no subtotal e reseta a contagem de faturas
			totalParcial=valor*1;
			qtdLinhas=1;
		}else if (qtdLinhas ==1 && i > 0){
			//só armazena a fatura atual
			totalParcial=valor*1;
			qtdLinhas=1;
		}//if qtdLinhas
		}else{
			//a fatura atual é IGUAL  a anterior. Ajunta
			totalParcial=totalParcial+valor*1;
			qtdLinhas++;
		}//if linhaAnterior
		/*
		concatena=concatena+'<tr><td title="'+nomeP+'" style="border:2px solid #A020F0;">'+siglaLida+'</td><td>'+dataLida+'</td><td>'+descrLida+'</td>'+
		'<td>'+utsLidas+'</td><td style="text-align:right;">'+parseFloat(valor).toFixed(2)+'</td><td>'+numTS+'</td></tr>';
		*/
		concatena=concatena+'<tr><td title="'+nomeP+'" style="border:2px solid #A020F0;">'+siglaLida+'</td><td>'+dataLida+'</td><td>'+descrLida+'</td>'+
		'<td>'+utsLidas+'</td><td style="text-align:right;">'+valor+'</td></tr>';
		nomeAnterior=nomeP;
		siglaAnterior=siglaLida;
	}//for i
	if(qtd==0){
		concatena=concatena+'<tr><td colspan="5">Não há timesheets associados à fatura '+fatura+'</td></tr>';
	}//if qtd
	if(qtdLinhas>1){
		//terminou o loop, mas não imprimiu o total, caso houvesse mais de uma linha
		concatena=concatena+'<tr><td colspan="2" style="background-color:tomato;">Total de '+nomeP+' ('+siglaLida+'): '+totalParcial+'</td><td  colspan="4"></td</tr>';
	}//if qtdLinhas
	concatena=concatena+'</tbody>';
	objTab.append(concatena);
	jQuery("#idDivRDSpinner").hide();
}//fExibeTS
//---------------------------------------------------
function fCarregaSCNLE(){
	let objSelAdm =jQuery("#idSelNLRESC");
	objSelAdm.empty();
	let c1 = DatasetFactory.createConstraint("CATEGORIA",'SC%','SC%',ConstraintType.MUST,true);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
	let concatenaSC='<option value="-1" title="-1">...</option>';
	let i=0;
	for(i;i<resultado.values.length;i++){
		let sigla = resultado.values[i].COD_ADVG.trim();
		let nome = resultado.values[i].NOME.trim();
		let email = resultado.values[i].EMAIL;
		if (sigla != 'CT'){
		concatenaSC=concatenaSC+'<option value="'+email+'" title="'+sigla+'">'+nome+'</option>';
		}//if sigla 
	}//for i
	objSelAdm.append(concatenaSC);
}//fCarregaSCNLE
//---------------------------------------------------
function fCarregaAdvsNLE(){
	let objSel = jQuery("#idSelNLREAdvs");
	objSel.empty();
	let objSelSC = jQuery("#idSelNLRETransf");
	objSelSC.empty();
	let objSelAdmC = jQuery("#idSelAdmCChefe");
	objSelAdmC.empty();
	let objSelRT = jQuery("#idSelRTBP");
	objSelRT.empty();
	let concatena='<option value="-1" title="-1">Escolha um advogado</option>';
	let concatenaSC='<option value="-1" title="-1">Escolha um Conselheiro</option>';
	let concatenaSNC='<option value="-1" title="-1">Escolha um Chefe</option>';
	let c1 = DatasetFactory.createConstraint("CATEGORIA",'S%','S%',ConstraintType.MUST,true);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
	let i=0;
	for(i;i<resultado.values.length;i++){
		let sigla = resultado.values[i].COD_ADVG.trim();
		let nome = resultado.values[i].NOME.trim();
		let categoria = resultado.values[i].CATEGORIA;
		concatena=concatena+'<option value="'+sigla+'" title="'+sigla+'">'+nome+'</option>';
		//console.log("categoria",categoria+" "+categoria.substr(0,2));
		if(categoria.substr(0,2)=="SC"){
		concatenaSC=concatenaSC+'<option value="'+sigla+'" title="'+sigla+'">'+nome+'</option>';
		}//if categoria
		if(categoria.substr(0,2)=="SN"){
			concatenaSNC=concatenaSNC+'<option value="'+sigla+'" title="'+sigla+'">'+nome+'</option>';
			}//if categoria
	}//for i
	objSel.append(concatena);
	objSelSC.append(concatenaSC);
	objSelAdmC.append(concatenaSNC);
	objSelRT.append(concatena);
}//fCarregaAdvsNLE
//---------------------------------------------
function fCarregaEstagsNLE(){
	let objSelEst = jQuery("#idSelAdmCEst");
	objSelEst.empty();
	let concatenaEst='<option value="-1" title="-1">Escolha um Estagiário</option>';
	let c1 = DatasetFactory.createConstraint("CATEGORIA",'EST%','EST%',ConstraintType.MUST,true);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
	let i=0;
	for(i;i<resultado.values.length;i++){
		let sigla = resultado.values[i].COD_ADVG.trim();
		let nome = resultado.values[i].NOME.trim();
			concatenaEst=concatenaEst+'<option value="'+sigla+'" title="'+sigla+'">'+nome+'</option>';
	}//for i
	objSelEst.append(concatenaEst);
}//fCarregaEstagsNLE
//----------------------------------------------
function fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido){
	//console.log("Entrou em fCarregaSugestaoJaFeitaNLE");
	jQuery("#idArtNLREExtra").show();//mostra a lista de advogado a inserir (como extras)
	jQuery("#idArtNLRETransf").show();
//	//console.log("Entrou em fCarregaSugestaoJaFeitaNLE");
	let jobTotal = jQuery("#idHidNLREJobSelecionado").val();
	let bpNaMaquina=jQuery("#idHidNLREBPSelecionado").val();
	//---
	let cliente = jQuery("#idHidNLREClienteSelecionado").val();
	let fLida = jQuery("#idHidNLREFaturaSelecionada").val();
	//---
	let objTab=jQuery("#idTabNLRENLRA");
	objTab.empty();
	let concatena='<thead><tr><th>ADV</th><th>SUGESTÃO (%)</th>'+
	'<th>EFETIVO (%)</th><th title="O job proporcional aparece, primeiramente, com o valor original da nota. Se houver modificação no líquido, o job se ajustará ao sair do campo do percentual efetivo">JOB PROPORCIONAL (R$)</th><th title="Retira o rateio feito para o advogado da linha">Remover</th></tr></thead><tbody>';
	let intDiferente=0;
	let faturaLida="-1";
	let casoLido="-1";
	let escritorioLido="-1";
	let i=0;
	let bpLido=bpNaMaquina;//para 'partir' igual
	let concatenaDesligados="";
	let estiloDesligado="";
	let intEhAdv=1;
	let intEhConsultor=0;
	let intAdvDesligado = 0;
	let estiloApropriaJ="";
	let titleApropriaJ="";
	let siglaEstX="";
	let somaValor=0;
	let jobTabela = jQuery("#idHidNLREJobSelecionado").val();
	//console.log("resultadoR",resultadoR);
	for(i;i<resultadoR.values.length;i++){
		estiloDesligado="";
		estiloApropriaJ="";
		titleApropriaJ="";
		siglaEstX="";
		let sigla = resultadoR.values[i].ADV_RATEADO;
		//---
		/*
		let ciC = DatasetFactory.createConstraint("SIGLA_ESTAG",sigla,sigla,ConstraintType.MUST);
		let arrayConstraintsC = [ciC];
		let objChefe = new Chefes("ds_ucrg_notasliquidadadas_chefes",null,arrayConstraintsC,null);
		let siglaChefe = objChefe.getSiglaChefe();
		//console.log("siglaChefe em fCarregaSugestao... ",siglaChefe);
		*/
		//---
		intEhAdv=1;
		intEhConsultor=0;
		intAdvDesligado=0;
		let nomeAdv="";
		//console.log("sigla da vez",sigla+" "+i);
		//----
		let d1 = DatasetFactory.createConstraint("COD_ADVG",sigla,sigla,ConstraintType.MUST);
		let arrayConstraintsD=[];
		arrayConstraintsD.push(d1);
		let resultadoD = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraintsD,null);
		let qtdD=resultadoD.values.length;
		//console.log("sigla da vez",sigla+" e se existe nas pessoas: "+qtdD);
		if(qtdD ==0){
			//************ACHO QUE ESTE IF VAI FICAR INOPERANTE PORQUE TROQUEI O DESLIGADO POR CAPTADOR NA INAUGURAÇÃO
				estiloDesligado = "border: 3px solid red;"
			//console.log('LINHA 1235 DESLIGADO!',sigla);
				//intAdvDesligado=1;
					//se for advogado desligado, pôr as uts para o SC CAPTADOR
				//intEhAdv=0;
					intEhAdv=1;//para o bp captador ser reconhecido, diz quer é adv válido
				titleApropriaJ = " (Apropriado de "+sigla+", advogado desligado)";
				let siglaCap=jQuery("#idHidNLREBPSelecionado").val();
				sigla=siglaCap;//põe a sigla para  BP CATPADOR
				nomeAdv=siglaCap;//põe a sigla como nome só para não ficar vazia
				//console.log("linha 1998",nomeAdv);
		}else{
			//console.log('Encontrou. Será consultor?',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
			nomeAdv=resultadoD.values[0].NOME;//default
			if(resultadoD.values[0].CATEGORIA.substr(0,1) != "S" && resultadoD.values[0].CATEGORIA.substr(0,3) != "EST"){
			estiloDesligado = "border: 3px solid red;"
				intEhConsultor=1;
			nomeAdv=resultadoD.values[0].NOME;//substituindo o default
			//console.log('LINHA 1244 Consultor SIM: ',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
			}//if resultadoD 1
			if(resultadoD.values[0].CATEGORIA.substr(0,3) == "EST"){
				//console.log('lINHA 1247 é estag',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
				intEhAdv=0;//não é adv. É estagiário. Não mostra na tabela
				}//if resultadoD 2
	}//if resultadoD length
		//----
		let perc = resultadoR.values[i].PERCENTADV;
		let percFormatado = perc *100;
		let vlr = resultadoR.values[i].VLRATEADO;
		//---------PRECISA VERIFICAR SE O LÍQUIDO NÃO FOI ALTERADO NA MARRA. SE FOI, SUBSTITUI -----L
		let faturaE = resultadoR.values[i].FATURA;
		let pastaE = resultadoR.values[i].PASTA;
		let escritorioE = resultadoR.values[i].ESCRITORIO;
		//--
		let recebE = resultadoR.values[i].DTRECEBIMENTO;//yyyy-mm-dd
		let diaE = recebE.substring(8,10);
		let mesE = recebE.substring(5,7);
		let anoE = recebE.substring(0,4);
		recebE = diaE+"/"+mesE+"/"+anoE;
		//--
		let resultadoLiq = fRESPegaValorLiquidoAlterado(faturaE,pastaE,escritorioE,recebE,"1");
		if(resultadoLiq.values.length>0){
			vlr = resultadoLiq.values[0].JOB_AJUSTE;//substitui o valor rateado pelo valor forçado pela Administração
			jQuery("#idHidNLREJobSelecionado").val(vlr);//refaz o valor que era original para o valor forçado
		}
		//-----------------------------------------------------------------------------------------/L
		//console.log("intAdvDesligado e intEhConsultor",sigla+" "+intAdvDesligado+" "+intEhConsultor);
		if(intAdvDesligado==1 || intEhConsultor==1){
			//se for um advogado desligado ou consultor, põe zero para ele na tabela
			percFormatado=0;
			vlr=0;
		}//if intAdvDesligado
		somaValor=somaValor+vlr*1;
		bpLido = resultadoR.values[i].CAPTADOR;//refaz o BP certo
		let dataFeita = resultadoR.values[i].DTRATEIO;
		casoLido = resultadoR.values[i].PASTA;
		faturaLida = resultadoR.values[i].FATURA;
		escritorioLido = resultadoR.values[i].ESCRITORIO;
		let recebimentoLido = resultadoR.values[i].DTRECEBIMENTO;
		let indiceApr = resultadoR.values[i].INDICE_APR;
		//---precisa tratar o recebimento que vem como 2022-07-12 00:00:00.0
		let diaX = recebimentoLido.substr(8,2);
		let mesX = recebimentoLido.substr(5,2);
		let anoX = recebimentoLido.substr(0,4);
		recebimentoLido = diaX+"/"+mesX+"/"+anoX;
		//---
		let c1A = DatasetFactory.createConstraint("FATURA",faturaLida,faturaLida,ConstraintType.MUST);
		let c2A = DatasetFactory.createConstraint("ESCRITORIO",escritorioLido,escritorioLido,ConstraintType.MUST);
		let c3A = DatasetFactory.createConstraint("RECEBIMENTO",recebimentoLido,recebimentoLido,ConstraintType.MUST);
		let c4A = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
		let c5A = DatasetFactory.createConstraint("CHEFE",sigla,sigla,ConstraintType.MUST);
		let constrAX = [c1A,c2A,c3A,c4A,c5A];
		//console.log("linha 2027 procurando apropriado: ",constrAX);
		let resultadoAX = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria",null,constrAX,null);
		let percOriginalAX = "";
		if(resultadoAX.values.length>0){
			let iX=0;
			for(iX;iX < resultadoAX.values.length;iX++){
				let indiceAprX=resultadoAX.values[iX].INDICE_APR;
				if(indiceAprX==indiceApr){
					siglaEstX=resultadoAX.values[iX].SIGLA_EST;
					percOriginalAX = resultadoAX.values[iX].PERC_ORIGINAL;
				}//if indiceAprX
			}//for iX
			 estiloApropriaJ="border:2px solid brown;";
			 let percOFAX = percOriginalAX*100;
			 titleApropriaJ="Há (também) débitos apropriados de estagiário ou de advogado desligado";
			 if(percOFAX>0){
			 titleApropriaJ="Há (também) débitos apropriados de estagiário ou de advogado desligado: ("+siglaEstX+": "+percOFAX+"%)";
			 }
		}//if resultadoAX
		//---
		if(bpLido != bpNaMaquina) intDiferente=1;
		if(intEhAdv==1 || intEhConsultor==1 ){
			//só compõe se for um advogado ativo, ou um consultor. Se for desligado ou estagiário, não. ...
			//...Em caso de ser consultor, vai plotar, mas com zero
	concatena=concatena+'<tr><td style="'+estiloDesligado+estiloApropriaJ+'" title="'+nomeAdv+" "+titleApropriaJ+'">'+sigla+'</td><td>'+percFormatado+'</td>'+
	'<td><input type="text" class="form-control claRARateioReal" style="text-align:right;" value="'+percFormatado+'"></td>'+
	'<td id="'+sigla+'" class="claValorAdv" style="text-align:right;">'+vlr+'</td>'+
	'<td><button type="button" id="'+sigla+'" class="btn btn-danger claBtnNLRARemover" title="Remover o advogado desta linha e o seu percentual">x</button></td></tr>';
		}//if intEhAdv
	}//for i
	if (somaValor>0){
		  jQuery("#idSpaRASomaJob").text("Refeito baseado nos timesheets existentes");
		  jQuery("#idSpaRASomaJob").css({"color":"blue"});
	}
	if(somaValor==0){
		//se a soma total dos valores for zero, põe 100% para o captador
		concatena=concatena+'<tr><td>'+bpLido+'</td><td>100.00</td>'+
		'<td><input type="text" class="form-control claRARateioReal" style="text-align:right;" value="100.00"></td>'+
		'<td id="'+bpLido+'" class="claValorAdv" style="text-align:right;">'+jobTabela+'</td>'+
		'<td><button type="button" id="'+bpLido+'" class="btn btn-danger claBtnNLRARemover" title="Remover o advogado desta linha e o seu percentual">x</button></td></tr>';
	}//if somaValor
	concatena=concatena+'<tr><td><span id="idSpaRASomaIndevida"></span></td>'+
	'<td><button type="button" class="btn btn-danger claBtnRARearranjo" title="Clique neste botão se quiser automatizar a distribuição percentual com base nos valores da coluna SUGESTÃO (%)">Ajustar percentuais</button></td><td><span id="idSpaRASomaPercentual"></span></td>'+
	'<td><button type="button" class="btn btn-danger claBtnRAReset" title="Este botão refaz do início as sugestões de rateio">Reset</button></td>'+
	'<td title="Marcando esta caixa, este rateio indicado se repetirá em faturamentos futuros no file  como sugestão permanente ('+casoLido+') "><label class="claLblPreserva"><input type="checkbox" class="claChkPreservaRateio" value="1"  data-numerofile = "'+casoLido+'" '+
	'>&nbsp;Preservar rateio</label></td></tr>';
	concatena=concatena+'<tr><td><button type="button" class="AttListaCaptador claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
	'data-tagcasodet="'+casoLido+'">Ver detalhes dos timesheets</button></td><td><button type="button" class="executar claRateioConfirma" data-tagfatrat="'+faturaLida+'" '+
	'data-tagescrrat="'+escritorioLido+'" data-tagcasorat="'+casoLido+'">Salvar</button></td><td><span id="idSpaRASomaJob"></span></td></tr>';

	objTab.append(concatena);
	if(somaValor==0){
	  jQuery("#idSpaRASomaJob").text("Posto 100% para o Captador, uma vez que os timesheets existentes não são válidos");
	  jQuery("#idSpaRASomaJob").css({"color":"red"});
	}//if somaValor

	   jQuery("#idSpaRASomaIndevida").text("Esta fatura já foi objeto de rateio");
	//if(intDiferente==1) alert("Atenção, esta nota já foi objeto de rateio por parte do BP "+bpLido);
	fSomaPercentuaisNLE();
	if(estiloDesligado.length>0){
		let objSpaAlerta =jQuery("#idSpaNLRASUGAlerta");
		objSpaAlerta.css({"color":"white","font-weight":"900","background-color":"red"});
		objSpaAlerta.text("As bordas em vermelho acima significam que o advogado é consultor.");
	}//if estiloDesligado
}//fCarregaSugestaoJaFeitaNLE
//----------------------------------------------
function fProvocaVerRateiosNLE(fatu,pasta,escri,receb){
	//-----------procura para ver se já há algum rateio feito
	   let r1 = DatasetFactory.createConstraint("FATURA",fatu,fatu,ConstraintType.MUST);
	   let r2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	   let r3 = DatasetFactory.createConstraint("ESCRITORIO",escri,escri,ConstraintType.MUST);
	   let r4 = DatasetFactory.createConstraint("RECEB",receb,receb,ConstraintType.MUST);
	   let arrayConstraintsR=[];
	   arrayConstraintsR.push(r1);
	   arrayConstraintsR.push(r2);
	   arrayConstraintsR.push(r3);
	   arrayConstraintsR.push(r4);
	   let resultadoR=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateiosfeitos_avanc",null,arrayConstraintsR,null);
	   return resultadoR;
}//fProvocaVerRateiosNLE
//-----------------------------------------------------
function fInauguraSugestoesNLE(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido){
	//console.log("Entrou em fInauguraSugestoesNLE");
	//É a primeira vez que o BP entra para fazer sugestões.
	let jobTotal = jQuery("#idHidNLREJobSelecionado").val();
	//verifica se tem preservação (o bp pode ter marcado para este file seja sempre a mesma distribuição e ignorar esta sugestão
	let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
	//console.log("booTemPreservacao",booTemPreservacao);
	if(!booTemPreservacao){
		//NÃO TEM PRESERVAÇÃO, VAI PELAS VIAS NORMAIS
		//console.log("jobTotal em fInaugura",jobTotal);
	//---
	let objH3=jQuery("#idH3NLREROTULOPESQUISA");
	//---
	let objTab=jQuery("#idTabNLRENLRA");
	objTab.empty();
	//---
	let nomeAdv="";
	//limpa as tabelas  de detalhe
	//jQuery("#idH3NLREDETROT").text("");
	//----só para limpar a tabela de detalhes. Não popula aqui
	let objTabD=jQuery("#idTabNLRENLDET");
	objTabD.empty();
	//---
	let concatena='<thead><tr><th>ADV</th><th>SUGESTÃO (%)</th>'+
	'<th>EFETIVO (%)</th><th title="O job proporcional aparece, primeiramente, com o valor original da nota. Se houver modificação no líquido, o job se ajustará ao sair do campo do percentual efetivo">JOB PROPORCIONAL (R$)</th><th>Remover</th></tr></thead><tbody>';
 //----------------------------------
let c1 = DatasetFactory.createConstraint("NUM_FAT",faturaLida,faturaLida,ConstraintType.MUST);
let c2 = DatasetFactory.createConstraint("NUM_ESCR",escritorioLido,escritorioLido,ConstraintType.MUST);
let c3 = DatasetFactory.createConstraint("NUM_CASO",casoLido,casoLido,ConstraintType.MUST);
let arrayConstraints = [];
arrayConstraints.push(c1);
arrayConstraints.push(c2);
arrayConstraints.push(c3);
//carregando as notas emitidas pra criar a tabela de sugestões de percentuais
let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateioequipe",null,arrayConstraints,null);
let qtd=resultado.values.length;
let i=0;
let arrayObjs=[];
let somaUts=0;
jQuery("#idArtNLREExtra").show();
jQuery("#idArtNLRETransf").show();
for(i;i<qtd;i++){
let fatura = resultado.values[i].FATURA;
let sigla = resultado.values[i].ADV.trim();
let siglaPreservada = "";
let uts = resultado.values[i].TOT_ADVG;
if(uts == 'null') uts="0";
//console.log("uts que chegam",uts);
//------Se a sigla for de sócio consultor, adv desligado ou de estagiário, tratamento especial
let intDescoberta = fVerificaNaturezaAdvNLE(sigla);
if(intDescoberta*1==0){
	//é advogado desligado, vou pôr as uts para o Captador
	siglaPreservada=sigla;//preserva o advogado original
	sigla = jQuery("#idHidNLREBPSelecionado").val();
}
if(intDescoberta == 1) uts="0"; //-1 é advogado regular, 1 = consultor e 3 = estagiário
//---A sigla da vez é de um estagiário? Se for, qual é seu chefe?
if(intDescoberta==3){
	//é um estagiário. Logo, o cálculo é feito normalmente, só que aparece a sigla do chefe
let ciC = DatasetFactory.createConstraint("SIGLA_ESTAG",sigla,sigla,ConstraintType.MUST);
let arrayConstraintsC = [ciC];
let objChefe = new Chefes("ds_ucrg_notasliquidadadas_chefes",null,arrayConstraintsC,null);
let siglaChefe = objChefe.getSiglaChefe();
if(siglaChefe != ""){
siglaPreservada=sigla;	//se for estagiário, preserva sua sigla para mostrar no title do advogado beneficiado
	sigla = siglaChefe;//substitui a sigla do estagiário pela do chefe
}else{
	alert ("Atenção: O estagiário "+siglaPreservada+" não tem a referência de seu chefe. O cálculo da sugestão de rateio ficará prejudicado. Fale com a Administração para incluí-lo na tabela apropriada, antes de fazer este rateio");
}//if siglaChefe
}//if intDescoberta==3
//--
//console.log(" chefe: "+sigla+" sigla do estagiário: "+siglaPreservada);
//--------------------------------------------------
let meuObj={"fatura":fatura,"sigla":sigla,"uts":uts,"origem":siglaPreservada};
arrayObjs.push(meuObj);
//-------------------------------------------------
somaUts=somaUts+uts*1;
//console.log("linha 1325 objeto da vez",meuObj);
}//for i
//console.log("linha 1327 objeto montado",arrayObjs);
let intSoTemConsultor=0;//default é que é não há consultores somente
//------loop do objeto para calcular os percentuais e inserir na tabela de rateios no ORACLE-----A
let indiceApr=0;
arrayObjs.forEach(function (elemento,indice,proprioArray){
let estiloPreservado = "background-color:initial;color:initial;outline:initial";
let titlePreservado = "";
let faturaObj=elemento.fatura;
let siglaObj=elemento.sigla;
let utsObj=elemento.uts;
origemPres = elemento.origem;
//console.log("Inaugura na gravação /sigla do chefe: "+siglaObj+" sigla do estagiário: "+origemPres);
if(origemPres.length>0){
	//existe uma apropriação de uts pelo chefe do estagiário
estiloPreservado = "background-color:brown;color:white;outline: #DDDDDD solid 2px;";
titlePreservado = "UTs apropriadas do profissional (Estagiário ou desligado) "+origemPres;
}
if(somaUts==0) {
	somaUts=1;//para evitar divisão por zero
	 intSoTemConsultor=1;//se a soma de uts era zero, é porque precisa inserir o BP como beneficiário mais abaixo
}
let perc = utsObj*1/somaUts;
let valorJobTotal = (jobTotal*perc).toString();
//console.log("linha 1334 utsObj e perc",utsObj+" "+perc);
//----faz insert inaugurando
   let arrayCampos=[];
	arrayCampos.push(faturaLida);
	arrayCampos.push(casoLido);
	arrayCampos.push(escritorioLido);
	arrayCampos.push(recebimentoLido);
	arrayCampos.push(siglaObj);
	arrayCampos.push((perc).toString());
	arrayCampos.push(valorJobTotal);
	arrayCampos.push(bpLido);
	arrayCampos.push(new Date().toLocaleDateString());
	arrayCampos.push(indiceApr.toString());
//console.log("linha 2169 O que vai para o insert",arrayCampos);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_insert_avanc",arrayCampos,null,null);
	//console.log("inseriu rateio fInaugura: ",resultado);
	//console.log("Vai tentar salvar a apropriação. Sigla do estagiário: ",origemPres);
	//---------------------agora vai inserir a apropriação da ut pelo chefe do estagiário-- APROPRIA
	if(origemPres != ""){
	 let arrayCamposApr=[];
		arrayCamposApr.push(faturaLida);
		arrayCamposApr.push(escritorioLido);
		arrayCamposApr.push(origemPres);
		arrayCamposApr.push(siglaObj);
		arrayCamposApr.push(recebimentoLido);
		arrayCamposApr.push(casoLido);
		arrayCamposApr.push(indiceApr.toString());
		arrayCamposApr.push((perc).toString());
		//console.log("Array de campos que vai para a apropria: ",arrayCamposApr);
		let resultadoApr = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria_ins",arrayCamposApr,null,null);
		//console.log("Salvou a apropriação claRateioConfirma click: ",resultadoApr.values[0].insercao);
	}//if origemPres
	//-----------------------------------------------------------------------------------/APROPRIA
	//console.log("resultado da inserção ",i+" "+resultado.values[0].insercao);
	//---------------------------------
let percFormatado =perc*100;
if(perc>0){
	//----
	let a1 = DatasetFactory.createConstraint("RA_XFORNEC",siglaObj,siglaObj,ConstraintType.MUST);
	let arrayConstraintsA = [];
	arrayConstraintsA.push(a1);
	let resultadoA = DatasetFactory.getDataset("ds_ucrg_pesquisa_pessoas2",null,arrayConstraintsA,null);
	if(resultadoA.values.length>0){
		nomeAdv = resultadoA.values[0].NOME.trim();
	}else{
		nomeAdv="";
	}//if resultadoA	
//--	
if (titlePreservado != "") titlePreservado = ' ('+titlePreservado+')';
//--
//console.log("linha 2841 jobTotal e perc "+jobTotal+" / "+perc);
concatena=concatena+'<tr><td  style="'+estiloPreservado+'" title="'+nomeAdv+titlePreservado+'">'+siglaObj+'</td><td>'+percFormatado+'</td>'+
'<td><input type="text" class="form-control claRARateioReal" value="'+percFormatado+'"></td>'+
'<td id="'+siglaObj+'" class="claValorAdv">'+jobTotal*perc+'</td>'+
'<td><button type="button" id="'+siglaObj+'" class="btn btn-danger claBtnNLRARemover" title="Remover este advogado">x</button></td></tr>';
}//if perc > 0
nomeAdv="";
indiceApr++;
});//arrayObjs foreach
//-------------------------------------------------------------------------------/A
//---------------------------------------------------------------------X
//se só tem consultor na criação do ojbeto do bloco A, então...
//...insere para o BP Captador 100%, porque tem de ter um rateio pelo menos e zero...
//...(como era o resultado de todos os consultores) não é considerado como rateio
//console.log("linha 1442, só tem consultor: ",intSoTemConsultor);
//console.log("linha 1443, qtd: ",qtd);
if(intSoTemConsultor==1){
	let faturaLida = jQuery("#idHidNLREFaturaSelecionada").val();
	let jobLinha = jQuery("#idHidNLREJobSelecionado").val();
	let capNota = jQuery("#idHidNLREBPSelecionado").val();
	let casoLido = jQuery("#idHidNLREFileSelecionado").val();
	let escritorioLido = jQuery("#idHidNLREEscritorioSelecionado").val();
	let recebimentoLido = jQuery("#idHidNLRERecebSelecionado").val();
	//---
	 let arrayCampos=[];
		arrayCampos.push(faturaLida);
		arrayCampos.push(casoLido);
		arrayCampos.push(escritorioLido);
		arrayCampos.push(recebimentoLido);
		arrayCampos.push(capNota);
		arrayCampos.push("1");
		arrayCampos.push(jobLinha);
		arrayCampos.push(capNota);
		arrayCampos.push(new Date().toLocaleDateString());
		arrayCampos.push(indiceApr.toString());
		//console.log("O que vai para o insert linha 1382",arrayCampos);
		let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_insert_avanc",arrayCampos,null,null);
		//depois da inserção, faz uma leitura
		let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
		//console.log("booTemPreservacao",booTemPreservacao);
		if(!booTemPreservacao){
			//NÃO TEM PRESERVAÇÃO, VAI PELAS VIAS NORMAIS
		 let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		   if(resultadoR.values.length>0){
		   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
		   }
		}//if !booTemPreservacao
}//if intSohTemConsultor
//--------------------------------------------------------------------/X
if(qtd==0){
if (globalArrayNLRAFilesMinhaResponsa.includes(casoLido)){
	//se o file em questão foi tranferido para mim, substitui o BP lido para mim	
	//console.log("Vai trocar o bp de "+bpLido+" para "+jQuery("#idHidNLREBPNaMaquina").val()+" porque não tem timesheet e este bp é o substituto");
	bpLido=jQuery("#idHidNLREBPNaMaquina").val();
}
//---
concatena=concatena+'<tr><td colspan="5">Não há timesheet para a fatura '+faturaLida+'</td></tr>';
concatena=concatena+'<tr><td>'+bpLido+'</td><td>100,00</td>'+
'<td><input type="text" class="form-control claRARateioReal" value="100"></td>'+
'<td id="'+bpLido+'" class="claValorAdv">'+jobTotal+'</td>'+
'<td><button type="button" id="'+bpLido+'" class="btn btn-danger claBtnNLRARemover" title="Remover este advogado">x</button></td></tr>';
}//if qtd
concatena=concatena+'<tr><td colspan="2"><span id="idSpaRASomaIndevida"></span></td><td><span id="idSpaRASomaPercentual"></span></td>'+
'<td><button type="button" class="btn btn-danger claBtnRAReset" title="Este botão refaz do início as sugestões de rateio">Reset</button></td>'+
'<td title="Marcando esta caixa, este rateio indicado se repetirá em faturamentos futuros no file ('+casoLido+') em questão"><label class="claLblPreserva"><label class="claLblPreserva"><input type="checkbox" class="claChkPreservaRateio" value="1"  data-numerofile ="'+casoLido+'" '+
'>&nbsp;Preservar rateio</label></td></tr>';
concatena=concatena+'<tr><td><button type="button" class="AttListaCaptador claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
'data-tagcasodet="'+casoLido+'">Ver detalhes dos timesheets</button></td><td><button type="button" class="executar claRateioConfirma" data-tagfatrat="'+faturaLida+'" '+
'data-tagescrrat="'+escritorioLido+'" data-tagcasorat="'+casoLido+'">Salvar o rateio</button></td><td><span id="idSpaRASomaJob"></span></td></tr>';
/*
concatena=concatena+'<td colspan="3"></td><td><button type="button" class="btn btn-info claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
'data-tagcasodet="'+casoLido+'">Ver detalhe dos TS</button></td></tr>';
*/
concatena=concatena+'</tbody>';
objTab.append(concatena);
if(qtd==0){
	//console.log("Linha 1499 vai preencher o alerta");
jQuery("#idSpaRASomaJob").text("Não há timesheets. Posto 100% para o Captador: "+new Date().toLocaleString());
jQuery("#idSpaRASomaJob").css({"color":"red"});
}else{
	jQuery("#idSpaRASomaJob").text("Feito/Refeito com base nos timesheets existentes");
	jQuery("#idSpaRASomaJob").css({"color":"blue"});
}//if qtd
fSomaPercentuaisNLE();
	}//if booTemPreservacao
//fPulaParaElementoRANLE('idArtNLREExtra');
}//fInauguraSugestoesNLE
//--------------------------------------
function fPegaBPNaMaquinaNLE(){	

}//fPegaBPNaMaquinaNLE
//------------------------------------------------------
function fPesquisaRateiosFeitos(dataInicial,dataFinal,advogado){
	let objTab = jQuery("#idTabRTRateio");
	objTab.empty();
	let objTabRes = jQuery("#idTabRTResumo");
	objTabRes.empty();
	let objTabAmos = jQuery("#idTabRTAmostra");
	objTabAmos.empty();
	let objSpa = jQuery("#idSpaRTPeriodo");
	objSpa.text("Período de "+dataInicial+" a "+dataFinal);
	//---
	let objResumo = [];
	//---
	let concatena = '<thead><tr><th>Advogado</th><th>Perc</th><th>Valor</th><th>Captador</th><th>Cliente</th>';
	concatena=concatena+'<th>Pasta</th><th>Matéria</th><th>Fatura</th><th>Escritório</th></tr></thead><tbody>';
	let concatenaRes = '';
	let concatenaCSV="Período: "+dataInicial+" a "+dataFinal+"\r\n";
	concatenaCSV = concatenaCSV + "Advogado;Perc;Valor;Captador;Cliente;Pasta;Matéria;Fatura;Escritório\r\n";
	let c1 = DatasetFactory.createConstraint("RECEBIMENTO",dataInicial,dataFinal,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("ADVOGADO",advogado,advogado,ConstraintType.MUST); 
	let arrayConstraints=[c1];
	if(advogado != '-1'){
		arrayConstraints.push(c2);
	}//if advogado
	//console.log("arrayConstraints",arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateiosfeitos",null,arrayConstraints,null);
	//console.log("resultado",resultado);
	let i=0;
	let totalTabela=0;
	for(i;i<resultado.values.length;i++){
		let adv = resultado.values[i].ADV_RATEADO;
		let perc = resultado.values[i].PERCENTADV;
		let valor = resultado.values[i].VLRATEADO;
		let captador = resultado.values[i].CAPTADOR;
		totalTabela = totalTabela+valor*1;
		let cliente = resultado.values[i].RAZAO_SOCIAL;
		let pasta = resultado.values[i].PASTA;
		let materia = resultado.values[i].TITULO;
		let fatura = resultado.values[i].FATURA;
		let escritorio = resultado.values[i].ESCRITORIO;
		let perc_BR = (perc*100).toLocaleString('pt-BR'); 
		let valor_BR = (valor*1).toLocaleString('pt-BR'); 
		concatenaCSV = concatenaCSV + adv+";"+perc_BR+";"+valor_BR+";"+captador+";"+cliente+";"+pasta+";"+materia+";"+fatura+";"+escritorio+"\r\n";
		//---somando se encontrar o adv beneficiário para resumo total---A
		let j=0;
		let intAchou=0;
		for(j;j<objResumo.length;j++){
			let siglaLida = objResumo[j].sigla;//dentre as siglas do array esta sigla da vez existe?
			//console.log("SiglaLida e adv",siglaLida+"/"+adv);
			if(siglaLida==adv){
				//sim, existe
				intAchou=1;
				objResumo[j].valor = objResumo[j].valor + valor*1;
				j=objResumo.length;//para pular fora
			}//if siglaLida
		}//for j
		//console.log("IntAchou",intAchou);
		if(intAchou==0){
			//não existe a sigla no totalizador.
			objResumo.push({"sigla":adv,"valor":valor*1});
			//console.log("Entrou para criar",adv);
		}//if intAchou
		//----------------------------------------------------------------/A
		concatena = concatena+'<tr><td>'+adv+'</td><td>'+perc*100+'</td><td style="text-align:right;">'+valor+'</td><td>'+captador+'</td><td>'+cliente+'</td>';
		concatena=concatena+'<td>'+pasta+'</td><td>'+materia+'</td><td>'+fatura+'</td><td>'+escritorio+'</td></tr>';
	}//for i
	concatena=concatena+'<tr><td>Total geral</td><td></td><td>'+(totalTabela*1).toFixed(2)+'</td><td colspan="5"></td></tr>';
	concatenaCSV=concatenaCSV+"Total geral;;"+(totalTabela*1).toLocaleString('pt-BR')+"\r\n";
	//---agora que terminou a parte da tabela, preencher o resumo dos valores
	concatenaRes=concatenaRes+'<thead><tr><th>Sigla</th><th>Valor total rateado</th></tr></thead><tbody>';
	let totalResumo=0;
	concatenaCSV = concatenaCSV + "\r\n";
	concatenaCSV = concatenaCSV + "RESUMO GERAL\r\n";
	objResumo.forEach(function (arrayItem) {
	    let siglaObj = arrayItem.sigla;
	    let valorObj = arrayItem.valor;
	    let valorObjBR = (valorObj).toLocaleString('pt-BR'); 
	    totalResumo = totalResumo+valorObj*1;
	    //console.log("valorObj",valorObj);
	    concatenaRes=concatenaRes+'<tr><td>'+siglaObj+'</td><td style="text-align:right;">'+(valorObj*1).toFixed(2)+'</td></tr>';
	    concatenaCSV = concatenaCSV + siglaObj+";"+valorObjBR+"\r\n";
	});
	concatenaRes=concatenaRes+'<tr><td>Total do Resumo</td><td style="text-align:right;">'+(totalResumo*1).toFixed(2)+'</td></tr>';
	concatenaCSV=concatenaCSV+"Total do Resumo;"+(totalResumo*1).toLocaleString('pt-BR')+"\r\n";
	concatena = concatena + '</tbody>';
	concatenaRes = concatenaRes + '</tbody>';
	objTab.append(concatena);
	objTabRes.append(concatenaRes);
	//---csv
	let meuRotulo='Clique aqui para baixar o arquivo csv para o Excel';
	let objExportar=jQuery("#idPRTExportarCSV");
	objExportar.text('');//se for um elemento que aceite text como propriedade
	var universalBOM = "\uFEFF";
	 let a = document.createElement('a');
	    a.href        = 'data:attachment/csv; charset=utf-8,' +  encodeURIComponent(universalBOM+concatenaCSV);
	    a.style = 'color:blue;font-weight:bold;border-style:solid;border-width:1px;';
	    a.target      = '_blank';
	    a.innerText   = meuRotulo;
	    a.download    = 'umNomeParaOArquivo.csv';
	    objExportar.html(a);
//-------------------------------BLOCO DA AMOSTRAGEM
	    let cA1 = DatasetFactory.createConstraint("DATA_BUSCA",dataInicial,dataFinal,ConstraintType.MUST);
	    let cA2 = DatasetFactory.createConstraint("RESUMO",'1','1',ConstraintType.MUST);//UM VALOR POSITIVO QUALQUER
	    let arrayConstraintsAmostra =[cA1,cA2];
	    let resultadoAmostra = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_avanc",null,arrayConstraintsAmostra,null);
	    //console.log('resultadoAmostra',resultadoAmostra);
	    let qtdAmostra = resultadoAmostra.values.length;
	    let j = 0;
	    let concatenaAmostra='<thead><tr><th>BP CAPTADOR</th><th>SUBSTITUTO (ORIGINAL UCRG)</th><th>QUANTIDADE DE FATURAS</th></tr></thead><tbody>';
	    for (j;j<qtdAmostra;j++){
	    	let itens = resultadoAmostra.values[j].QTD;
	    	let captador = resultadoAmostra.values[j].ORIGINAL;
	    	let rateador = resultadoAmostra.values[j].RATEADOR;
	    	 concatenaAmostra=concatenaAmostra+'<tr><td>'+captador+'</td><td>'+rateador+'</td><td>'+itens+'</td></tr>';
	    }//for j
	    concatenaAmostra=concatenaAmostra+'</tbody>';
	    objTabAmos.append(concatenaAmostra);
	//console.log("objResumo",objResumo);
}//fPesquisaRateiosFeitos
//------------------------------------------------------
function fCarregaDelegacaoNLE(emailBP){
	//esta função vai na tabela de bps substitutos e carrega nas variáveis globais
	globalArrayNLRAFilesMinhaResponsa=[];//zera os antigos
	globalArrayNLRAFilesDeleguei=[];//zera os antigos
	globalNaMaquina=emailBP.toUpperCase();//ativado para teste
	let c1 = DatasetFactory.createConstraint("EMAIL",emailBP,emailBP,ConstraintType.MUST);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	//console.log("arrayConstraints dento de fCarregaDelegacaoNLE",arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
	let siglaBP = resultado.values[0].COD_ADVG.trim();
		//-----------------------------	
		jQuery("#idHidNLREBPNaMaquina").val(siglaBP);
		//--------------------Carregando no array global files que foram atribuídas a mim
		let s1 = DatasetFactory.createConstraint("BP_SUBST",siglaBP,siglaBP,ConstraintType.MUST);
		let s2 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
		let s3 = DatasetFactory.createConstraint("INT_OPER","5","5",ConstraintType.MUST);
		let arrayConstraintsS=[];
		arrayConstraintsS.push(s1);
		arrayConstraintsS.push(s2);
		arrayConstraintsS.push(s3);
		let resultadoS = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsS,['PASTA']);
		let qtdS=resultadoS.values.length;
		if(qtdS>0){
		let i=0;
		for(i;i< qtdS;i++){
			globalArrayNLRAFilesMinhaResponsa[i]=resultadoS.values[i].PASTA;
		}//for i
		}//if qtdS
		//console.log("globalArrayNLRAFilesMinhaResponsa",globalArrayNLRAFilesMinhaResponsa);
		//--------------------Carregando no array global de files que eu deleguei para outro
		let d1 = DatasetFactory.createConstraint("BP_ORIGEM",siglaBP,siglaBP,ConstraintType.MUST);
		let d2 = DatasetFactory.createConstraint("ATIVO_BUSCA","1","1",ConstraintType.MUST);
		let d3 = DatasetFactory.createConstraint("INT_OPER","4","4",ConstraintType.MUST);
		let arrayConstraintsD=[];
		arrayConstraintsD.push(d1);
		arrayConstraintsD.push(d2);
		arrayConstraintsD.push(d3);
		let resultadoD = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",null,arrayConstraintsD,['PASTA']);
		let qtdD=resultadoD.values.length;
		if(qtdD>0){
		let j=0;
		for(j;j< resultadoD.values.length;j++){
			globalArrayNLRAFilesDeleguei[j]=resultadoD.values[j].PASTA;
		}//for j
		}//if qtdD
		//console.log("globalArrayNLRAFilesDeleguei",globalArrayNLRAFilesDeleguei);
		//--------------------
}//fCarregaDelegacaoNLE
//-------------------------------------------------
function fVerificaStatusRateioNLE(fatura,pasta,escritorio,receb){
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let c4 = DatasetFactory.createConstraint("RECEB",receb,receb,ConstraintType.MUST);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	arrayConstraints.push(c2);
	arrayConstraints.push(c3);
	arrayConstraints.push(c4);
	//console.log("Dentro de fVerificaStratusRateioNL",arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateiosfeitos_avanc",null,arrayConstraints,null);
	let i=0;
	let somaPercentual=0;
	let legenda="a";//default a, de a fazer
	let qtd = resultado.values.length;
	for(i;i<qtd;i++){
		let percentAdv=resultado.values[i].PERCENTADV;
		let percentNum = percentAdv.replace(/,/,".");
		somaPercentual = somaPercentual+percentNum*1;
	}//for i
	//console.log("Soma percentual da fatura "+fatura, somaPercentual);
	if (Math.abs(somaPercentual)>0.99) legenda='c';
	if (Math.abs(somaPercentual)<0.99) legenda='a';
	/*if(qtd==0) legenda="<img src='/w_ucrg_nlequipe/resources/images/multiplicar.png' height='20' width='20'/>";//não fez nada
	if(1 - somaPercentual < 0.01) legenda="<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>";//se a diferença for irrisória, considera feito
	if(1 - somaPercentual ==0 ) legenda="<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>";//completa, 100%=1
	if(1 - somaPercentual != 1 && legenda != "<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>") legenda = 'i';//se não for 100%=1 e estiver fora da tolerância acima
	*/
	//console.log("legenda",legenda+" "+somaPercentual);
	return legenda;
}//fVerificaStatusRateioNLE
//--------------------------------------------------------
function fRecalculaProporcaoRateioNLE(arrayObjAdvsRateios){
	//console.log("Entrou em fRecalculaProporcaoRateioNLE");
	//A primeira propriedade do objeto acima é o do advogado da inserção,...
	//...o da prioridade de cálculo
	//---
	//esta função serve para sugerir uma redistribuição do rateio vigente...
	//...automaticamente quando o BP insere um advogado que não faz parte...
	//...da lista de timesheets capturados
	//A ideia é pegar o valor total do job execução da nota e fazer dele a base...
	//...para prioritária para aplicar percentual do advogado inserido.
	//...Assim, o saldo financeiro do total do job execução, menos a parte...
	//...prioritária (o que foi dado em valor ao advogado novo) será a base...
	//...para aplicar os percentuais dos advogados originais, no valor original de...
	//...seus percentuais.
	//-----------------------------------------
	let fatu = jQuery("#idHidNLREFaturaSelecionada").val();
	let pasta = jQuery("#idHidNLREFileSelecionado").val();
	let escri = jQuery("#idHidNLREEscritorioSelecionado").val();
	let receb = jQuery("#idHidNLRERecebSelecionado").val();	
	let bp = jQuery("#idHidNLREBPSelecionado").val();
	let dataAtual = new Date().toLocaleDateString();
	let jobTotal=jQuery("#idHidNLREJobSelecionado").val();
	//-------------------insere na tabela de sugestão o advogado que está entrando
	let objTab = jQuery("#idTabNLRENLRA");//esta tabela não pode ser limpa
	//---lê a tabela os dados existentes antes da inclusão do novo advogado para preservar os outros advs
	let arraySiglas=[];//para guardar a leitura do que existe originalmente
	let arrayPerc=[];//idem
	let indice=0;
	jQuery('#idTabNLRENLRA tr').each(function() {
		let siglaAdv = jQuery(this).find("td").eq(0).html();
		let efetivo = jQuery(this).find("td").eq(2).find("input[type='text']").val();
		arraySiglas[indice]=siglaAdv;
		arrayPerc[indice]=efetivo;
		indice++;
	});
	//---preservado no array, limpar a tabela
	objTab.empty();
	//----de posse dos dados preservados, inserir o bp novo no array
	arrayObjAdvsRateios.forEach(function (elemento,indice,proprioArray){
		let adv = elemento.adv;
		let perc = elemento.perc;
			arraySiglas[indice]=adv;
			arrayPerc[indice]=perc;
	});//foreach
//---------------------agora que tenho os arrays com os antigos e com o novo, refazer a tabela de sugestão
	let concatena='<thead><tr><th>ADV</th><th>SUGESTÃO (%)</th>'+
	'<th>EFETIVO (%)</th><th title="O job proporcional aparece, primeiramente, com o valor original da nota. Se houver modificação no líquido, o job se ajustará ao sair do campo do percentual efetivo">JOB PROPORCIONAL (R$)</th><th title="Retira o rateio feito para o advogado da linha">Remover</th></tr></thead><tbody>';
	let a=0;
	let valorPrioritario=0;
	let sobra=0;
	for(a;a<arraySiglas.length;a++){
		//---a primeira passagem é a prioritária
		//console.log("arrayPerc[a] na linha 3057",arrayPerc[a]+" e valor de a: "+a);
		if(a==0){
		valorPrioritario = arrayPerc[a]/100*jobTotal;
		//console.log("valor prioritário na passagem "+a+" :"+valorPrioritario+" jobTotal: "+jobTotal);
		//--a pedido do RBM, não é para recalcular (email de 12/12/2022)
		//sobra = jobTotal*1-valorPrioritario*1;//a pedido do RBM, não é para recalcular (email de 12/12/2022)
		sobra = jobTotal*1;//ativado para atender ao RBM
		//---
		concatena=concatena+'<tr><td>'+arraySiglas[a]+'</td><td>'+arrayPerc[a]+'</td>'+
		'<td><input type="text" class="form-control claRARateioReal" value="'+arrayPerc[a]+'"></td>'+
		'<td id="'+arraySiglas[a]+'" class="claValorAdv">'+valorPrioritario+'</td>'+
		'<td><button type="button" id="'+arraySiglas[a]+'" class="btn btn-danger claBtnNLRARemover" title="Remover o advogado desta linha e o seu percentual">x</button></td></tr>';
		}else{
			let vlr = arrayPerc[a]/100*sobra;
			//console.log("vlr na linha 3067",vlr);
			if(!isNaN(vlr)){
				if(vlr*1>0){
			//console.log("vlr na passagem "+a+" :"+vlr);
				let novoPerc=vlr/jobTotal*100;
				//console.log("Novo percentual de "+arraySiglas[a]+": "+novoPerc+" jobTotal: "+jobTotal);
			concatena=concatena+'<tr><td>'+arraySiglas[a]+'</td><td>'+arrayPerc[a]+'</td>'+
			'<td><input type="text" class="form-control claRARateioReal" value="'+novoPerc.toString()+'"></td>'+
			'<td id="'+arraySiglas[a]+'" class="claValorAdv">'+vlr+'</td>'+
			'<td><button type="button" id="'+arraySiglas[a]+'" class="btn btn-danger claBtnNLRARemover" title="Remover o advogado desta linha e o seu percentual">x</button></td></tr>';
				}//if vlr*1 > 0
			}//if !isNaN
		}//if a==0
	}//for a
	concatena=concatena+'<tr><td colspan="2"><span id="idSpaRASomaIndevida"></span></td><td><span id="idSpaRASomaPercentual"></span></td>'+
	'<td><button type="button" class="btn btn-danger claBtnRAReset" title="Este botão refaz do início as sugestões de rateio">Reset</button></td>'+
	'<td title="Marcando esta caixa, este rateio indicado se repetirá em faturamentos futuros no file  como sugestão permanente ('+pasta+') "><label class="claLblPreserva"><input type="checkbox" class="claChkPreservaRateio" value="1" data-numerofile ="'+pasta+'" '+
	'>&nbsp;Preservar rateio</label></td></tr>';
	concatena=concatena+'<tr><td><button type="button" class="AttListaCaptador claRateioDetalhe" data-tagfadet="'+fatu+'" '+
	'data-tagcasodet="'+pasta+'">Ver detalhes dos timesheets</button></td><td><button type="button" class="executar claRateioConfirma" data-tagfatrat="'+fatu+'" '+
	'data-tagescrrat="'+escri+'" data-tagcasorat="'+pasta+'">Salvar o rateio</button></td><td><span id="idSpaRASomaJob"></span></td></tr>';
	objTab.append(concatena);
}//fRecalculaProporcaoRateioNLE
//------------------------------------------
function fDeletaRateiosInvalidosNLE(){
	//deleta rateios que têm zero nos campos
	 //----deletando este advogado na custom_apa.ZJOBCLIENT que tiver esses dados
	   let d1 = DatasetFactory.createConstraint("FLAG","2","2",ConstraintType.MUST);
	   let arrayConstraintsD=[];
	   arrayConstraintsD.push(d1);
	  //console.log("Array para deletar ADVOGADO",arrayConstraintsD);
	   let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_deleterateio_avanc",null,arrayConstraintsD,null);
}//fDeletaRateiosInvalidosNLE
//------------------------------------------------------
function fRefazOStatusTabelaPrincipalNLE(){
	//para não recarregar a tabela principal toda a vez que um rateio é feito para mostar a coluna '?' 
	//com o status verdadeiro, forço uma atualização 'fake' só mostrando o símbolo alterado diretamente na tabela,
	//sem consultar a tabela de rateios para isto
	let fileVez=jQuery("#idHidNLREFileSelecionado").val();
	let jobVez=jQuery("#idHidNLREJobSelecionado").val();
	 jQuery('#idTabNLRENL tr').each(function() {
		  let file = jQuery(this).find("td").eq(11).html();
		  let job  = jQuery(this).find("td").eq(7).html();
		  if(typeof job !=="undefined"){
		  job = job.replace(/\./g,"");
		  job = job.replace(/,/g,".");
		  }
		//console.log("file e job, comparado om file e job da vez ",file+" "+job+" "+fileVez+" "+jobVez);
		  if(file==fileVez && job == jobVez){
			  jQuery(this).find("td").eq(1).css({"background-color":"#f3ffe8"});
			  jQuery(this).find("td").eq(1).html("");
			  //jQuery(this).find("td").eq(1).html("<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>");
			  jQuery(this).find("td").eq(1).attr("title","Rateio completo. Terminado");
		  }//if file
	 });//each
}//fRefazOStatusTabelaPrincipalNLE
//----------------------------------------------------
function fExecutaPesquisaPrincipalNLE(){
	//limpa as tabelas  de detalhe
	//---
	jQuery("#idH3NLRotuloTabela").show();
	jQuery("#idDivNLRAMensagem").hide();
	jQuery("#idArtNLREExtra").hide();
	jQuery("#idArtNLRADET").hide();
	jQuery("#idArtNLRETransf").hide();
	jQuery("#idH3NLREROTULOPESQUISA").text('');
	jQuery("#idSpaAvisosNLRE").text('');
	let objTab=jQuery("#idTabNLRENLRA");
	objTab.empty();
	//jQuery("#idH3NLREDETROT").text("");
	let objTabD=jQuery("#idTabNLRENLDET");
	objTabD.empty();
	//--
	jQuery("#idTabNLTRANSF").empty();
	//--
	jQuery("#idHidNLREFaturaSelecionada").val('-1');
	   jQuery("#idHidNLREEscritorioSelecionado").val('-1');
	   jQuery("#idHidNLREJobSelecionado").val('-1');
	//------------------------
	let dataPesquisaI=jQuery("#idDatNLREDAI").val();
	let dataPesquisaF=jQuery("#idDatNLREDAF").val();
	//---data reformatada pt-BR
	let dataFormatadaI=fReformataDataBR(dataPesquisaI);
	let dataFormatadaF=fReformataDataBR(dataPesquisaF);
	//---
	let sc = fDescobreLogadoNLE(WCMAPI.userEmail);
	//recarrega as delegações
	//fCarregaDelegacaoNLE(WCMAPI.userEmail.toUpperCase());//inibido para teste
	fCarregaDelegacaoNLE(globalNaMaquina);//ativado para teste
	//------------
	//console.log("SÓCIO ENCONTRADO",sc);
	//---
	let fatura=jQuery("#idTxtNLREFatura").val();
	if(fatura=='') fatura = "-1";
	//---
	let faturaAvi = "Fatura: "+fatura;
	if(fatura == '-1'){
	faturaAvi ='(Sem indicação de fatura)';
	}//if fatura
	//---
	let SCAvi = "para "+sc;
	if(sc == '-1'){
	SCAvi ='(Sem SC definido)';
	}//if fatura
	//---'
	if(dataPesquisaI.length==10){
		jQuery("#idSpaAvisosNLRE").text("Dados referentes ao período de "+dataFormatadaI+" a "+dataFormatadaF+", "+faturaAvi+", "+SCAvi);
		fCompoeTabelaNLRE(dataPesquisaI,dataPesquisaF,fatura,sc);
	}else{
		alert ("A data é obrigatória");
	}//if dataPesquisa
	/*
	}else{
		alert ("As datas têm de estar dentro de um mmesmo mês em cada ano");
	}
	*/
}//fExecutaPesquisaPrincipalNLE
//-----------------------------------------------------------
function fEncapsulaDatasetNLE(dataset, fields, constraints, sorters){
	/**
	 * https://forum.fluig.com/5865-async-await-para-recuperar-informacao-de-dataset
	 * Pega um dataset
	 *
	 * Wrapper para tornar a DatasetFactory.getDataset em Promise.
	 *
	 * @param {string} dataset Nome do Dataset
	 * @param {string[]} fields Campos para retornar (pode ser null pra retornar todos)
	 * @param {Constraint[]} constraints Os filtros a aplicar ou null se não filtrar nada
	 * @param {string[]} sorters Campos para ordenar ou null para não ordenar. Pode colocar ;desc no campo para ordenar decrescente
	 * @returns {Promise} Resolve com o objeto dataset {columns: string[], values: string[]}
	 */
	    return new Promise(function (resolve, reject) {
	        DatasetFactory.getDataset(
	            dataset,
	            fields,
	            constraints,
	            sorters,
	            {
	                success: function(data){resolve(data)},
	                error: function() {reject(arguments)}
	            }
	        );
	    });
}//fEncapsulaDatasetNLE
//----------------------------
function fTxtPlotaTabelaNLE(ordem,concatena,intTrancaRateio,estiloDelegado, titleDelegado,estiloRateio,txtRotuloRateio,txtRateioFeito,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,estiloMoeda,titleMoeda,brutoFormatado,liqFormatado,jobFormatado,emiLido,mateLida,estiloCap,titleCap,areaLida,obs,siglaMult,liquidoEspec,jobEspec,editor,dataUltima){
	//---
	obs=casoLido;
	if(siglaMult != "") capLido=siglaMult;
	//---
	//console.log ("txtRateioFeito - linha 1627", txtRateioFeito);
	let imagemStatus='';
	if(txtRateioFeito=='a'){
		txtRotuloRateio="Pendente";
		imagemStatus="<img src='/w_ucrg_nlequipe/resources/images/multiplicar.png' height='20' width='20'/>";
	}
	if(txtRateioFeito=='c'){
		txtRotuloRateio="Concluído";
		imagemStatus="<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20'/>";

	} 
			if(intTrancaRateio==0){
		concatena=concatena+'<tr><td>'+(ordem+1)+'</td><td style="'+estiloRateio+'" title="'+txtRotuloRateio+'">'+imagemStatus+'</td><td>'+clieLido+'</td><td><button type="button" class="claBtnFaturaRA" '+
		'data-tagcliente = "'+clieLido+'" data-tagfatura = "'+fatuLida+'" data-tagescritorio = "'+escritorio+'" '+
		'data-tagreceb="'+recebLido+'" data-tagcaso="'+casoLido+'" data-tagjobespec = "'+jobEspec+'" data-tagjob="'+jobFormatado+'" data-tagbp="'+capLido+'" title="Para fazer o rateio desta fatura ou transferi-la para outro SC fazê-lo">Ratear/Transferir '+fatuLida+'</button></td>';
		}else{
			//Não carrega o botão de fazer o rateio. Também não mostra o botão de verificar quem fez a transferência (se for captador múltipo)
			obs='<button type="button" id="'+casoLido+'" class="btn btn-danger claBtnNLRADelegado" data_tagcasolido="'+casoLido+'" data_tagclilido="'+clieLido+'" data-matfil="'+mateLida+'" title="Caso delegado a outro BP">'+casoLido+'</button>';
			concatena=concatena+'<tr><td>'+(i+1)+'</td><td style="'+estiloRateio+'" title="'+txtRotuloRateio+'"><img src="/w_ucrg_nlequipe/resources/images/seta-dupla.png" height="20" width="20"></td><td>'+clieLido+'</td><td>'+fatuLida+'</td>';
		}//if intTrancaRateio
	//console.log("linha 1623",obs+" "+obs.length);
		concatena=concatena+'<td>'+recebLido+'</td>';
		//---------------------BOTÃO DE TRANSFERÊNCIA DA NOTA EXCLUSIVAMENTE -------------F
		//concatena=concatena+'<td class="claAlinhaDireita" style="'+estiloMoeda+'" title="'+titleMoeda+'">'+brutoFormatado+'</td>';
		concatena=concatena+'<td><button id="'+fatuLida+'" class="btn btn-sm claNLTransf" title="Este botão transfere somente esta fatura "'+fatuLida+' para outro BP" ';
		concatena=concatena+'data-tbruto="'+brutoFormatado+'" data-tfatura="'+fatuLida+'" data-tfile="'+casoLido+'" ';
		concatena=concatena+'data-tcap="'+capLido+'"';
		concatena=concatena+'data-tescr="'+escritorio+'" data-treceb="'+recebLido+'">Transferir este valor: '+brutoFormatado+'</button></td>';

		//-------------------------------------------------------------------------------/F
		concatena=concatena+'<td class="claAlinhaDireita">'+parseFloat(liqFormatado).toFixed(2)+'</td>';
		concatena=concatena+'<td class="claAlinhaDireita">'+parseFloat(jobFormatado).toFixed(2)+'</td>';
		concatena=concatena+'<td class="claAlinhaDireita">';
		concatena=concatena+'<button type="button" class="btn btn-warning claBtnEspecial" ';
		concatena=concatena+'data-fatesp = "'+fatuLida+'" data-casoesp="'+casoLido+'" ';
		concatena=concatena+'data-escesp="'+escritorio+'" data-recesp="'+recebLido+'" ';
		concatena=concatena+'data-liqesp="'+liquidoEspec+'" data-ultimo ="'+editor+'" ';
		concatena=concatena+'data-dataultima ="'+dataUltima+'" ';
		concatena=concatena+'title="Ajusta manualmente o valor líquido e, consequentemente, ';
		concatena=concatena+'o valor do job" >'+parseFloat(liquidoEspec).toFixed(2)+'</button></td>';
		concatena=concatena+'<td class="claAlinhaDireita">'+parseFloat(jobEspec).toFixed(2)+'</td>';
		concatena=concatena+'<td style="'+estiloCap+' '+estiloDelegado+'" title="'+titleCap+' '+titleDelegado+'">'+capLido+'</td><td style="'+estiloCap+'" title="'+titleCap+'">'+emiLido+'</td><td>'+areaLida+'</td>'+
		'<td style="'+estiloDelegado+'" title="'+titleDelegado+'">'+obs+'</td>'+
		'<td>'+mateLida+'</td></tr>';
		return concatena;
}//fTxtPlotaTabelaNLE
//------------------------------------------
function fTxtPlotaCSVNLE(concatenaCSV,clieLido,capLido,fatuLida,escritorio,recebLido,casoLido,brutoFormatado,liqFormatado,jobFormatado,liquidoEspec,jobEspec,emiLido,mateLida,estiloCap,titleCap,areaLida){
	//console.log("fTxtPlotaCSVNLE",liquidoEspec+" "+jobEspec);
	liquidoEspec = liquidoEspec.toString().replace(/\./,",");
	concatenaCSV=concatenaCSV+clieLido+";"+fatuLida+";"+recebLido+";"+brutoFormatado+";"+liqFormatado+";"+jobFormatado+";"+liquidoEspec+";"+jobEspec+";"+capLido+";"+emiLido+";"+areaLida+";"+casoLido+";"+mateLida+"\r\n";
	return concatenaCSV;
}//fTxtPlotaCSVNLE
//------------------------------------------
function fTxtMultiploCaptadorPercentualNLE(recebLido,casoLido){
	let concatenaBP="";
	let g1 = DatasetFactory.createConstraint("RECEB",recebLido,recebLido,ConstraintType.MUST);
	let g2 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
	let arrayConstraintsG=[];
	arrayConstraintsG.push(g1);
	arrayConstraintsG.push(g2);
	//console.log('arrayConstraintsG',arrayConstraintsG);
	let resultadoG=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_captamultiplo_avanc",null,arrayConstraintsG,null);
	if(resultadoG.values.length>1){
		//têm pelo menos dois, pois fiz o teste sendo > 1
		let g=0;
		for(g;g<resultadoG.values.length;g++){
			let bpG=resultadoG.values[g].BP;
			let percG=resultadoG.values[g].PARTICIPACAO;
			concatenaBP = concatenaBP + " "+bpG+"="+percG+"%";
		}//for g
	}//if resultadoG > 1
	return concatenaBP;
}//fTxtMultiploCaptadorPercentualNLE
//---------------------------------------------
function fTxtPegaNomeMoedaNLE(moeda){
	let nomeMoeda="";
	switch(moeda){
	case "U":
		nomeMoeda="US$";
		break;
	case "E":
		nomeMoeda="\u20AC";
	break;
	case "L":
		nomeMoeda="\u00a3";
	break;
	case "I":
		nomeMoeda="	\u00a5";
	break;
	}//switch
	return nomeMoeda;
}//fTxtPegaNomeMoedaNLE
//--------------------------------------
function fDSConverteParaRealNLE(fatuLida,recebLido,escritorio){
	//é faturamento em moeda estrangeira. O dataset vai converter para real
	let m1 = DatasetFactory.createConstraint("FATURA",fatuLida,fatuLida,ConstraintType.MUST);
	let m2 = DatasetFactory.createConstraint("RECEB",recebLido,recebLido,ConstraintType.MUST);
	let m3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let arrayConstraintsM=[];
	arrayConstraintsM.push(m1);
	arrayConstraintsM.push(m2);
	arrayConstraintsM.push(m3);
	//console.log("arrayConstraintsM",arrayConstraintsM);
	let resultadoM = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_moedas",null,arrayConstraintsM,null);
	//console.log('resultadoM',resultadoM);
	return resultadoM;
	//console.log('brutoLido dentro da moeda estrangeira',brutoLido);
}//fDSConverteParaRealNLE
//------------------------------------------
function fDSPegaBrutoOutroNLE(recebLido,fatuLida,codCliente,escritorio){
	let p1=DatasetFactory.createConstraint("DATA_BUSCA",recebLido,recebLido,ConstraintType.MUST);
	let p2=DatasetFactory.createConstraint("FATURA",fatuLida,fatuLida,ConstraintType.MUST);
	let p3=DatasetFactory.createConstraint("COD_CLIENTE",codCliente,codCliente,ConstraintType.MUST);
	let p4=DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let arrayConstraintsP=[];
	arrayConstraintsP.push(p1);
	arrayConstraintsP.push(p2);
	arrayConstraintsP.push(p3);
	arrayConstraintsP.push(p4);
	let resultadoP=DatasetFactory.getDataset("ds_ucrg_notasliq_parcelado_avanc",null,arrayConstraintsP,null);
	return resultadoP;
}//fDSPegaBrutoOutroNLE
//--------------------------------------------
function fTxtConcatenaCaptadorMultiploSiglaNLE(recebLido,pasta){
	let c1 = DatasetFactory.createConstraint("RECEB",recebLido,recebLido,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let arrayConstraints=[];
	arrayConstraints.push(c1);
	arrayConstraints.push(c2);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_captamultiplo_avanc",null,arrayConstraints,null);
	let concatena="";
	let i=0;
	for(i;i<resultado.values.length;i++){
		concatena=concatena+resultado.values[i].BP+",";
	}//for i
	let tamanho = concatena.length;
	if(tamanho>0){
	concatena = concatena.substr(0,tamanho-1);	
	}//if tamanho
	return concatena;
}//fTxtConcatenaCaptadorMultiploSiglaNLE
//---------------------------------------------------
function fFazInsertSubstitutoNLE(pasta,captadorNota,captadorSubst){
	//é para fazer INSERT porque não existe
	let arrayCampos=[];
	arrayCampos.push(pasta);
	arrayCampos.push(captadorNota);
	arrayCampos.push(captadorSubst);
	arrayCampos.push(WCMAPI.userEmail.toUpperCase());//email de quem está comandando
	arrayCampos.push(new Date().toLocaleDateString());
	let i1 = DatasetFactory.createConstraint("INT_OPER","1","1",ConstraintType.MUST);
	let arrayConstraintsI=[];
	arrayConstraintsI.push(i1);
	//console.log("arrayConstraintsI",arrayConstraintsI);
	let resultadoI=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bpsubs_avanc",arrayCampos,arrayConstraintsI,null);
	//console.log("fez inserção de substituto",resultadoI.values[0].insercao);
	/*
	//----recarrega a tabela principal para mostrar que a nota já foi transferida, mas se o BP captador UCRG não faz
	if(captadorNota != 'UCRG'){
	fPegaBPNaMaquinaNLE();//para refazer os arrays globais que armazenam as transferências
	let dataPesquisaI=jQuery("#idDatNLREDAI").val();
	let dataPesquisaF=jQuery("#idDatNLREDAF").val();
	fCompoeTabelaNLRE(dataPesquisaI,dataPesquisaF,"-1",captadorNota);
	}
	*/
}//fFazInsertSubstitutoNLE
//--------------------------------------------
function fFazUpdateSubstitutosNLE(pasta,captadorNota,captadorSubst){
	let arrayCamposU=[];
	arrayCamposU.push(captadorNota);
	arrayCamposU.push(captadorSubst);
	arrayCamposU.push("1");//ativo
	let u1 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let arrayConstraintsU=[];
	arrayConstraintsU.push(u1);
	//console.log("arrayConstraintsU",arrayConstraintsU);
	let resultadoU=DatasetFactory.getDataset("ds_ucrg_notasliquidas_bpsubs_update",arrayCamposU,arrayConstraintsU,null);
}//fFazUpdateSubstitutosNLE
//----------------------------------------------------
function fVerificaGrupoJobExecucaoNLE(){
	let emailBP=WCMAPI.userEmail.toUpperCase();
	let emailForcado ="";
	jQuery("#idDivBlocoAdmin").hide();
	let emailNaMaquina = WCMAPI.userEmail;
	let intAchou=0;
	jQuery.get("/api/public/2.0/groups/listUsersByGroup/job_execucao",function(jsonRetorno){
		let qtd=jsonRetorno.content.length;
   		for(i=0;i < qtd;i++){
   			//console.log(i+" "+jsonRetorno[i].email);
   			if(jsonRetorno.content[i].email==emailNaMaquina) {
   			//	//console.log(jsonRetorno.content[i].email);
   				intAchou=1;
   				i=qtd;//para sair
   			}//if jsonRetorno
   			//console.log("Passagem: "+i+" - "+jsonRetorno.content[i].code+" "+jsonRetorno.content[i].email);
   		}//for i
   		//console.log("Achou?",intAchou);
   		if(intAchou==1){
   			//se for administrador, pergunta para qual BP será feita a pesquisa
   			//jQuery("#idDivBlocoAdmin").show();
   			//emailForcado=prompt("EMAIL DO BP PARA TESTE","GREZENDE@ULHOACANTO.COM.BR");
   			//globalNaMaquina=emailForcado.toUpperCase();
   			fCarregaSCNLE();
   			jQuery("#idDivNLRESC").show();
   			jQuery("#idBtnAdmGrupoJobExec").show();
   		}else{
   			//se for uma pessoa que não seja administrador, então deve ser um BP. Testar
   			let c1 = DatasetFactory.createConstraint("EMAIL",emailBP,emailBP,ConstraintType.MUST);
   			let arrayConstraints = [];
   			arrayConstraints.push(c1);
   			let resultado = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraints,null);
   			if (resultado.values.length>0){
   				let categoria = resultado.values[0].CATEGORIA;
   				if(categoria.substr(0,2)=='SC'){
   					//é SC. Pode passar
   					fCarregaDelegacaoNLE(emailBP);
   		   			globalNaMaquina=emailBP.toUpperCase();
   				}else{
   					//não é um SC, redireciona para a home
   					alert ("Desculpe, mas esta página é de uso exclusivo dos Sócios Conselheiros");
   					window.open("http://fluig.ulhoacanto.com.br:8080", "_self");
   				}//if categoria
   			}else{
   				//se não achou a pessoa para testar a categoria, também avisa e redireciona 
					alert ("Desculpe, mas esta página é de uso exclusivo dos Sócios Conselheiros");
   					window.open("http://fluig.ulhoacanto.com.br:8080", "_self");
   			}//if resultado
   			
   		}//if intAchou   	
   		
   	});//get
}//fVerificaGrupoJobExecucaoNLE
//------------------------------------------------
function fExecutaIdaParaTopoNLE(){
	 fPulaParaElementoRANLE("idDatNLREDAI");
	 jQuery("#idH3NLRotuloTabela").hide();
		jQuery("#idDivNLRAMensagem").hide();
		jQuery("#idArtNLREExtra").hide();
		jQuery("#idArtNLRETransf").hide();
		jQuery("#idArtNLRADET").hide();
		jQuery("#idH3NLREROTULOPESQUISA").hide();
		//jQuery("#idH3NLREDETROT").hide();
		jQuery("#idSelNLRETransf option[value='-1']").prop('selected', true);
		jQuery("#idSpaNLRAAvisoTransferir").text('');
		jQuery(".claGridNLRERateio").hide();
}//fExecutaIdaParaTopoNLE
//--------------------------------------------------------
function fAlteraSugestaoUTsValidasNLE(){
	//este bloco, após o programa sugerir os percentuais...
//...de rateio baseado nas UTs, refaz tudo, porque às vezes...
//...nesta sugestão vêm UTs consultores ou de advs desligados.
//...Assim, quando vier de consultores/desligados, considera...
//...para a sugestão de percentuais apenas as UTs válidas.
//Para isto:
//1 - Somar as uts válidas
//2 - Calcular o percentual de cada uma sobre este total
//3 - Mostrar o percentual e o cálculo deste percentual sobre o valor do job
}//fAlteraSugestaoUTsValidasNLE
//---------------------------------------------------
function fVerificaChefeNLE(siglaEstag,vigencia){
	//Esta função serve para descobrir qual advogado é chefe de qual estagiário da vez...
	//...no mes-ano em questão(vigencia)
	}//fVerificaChefeNLE
//----------------------------------------------------
function fVerificaNaturezaAdvNLE(sigla){
	let intResposta=-1;//ok. É um advogado ativo
	let d1 = DatasetFactory.createConstraint("COD_ADVG",sigla,sigla,ConstraintType.MUST);
	let arrayConstraintsD=[];
	arrayConstraintsD.push(d1);
	let resultadoD = DatasetFactory.getDataset("ds_ucrg_pessoas",null,arrayConstraintsD,null);
	if(resultadoD.values.length == 0){
				//console.log(' linha 1976 DESLIGADO!',sigla);
				intResposta=0;//é um desligado
	}//if resultadoD
	if(resultadoD.values.length > 0){
		//console.log(' linha 1896 Encontrou. Será consultor?',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
		if(resultadoD.values[0].CATEGORIA.substr(0,1) != "S" && resultadoD.values[0].CATEGORIA.substr(0,3) != "EST"){
			intResposta=1;//é consultor
		//console.log(' linha 1900 Consultor SIM: ',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
		}
		if(resultadoD.values[0].CATEGORIA.substr(0,3) == "EST"){
			//console.log(' linha 1986 é estag',resultadoD.values[0].CATEGORIA+" "+resultadoD.values[0].NOME);
			intResposta=3;// é estagiário. Não mostra na tabela
			}
	}//if resultadoD
	return intResposta;
}//fVerificaNaturezaAdvNLE
//-----------------------------------------------------------------------
function fInsereUpdateBrutoNLE(fatura,caso,escr,receb,bruto,liquido,job){
	//se não houver a pesquisa, é insert. Do contrário, update
	let intResposta=0;
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",caso,caso,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escr,escr,ConstraintType.MUST);
	let c4 = DatasetFactory.createConstraint("RECEBIMENTO",receb,receb,ConstraintType.MUST);
	let arrayConstraints = [c1,c2,c3,c4];
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_sel",null,arrayConstraints,null);
	if(resultado.values.length ==0){
		//é insert
		let arrayCampos =[fatura,caso,escr,receb,bruto,liquido,job,WCMAPI.userEmail.toUpperCase()];
		let resultadoIns = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_ins",arrayCampos,null,null);
		if(resultadoIns.values[0].insercao=="Ok") intResposta = 1;
	}else{
		//é update
		let status = '1';
		let arrayCampos =[bruto,liquido,job,WCMAPI.userEmail.toUpperCase(),status];
		let resultadoUp = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_update",arrayCampos,arrayConstraints,null);
		//console.log("update",resultadoUp.values[0].update);
		if(resultadoUp.values[0].update=="Ok") intResposta = 2;
	}//if resultado
	return intResposta;
}//fInsereUpdateBrutoNLE
//-----------------------------------------------------------------------
function fDeletaBrutoNLE(fatura,caso,escr,receb){
	//deleta um bruto que a Administração inseriu
	let intResposta=0;
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",caso,caso,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escr,escr,ConstraintType.MUST);
	let c4 = DatasetFactory.createConstraint("RECEBIMENTO",receb,receb,ConstraintType.MUST);
	let arrayConstraints = [c1,c2,c3,c4];
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_del",null,arrayConstraints,null);
	if(resultado.values[0].deletado=="Ok") intResposta = 1;
	return intResposta;
}//fDeletaBrutoNLE
//------------------------------------------------------
function fMostraTabelaBrutosNLE(dataReceb1,dataReceb2){
	let c1Bru = DatasetFactory.createConstraint("RECEBIMENTO",dataReceb1,dataReceb2,ConstraintType.MUST);
	let arrayConstraintsBru = [c1Bru];
	let resultadoBru = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_bruto_sel",null,arrayConstraintsBru,null);
	let objTab = jQuery("#idTabBrutoTabela");
	objTab.empty();
	let estilo = 'border:1px solid black;padding:10px;';
	let concatena = '<tr><th style="'+estilo+'">Cliente</th><th style="'+estilo+'">File</th>';
	concatena = concatena +'<th style="'+estilo+'">Matéria</th><th style="'+estilo+'">Fatura</th>';
	concatena = concatena +'<th style="'+estilo+'">Escritório</th><th  style="'+estilo+'">Recebimento</th>';
	concatena = concatena +'<th style="'+estilo+'">Bruto</th><th  style="'+estilo+'">Líquido</th>';
	concatena = concatena +'<th style="'+estilo+'">Job</th><th style="'+estilo+'">Editor</th><th style="'+estilo+'">Data</th></tr>';
	let i=0;
	let qtd = resultadoBru.values.length;
	for (i;i<qtd;i++){
		let cliente = resultadoBru.values[i].RAZAO_SOCIAL;
		let pasta = resultadoBru.values[i].PASTA;
		let materia = resultadoBru.values[i].TITULO;
		let fatura = resultadoBru.values[i].FATURA;
		let escr = resultadoBru.values[i].ESCRITORIO;
		let dataRec = resultadoBru.values[i].DTRECEBIMENTO;
		let bruto = resultadoBru.values[i].BRUTO_NOVO;
		let liquido = resultadoBru.values[i].LIQUIDO_NOVO;
		let job = resultadoBru.values[i].JOB_NOVO;
		let emailEditor = resultadoBru.values[i].EMAIL_EDITOR;
		let dataEdicao = resultadoBru.values[i].DATA_EDICAO;
		concatena = concatena + '<tr><td style="'+estilo+'">'+cliente+'</td><td style="'+estilo+'">'+pasta+'</td><td style="'+estilo+'">'+materia+'</td><td style="'+estilo+'">'+fatura+'</td><td style="'+estilo+'">'+escr+'</td>';
		concatena = concatena + '<td style="'+estilo+'">'+dataRec+'</td><td style="'+estilo+'">'+bruto+'</td><td style="'+estilo+'">'+liquido+'</td><td style="'+estilo+'">'+job+'</td>';
		concatena = concatena + '<td style="'+estilo+'">'+emailEditor+'</td><td style="'+estilo+'">'+dataEdicao+'</td></tr>';
	}//for i
	objTab.append(concatena);
}//fMostraTabelaBrutosNLE
//---------------------------------------------------------
function fProcuraNotaFATPASTANLE(fatura,pasta,escritorio){
	let txtAviso = jQuery("#idSpaAvisosNLRE").text();
	//esta função recebe os parâmetros e pega o valor do honorário na FATPASTA
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let arrayConstraints = [c1,c2,c3];
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_sel_fatpasta",null,arrayConstraints,null);
	let qtd = resultado.values.length;
	if(qtd>0){
		return resultado;
	}else{
		jQuery("#idSpaAvisosNLRE").text(txtAviso+" "+fatura+" em RCR.FATPASTA");
		return 0;
	}
}//fProcuraNotaFATPASTANLE
//--------------------------------------------------------------
function fInauguraSugestoesNLEADHOC(faturaLida,escritorioLido,casoLido,recebimentoLido,bpLido){
	let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLEADHOC");
	//console.log("booTemPreservacao",booTemPreservacao);
	if(!booTemPreservacao){
		//NÃO TEM PRESERVAÇÃO, VAI PELAS VIAS NORMAIS
	//É a primeira vez que o BP entra para fazer sugestões.
	//---DELETANDO O QUE EXISTIR JÁ DE RATEIO FEITO PELAS UTS PORQUE VAI TROCAR PARA POR VALOR
	let d1 = DatasetFactory.createConstraint("FAT",faturaLida,faturaLida,ConstraintType.MUST);
	let d2 = DatasetFactory.createConstraint("CASO",casoLido,casoLido,ConstraintType.MUST);
	let d3 = DatasetFactory.createConstraint("ESC",escritorioLido,escritorioLido,ConstraintType.MUST);
	let d4 = DatasetFactory.createConstraint("FLAG","3","3",ConstraintType.MUST);//flag 3 deleta, mas tem de passar esses constraints acima
	let arrayConstraintsD=[];
	arrayConstraintsD.push(d1);
	arrayConstraintsD.push(d2);
	arrayConstraintsD.push(d3);
	arrayConstraintsD.push(d4);
	let resultadoD=DatasetFactory.getDataset("ds_ucrg_notasliquidadas_deleterateio_avanc",null,arrayConstraintsD,null);
	//---
	let jobTotal = jQuery("#idHidNLREJobSelecionado").val();
//console.log("jobTotal em fInaugura",jobTotal);
	//---
	let objH3=jQuery("#idH3NLREROTULOPESQUISA");
	//---
	let objTab=jQuery("#idTabNLRENLRA");
	objTab.empty();
	//---
	let nomeAdv="";
	//limpa as tabelas  de detalhe
	//jQuery("#idH3NLREDETROT").text("");
	//----só para limpar a tabela de detalhes. Não popula aqui
	let objTabD=jQuery("#idTabNLRENLDET");
	objTabD.empty();
	//---
	let concatena='<thead><tr><th>ADV</th><th>SUGESTÃO (%)</th>'+
	'<th>EFETIVO (%)</th><th title="O job proporcional aparece, primeiramente, com o valor original da nota. Se houver modificação no líquido, o job se ajustará ao sair do campo do percentual efetivo">JOB PROPORCIONAL (R$)</th><th>Remover</th></tr></thead><tbody>';
 //----------------------------------
let c1 = DatasetFactory.createConstraint("NUM_FAT",faturaLida,faturaLida,ConstraintType.MUST);
let c2 = DatasetFactory.createConstraint("NUM_ESCR",escritorioLido,escritorioLido,ConstraintType.MUST);
let c3 = DatasetFactory.createConstraint("NUM_CASO",casoLido,casoLido,ConstraintType.MUST);
let arrayConstraints = [];
arrayConstraints.push(c1);
arrayConstraints.push(c2);
arrayConstraints.push(c3);
//carregando as notas emitidas pra criar a tabela de sugestões de percentuais
let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_rateioequipe_valor",null,arrayConstraints,null);
let qtd=resultado.values.length;
let i=0;
let arrayObjs=[];
let somaValorFinan=0;
jQuery("#idArtNLREExtra").show();
jQuery("#idArtNLRETransf").show();
for(i;i<qtd;i++){
let fatura = resultado.values[i].FATURA;
let sigla = resultado.values[i].ADV.trim();
let siglaPreservada = "";
let valorFinan = resultado.values[i].TOT_ADVG;
if(valorFinan == 'null') valorFinan="0";
//console.log("valorFinan que chega",valorFinan);
//------Se a sigla for de sócio consultor, adv desligado ou de estagiário, tratamento especial
let intDescoberta = fVerificaNaturezaAdvNLE(sigla);
if(intDescoberta*1==0){
	//é advogado desligado, vou pôr as valorFinan para o Captador
	siglaPreservada=sigla;//preserva o advogado original
	sigla = jQuery("#idHidNLREBPSelecionado").val();
}
if(intDescoberta == 1) valorFinan="0"; //-1 é advogado regular, 1 = consultor e 3 = estagiário
//---A sigla da vez é de um estagiário? Se for, qual é seu chefe?
if(intDescoberta==3){
	//é um estagiário. Logo, o cálculo é feito normalmente, só que aparece a sigla do chefe
let ciC = DatasetFactory.createConstraint("SIGLA_ESTAG",sigla,sigla,ConstraintType.MUST);
let arrayConstraintsC = [ciC];
let objChefe = new Chefes("ds_ucrg_notasliquidadadas_chefes",null,arrayConstraintsC,null);
let siglaChefe = objChefe.getSiglaChefe();
if(siglaChefe != ""){
siglaPreservada=sigla;	//se for estagiário, preserva sua sigla para mostrar no title do advogado beneficiado
	sigla = siglaChefe;//substitui a sigla do estagiário pela do chefe
}else{
	alert ("Atenção: O estagiário "+siglaPreservada+" não tem a referência de seu chefe. O cálculo da sugestão de rateio ficará prejudicado. Fale com a Administração para incluí-lo na tabela apropriada, antes de fazer este rateio");
}//if siglaChefe
}//if intDescoberta==3
//--
//console.log(" chefe: "+sigla+" sigla do estagiário: "+siglaPreservada);
//--------------------------------------------------
let meuObj={"fatura":fatura,"sigla":sigla,"valorFinan":valorFinan,"origem":siglaPreservada};
arrayObjs.push(meuObj);
//console.log("======meuObj",meuObj);
//-------------------------------------------------
somaValorFinan=somaValorFinan+valorFinan*1;
//console.log("linha 1325 objeto da vez",meuObj);
}//for i
//console.log("linha 1327 objeto montado",arrayObjs);
let intSoTemConsultor=0;//default é que é não há consultores somente
//------loop do objeto para calcular os percentuais e inserir na tabela de rateios no ORACLE-----A
let indiceApr=0;
arrayObjs.forEach(function (elemento,indice,proprioArray){
let estiloPreservado = "background-color:initial;color:initial;outline:initial";
let titlePreservado = "";
let faturaObj=elemento.fatura;
let siglaObj=elemento.sigla;
let valorFinanObj=elemento.valorFinan;
origemPres = elemento.origem;
//console.log("Inaugura na gravação /sigla do chefe: "+siglaObj+" sigla do estagiário: "+origemPres);
if(origemPres.length>0){
	//existe uma apropriação de valorFinan pelo chefe do estagiário
estiloPreservado = "background-color:brown;color:white;outline: #DDDDDD solid 2px;";
titlePreservado = "valorFinan apropriadas do profissional (Estagiário ou desligado) "+origemPres;
}
if(somaValorFinan==0) {
	somaValorFinan=1;//para evitar divisão por zero
	 intSoTemConsultor=1;//se a soma de valorFinan era zero, é porque precisa inserir o BP como beneficiário mais abaixo
}
let perc = valorFinanObj*1/somaValorFinan;
let valorJobTotal = (jobTotal*perc).toString();
//console.log("linha 3692 valorFinanObj e perc",valorFinanObj+" "+perc+" jobTotal: "+jobTotal+" valorJobTotal: "+valorJobTotal);
//----faz insert inaugurando
   let arrayCampos=[];
	arrayCampos.push(faturaLida);
	arrayCampos.push(casoLido);
	arrayCampos.push(escritorioLido);
	arrayCampos.push(recebimentoLido);
	arrayCampos.push(siglaObj);
	arrayCampos.push((perc).toString());
	arrayCampos.push(valorJobTotal);
	//--
	arrayCampos.push(bpLido);
	arrayCampos.push(new Date().toLocaleDateString());
	arrayCampos.push(indiceApr.toString());
//console.log("O que vai para o insert",arrayCampos);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_insert_avanc",arrayCampos,null,null);
	//console.log("inseriu rateio fInaugura: ",resultado);
	//console.log("Vai tentar salvar a apropriação. Sigla do estagiário: ",origemPres);
	//---------------------agora vai inserir a apropriação da ut pelo chefe do estagiário-- APROPRIA
	if(origemPres != ""){
	 let arrayCamposApr=[];
		arrayCamposApr.push(faturaLida);
		arrayCamposApr.push(escritorioLido);
		arrayCamposApr.push(origemPres);
		arrayCamposApr.push(siglaObj);
		arrayCamposApr.push(recebimentoLido);
		arrayCamposApr.push(casoLido);
		arrayCamposApr.push(indiceApr.toString());
		arrayCamposApr.push((perc).toString());
		//console.log("Array de campos que vai para a apropria: ",arrayCamposApr);
		let resultadoApr = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_apropria_ins",arrayCamposApr,null,null);
		//console.log("Salvou a apropriação claRateioConfirma click: ",resultadoApr.values[0].insercao);
	}//if origemPres
	//-----------------------------------------------------------------------------------/APROPRIA
	//console.log("resultado da inserção ",i+" "+resultado.values[0].insercao);
	//---------------------------------
let percFormatado = perc*100;
if(perc>0){
	//----
	let a1 = DatasetFactory.createConstraint("RA_XFORNEC",siglaObj,siglaObj,ConstraintType.MUST);
	let arrayConstraintsA = [];
	arrayConstraintsA.push(a1);
	let resultadoA = DatasetFactory.getDataset("ds_ucrg_pesquisa_pessoas2",null,arrayConstraintsA,null);
	if(resultadoA.values.length>0){
		nomeAdv = resultadoA.values[0].NOME.trim();
	}else{
		nomeAdv="";
	}//if resultadoA	
//--	
if (titlePreservado != "") titlePreservado = ' ('+titlePreservado+')';
//--
concatena=concatena+'<tr><td  style="'+estiloPreservado+'" title="'+nomeAdv+titlePreservado+'">'+siglaObj+'</td><td>'+percFormatado+'</td>'+
'<td><input type="text" class="form-control claRARateioReal" value="'+percFormatado+'"></td>'+
'<td id="'+siglaObj+'" class="claValorAdv">'+jobTotal*perc+'</td>'+
'<td><button type="button" id="'+siglaObj+"ADHOC"+'" class="btn btn-danger claBtnNLRARemover" title="Remover este advogado">x</button></td></tr>';
//console.log("concatena linha 3746: ",concatena);
}//if perc > 0
nomeAdv="";
indiceApr++;
});//arrayObjs foreach
//-------------------------------------------------------------------------------/A
//---------------------------------------------------------------------X
//se só tem consultor na criação do ojbeto do bloco A, então...
//...insere para o BP Captador 100%, porque tem de ter um rateio pelo menos e zero...
//...(como era o resultado de todos os consultores) não é considerado como rateio
//console.log("linha 1442, só tem consultor: ",intSoTemConsultor);
//console.log("linha 1443, qtd: ",qtd);
if(intSoTemConsultor==1){
	let faturaLida = jQuery("#idHidNLREFaturaSelecionada").val();
	let jobLinha = jQuery("#idHidNLREJobSelecionado").val();
	let capNota = jQuery("#idHidNLREBPSelecionado").val();
	let casoLido = jQuery("#idHidNLREFileSelecionado").val();
	let escritorioLido = jQuery("#idHidNLREEscritorioSelecionado").val();
	let recebimentoLido = jQuery("#idHidNLRERecebSelecionado").val();
	//---
	 let arrayCampos=[];
		arrayCampos.push(faturaLida);
		arrayCampos.push(casoLido);
		arrayCampos.push(escritorioLido);
		arrayCampos.push(recebimentoLido);
		arrayCampos.push(capNota);
		arrayCampos.push("1");
		arrayCampos.push(jobLinha);
		arrayCampos.push(capNota);
		arrayCampos.push(new Date().toLocaleDateString());
		arrayCampos.push(indiceApr.toString());
		//console.log("O que vai para o insert linha 1382",arrayCampos);
		let booTemPreservacao=fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,"fInauguraSugestoesNLE");
		//console.log("booTemPreservacao",booTemPreservacao);
		if(!booTemPreservacao){
		let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_insert_avanc",arrayCampos,null,null);
		//depois da inserção, faz uma leitura
		 let resultadoR=fProvocaVerRateiosNLE(faturaLida,casoLido,escritorioLido,recebimentoLido);
		   if(resultadoR.values.length>0){
		   fCarregaSugestaoJaFeitaNLE(resultadoR,recebimentoLido);
		   }
		}//if !booTemPreservacoa
}//if intSohTemConsultor
//--------------------------------------------------------------------/X
if(qtd==0){
if (globalArrayNLRAFilesMinhaResponsa.includes(casoLido)){
	//se o file em questão foi transferido para mim, substitui o BP lido para mim	
	//console.log("Vai trocar o bp de "+bpLido+" para "+jQuery("#idHidNLREBPNaMaquina").val()+" porque não tem timesheet e este bp é o substituto");
	bpLido=jQuery("#idHidNLREBPNaMaquina").val();
}
//---
concatena=concatena+'<tr><td colspan="5">Não há timesheet para a fatura '+faturaLida+'</td></tr>';
concatena=concatena+'<tr><td>'+bpLido+'</td><td>100,00</td>'+
'<td><input type="text" class="form-control claRARateioReal" value="100"></td>'+
'<td id="'+bpLido+'" class="claValorAdv">'+jobTotal+'</td>'+
'<td><button type="button" id="'+bpLido+'" class="btn btn-danger claBtnNLRARemover" title="Remover este advogado">x</button></td></tr>';
}//if qtd
concatena=concatena+'<tr><td colspan="2"><span id="idSpaRASomaIndevida"></span></td><td><span id="idSpaRASomaPercentual"></span></td>'+
'<td><button type="button" class="btn btn-danger claBtnRAReset" title="Este botão refaz do início as sugestões de rateio">Reset</button></td>'+
'<td title="Marcando esta caixa, este rateio indicado se repetirá em faturamentos futuros no file ('+casoLido+') em questão"><label class="claLblPreserva"><input type="checkbox" class="claChkPreservaRateio" value="1"  data-numerofile ="'+casoLido+'" '+
'>&nbsp;Preservar rateio</label></td></tr>';
concatena=concatena+'<tr><td><button type="button" class="AttListaCaptador claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
'data-tagcasodet="'+casoLido+'">Ver detalhes dos timesheets</button></td><td><button type="button" class="executar claRateioConfirma" data-tagfatrat="'+faturaLida+'" '+
'data-tagescrrat="'+escritorioLido+'" data-tagcasorat="'+casoLido+'">Salvar o rateio</button></td><td><span id="idSpaRASomaJob"></span></td></tr>';
/*
concatena=concatena+'<td colspan="3"></td><td><button type="button" class="btn btn-info claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
'data-tagcasodet="'+casoLido+'">Ver detalhe dos TS</button></td></tr>';
*/
concatena=concatena+'</tbody>';
objTab.append(concatena);
if(qtd==0){
	//console.log("Linha 1499 vai preencher o alerta");
jQuery("#idSpaRASomaJob").text("Não há timesheets. Posto 100% para o Captador: "+new Date().toLocaleString());
jQuery("#idSpaRASomaJob").css({"color":"red"});
}else{
	jQuery("#idSpaRASomaJob").text("Feito/Refeito com base nos timesheets existentes");
	jQuery("#idSpaRASomaJob").css({"color":"blue"});
}//if qtd
	}//booTemPreservacao
//fSomaPercentuaisNLE();
//fPulaParaElementoRANLE('idArtNLREExtra');
}//fInauguraSugestoesNLEADHOC
//--------------------------------------
function fDesabilitaBotaoTransferenciaFile(){
//esta função troca o botão de Ratear/Transferir para uma observação de que a ...
	//...fatura(só o valor, não o file) foi transferida para outro bp	
	let objTab = jQuery("#idTabNLRENL");
	 objTab.find('tr').each(function (i, el) {
	       let tds = jQuery(this).find('td');
	            let caso = tds.eq(13).text();
	            //o botão tem o rótulo 'Ratear/Transferir '+fatura
	            let fatura = tds.eq(3).find("button[type='button']").text().substr(18);
	            let booAchouCaso = globalArrayCasosValorTransferido.includes(caso);
	            let booAchouFatura= globalArrayFaturasValorTransferido.includes(fatura);
	            //--já que os índices são os mesmos...
	            let indiceBP = globalArrayFaturasValorTransferido.indexOf(fatura);//aproveito para descobrir o index que serve também para o bp
	            let bpVez = globalArrayBPValorTransferido[indiceBP];
	            //--
	            //console.log("Valores das globais dentro de fDesabilitaBotaoTransferenciaFile:caso,fatura,bpCaptador",globalArrayCasosValorTransferido+"/"+globalArrayFaturasValorTransferido+"/"+globalArrayBPValorTransferido);	            
        //console.log("caso, fatura -> booAchouCaso e booAchouFatura",caso+" / "+fatura+" --> "+booAchouCaso +"/"+ booAchouFatura);
	            if(booAchouCaso && booAchouFatura){
	            	tds.eq(3).text("Esta fatura ("+fatura +") foi transferida para o BP "+bpVez);
	            	tds.eq(3).css({"background-color":"#B0C4DE"});
	            	tds.eq(3).prop("title","Esta fatura (não o Caso com todas as suas faturas) foi transferida para outro BP. Em caso de alteração deste 'status', a Administração poderá revertê-lo.")
	            //	//console.log("Deverá marcar como sem botão "+fatura);
	            }//if booAchou
	    });
}//fDesabilitaBotaoTransferenciaFile()
//-----------------------------------------------
/*
function fProcuraFaturaTransferida(concatena){
	//---se a fatura (a fatura, não o file) foi transferida, só pega o valor destinado a ESTE BP)--T
//---Depois que toda a tabela foi lida e preparada para o append, faço uma leitura...
//...nova das notas emitidas procurando na tabela de notas transferidas os parâmetros necessários...
//...para achar as notas que combinem no período

 //recebLido dd/mm/yyyy
 	let diaR = recebLido.substr(0,2);
 	let mesR = recebLido.substr(3,2);
 	let anoR = recebLido.substr(6,4);
 	recebLido = anoR+"-"+mesR+"-"+diaR;
 	//--
	let arrayTFCampos=[];
	let arrayTFNomeCons=['BP_DESTINO','RECEBIMENTO'];
	let arrayTFInicial=[siglaBPNaMaquina,recebLido];
	let arrayTFFinal=[siglaBPNaMaquina,recebLido];
	let arrayFTOrdenacao=[];
	//console.log("siglaBPNaMaquina e receb",siglaBPNaMaquina+" / "+recebLido);
	let objTFDataset = new MeusDatasets("1",'ds_ucrg_notasliquidadas_transf',arrayTFCampos,arrayTFNomeCons,arrayTFInicial,arrayTFFinal,arrayFTOrdenacao);
	let resTF = objTFDataset.pegaResultado();
	//console.log("resultado da transf",resTF);
	if(resTF.values.length>0){
		//tem valor transferido
		let f=0;
		for(f;f<resTF.values.length;f++){
			let siglaTFVez = resTF.values[f].ADV_BENEF.trim();
			intAchouTransfParaEsteBP=0;
			//console.log("Fatura, sigla da Vez e bp na máquina",fatuLida+"/"+siglaTFVez+"/"+siglaBPNaMaquina);
			if(siglaTFVez==siglaBPNaMaquina){
				//se o BP para quem foi transferido este valor for o mesmo da máqina, mostra a nota para ele ratear
				intAchouTransfParaEsteBP=1;
				let brutoLido=resTF.values[f].VALOR;
				let liqCalculado = brutoLido*0.8547;
				let jobCalculado = brutoLido*0.8547*0.05;
				//---Se o líquido especial for maior que o líquido calculado, significa que não houve alteração manual do líquido,...
				//...logo o valor do especial acompanha o calculado. Se deixasse o valor que chega nesta função, ia aparecer o valor normal da fatura...
				//...e não o valor transferido que coube a este BP
				//console.log("liquidoEspec e liqCalculado",liquidoEspec+"/"+liqCalculado);
				liquidoEspec = liquidoEspec.toString().replace(/,/,".");
				jobEspec = jobEspec.toString().replace(/,/,".");
				if(liquidoEspec*1>liqCalculado*1) {
					liquidoEspec = liqCalculado;
					jobEspec = jobCalculado;
				}//if liquidoEspecial
				liqFormatado = parseFloat(liqCalculado).toFixed(2);
				jobFormatado = parseFloat(jobCalculado).toFixed(2);
				liquidoEspec = parseFloat(liquidoEspec).toFixed(2);
				jobEspec = parseFloat(jobEspec).toFixed(2);
				//console.log("liquidoEspec",liquidoEspec);
				//------plota somente o valor NOVO da fatura, sem botão, porque foi transferida para este bp
				let estiloT='border-style:solid;border-color:red;border-width:2px';
				let tituloT='Esta nota foi atribuída a você pelo Captador para fazer o rateio do Job. É decorrente de um percentual sobre o valor bruto.';
				concatena=concatena+'<span style="'+estiloT+'" title="'+tituloT+'">'+brutoLido+'</span></td>';
				concatena=concatena+'<td class="claAlinhaDireita">'+liqFormatado+'</td><td class="claAlinhaDireita">'+jobFormatado+'</td>';
				concatena=concatena+'<td class="claAlinhaDireita"><button type="button" class="btn btn-warning claBtnEspecial" data-fatesp = "'+fatuLida+'" ';
				concatena=concatena+'data-casoesp="'+casoLido+'" data-escesp="'+escritorio+'" data-recesp="'+recebLido+'" ';
				concatena=concatena+'data-liqesp="'+liquidoEspec+'" data-ultimo ="'+editor+'" data-dataultima ="'+dataUltima+'" ';
				concatena=concatena+'title="Ajusta manualmente O líquido e, consequentemente, o valor do job" >'+liquidoEspec+'</button></td>';
				concatena=concatena+'<td class="claAlinhaDireita">'+jobEspec+'</td>';
				f=resTF.values.length;//para sair do loop
			}else{
				 globalArrayCasosValorTransferido.push(casoLido);
				 globalArrayFaturasValorTransferido.push('Ratear/Transferir '+fatuLida);
				 globalArrayBPValorTransferido.push(siglaTFVez);
			}//if siglaTFVez
		}//for f
		
		if(intAchouTransfParaEsteBP==0){
			//há transferência, mas este BP não está contemplado no valor parcial da nota.
			concatena=concatena+'<span title="Este valor foi totalmente transferido para outro BP">'+brutoFormatado+'</span></td>';
		}//if intAchouTransfParaOutroBP
	}else{
		//não tem valor transferido; cria o botão de transferência da NOTA normal
		concatena=concatena+'<button id="'+fatuLida+'" class="btn btn-sm claNLTransf" title="Este botão transfere somente esta fatura "'+fatuLida+' para outro BP" ';
		concatena=concatena+'data-tbruto="'+brutoFormatado+'" data-tfatura="'+fatuLida+'" data-tfile="'+casoLido+'" ';
		concatena=concatena+'data-tcap="'+capLido+'"';
		concatena=concatena+'data-tescr="'+escritorio+'" data-treceb="'+recebLido+'">Transferir este valor: '+brutoFormatado+'</button></td>';
		concatena=concatena+'<td class="claAlinhaDireita">'+liqFormatado+'</td><td class="claAlinhaDireita">'+jobFormatado;
	}//if resTF
	//--------------------------------------------------------------------------------------------/T
	return concatena;
}//fProcuraFaturaTransferida
*/
//-----------------------------------------------------------------
function fRESPegaValorLiquidoAlterado(fatura,pasta,escritorio,receb,status){
	//verifica se a fatura da vez teve seu  valor líquido modificado na marra. Retorna resultado
	let c1 = DatasetFactory.createConstraint("FATURA",fatura,fatura,ConstraintType.MUST);
	let c2 = DatasetFactory.createConstraint("PASTA",pasta,pasta,ConstraintType.MUST);
	let c3 = DatasetFactory.createConstraint("ESCRITORIO",escritorio,escritorio,ConstraintType.MUST);
	let c4 = DatasetFactory.createConstraint("RECEBIMENTO",receb,receb,ConstraintType.MUST);
	let c5 = DatasetFactory.createConstraint("STATUS",status,status,ConstraintType.MUST);
	let arrayConstraints =[c1,c2,c3,c4,c5];
	//console.log("arrayConstraints",arrayConstraints);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_especial",null,arrayConstraints,null);
	//console.log("resultado",resultado);
	return resultado;
}//fRESPegaValorLiquidoAlterado
//-----------------------------------------------------------------
function fPreservaInsert(pastad,advIns,percIns,operadorIns,dataIns,statusIns){
	let arrayCampos = [pastad,advIns,percIns,operadorIns,dataIns,statusIns];
	//console.log("ArrayCampos no insert de preserva: ",arrayCampos);
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_preserv_ins",arrayCampos,null,null);
	//console.log("Resulado da inserção de preservação: ",resultado.values[0].insercao)
}//fPreservaInsert
//-----------------------------------------------------------------
function fRecuperaPreservacao(faturaLida,casoLido,escritorioLido,rotina){
	//console.log("rotina que chamou fRecuperaPreservacao: ",rotina);
	let jobTotal = jQuery("#idHidNLREJobSelecionado").val();
	//console.log("jobTotal",jobTotal);
	//jQuery("#idSpaRASomaJob").css({"background-color":"initial","color":"initial"});
	let booResposta = false;//se houver preservação, retorna true e a rotina da função que chama esta função...
	//...é ignorada
	let objTab=jQuery("#idTabNLRENLRA");
	objTab.empty();
	//quando vai inaugurar (finaugura...), a cada passagem do file em questão...
	//...no advogado da vez, pega o percentual que estiver assinalado na tabela de preservação
	let c1 = DatasetFactory.createConstraint("PASTA",casoLido,casoLido,ConstraintType.MUST);
	let arrayConstraints =[c1];
	let resultado = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_preserv",null,arrayConstraints,null);
	//console.log("resultado na fRecuperaPreservacao",resultado);
	let qtd=resultado.values.length;
	if(qtd*1>0){
		//opa!!! Tem preservação. Logo, vai ignorar a sugestão inicial ao BP para fazer o rateio
		booResposta=true;
		//alert ("Sugestão de percentuais definida pelo Captador para que se repita a cada emissão no file "+casoLido);
	}//if qtd
	let concatena='<thead><tr><th>ADV</th><th>SUGESTÃO (%)</th>';
	concatena = concatena+'<th>EFETIVO (%)</th><th title="O job proporcional aparece, primeiramente, ';
	concatena = concatena+'com o valor original da nota. Se houver modificação no líquido, o job se ajustará ';
	concatena = concatena+'ao sair do campo do percentual efetivo">JOB PROPORCIONAL (R$)</th><th>Remover</th>';
	concatena=concatena+'</tr></thead><tbody>';
	let i=0;
	let totalPercentual=0;
	for(i;i<qtd;i++){
		let sigla = resultado.values[i].ADV_RATEADO;
		let perc = resultado.values[i].PERCENTADV*100;
		totalPercentual = totalPercentual+perc;
		let rateio = jobTotal*perc/100;
		concatena=concatena+'<tr><td>'+sigla+'</td><td>'+perc+'</td>'+
		'<td><input type="text" class="form-control" value="'+perc+'"></td>'+
		'<td id="'+sigla+'">'+rateio+'</td>'+
		'<td><button type="button" id="'+sigla+'" class="btn btn-danger claBtnNLRARemover" title="Remover este advogado">x</button></td></tr>';
	}//for i
	concatena=concatena+'<tr><td colspan="2"><span id="idSpaRASomaIndevida2"></span></td><td><span id="idSpaRASomaPercentual2"></span></td>'+
	'<td><button type="button" class="btn btn-danger claBtnRAReset" title="Este botão refaz do início as sugestões de rateio">Reset</button></td>'+
	'<td title="Marcando esta caixa, este rateio indicado se repetirá em faturamentos futuros no file ('+casoLido+')"><label class="claLblPreserva"><input type="checkbox" class="claChkPreservaRateio" value="1"  data-numerofile ="'+casoLido+'" '+
	'>&nbsp;Preservar rateio</label></td></tr>';
	concatena=concatena+'<tr><td><button type="button" class="AttListaCaptador claRateioDetalhe" data-tagfadet="'+faturaLida+'" '+
	'data-tagcasodet="'+casoLido+'">Ver detalhes dos timesheets</button></td><td><button type="button" class="executar claRateioConfirma" data-tagfatrat="'+faturaLida+'" '+
	'data-tagescrrat="'+escritorioLido+'" data-tagcasorat="'+casoLido+'" title="Salvando rateio baseado em percentual marcado como permanente">Salvar o rateio</button></td><td><span id="idSpaFPIMensagem"></span></td></tr>';
//--
	concatena=concatena+'</tbody>';
	objTab.append(concatena);	
	let objSpa2=jQuery("#idSpaRASomaJob2");
	objSpa2.text(totalPercentual.toString());
	let objSpa3 = jQuery("#idSpaFPIMensagem");
	objSpa3.css({"background-color":"initial","color":"initial"});
	diferenca = 100-totalPercentual;
	//console.log("totalPercentual e diferença: ",totalPercentual+"/"+diferenca);
	if(booResposta){
		objSpa3.text("Percentuais permanentes fixados pelo BP");
		objSpa3.css({"background-color":"blue","color":"yellow"});
	}//if booResposta
	if(Math.abs(diferenca)*1 > 100.02){
		objSpa3.text("Observe a soma dos percentuais!");
		objSpa3.css({"background-color":"red","color":"white"});
	}
	return booResposta;
}//fRecuperaPreservacao
//--------------------------------------------
function fPreservacaoDeleta(pastad){
	 let cd1 = DatasetFactory.createConstraint("PASTA",pastad,pastad,ConstraintType.MUST);
	    let arrayConstraintsd = [cd1];
	    //console.log("arrayConstraintsd",arrayConstraintsd);
	    let resultadod = DatasetFactory.getDataset("ds_ucrg_notasliquidadas_preserv_deleta",null,arrayConstraintsd,null);
	    //console.log("resultado da deleção de preserva",resultadod);
}
function fAtualizaColunaStatus(caso,fatura){
	//esta função é para alterar a coluna status da tabela principal...
	//..quando alguém faz um rateio. Isto para evitar recarrgar a página...
	//...para poder mostrar que já foi feito
	let objTab = jQuery("#idTabNLRENL");
	 objTab.find('tr').each(function (i, el) {
	       let tds = jQuery(this).find('td');
	            fileLido = tds.eq(13).text();
	            faturaLida = tds.eq(3).text();
//console.log("percorrendo a tabela: "+fileLido+" e fatura "+fatura);
if(fileLido==caso && faturaLida == 'Ratear/Transferir '+fatura){
	//console.log("Achou "+fileLido+" na fatura "+fatura);
	//tds.eq(1).text("(Rateio concluído por você agora)");
	tds.eq(1).append("<img src='/w_ucrg_nlequipe/resources/images/sim.png' height='20' width='20' title='Recarregue a página para fixar apenas o símbolo de \"Concluído\"'>");
	return false;
}
	    });

}//fAtualizacolunaStatus
//=====================================FUNÇÕES
var NLRE = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

