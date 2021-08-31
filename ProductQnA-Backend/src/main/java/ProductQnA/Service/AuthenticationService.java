package ProductQnA.Service;

import java.time.Instant;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ProductQnA.Dto.AuthenticationResponse;
import ProductQnA.Dto.LoginRequest;
import ProductQnA.Dto.RefreshTokenRequest;
import ProductQnA.Dto.RegisterRequest;
import ProductQnA.Model.User;
import ProductQnA.Repository.UserRepository;
import ProductQnA.Security.JwtProvider;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class AuthenticationService {
	
	
	 private final UserRepository userRepository;
	 private final AuthenticationManager authenticationManager;
	 private final JwtProvider jwtProvider;
	 private final PasswordEncoder passwordEncoder;
	 private final RefreshTokenService refreshTokenService;
	
	public void signup(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));       
        
        userRepository.save(user);

	}

	public AuthenticationResponse login(LoginRequest loginRequest) {
		Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));
		 SecurityContextHolder.getContext().setAuthentication(authenticate);
		 String token = jwtProvider.generateToken(authenticate);
		
		 return AuthenticationResponse.builder()
	                .authenticationToken(token)
	                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
	                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
	                .username(loginRequest.getUsername())
	                .build();                
	}
	
	
	@Transactional
    public User getCurrentUser(String username) {
		//Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		//String username = loggedInUser.getName();
		System.out.println(username);
        User use =  userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + username));
        
        return use;
    }

	
	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUserName(refreshTokenRequest.getUsername());
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(refreshTokenRequest.getUsername())
                .build();
    }
	
	 

}
