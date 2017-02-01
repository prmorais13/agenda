package br.com.agenda.controller;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.agenda.model.Contato;

@RestController
public class ContatoController implements Serializable{

	private static final long serialVersionUID = 1L;
	
	Map<Integer, Contato> contatos = new HashMap<>();
	Integer proximoId = 1;
 
	private Contato cadastrar(Contato contato) {
		contato.setId(proximoId);
		this.contatos.put(contato.getId(), contato);

		return contato;
	}

	@RequestMapping(method=RequestMethod.POST, value="/contatos", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Contato> cadastrarContato(@RequestBody Contato contato) {
	
		Contato contatoCadastrado = this.cadastrar(contato);
		
		return new ResponseEntity<>(contatoCadastrado, HttpStatus.CREATED);
		
	}

}
