package com.obs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;

import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.obs.entity.Bus;
import com.obs.service.BusReservationServiceImpl;

@SpringBootTest
class ObsTravelsApplicationTests {
	@Autowired
	BusReservationServiceImpl busreservationserviceimpl = new BusReservationServiceImpl();
/*	@Autowired 
	BusDetailRepositoryImpl busDetailRepositoryImpl = new BusDetailRepositoryImpl();
	@Autowired
	BusSeatesDetailsRepositoryImpl busSeatesDetailsRepositoryImpl = new BusSeatesDetailsRepositoryImpl();
	
	@Autowired
	ReservationDetailsRepositoryImpl reservationDetailsRepositoryImpl;
	
	@Autowired
	PaymentDetailsRepositoryImpl     paymentDetailsRepositoryImpl;
	
	
	@Autowired
	TransactionDetailsRepositoryImpl transactionDetailsRepositoryImpl;
	
	@Autowired
    WalletController walletController;
	
	@Autowired 
	WalletServiceImpl walletServiceImpl;
	
	
	@Autowired
	UserRepositoryImplementation userRepoImpl;
	
	@Autowired
	AdminRepositoryImplementation adminRepoImpl;
	
	@Autowired
	BusRepositoryImplementation busRepoImpl;
*/
	@Test
	void contextLoads() {
	}
	
	
		
		
		
		
		
		
		
		
		
		
		
		
}	
		
		
		
		
		
		
		
	