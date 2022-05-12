package com.obs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.obs")
@EntityScan("com.obs")
public class ObsTravelsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ObsTravelsApplication.class, args);
	}

}
