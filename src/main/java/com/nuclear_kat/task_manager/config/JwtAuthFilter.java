//package com.nuclear_kat.task_manager.config;
//
//import com.nuclear_kat.task_manager.service.EmployeeService;
//import com.nuclear_kat.task_manager.service.EmployeeServiceImpl;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//import static org.springframework.http.HttpHeaders.AUTHORIZATION;
//
//public class JwtAuthFilter extends OncePerRequestFilter {
//
//    private EmployeeService employeeService;
//    @Override
//    protected void doFilterInternal(HttpServletRequest request
//            , HttpServletResponse response
//            , FilterChain filterChain) throws ServletException, IOException {
//        final String authHeader = request.getHeader(AUTHORIZATION);
//        final String userEmail;
//        final String jwtToken;
//
//        if (authHeader == null || !authHeader.startsWith("Kat")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        jwtToken = authHeader.substring(7);
//        userEmail = "something"; //TODO to be implemented
//        if (userEmail !=null && SecurityContextHolder.getContext().getAuthentication()==null){
//            UserDetails userDetails = employeeService.loadUserByUserName(userEmail);
//            final boolean isTokenValid; //TODO to be implemented;
//            if(isTokenValid){
//               UsernamePasswordAuthenticationToken authToken =
//                       new UsernamePasswordAuthenticationToken(
//                               userDetails, null, userDetails.getAuthorities());
//               authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//               SecurityContextHolder.getContext().setAuthentication(authToken);
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//}
