package ProductQnA.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
	
    private Long id;
    private String Statement;
    private String description;
    private String label;    
    private String productCode;
    private String userName;
    private Integer likeCount;
    private Integer CommentCount;
    private String createdDate;
    
}
