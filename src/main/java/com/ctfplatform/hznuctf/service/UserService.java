package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> listUser();
    User queryUserById(int userId);
    //重置密码接口
    Map<String,Object> reset(String userAccount, String userEmail);
    //通过账号密码查用户 登录接口
    Map<String,Object> queryUserByAccountAndPassword(String account, String password);
    Map<String,Object> queryUserByAccount(String userAccount);
    Map<String,Object> registe(User user);
    Map<String,Object> update(User user);
    Map<String,Object> delete(String userAccount);
}
