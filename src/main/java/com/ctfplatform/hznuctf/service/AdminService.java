package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Admin;

import java.util.List;
import java.util.Map;

public interface AdminService {
    //判断权限是否超级管理员
    Admin isSuper(int adminId);
    //获得管理员列表
    List<Admin> ListAdmin();
    //登录判断
    Admin queryAdminByAccountAndPassword(String Account, String Password);
    //添加管理员
    Map<String,Object> insert(Admin admin);
    //更新管理员
    Map<String,Object> update(Admin admin);
    //删除管理员
    Map<String,Object> delete(String adminAccount);
    //重置密码为123456
    Map<String,Object> reset(Admin admin);
    Admin queryAdminByAccount(String adminAccount);
}
