package ProductQnA.Service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ProductQnA.Dto.QuestionRequest;
import ProductQnA.Dto.QuestionResponse;
import ProductQnA.Exception.ResourceNotFound;
import ProductQnA.Mapper.QuestionMapper;
import ProductQnA.Model.Question;
import ProductQnA.Model.User;
import ProductQnA.Repository.QuestionRepository;
import ProductQnA.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import static java.util.stream.Collectors.toList;




@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class QuestionService {
	
	private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AuthenticationService authService;
    private final QuestionMapper questionMapper;
	
    @Transactional
	public Question save(QuestionRequest questionRequest) {
		
		 return questionRepository.save(questionMapper.map(questionRequest, authService.getCurrentUser(questionRequest.getUsername())));
    }
    
	
	@Transactional
    public QuestionResponse getQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(id.toString()));
        return questionMapper.mapToDto(question);
    }
	
	
	@Transactional
    public Question updateQuestion(Long id ,QuestionRequest questionRequest) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(id.toString()));
        question.setLikeCount(questionRequest.getLikeCount());
        return questionRepository.save(question);
    }
	

    @Transactional
    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }


    @Transactional
    public List<QuestionResponse> getQuestionsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return questionRepository.findByUser(user)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public List<QuestionResponse> getQuestionsByProductCode(String productcode) {
        return questionRepository.findByProductcode(productcode)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public List<QuestionResponse> getQuestionsByStatement(String statement) {
        return questionRepository.findByStatement(statement)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public List<QuestionResponse> getQuestionsByUseremail(String email) {
        return questionRepository.findByUser(email)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public List<QuestionResponse> getQuestionsByLabel(String label) {
        return questionRepository.findByLabel(label)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
    
    @Transactional
    public List<QuestionResponse> getQuestionsByDate(String date) {
        return questionRepository.findByCreateddate(date)
                .stream()
                .map(questionMapper::mapToDto)
                .collect(toList());
    }
    
}
