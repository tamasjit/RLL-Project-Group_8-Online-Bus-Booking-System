package com.obs.resource;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obs.entity.Admin;
import com.obs.entity.BookTicket;
import com.obs.entity.Bus;
import com.obs.entity.ChangePasswordDto;
import com.obs.entity.LoginDto;
import com.obs.entity.LoginForgetDto;
import com.obs.entity.Passenger;
import com.obs.entity.Ticket;
import com.obs.entity.User;
import com.obs.service.BusReservationService;

@RestController
@CrossOrigin
public class BusReservationController {

	@Autowired
	BusReservationService busService;
	
	//http://localhost:9090/registerorupdateuser
	@PostMapping(value="/registerorupdateuser")
	public User registerOrUpdateUser(@RequestBody User user) {
		User userPersisted =  busService.registerOrUpdateUser(user);
		//busService.sendEmail(userPersisted);
		return userPersisted;
		
	}
	
	//http://localhost:9090/addorupdatebus
	@PostMapping(value="/addorupdatebus")
	public Bus  addBus(@RequestBody Bus bus) {
		Bus busPersisted= busService.addBus(bus);
		return busPersisted;
	}

	//http://localhost:9090/updatebus
	@GetMapping(value="/updatebus")
	public int  updateBus(@RequestParam("busId") int busId,@RequestParam("source") String source,@RequestParam("destination") String destination, @RequestParam("fare") double fare) {
		int res=busService.updateBus(busId, source, destination, fare);
		return res;
	}

	
	//http://localhost:9090/login
	@PostMapping(value="/login")
	public boolean login(@RequestBody LoginDto dto) {
		
		boolean userPersisted;
		
		
		userPersisted= busService.loginUser(dto.getId(), dto.getPassword());
		
		return userPersisted;
	}
	
	//http://localhost:9090/loginadmin
	@PostMapping(value="/loginadmin")
	public Boolean loginAdmin(@RequestBody LoginDto dto) {
			
			Boolean adminPersisted =  busService.loginAdmin(dto.getId(), dto.getPassword());
			
			return adminPersisted;
		}

	
	//http://localhost:9090/changepassword
	@PutMapping(value="/changepassword")
	public boolean changePassword(@RequestBody ChangePasswordDto dto) {
		
		boolean result = busService.changePassword(dto.getUserId(),dto.getPassword());
		 return result;  
	}
	
	

	//http://localhost:9090/bookaticket
	@PostMapping(value="/bookaticket")
	public Ticket bookATicket(@RequestBody BookTicket bookTicket , @RequestParam("userId") int userId, @RequestParam("busId") int busId) {
		
		Ticket ticket = bookTicket.getTicket();
		 
	
		Bus bus = busService.chooseBus(busId);
		ticket.setBus(bus);
		
		User user = busService.findUser(userId);
		ticket.setUser(user);
		
		List<Passenger> passengers = bookTicket.getPassengers();
		

		ticket.setPassengers(passengers);
		
		for (int i = 0; i < passengers.size(); i++) {
			passengers.get(i).setTicket(ticket);
		}
		
		//Ticket ticketPersisted= busService.bookATicket(ticket);
		 return busService.bookATicket(ticket);
	//	busService.sendEmailOnBooking(ticketPersisted);
	//	success(ticket);
		
	}
	
	//http://localhost:9090/addtickettouser
	@GetMapping(value="addtickettouser")
	public Ticket addTicketToUserId(@RequestParam("ticketId") int ticketId,@RequestParam("userId") int userId) {
		Ticket ticket1 = busService.ticketDetails(ticketId);
		User user1 = busService.findUser(userId);
		ticket1.setUser(user1);
		Ticket ticketPersisted = busService.setTicketForUser(ticket1);
		return ticketPersisted;
	}
	
	//http://localhost:9090/sendmailonregistration
	@GetMapping(value="/sendmailonregistration")
	public boolean successRegistration(@RequestParam int userId) {
		User user = busService.findUser(userId);
		 busService.sendEmailOnRegistration(user);	
		 return true;
	}

	
	@GetMapping(value = "/sendEmail")
	public boolean success(@RequestParam("ticketId") int ticketId) {
		Ticket ticket1 = busService.ticketDetails(ticketId);
		
		boolean result = busService.sendEmailOnBooking(ticket1);
         return result;
	}
	
