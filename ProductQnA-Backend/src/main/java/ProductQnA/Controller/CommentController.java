package ProductQnA.Controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ProductQnA.Dto.CommentDto;
import ProductQnA.Service.CommentService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor

public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> createComment(@RequestBody CommentDto commentDto) {
    	
        commentService.save(commentDto);
        return new ResponseEntity<>(CREATED);
    }
    

    @GetMapping("/byquestion/{questionId}")
    public ResponseEntity<List<CommentDto>> getAllCommentsForQuestion(@PathVariable Long questionId) {
    	
        return ResponseEntity.status(OK)
                .body(commentService.getAllCommentsForQuestion(questionId));
    }
    

    @GetMapping("/byuser/{userName}")
    public ResponseEntity<List<CommentDto>> getAllCommentsForUser(@PathVariable String userName){
        return ResponseEntity.status(OK)
                .body(commentService.getAllCommentsForUser(userName));
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<List<CommentDto>> updateComment(@RequestBody CommentDto commentDto, @PathVariable Long id) {
		
    	commentService.updateComment(id, commentDto);
		return status(HttpStatus.OK).body(commentService.getAllCommentsForQuestion(commentDto.getQuestionId()));
    }
    

}