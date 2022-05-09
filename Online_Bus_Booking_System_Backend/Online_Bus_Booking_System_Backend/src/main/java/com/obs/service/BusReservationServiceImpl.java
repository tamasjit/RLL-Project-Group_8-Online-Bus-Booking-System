package com.obs.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obs.entity.Admin;
import com.obs.entity.Bus;
import com.obs.entity.Passenger;
import com.obs.entity.Ticket;
import com.obs.entity.User;
import com.obs.exception.CustomerServiceException;
import com.obs.repository.BusReservationDao;
import com.obs.repository.BusReservationDaoImpl;

@Service
public class BusReservationServiceImpl implements BusReservationService {

	@Autowired
	BusReservationDao busDao;

	@Autowired
	EmailService emailservice;

	public User registerOrUpdateUser(User user) {
		return busDao.registerOrUpdateUser(user);
	}

	public Bus addBus(Bus bus) {
		return busDao.addBus(bus);
	}

	public boolean loginUser(int userId, String password) {
		// TODO Auto-generated method stub
		return busDao.loginUser(userId, password);
	}

	public boolean changePassword(int userId, String password) {
		// TODO Auto-generated method stub
		return busDao.changePassword(userId, password);
	}

	public Ticket bookATicket(Ticket ticket) {
		// TODO Auto-generated method stub
		return busDao.bookATicket(ticket);
	}

	public List<Bus> searchBus(String source, String destination) {
		// TODO Auto-generated method stub
		return busDao.searchBus(source, destination);
	}

	public Bus chooseBus(int busId) {
		// TODO Auto-generated method stub
		return busDao.chooseBus(busId);
	}

	public List<String> fetchBookedSeats(LocalDate travelDate, int busId) {
		// TODO Auto-generated method stub
		return busDao.fetchBookedSeats(travelDate, busId);
	}

	public List<Object[]> frequentlyTravelledRoute() {
		// TODO Auto-generated method stub
		return busDao.frequentlyTravelledRoute();
	}

	public List<Bus> viewAllBuses() {
		// TODO Auto-generated method stub
		return busDao.viewAllBuses();
	}

	public List<User> viewAllRegsiteredCustomers() {
		// TODO Auto-generated method stub
		return busDao.viewAllRegsiteredCustomers();
	}

	public List<User> viewCustomerWhoRegisteredButwithNoBooking() {
		// TODO Auto-generated method stub
		return busDao.viewCustomerWhoRegisteredButwithNoBooking();
	}

	public User rechargeWallet(int userId, int rechargeAmount) {
		// TODO Auto-generated method stub
		return busDao.rechargeWallet(userId, rechargeAmount);
	}

	public Ticket ticketDetails(int ticketId) {
		// TODO Auto-generated method stub
		return busDao.ticketDetails(ticketId);
	}

	public boolean payThroughWallet(int userId, double amount) {
		// TODO Auto-generated method stub
		return busDao.payThroughWallet(userId, amount);
	}

	public List<Integer> mostPreferredBus() {
		// TODO Auto-generated method stub
		return busDao.mostPreferredBus();
	}

	public boolean cancelTicket(int ticketId) {
		// TODO Auto-generated method stub
		return busDao.cancelTicket(ticketId);
	}

	public List<Ticket> viewTicketBookedByUserId(int userId) {
		// TODO Auto-generated method stub
		return busDao.viewTicketBookedByUserId(userId);
	}

	@Override
	public User findUser(int userId) {
		return busDao.findUser(userId);
	}

	@Override
	public Boolean loginAdmin(int adminId, String password) {
		// TODO Auto-generated method stub
		return busDao.loginAdmin(adminId, password);
	}

	// @Override
//	public void sendEmail(User user) {
//		if(!busDao.isCustomerPresent(user.getEmail())) {
//			User user1 = null;
//			user1=busDao.registerOrUpdateUser(user);
//			String subject = "Registration confirmation";
//			String text = "Hi "+user.getFirstName()+" "
//					+ " You have been Successfully registered. "+"Your userId is "+user.getUserId()+". "+"Please use this to login";
//			emailservice.sendEmailForNewRegistration(user.getEmail(),text,subject);
//			System.out.println("Mail sent");
//		
//			
//		}
//		else
//			throw new CustomerServiceException("Customer already registered!");
//		
//	}

	@Override
	public List<Passenger> getPassenger(int ticketId) {
		// TODO Auto-generated method stub
		return busDao.getPassenger(ticketId);
	}

	@Override
	public Bus getBus(int ticketId) {
		// TODO Auto-generated method stub
		return busDao.getBus(ticketId);
	}

	@Override
	public int updateBus(int busId, String source, String destination, double fare) {

		return busDao.updateBus(busId, source, destination, fare);
	}

	@Override
	public List<Ticket> bookingsBasedOnPeriod(int busId, LocalDate travelDate) {
		return busDao.bookingsBasedOnPeriod(busId, travelDate);
	}

	@Override
	public void sendEmailOnRegistration(User user) {
		String subject = "Registration confirmation";

		String text = "Hi " + user.getFirstName() + "\n " + " You have been Successfully registered. \n"
				+ "Your userId is " + user.getUserId() + ".\n " + "Please use this to login";

		emailservice.sendEmailForNewRegistration(user.getEmail(), text, subject);
		System.out.println("Mail sent");

	}

	@Override
	public boolean sendEmailOnBooking(Ticket ticket) {

		String subject = "Ticket confirmation";

		StringBuffer text = new StringBuffer();
		text.append("Hi " + ticket.getUser().getFirstName() + ".\n " + "Your ticket has been successfully booked.\n"
				+ "Your Ticket Id is " + ticket.getTicketId() + ".\n " + "Source : " + ticket.getBus().getSource()
				+ " Destination : " + ticket.getBus().getDestination() + "\n" + "Departure Time : "
				+ ticket.getBus().getTimeOfDeparture() + " Arrival Time : " + ticket.getBus().getTimeOfArrival()
				+ "\n");

		for (int i = 0; i < ticket.getNoOfPassengers(); i++) {
			text.append("Passenger Name : " + ticket.getPassengers().get(i).getPassengerName() + " Passenger SeatNo : "
					+ ticket.getPassengers().get(i).getSeatNo() + "\n");
		}

		text.append("Total Amount : " + ticket.getTotalAmount());

		emailservice.sendEmailForBooking(ticket.getEmail(), text, subject);

		System.out.println("Mail sent");
		return true;

	}

	public User forgotPassword(int userId, String email) {

		return busDao.forgotPassword(userId, email);
	}

	@Override
	public void sendEmailOnForgetPassword(User user) {

		String subject = "Please click on the link given below to reset the password.";

		String text = "Your reset password link : " + "http://localhost:4200/forgotLink";
		emailservice.sendEmailForForgetPassword(user.getEmail(), subject, text);
		System.out.println("Mail sent");

	}


	@Override
	public Ticket rescheduleTicket(int ticketId, LocalDate travelDate, List<String> seats) {
		// TODO Auto-generated method stub
		return busDao.rescheduleTicket(ticketId, travelDate, seats);
	}


	

	@Override
	public Ticket setTicketForUser(Ticket ticket) {
		return busDao.setTicketForUser(ticket);
	}


}
