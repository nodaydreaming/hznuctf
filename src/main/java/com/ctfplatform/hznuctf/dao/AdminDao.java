package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Admin;

import java.util.List;

public interface AdminDao {
    List<Admin> ListAdmin();
    Admin queryAdminByAccount(String Account);
    Admin queryAdminByAccountAndPassword(String Account, String Password);
    Admin isSuper(int adminId);
    int insertAdmin(Admin admin);
    int updateAdmin(Admin admin);
    int deleteAdmin(String adminAccount);
}
