package com.dakodelabs.maintenance_app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(
                auth -> auth.requestMatchers("/uri").authenticated()
                        .anyRequest().permitAll()

        ).csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()
//                )
//                .httpBasic(Customizer.withDefaults())
//                .csrf(c -> {
//                    c.ignoringRequestMatchers("/white");
//                });
//
//        return httpSecurity.build();
//
//    }

}
