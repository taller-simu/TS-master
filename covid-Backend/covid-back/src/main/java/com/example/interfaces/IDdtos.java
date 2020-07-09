package com.example.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.model.Dtos;

@Repository
public interface IDdtos extends JpaRepository<Dtos, Integer> {

}
