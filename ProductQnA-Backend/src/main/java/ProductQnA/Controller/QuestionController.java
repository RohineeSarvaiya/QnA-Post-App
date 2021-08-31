package ProductQnA.Controller;

import ProductQnA.Dto.QuestionRequest;
import ProductQnA.Dto.QuestionResponse;
import ProductQnA.Service.QuestionService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/questions")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class QuestionController {
	
	private QuestionService questionService;
	
	@PostMapping
    public ResponseEntity<Void> createQuetion(@RequestBody QuestionRequest queRequest) {
		
		questionService.save(queRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
	

    @GetMapping
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return status(HttpStatus.OK).body(questionService.getAllQuestions());
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestion(@PathVariable Long id) {
        return status(HttpStatus.OK).body(questionService.getQuestion(id));
    }
    

    @GetMapping("/username/{name}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByUsername(@PathVariable String name) {
        return status(HttpStatus.OK).body(questionService.getQuestionsByUsername(name));
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<List<QuestionResponse>> updateQuetion(@RequestBody QuestionRequest queRequest, @PathVariable Long id) {
		
		questionService.updateQuestion(id, queRequest);
		return status(HttpStatus.OK).body(questionService.getAllQuestions());
    }
    
    
    @GetMapping("/productcode/{productcode}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByProductCode(@PathVariable String productcode) {
        return status(HttpStatus.OK).body(questionService.getQuestionsByProductCode(productcode));
    }
    
    
    @GetMapping("/statement/{statement}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByStatement(@PathVariable String statement) {
        return status(HttpStatus.OK).body(questionService.getQuestionsByStatement(statement));
    }
    
    
    @GetMapping("/useremail/{email}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByUseremail(@PathVariable String email) {
        return status(HttpStatus.OK).body(questionService.getQuestionsByUseremail(email));
    }

    @GetMapping("/label/{label}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByLabel(@PathVariable String label) {
        return status(HttpStatus.OK).body(questionService.getQuestionsByLabel(label));
    }
    
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByDate(@PathVariable String date) {
    	
        return status(HttpStatus.OK).body(questionService.getQuestionsByDate(date));
    }
    
    
}
