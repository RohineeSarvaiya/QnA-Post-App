package ProductQnA.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
	
	private Long id;
    private Long questionId;
    private String createdDate;
    private String text;
    private String userName;
    private Integer likeCount;
    
}
