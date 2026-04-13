//
//
//package com.InstantLoad.PicknMove.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//
//import com.InstantLoad.PicknMove.model.LoginResponse;
//import com.InstantLoad.PicknMove.model.User;
//import com.InstantLoad.PicknMove.model.UserResponse;
//import com.InstantLoad.PicknMove.repository.UserRepository;
//import com.InstantLoad.PicknMove.security.JwtUtil;
//import com.InstantLoad.PicknMove.service.AuthService;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AuthController {
//
//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;
//    private final AuthService authService;
//    private final UserRepository userRepository;
//
//    public AuthController(AuthenticationManager authenticationManager,
//                          JwtUtil jwtUtil,
//                          AuthService authService,
//                          UserRepository userRepository) {
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//        this.authService = authService;
//        this.userRepository = userRepository;
//    }
//
//    // REGISTER
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        return ResponseEntity.ok(authService.register(user));
//    }
//
//    // LOGIN
////    @PostMapping("/login")
////    public ResponseEntity<?> login(@RequestBody User request) {
////
////        authenticationManager.authenticate(
////                new UsernamePasswordAuthenticationToken(
////                        request.getEmail(),
////                        request.getPassword()
////                )
////        );
////
////        String token = jwtUtil.generateToken(request.getEmail());
////
////        return ResponseEntity.ok(token);
////    }
// // LOGIN
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User request) {
//
//        // Authenticate user
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//
//        // Get user from database
//        User user = userRepository.findByEmail(request.getEmail());
//
//        // Generate token
//        String token = jwtUtil.generateToken(user.getEmail());
//
//        // Return token + role
//        return ResponseEntity.ok(
//                new LoginResponse(token, user.getRole())
//        );
//    }
//
//    // GET CURRENT LOGGED IN USER
////    @GetMapping("/me")
////    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
////
////        String email = authentication.getName();
////
////        User user = userRepository.findByEmail(email);
////
////        return ResponseEntity.ok(user);
////    }
//    @GetMapping("/me")
//    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
//
//        String email = authentication.getName();
//        User user = userRepository.findByEmail(email);
//
////        return ResponseEntity.ok(
////            new UserResponse(
////                user.getName(),
////                user.getEmail(),
////                user.getMobile(),
////                user.getRole()
////            )
////        );
//        
//        return ResponseEntity.ok(
//        	    new UserResponse(
//        	        user.getId(),
//        	        user.getName(),
//        	        user.getEmail(),
//        	        user.getMobile(),
//        	        user.getRole()
//        	    )
//        	);
//    }
//}




















package com.InstantLoad.PicknMove.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.InstantLoad.PicknMove.model.LoginResponse;
import com.InstantLoad.PicknMove.model.User;
import com.InstantLoad.PicknMove.model.UserResponse;
import com.InstantLoad.PicknMove.repository.UserRepository;
import com.InstantLoad.PicknMove.security.JwtUtil;
import com.InstantLoad.PicknMove.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          AuthService authService,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail());

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
                new LoginResponse(token, user.getRole())
        );
    }

    // GET CURRENT USER
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {

        // 🔥 FIXED: prevent null crash
        if (authentication == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email);

        return ResponseEntity.ok(
            new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                user.getRole()
            )
        );
    }
}