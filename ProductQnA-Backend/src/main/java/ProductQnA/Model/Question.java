package ProductQnA.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@Entity(name="question")
@Table(name="question")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long queId;
    
    @NotBlank(message = "Question cannot be empty or Null")
    private String Statement;
    
    private String label;
    
    private String productCode;
    
    @Nullable
    @Lob
    private String description;
    
    private Integer likeCount ;
    
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
    
    private String createdDate;    
    
}
