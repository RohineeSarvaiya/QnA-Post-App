package ProductQnA.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames={"username","email"}))
public class User {
	
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userId;
    
    @Column(name = "username", length = 200, unique = true, nullable=false)
    private String username;
    
    private String firstName;
    
    private String lastName;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @Email
    @NotEmpty(message = "Email is required")
    @Column(name = "email", length = 200, unique = true, nullable=false)
    private String email;   

}