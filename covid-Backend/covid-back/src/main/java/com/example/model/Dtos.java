package com.example.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name ="DatosCovid")
@Table(name="DatosCovid")
public class Dtos {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idDatos")
	private int id;
	@Column(name="tasaInfectados")
	private double tasaInfectados;
	@Column(name="tasaRecuperados")
	private double tasaRecuperados;
	@Column
	private double tasafallecimientos;
	@Column
	private Date fecharegistro;
	
	
	public Dtos(int id, double tasaInfectados, double tasaRecuperados, double tasafallecimientos, Date fecharegistro) {
		super();
		this.id=id;
		this.tasaInfectados = tasaInfectados;
		this.tasaRecuperados = tasaRecuperados;
		this.tasafallecimientos = tasafallecimientos;
		this.fecharegistro = fecharegistro;
	}

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public double getTasaInfectados() {
		return tasaInfectados;
	}


	public void setTasaInfectados(double tasaInfectados) {
		this.tasaInfectados = tasaInfectados;
	}


	public double getTasaRecuperados() {
		return tasaRecuperados;
	}


	public void setTasaRecuperados(double tasaRecuperados) {
		this.tasaRecuperados = tasaRecuperados;
	}


	public double getTasafallecimientos() {
		return tasafallecimientos;
	}


	public void setTasafallecimientos(double tasafallecimientos) {
		this.tasafallecimientos = tasafallecimientos;
	}


	public Date getFecharegistro() {
		return fecharegistro;
	}


	public void setFecharegistro(Date fecharegistro) {
		this.fecharegistro = fecharegistro;
	}
	
	
}