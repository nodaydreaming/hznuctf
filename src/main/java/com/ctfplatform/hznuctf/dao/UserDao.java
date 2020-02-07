package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.User;

import java.util.List;

public interface UserDao {
    List<User> ListUser();
    User queryUserByUserId(int userId);
    //判断用户名是否重复
    User queryUserByAccount(String userAccount);
    //判断学号是否重复
    User queryUserByStudentnumber(String userStudentnumber);
    //判断联系方式是否重复
    User queryUserByTel(String userTel);
    //判断邮箱是否重复 邮箱为找回密码唯一邮箱
    User queryUserByEmail(String userEmail);

    //用户更新时判断除自己外学号是否重复
    User queryUserByStudentnumberAndUserAccount(String userStudentnumber, String userAccount);
    //用户更新时判断除自己外联系方式是否重复
    User queryUserByTelAndUserAccount(String userTel, String userAccount);
    //用户更新时判断除自己外邮箱是否重复
    User queryUserByEmailAndUserAccount(String userEmail, String userAccount);


    List<User> queryUserByAccountOrStudentnumberOrTelOrEmail(String userAccount, String userStudentnumber, String userTel, String userEmail);
    User queryUserByAccountAndPassword(String userAccount, String userPassword);
    User resetPassword(String userAccount, String userEmail);
    int insertUser(User user);
    int updateUser(User user);
    int deleteUser(String userAccount);
}
