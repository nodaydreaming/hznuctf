package com.ctfplatform.hznuctf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class HZNUctfApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
        return builder.sources(HZNUctfApplication.class);
    }
    //注释至此处
    public static void main(String[] args) {
        SpringApplication.run(HZNUctfApplication.class, args);
    }

}
