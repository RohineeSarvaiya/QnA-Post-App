package ProductQnA.Mapper;

import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import ProductQnA.Dto.QuestionRequest;
import ProductQnA.Dto.QuestionResponse;
import ProductQnA.Model.Question;
import ProductQnA.Model.User;

import ProductQnA.Repository.CommentRepository;



@Mapper(componentModel = "spring")
public abstract class QuestionMapper {
	
	@Autowired
    private CommentRepository commentRepository;
   
	
	@Mapping(target = "createdDate", expression = "java(getDate(java.time.Instant.now()))")
    @Mapping(target = "description", source = "questionRequest.description")
    @Mapping(target = "Statement", source = "questionRequest.statement")
    @Mapping(target = "likeCount", source = "questionRequest.likeCount")
    @Mapping(target = "user", source = "user")
	public abstract Question map(QuestionRequest questionRequest , User user);

    @Mapping(target = "id", source = "queId")
    @Mapping(target = "userName", source = "user.username")
    @Mapping(target = "commentCount", expression = "java(commentCount(question))")  
    public abstract QuestionResponse mapToDto(Question question);

    
    Integer commentCount(Question question) {
        return commentRepository.findByQue(question).size();
    }
    
  
    String getDate(Instant date) {
        String s[]= date.toString().substring(0, 10).split("-");
        String dateString  = s[2]+"-"+s[1]+"-"+s[0];
        return dateString ;
    }
    
    
}

 

