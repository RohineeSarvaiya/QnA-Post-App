package ProductQnA.Mapper;

import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import ProductQnA.Dto.CommentDto;
import ProductQnA.Model.Comment;
import ProductQnA.Model.Question;
import ProductQnA.Model.User;

@Mapper(componentModel = "spring")
public abstract class CommentMapper {
	
	@Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentDto.text")
    @Mapping(target = "createdDate", expression = "java(getDate(java.time.Instant.now()))")
    @Mapping(target = "que", source = "question")
    @Mapping(target = "user", source = "user")
	@Mapping(target = "likeCount", source = "commentDto.likeCount")
	public abstract Comment map(CommentDto commentDto, Question question, User user);

    @Mapping(target = "questionId", expression = "java(comment.getQue().getQueId())")
    @Mapping(target = "userName", expression = "java(comment.getUser().getUsername())")
    public abstract CommentDto mapToDto(Comment comment);
    
    String getDate(Instant date) {
        String s[]= date.toString().substring(0, 10).split("-");
        String dateString  = s[2]+"-"+s[1]+"-"+s[0];
        return dateString ;
    }

}





