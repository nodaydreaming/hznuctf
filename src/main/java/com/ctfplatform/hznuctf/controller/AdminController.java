package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Admin;
import com.ctfplatform.hznuctf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    //登录接口
    @RequestMapping(value = "/adminLogin",method = RequestMethod.POST)
    private Map<String,Object> adminLogin(String adminAccount, String adminPassword, HttpServletRequest request){
        Map<String, Object> modelMap = new HashMap<>();
        if(adminAccount != null && adminPassword != null) {
            HttpSession session = request.getSession();
            Admin admin = adminService.queryAdminByAccountAndPassword(adminAccount, adminPassword);
            if (admin != null) {
                admin.setAdminPassword(adminPassword);
                session.setAttribute("admin", admin);
                modelMap.put("status", "success");
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", "账号或密码错误");
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "账号或密码不能为空");
        }
        return modelMap;
    }

    //显示所有管理员
    @RequestMapping(value = "/listAdmin",method = RequestMethod.POST)
    private Map<String,Object> listAdmin(){
        Map<String,Object> modelMap = new HashMap<>();
        List<Admin> list = adminService.ListAdmin();
        if(list.size() > 0){
            modelMap.put("status","success");
            modelMap.put("adminList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/reset",method = RequestMethod.POST)
    private Map<String,Object> reset(String adminAccount){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        Admin admin = new Admin();
        admin.setAdminAccount(adminAccount);
        admin.setAdminPassword("123456");
        returnMap = adminService.reset(admin);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("message","重置密码成功");
        }else{
            modelMap.put("status","error");
            modelMap.put("message","重置失败");
        }
        return modelMap;
    }

    //增加
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Admin admin){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = adminService.insert(admin);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    //管理员修改个人信息
    @RequestMapping(value = "/updateSelf",method = RequestMethod.POST)
    private Map<String,Object> updateSelf(Admin admin, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = adminService.update(admin);
        if(returnMap.get("message") == null){
            request.getSession().setAttribute("admin",admin);
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(String adminAccount){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = adminService.delete(adminAccount);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/back",method = RequestMethod.POST)
    private Map<String,Object> back(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        HttpSession session = request.getSession();
        try {
            session.removeAttribute("admin");
            modelMap.put("status","success");
        }catch (Exception e){
            modelMap.put("status","error");
            modelMap.put("message","退出失败");
        }
        return modelMap;
    }

    //获得用户登录状态或者个人状态
    @RequestMapping(value = "/getAdminMap",method = RequestMethod.POST)
    private Map<String,Object> getAdminMap(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        HttpSession session = request.getSession();
        Admin loginAdmin = (Admin) session.getAttribute("admin");
        modelMap.put("loginAdmin",loginAdmin);
        return modelMap;
    }

    //管理员获得自己信息
    @RequestMapping(value = "/getAdminSelf",method = RequestMethod.POST)
    private Map<String,Object> getAdminSelf(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        HttpSession session = request.getSession();
        Admin loginAdmin = (Admin) session.getAttribute("admin");
        Admin admin = adminService.queryAdminByAccount(loginAdmin.getAdminAccount());
        if(admin != null) {
            modelMap.put("status", "success");
            modelMap.put("loginAdmin", admin);
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "未找到信息");
        }
        return modelMap;
    }
}
