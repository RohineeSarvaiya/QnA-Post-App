package ProductQnA.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequest {
	
	private Long queId;
    private String Statement;
    private String label;    
    private String productCode;
    private String description;
    private String username;
    private Integer likeCount;
    
}
