package com.obs.entity;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Bus {

	@Id
	@SequenceGenerator(name="bus_seq",initialValue=201,allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="bus_seq")
	int busId;
	String busName;
	String typeOfBus;
	String duration;
	LocalTime timeOfArrival;
	LocalTime timeOfDeparture;
	double fare;
	String source;
	String destination;
	
	@OneToMany(mappedBy="bus", cascade=CascadeType.ALL)
	List<Ticket> tickets;

	public int getbusId() {
		return busId;
	}

	public void setbusId(int busId) {
		busId = busId;
	}

	public String getBusName() {
		return busName;
	}

	public void setBusName(String busName) {
		this.busName = busName;
	}

	public String getTypeOfBus() {
		return typeOfBus;
	}

	public void setTypeOfBus(String typeOfBus) {
		this.typeOfBus = typeOfBus;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public LocalTime getTimeOfArrival() {
		return timeOfArrival;
	}

	public void setTimeOfArrival(LocalTime timeOfArrival) {
		this.timeOfArrival = timeOfArrival;
	}

	public LocalTime getTimeOfDeparture() {
		return timeOfDeparture;
	}

	public void setTimeOfDeparture(LocalTime timeOfDeparture) {
		this.timeOfDeparture = timeOfDeparture;
	}

	public double getFare() {
		return fare;
	}

	public void setFare(double fare) {
		this.fare = fare;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	@JsonIgnore
	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}	
	
	
}

