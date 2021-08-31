package ProductQnA.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ProductQnA.Model.Comment;
import ProductQnA.Model.Question;
import ProductQnA.Model.User;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Comment> findByQue(Question question);

    List<Comment> findAllByUser(User user);

}
