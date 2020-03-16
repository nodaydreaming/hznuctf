package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.Utils.RSA;
import com.ctfplatform.hznuctf.dao.UserDao;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JavaMailSender mailSender;

    //发送者邮箱固定
    @Value("${spring.mail.username}")
    private String from;

    @Override
    public List<User> listUser() {
        List<User> list = userDao.ListUser();
        RSA rsa = new RSA();
        for(User user : list){
            String password = null;
            try{
                password = RSA.testDecrypt(RSA.publicKey,user.getUserPassword());
                user.setUserPassword(password);
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
        }
        return list;
    }

    @Override
    public User queryUserById(int userId) {
        return userDao.queryUserByUserId(userId);
    }

    @Override
    public Map<String, Object> reset(String userAccount, String userEmail) {
        Map<String,Object> modelMap = new HashMap<>();
        User user = userDao.resetPassword(userAccount,userEmail);
        if(user != null){
            int random = (int)((Math.random()*9+1)*100000);
            String password = random+"";
            String pass = null;
            RSA rsa = new RSA();
            try{
                pass = RSA.testEncrypt(RSA.privateKey,password);
                User updateUser = new User();
                user.setUserAccount(userAccount);
                user.setUserPassword(pass);
                int effectedNum = userDao.updateUser(user);
                if(effectedNum>0){
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(from);
                    message.setTo(userEmail);
                    message.setSubject("HZNUCTF 账号密码重置");
                    String text = "您好，您的密码已重置为"+random;
                    message.setText(text);
                    mailSender.send(message);
                }
                else{
                    modelMap.put("message","重置密码失败");
                }
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                modelMap.put("message","操作失败");
                System.out.println("RSA加密失败");
            }
        }else{
            modelMap.put("message","您的账号和邮箱不匹配，请填写注册时的账号和邮箱");
        }
        return modelMap;
    }

    @Override
    public Map<String,Object> queryUserByAccountAndPassword(String account, String password) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String pass = null;
        RSA rsa = new RSA();
        try {
            pass = RSA.testEncrypt(RSA.publicKey, password);
            User user = new User();
            user = userDao.queryUserByAccountAndPassword(account,pass);
            if(user != null){
                modelMap.put("user",user);
            }else{
                modelMap.put("message","账号或密码错误");
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","密码加密失败");
        }
        return modelMap;
    }

    @Override
    public Map<String,Object> queryUserByAccount(String userAccount) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //根据账号查信息
        User user = userDao.queryUserByAccount(userAccount);
        if(user != null) {
            String password = user.getUserPassword();
            String pass = null;
            RSA rsa = new RSA();
            try {
                pass = RSA.testDecrypt(RSA.privateKey, password);   //解密
                user.setUserPassword(pass);
                modelMap.put("user", user);     //返回user对象
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e) {
                modelMap.put("message", "密码解密失败");
            }
        }else{
            modelMap.put("message","未找到该用户");
        }
        return modelMap;
    }

    @Transactional
    @Override
    public Map<String, Object> registe(User user) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String account  = user.getUserAccount();
        String password = user.getUserPassword();
        String tel = user.getUserTel();
        String name = user.getUserName();
        String nickname = user.getUserNickname();
        String academy = user.getUserAcademy();
        String userClass = user.getUserClass();
        String studentnumber = user.getUserStudentnumber();
        String email = user.getUserEmail();
        int gender = user.getUserGender();
        //判断必填信息是否为空
        if (account != null && !"".equals(account) && password != null && tel != null && name != null && nickname != null && academy != null && userClass != null && studentnumber != null && email != null &&
                !"".equals(password) && !"".equals(tel) && !"".equals(name) && !"".equals(nickname) && !"".equals(academy) && !"".equals(userClass) &&
                !"".equals(studentnumber) && !"".equals(email)) {
                //判断账号是否存在
                if(userDao.queryUserByAccount(account) == null){ //判断账号或者学号是否存在
                    if(userDao.queryUserByTel(user.getUserTel()) == null) {
                        if(userDao.queryUserByStudentnumber(user.getUserStudentnumber())==null) {
                            if(userDao.queryUserByEmail(user.getUserEmail())==null) {
                                String reg = "^[A-Za-z0-9]+$";
                                //正则判断账号密码格式
                                if (account.length() >= 3 && account.length() <= 20 && Pattern.matches(reg, account) && password.length() >= 3 && password.length() <= 20 && Pattern.matches(reg, password)) {
                                    if (studentnumber.length() == 13) {
                                        if (tel.length() == 11) {
                                            String pass = null;
                                            //RSA加密
                                            RSA rsa = new RSA();
                                            try {
                                                pass = RSA.testEncrypt(RSA.publicKey, password);
                                                user.setUserPassword(pass);
                                            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                                                    | BadPaddingException | InvalidKeyException | IOException e) {
                                                modelMap.put("message", "密码加密失败");
                                            }
                                            int effectedNum = userDao.insertUser(user);
                                            if (effectedNum > 0) {
                                            } else {
                                                modelMap.put("message", "注册账号失败");
                                            }
                                        } else {
                                            modelMap.put("message", "手机号码长度不正确");
                                        }
                                    } else {
                                        modelMap.put("message", "学号格式不正确");
                                    }
                                } else {
                                    modelMap.put("message", "账号或密码需要为3-20位数字字母组合");
                                }
                            }else{
                                modelMap.put("message","您注册的邮箱已存在");
                            }
                        }else{
                            modelMap.put("message","您注册的学号已存在");
                        }
                    }else{
                        modelMap.put("message","您注册的手机号码已存在");
                    }
                }else{
                    modelMap.put("message","您注册的账号已存在" );
                }
        } else {
            modelMap.put("message", "您注册的信息项不能为空");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> update(User user) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String account = user.getUserAccount();
        //判断账号是否为空
        if(account != null && !"".equals(account)){
            String password = user.getUserPassword();
            String tel = user.getUserTel();
            String name = user.getUserName();
            String nickname = user.getUserNickname();
            String academy = user.getUserAcademy();
            String userClass = user.getUserClass();
            String studentnumber = user.getUserStudentnumber();
            String email = user.getUserEmail();
            int gender = user.getUserGender();
            //判断必填信息是否为空
            if(password!=null && tel!=null && name!=null && nickname!=null && academy!=null && userClass!=null && studentnumber!=null && email!=null &&
                    !"".equals(password) && !"".equals(tel) && !"".equals(name) && !"".equals(nickname) && !"".equals(academy) && !"".equals(userClass) &&
                    !"".equals(studentnumber) && !"".equals(email)){
                String reg = "^[A-Za-z0-9]+$";
                //做密码校验
                if(password.length()>=3 && password.length()<=20 && Pattern.matches(reg,password)) {
                    if(tel.length() == 11) {
                        //如果通过手机号搜到对象 判断对象是不是自己 是的话继续 不是返回
                        if(userDao.queryUserByTelAndUserAccount(user.getUserTel(),user.getUserAccount()) == null) {
                            if(userDao.queryUserByStudentnumberAndUserAccount(user.getUserStudentnumber(),user.getUserAccount()) == null) {
                                if(userDao.queryUserByEmailAndUserAccount(user.getUserEmail(),user.getUserAccount()) == null) {
                                    String pass = null;
                                    //RSA加密
                                    RSA rsa = new RSA();
                                    try {
                                        pass = RSA.testEncrypt(RSA.publicKey, password);
                                        user.setUserPassword(pass);
                                    } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                                            | BadPaddingException | InvalidKeyException | IOException e) {
                                        modelMap.put("message", "密码加密失败");
                                    }
                                    int effectedNum = userDao.updateUser(user);
                                    if (effectedNum > 0) {
                                    } else {
                                        modelMap.put("message", "修改信息失败");
                                    }
                                }else{
                                    modelMap.put("message","您修改的邮箱已存在");
                                }
                            }else{
                                modelMap.put("message","您修改的学号已存在");
                            }
                        }else{
                            modelMap.put("message","您修改的手机号码已存在");
                        }
                    }else{
                        modelMap.put("message","手机号码长度不正确");
                    }
                }else{
                    modelMap.put("message","密码需要为3-20位数字字母组合");
                }
            }else{
                modelMap.put("message","您修改的信息项不能为空");
            }
        }else{
            modelMap.put("message","用户名不能为空");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> delete(String userAccount) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = userDao.deleteUser(userAccount);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除用户失败");
        }
        return modelMap;
    }
}
