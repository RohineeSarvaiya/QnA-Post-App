package ProductQnA.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ProductQnA.Model.Question;
import ProductQnA.Model.User;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
	 
		
	    List<Question> findByUser(User user);
	    
	    @Query("SELECT q from question q where q.productCode like %?1%")
	    List<Question> findByProductcode(String productcode);
	    
	    @Query("SELECT q from question q where q.Statement like %?1%")
	    List<Question> findByStatement(String statement);
	    
	    @Query("SELECT q from question q where q.label like %?1%")
	    List<Question> findByLabel(String label);
	    
	    @Query("SELECT q from question q where q.createdDate=?1")
	    List<Question> findByCreateddate(String date);
	    
	    
	    @Query("SELECT q from question q where q.user.email like %?1%")
	    List<Question> findByUser(String email);

}
