package ProductQnA.Service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ProductQnA.Exception.ResourceNotFound;
import ProductQnA.Mapper.CommentMapper;
import ProductQnA.Dto.CommentDto;
import ProductQnA.Model.Comment;
import ProductQnA.Model.Question;
import ProductQnA.Model.User;
import ProductQnA.Repository.CommentRepository;
import ProductQnA.Repository.QuestionRepository;
import ProductQnA.Repository.UserRepository;

import java.util.List;

import javax.transaction.Transactional;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class CommentService {
	
	private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AuthenticationService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    
    @Transactional
    public void save(CommentDto commentDto) {
        Question question = questionRepository.findById(commentDto.getQuestionId())
                .orElseThrow(() -> new ResourceNotFound(commentDto.getQuestionId().toString()));
        
        Comment comment = commentMapper.map(commentDto, question, authService.getCurrentUser(commentDto.getUserName()) );
        commentRepository.save(comment);

    }
    
    
    @Transactional
    public List<CommentDto> getAllCommentsForQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFound(questionId.toString()));
        return commentRepository.findByQue(question)
                .stream()
                .map(commentMapper::mapToDto).collect(toList());
    }
    
    
    @Transactional
    public List<CommentDto> getAllCommentsForUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public Comment updateComment(Long id ,CommentDto commentDto) {
    	Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(id.toString()));
        comment.setLikeCount(commentDto.getLikeCount());
        return commentRepository.save(comment);
    }

}
