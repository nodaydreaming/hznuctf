package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.Utils.RSA;
import com.ctfplatform.hznuctf.dao.AdminDao;
import com.ctfplatform.hznuctf.entity.Admin;
import com.ctfplatform.hznuctf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminDao adminDao;

    @Override
    public Admin isSuper(int adminId) {
        return adminDao.isSuper(adminId);
    }

    @Override
    public List<Admin> ListAdmin() {
        List<Admin> list = adminDao.ListAdmin();
        for(Admin admin : list){
            String password = null;
            RSA rsa = new RSA();
            try{
                password = RSA.testDecrypt(RSA.privateKey, admin.getAdminPassword());
                admin.setAdminPassword(password);
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
        }
        return list;
    }

    @Override
    public Admin queryAdminByAccountAndPassword(String Account, String Password) {
        String pass = null;
        RSA rsa = new RSA();
        try {
            pass = RSA.testEncrypt(RSA.publicKey, Password);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            System.out.println("管理员登录密码加密失败");;
        }
        return adminDao.queryAdminByAccountAndPassword(Account,pass);
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Admin admin) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //判断账号是否存在
        if(adminDao.queryAdminByAccount(admin.getAdminAccount()) == null) {
            String account = admin.getAdminAccount();
            String password = admin.getAdminPassword();
            String tel = admin.getAdminTel();
            //判断必填项是否为空
            if (account != null && password != null && tel != null) {
                String reg = "^[A-Za-z0-9]+$";
                //判断组合格式正确
                if(account.length()>=3 && account.length()<=20 && Pattern.matches(reg,account) && password.length()>=3 && password.length()<=20 && Pattern.matches(reg,password)) {
                    if(tel.length() == 11) {
                        RSA rsa = new RSA();
                        String pass = null;
                        try {
                            pass = RSA.testEncrypt(RSA.publicKey, password);
                            admin.setAdminPassword(pass);
                        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                                | BadPaddingException | InvalidKeyException | IOException e) {
                            modelMap.put("message", "密码加密失败");
                        }
                        int effectedNum = adminDao.insertAdmin(admin);
                        if (effectedNum > 0) {
                        } else {
                            modelMap.put("message", "增加管理员失败");
                        }
                    }else{
                        modelMap.put("message","手机号长度不正确");
                    }
                }else{
                    modelMap.put("meesage","账号或密码需要为3-20位数字字母组合");
                }
            } else {
                modelMap.put("message", "必填信息项不能为空");
            }
        }else{
            modelMap.put("message","您添加的账号已存在");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> update(Admin admin) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //判断账号不为空
        if(admin.getAdminAccount() != null && !"".equals(admin.getAdminAccount())){
            String account = admin.getAdminAccount();
            String password = admin.getAdminPassword();
            String reg = "^[A-Za-z0-9]+$";
            //判断格式正确
            if(account.length()>=3 && account.length()<=20 && Pattern.matches(reg,account) && password.length()>=3 && password.length()<=20 && Pattern.matches(reg,password)) {
                if (admin.getAdminPassword() != null && !"".equals(admin.getAdminPassword())) {  //要更改密码
                    if(admin.getAdminTel().length() == 11) {
                        RSA rsa = new RSA();
                        String pass = null;
                        try {
                            pass = RSA.testEncrypt(RSA.publicKey, password);
                            admin.setAdminPassword(pass);
                        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                                | BadPaddingException | InvalidKeyException | IOException e) {
                            modelMap.put("message", "密码加密失败");
                        }
                        int effectedNum = adminDao.updateAdmin(admin);
                        if (effectedNum > 0) {

                        } else {
                            modelMap.put("message", "修改失败");
                        }
                    } else {
                        modelMap.put("message", "增加管理员失败");
                    }
                } else {
                    modelMap.put("message", "密码不能为空");
                }
            }else{
                modelMap.put("meesage","账号或密码需要为3-20位数字字母组合");
            }
        }else{
            modelMap.put("message","账号不能为空");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> delete(String adminAccount) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int infectedNum = adminDao.deleteAdmin(adminAccount);
        if(infectedNum>0){}
        else{
            modelMap.put("message","删除管理员失败");
        }
        return modelMap;

    }

    @Override
    public Map<String, Object> reset(Admin admin) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String password = null;
        RSA rsa = new RSA();
        try{
            password = RSA.testEncrypt(RSA.publicKey,admin.getAdminPassword());
            admin.setAdminPassword(password);
            int infectedNum = adminDao.updateAdmin(admin);
            if(infectedNum>0){}
            else{
                modelMap.put("message","删除管理员失败");
            }
        }
        catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                                | BadPaddingException | InvalidKeyException | IOException e) {
            modelMap.put("message", "密码加密失败");
        }
        return modelMap;
    }

    @Override
    public Admin queryAdminByAccount(String adminAccount){
        String password = null;
        RSA rsa = new RSA();
        Admin admin = adminDao.queryAdminByAccount(adminAccount);
        try {
            password = RSA.testDecrypt(RSA.privateKey, admin.getAdminPassword());
            admin.setAdminPassword(password);
        }         catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e) {
            System.out.println("AdminServiceImpl密码解密失败");
        }
        return admin;
    }
}
