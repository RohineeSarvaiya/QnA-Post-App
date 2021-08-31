package ProductQnA;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;

import ProductQnA.Config.SwaggerConfiguration;

@SpringBootApplication
@EnableAsync
@Import(SwaggerConfiguration.class)
public class ProductQnABackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductQnABackendApplication.class, args);
		System.out.println("Started...");
	}

}
