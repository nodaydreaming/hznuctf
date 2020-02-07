package com.ctfplatform.hznuctf.filter;

import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(
        filterName = "AdminSessionFilter",
        urlPatterns = {""}
)
@Order(2)
public class AdminSessionFilter implements Filter {
    public AdminSessionFilter(){

    }
    @Override
    public void init(FilterConfig filterConfig) throws ServletException{

    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        HttpSession session = request.getSession(false);
        HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper((HttpServletResponse)servletResponse);
        String currentURL = request.getRequestURI();
        String targetURL = currentURL.substring(currentURL.indexOf("/", 1));
        if(targetURL.contains(".html")) {
            if (targetURL.contains("ctf_admin") && (!targetURL.contains("login")) && (session == null || session.getAttribute("admin") == null)) {
                wrapper.sendRedirect("/hznuctf/admin/ctf_admin/login/login.html");
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}
