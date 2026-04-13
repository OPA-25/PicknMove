//
//
//
//
//
//
//
//package com.InstantLoad.PicknMove.security;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.*;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//
//import com.InstantLoad.PicknMove.service.CustomUserDetailsService;
//
//import java.io.IOException;
//
//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//    private final CustomUserDetailsService userDetailsService;
//
//    public JwtFilter(JwtUtil jwtUtil,
//                     CustomUserDetailsService userDetailsService) {
//        this.jwtUtil = jwtUtil;
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String authHeader = request.getHeader("Authorization");
//
//        try {
//
//            // ✅ Only process token if present
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//
//                String token = authHeader.substring(7);
//                String email = jwtUtil.extractEmail(token);
//
//                if (email != null &&
//                        SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                    var userDetails = userDetailsService.loadUserByUsername(email);
//
//                    var authToken = new UsernamePasswordAuthenticationToken(
//                            userDetails,
//                            null,
//                            userDetails.getAuthorities()
//                    );
//
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//            }
//
//        } catch (Exception e) {
//
//            // ❌ Invalid token
//            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//            return;
//        }
//
//        // Continue request
//        filterChain.doFilter(request, response);
//    }
//}






//
//
//package com.InstantLoad.PicknMove.security;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.*;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//
//import com.InstantLoad.PicknMove.service.CustomUserDetailsService;
//
//import java.io.IOException;
//
//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//    private final CustomUserDetailsService userDetailsService;
//
//    public JwtFilter(JwtUtil jwtUtil,
//                     CustomUserDetailsService userDetailsService) {
//        this.jwtUtil = jwtUtil;
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String path = request.getRequestURI();
//
//        // 🔥 BYPASS PUBLIC APIs (IMPORTANT FIX)
//        if (
//            path.startsWith("/api/auth") ||
//            path.startsWith("/api/bookings") ||
//            path.startsWith("/api/payments") ||  // 🔥 ADDED
//            path.startsWith("/api/vehicles") ||
//            path.startsWith("/api/drivers") ||
//            path.startsWith("/api/location") ||
//            path.startsWith("/ws")
//        ) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String authHeader = request.getHeader("Authorization");
//
//        try {
//
//            // ✅ Only process token if present
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//
//                String token = authHeader.substring(7);
//                String email = jwtUtil.extractEmail(token);
//
//                if (email != null &&
//                        SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                    var userDetails = userDetailsService.loadUserByUsername(email);
//
//                    var authToken = new UsernamePasswordAuthenticationToken(
//                            userDetails,
//                            null,
//                            userDetails.getAuthorities()
//                    );
//
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//            }
//
//        } catch (Exception e) {
//
//            // ❌ Instead of blocking, just continue (SAFE FIX)
//            System.out.println("⚠️ JWT Error: " + e.getMessage());
//        }
//
//        // Continue request
//        filterChain.doFilter(request, response);
//    }
//}













package com.InstantLoad.PicknMove.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.InstantLoad.PicknMove.service.CustomUserDetailsService;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil,
                     CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // 🔥 FIXED: Only bypass login & register (NOT /me)
        if (
            path.equals("/api/auth/login") ||
            path.equals("/api/auth/register") ||
            path.startsWith("/api/bookings") ||
            path.startsWith("/api/payments") ||
            path.startsWith("/api/vehicles") ||
            path.startsWith("/api/drivers") ||
            path.startsWith("/api/location") ||
            path.startsWith("/ws")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        try {

            // ✅ Only process token if present
            if (authHeader != null && authHeader.startsWith("Bearer ")) {

                String token = authHeader.substring(7);
                String email = jwtUtil.extractEmail(token);

                if (email != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                    var userDetails = userDetailsService.loadUserByUsername(email);

                    // 🔥 ADDED VALIDATION
                    if (jwtUtil.validateToken(token, userDetails)) {

                        var authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            }

        } catch (Exception e) {

            // ❌ Keep your existing handling (NOT removed)
            System.out.println("⚠️ JWT Error: " + e.getMessage());
        }

        // Continue request
        filterChain.doFilter(request, response);
    }
}