package edu.ssafy.punpun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PunpunApplication {

	public static void main(String[] args) {
		SpringApplication.run(PunpunApplication.class, args);
	}

}
