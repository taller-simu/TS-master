package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.interfaceServices.IDtosService;
import com.example.interfaces.IDdtos;
import com.example.model.Dtos;

@Service
public class DtosServices implements IDtosService {
	
	@Autowired
	private IDdtos data;
	
	
	


	@Override
	public List<Dtos> getAll() {
		// TODO Auto-generated method stub
		return 
	}
	
	
}