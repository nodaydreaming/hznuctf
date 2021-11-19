package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.Utils.RSA;
import com.ctfplatform.hznuctf.dao.CompetitorDao;
import com.ctfplatform.hznuctf.entity.Competitor;
import com.ctfplatform.hznuctf.service.CompetitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
public class CompetitorServiceImpl implements CompetitorService {
    @Autowired
    private CompetitorDao competitorDao;
    @Override
    public Competitor login(String userAccount, String userPassword, String competitionNumber) {
        RSA rsa = new RSA();
        String pass = null;
        try {
            pass = RSA.testEncrypt(RSA.publicKey,userPassword);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            System.out.println("RSA解密失败");
        }
        return competitorDao.login(userAccount, pass, competitionNumber);
    }
}
