package com.ctfplatform.hznuctf.config;

import com.ctfplatform.hznuctf.filter.AdminSessionFilter;
import com.ctfplatform.hznuctf.filter.XFrameFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CTFWebConfig {

    @Bean
    public FilterRegistrationBean filterRegist(){
        FilterRegistrationBean frBean = new FilterRegistrationBean();
        frBean.setFilter(new AdminSessionFilter());
        frBean.addUrlPatterns(new String[]{"/*"});
        frBean.setOrder(2);
        return frBean;
    }
    @Bean
    public FilterRegistrationBean XFrameFilterRegist(){
        FilterRegistrationBean frBean = new FilterRegistrationBean();
        frBean.setFilter(new XFrameFilter());
        frBean.addUrlPatterns(new String[]{"/*"});
        frBean.setOrder(1);
        return frBean;
    }
}
