package com.nuclear_kat.task_manager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final String SECRET_ACCESS_KEY = "472B4B6250655368566D597133743677397A244326462948404D635166546A57";

    @Value("${task_manager.jwtRefreshExpirationMs}")
    private int refreshExpirationDateInMs;
    @Value("${task_manager.jwtExpirationMs}")
    private int expirationDateInMs;

    // Получение email пользователя из токена
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Получение определённых данных из токена
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Генерация токена
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Генерация токена с ролями
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {
        if (extraClaims.values().isEmpty()) {
            extraClaims = getClaimsFromAuthorities(userDetails.getAuthorities());
        }
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationDateInMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Генерация refresh-токена для обновления access-токена
    public String generateRefreshToken(UserDetails userDetails) {
        return generateRefreshToken(new HashMap<>(), userDetails);
    }

    // Генерация refresh-токена для обновления access-токена с ролями
    public String generateRefreshToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {
        if (extraClaims.values().isEmpty()) {
            extraClaims = getClaimsFromAuthorities(userDetails.getAuthorities());
        }
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationDateInMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Проверка токена
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // Проверка истёк ли токена
    public boolean isTokenExpired(String token) throws ExpiredJwtException {
        try {
            return extractExpiration(token).before(new Date());
        } catch (ExpiredJwtException e) {
            return false;
        }
    }

    // Получение времени истечения токена
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Получение всех данных из токена
    private Claims extractAllClaims(String token) {
        Claims claims = new DefaultClaims();
        try {
            claims = Jwts
                    .parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims.put("Error", e.getMessage());
            System.out.println("THIS IS CLAIMS IN EXCEPTION:" + claims);
        }
        return claims;
    }

    // Получение ключа шифрования токена
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_ACCESS_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Конвертация ролей в подходящий для токена формат
    private static Map<String, Object> getClaimsFromAuthorities(Collection<? extends GrantedAuthority> auth) {
        Map<String, Object> extraClaims = new HashMap<>();
        Collection<String> authorities = auth
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        extraClaims.put("roles", authorities);
        return extraClaims;
    }
}
