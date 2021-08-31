package ProductQnA.Exception;

public class ResourceNotFound extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ResourceNotFound(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public ResourceNotFound(String exMessage) {
        super(exMessage);
    }

}
