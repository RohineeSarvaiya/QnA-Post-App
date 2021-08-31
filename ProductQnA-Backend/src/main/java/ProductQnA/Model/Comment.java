package ProductQnA.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comment {
	
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    
    @NotEmpty
    @Lob
    private String text;
    
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "queId", referencedColumnName = "queId")
    private Question que;
    
    private String createdDate;
    
    private Integer likeCount;
    
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
    
}