	//http://localhost:9090/searchbus
	@GetMapping(value="/searchbus")
	public List<Bus> searchBus(@RequestParam("source") String source,@RequestParam("destination") String destination) {
		// TODO Auto-generated method stub
		return busService.searchBus(source, destination);
	}


	
	@GetMapping(value="/getbusbyid")
	  public Bus chooseBus(@RequestParam("busId") int busId) { 
		  // TODO Auto-generated method stub return
	  return busService.chooseBus(busId); 
	  }
	 

	
	//http://localhost:9090/fetchbookedseats
	@GetMapping(value="/fetchbookedseats")
	public List<String> fetchBookedSeats(@RequestParam("travelDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate, @RequestParam("busId") 
	int busId) {
		// TODO Auto-generated method stub
		return busService.fetchBookedSeats(travelDate, busId);
	}

	//http://localhost:9090/frequentlytravelledroute
	@GetMapping(value="/frequentlytravelledroute")
	public List<Object[]> frequentlyTravelledRoute() {
		// TODO Auto-generated method stub
		return busService.frequentlyTravelledRoute();
	}

	//http://localhost:9090/viewallbuses
	@GetMapping(value="/viewallbuses")
	public List<Bus> viewAllBuses() {
		// TODO Auto-generated method stub
		return busService.viewAllBuses();
	}
	@GetMapping(value="/viewallbussource")
	public List<String> viewAllBusSource() {
		// TODO Auto-generated method stub
		return busService.viewAllBusSource();
	}
	@GetMapping(value="/viewallbusdestination")
	public List<String> viewAllDestination() {
		// TODO Auto-generated method stub
		return busService.viewAllDestination();
	}

	//http://localhost:9090/viewallregsiteredcustomers
	@GetMapping(value="/viewallregsiteredcustomers")
	public List<User> viewAllRegsiteredCustomers() {
		// TODO Auto-generated method stub
		return busService.viewAllRegsiteredCustomers();
	}

	//http://localhost:9090/viewcustomerwhoregisteredbutwithnobooking
	@GetMapping(value="/viewcustomerwhoregisteredbutwithnobooking")
	public List<User> viewCustomerWhoRegisteredButwithNoBooking() {
		return busService.viewCustomerWhoRegisteredButwithNoBooking();
	}

	
	//http://localhost:9090/rechargeWallet
	@GetMapping(value="/rechargeWallet")
	public User rechargeWallet(@RequestParam("userId") int userId,@RequestParam("rechargeAmount") int rechargeAmount) {
		// TODO Auto-generated method stub
		return busService.rechargeWallet(userId, rechargeAmount);
	}

	
	//http://localhost:9090/ticketDetails
	@GetMapping(value="/ticketDetails")
	public Ticket ticketDetails(@RequestParam("ticketId") int ticketId) {
		// TODO Auto-generated method stub
		return busService.ticketDetails(ticketId);
	}

	//http://localhost:9090/paythroughwallet
	@GetMapping(value="/paythroughwallet")
	public boolean payThroughWallet(@RequestParam("userId") int userId,@RequestParam("amount") double amount) {
		// TODO Auto-generated method stub
		return busService.payThroughWallet(userId, amount);
	}

	//http://localhost:9090/mostpreferredbus
	@GetMapping(value="/mostpreferredbus")
	public List<Integer> mostPreferredBus() {
		// TODO Auto-generated method stub
		return busService.mostPreferredBus();
	}

    //http://localhost:9090/cancelticket
	@DeleteMapping(value="/cancelticket")
	public boolean cancelTicket(@RequestParam("ticketId") int ticketId) {
		// TODO Auto-generated method stub
		return busService.cancelTicket(ticketId);
	}

    //http://localhost:9090/viewticketbookedbyuserid
	@GetMapping(value="/viewticketbookedbyuserid")
	public List<Ticket> viewTicketBookedByUserId(@RequestParam("userId") int userId) {
		// TODO Auto-generated method stub
		return busService.viewTicketBookedByUserId(userId);
	}
	
	
	//http://localhost:9090/getPassengerList
    @GetMapping(value="/getPassengerList")
	public List<Passenger> getPassengerList(@RequestParam("ticketId") int ticketId){
		return busService.getPassenger(ticketId);
	}
    
    //http://localhost:9090/getBusByTicketId
    @GetMapping(value="/getBusByTicketId")
    public Bus getBusByTicketId(@RequestParam("ticketId") int ticketId) {
    	return busService.getBus(ticketId);
    }
    
  //http://localhost:9090/finduserbyid
    @GetMapping(value="finduserbyid")
    public User findUser(@RequestParam int userId) {
    	return busService.findUser(userId);
    }
    
    //http://localhost:9090/bookingsbasedonperiod
    @GetMapping(value="bookingsbasedonperiod")
    public List<Ticket> findBookingBasedOnPeriod(@RequestParam("busId") int busId, @RequestParam("travelDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate){
    	return busService.bookingsBasedOnPeriod(busId, travelDate);
    }
    

    
   

  //http://localhost:9090/loginforgetpassword
  	@PostMapping(value="/loginforgetpassword")
  	public User loginForgetPassword(@RequestBody LoginForgetDto dto1) {
  		
  		User loginPersisted=busService.forgotPassword(dto1.getId(), dto1.getEmail());
  		
  		busService.sendEmailOnForgetPassword(loginPersisted);
  		return loginPersisted;
  	}
  	
    //http://localhost:9090/reschedule
  	@PutMapping(value = "reschedule")
  	public Ticket reschedule(@RequestParam("ticketId") int ticketId, @RequestParam("travelDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate travelDate,
  			@RequestBody List<String> seats) {
  		
  		return busService.rescheduleTicket(ticketId, travelDate, seats);
  	}
    
    

}
