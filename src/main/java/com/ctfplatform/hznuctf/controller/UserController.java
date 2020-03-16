package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getSelfInformation",method = RequestMethod.POST)
    private Map<String,Object> getSelfInformation(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();

        User user = (User) request.getSession().getAttribute("user");
        String userAccount = user.getUserAccount();
        returnMap = userService.queryUserByAccount(userAccount);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("user",returnMap.get("user"));
        }else{
            modelMap.put("status","success");
            modelMap.put("user",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/resetPassowrd",method = RequestMethod.POST)
    private Map<String,Object> resetPassword(String userAccount,String userEmail){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = userService.reset(userAccount,userEmail);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("message","重置后的密码已发送至您的邮箱");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/listUser",method = RequestMethod.POST)
    private Map<String,Object> listUser(){
        Map<String,Object> modelMap = new HashMap<>();
        List<User> list = userService.listUser();
        if(list.size() > 0){
            modelMap.put("status","success");
            modelMap.put("userList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/queryUserByuserAccount",method = RequestMethod.POST)
    private Map<String,Object> queryUserByuserAccount(String userAccount){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        List<User> list = new ArrayList<>();
        returnMap = userService.queryUserByAccount(userAccount);
        if(returnMap.get("user") != null){
            list.add((User)returnMap.get("user"));
            modelMap.put("status","success");
            modelMap.put("userList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    //登录
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    private Map<String,Object> login(String userAccount, String userPassword, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        if(userAccount != null && userPassword != null) {
            HttpSession session = request.getSession();
            Map<String, Object> returnMap = new HashMap<String, Object>();
            returnMap = userService.queryUserByAccountAndPassword(userAccount, userPassword);
            //登录没有错误
            if (returnMap.get("message") == null) {
                //强制类型转换获得User对象
                User user = (User) returnMap.get("user");
                user.setUserPassword(userPassword);
                session.setAttribute("user", user);
                modelMap.put("status", "success");
            } else {//登录有错误
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "账号或密码不能为空");
        }
        return modelMap;
    }

    //注册
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    private Map<String,Object> register(User user){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        synchronized (this) {
            returnMap = userService.registe(user);
            if (returnMap.get("message") == null) {
                modelMap.put("status", "success");
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }
        return modelMap;
    }

    //获得用户登录状态或者个人状态
    @RequestMapping(value = "/getUserMap",method = RequestMethod.POST)
    private Map<String,Object> getUserMap(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        HttpSession session = request.getSession();
        User loginUser = (User)session.getAttribute("user");
        modelMap.put("loginUser",loginUser);
        return modelMap;
    }

    //用户退出
    @RequestMapping(value = "/back",method = RequestMethod.POST)
    private Map<String,Object> back(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        HttpSession session = request.getSession();
        try {
            session.removeAttribute("user");
            modelMap.put("status","success");
        }catch (Exception e){
            modelMap.put("status","error");
            modelMap.put("message","退出失败");
        }
        return modelMap;
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(User user){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = userService.update(user);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("message","更新个人信息成功");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(String userAccount){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = userService.delete(userAccount);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
