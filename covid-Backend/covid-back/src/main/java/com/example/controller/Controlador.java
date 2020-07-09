package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.interfaceServices.IDtosService;
import com.example.model.Dtos;



@Controller
@RequestMapping
public class Controlador {
	
	
	private IDtosService service;
	
	public Controlador(IDtosService service) {
		this.service=service;
	}
	
	@GetMapping(value = "/lista")
	public List<Dtos> listar() {
		return service.getAll();
		
	}
}
