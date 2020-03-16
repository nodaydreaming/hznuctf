package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.Utils.RSA;
import com.ctfplatform.hznuctf.dao.QuestionListDao;
import com.ctfplatform.hznuctf.entity.QuestionList;
import com.ctfplatform.hznuctf.service.QuestionListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.List;

@Service
public class QuestionListServiceImpl implements QuestionListService {
    @Autowired
    private QuestionListDao questionListDao;

    @Override
    public List<QuestionList> queryQuestionList() {
        List<QuestionList> list = questionListDao.listQuestionList();    //获得基本题目信息
        List<QuestionList> list2 = questionListDao.getAcNumSubNumRate(); //通过数 提交数和百分比
        int flag = 0;
        for(QuestionList getAcNumSubNumRate : list2){
            int acNum = getAcNumSubNumRate.getAcNum();
            int subNum = getAcNumSubNumRate.getSubNum();
            NumberFormat nf = NumberFormat.getPercentInstance();
            nf.setMaximumFractionDigits(2);
            getAcNumSubNumRate.setRate((double)Math.round(acNum*1.0*10000/subNum)/100);           //先计算相关数值
        }

        for(QuestionList questionList : list){
            flag = 0;   //重置标记
            for(QuestionList getAcNumSubNumRate : list2){
                if(questionList.getQuestionId().equals(getAcNumSubNumRate.getQuestionId())){
                    questionList.setAcNum(getAcNumSubNumRate.getAcNum());
                    questionList.setSubNum(getAcNumSubNumRate.getSubNum());
                    questionList.setRate(getAcNumSubNumRate.getRate());
                    flag = 1;   //标记该题目 在所有人答题记录中找到过
                    break;
                }
            }
            if(flag == 0){    //未找到该道题答题记录
                questionList.setAcNum(0);
                questionList.setSubNum(0);
                questionList.setRate(0.0);
            }
        }
        return list;
    }

    @Override
    public List<QuestionList> listDoneQuestionList(int userId) {
        List<QuestionList> list = questionListDao.listAcQuestionList(userId);    //获得基本题目信息
        List<QuestionList> list2 = questionListDao.getAcNumSubNumRate(); //通过数 提交数和百分比
        for(QuestionList getAcNumSubNumRate : list2){
            int acNum = getAcNumSubNumRate.getAcNum();
            int subNum = getAcNumSubNumRate.getSubNum();
            NumberFormat nf = NumberFormat.getPercentInstance();
            nf.setMaximumFractionDigits(2);
            getAcNumSubNumRate.setRate((acNum*1.0/subNum));           //先计算相关数值
            for(QuestionList questionList : list){
                if(questionList.getQuestionId().equals(getAcNumSubNumRate.getQuestionId())){     //填充相关数据
                    questionList.setAcNum(getAcNumSubNumRate.getAcNum());
                    questionList.setSubNum(getAcNumSubNumRate.getSubNum());
                    questionList.setRate(getAcNumSubNumRate.getRate());
                    break;
                }
            }
        }
        return list;
    }

    @Override
    public List<QuestionList> FuzzyQuery(String text) {
        List<QuestionList> list = questionListDao.FuzzyQuery(text);    //获得基本题目信息
        List<QuestionList> list2 = questionListDao.getAcNumSubNumRate(); //通过数 提交数和百分比
        int flag = 0;
        for(QuestionList getAcNumSubNumRate : list2){
            int acNum = getAcNumSubNumRate.getAcNum();
            int subNum = getAcNumSubNumRate.getSubNum();
            NumberFormat nf = NumberFormat.getPercentInstance();
            nf.setMaximumFractionDigits(2);
            getAcNumSubNumRate.setRate((double)Math.round(acNum*1.0*10000/subNum)/100);           //先计算相关数值
        }

        for(QuestionList questionList : list){
            flag = 0;   //重置标记
            for(QuestionList getAcNumSubNumRate : list2){
                if(questionList.getQuestionId().equals(getAcNumSubNumRate.getQuestionId())){
                    questionList.setAcNum(getAcNumSubNumRate.getAcNum());
                    questionList.setSubNum(getAcNumSubNumRate.getSubNum());
                    questionList.setRate(getAcNumSubNumRate.getRate());
                    flag = 1;   //标记该题目 在所有人答题记录中找到过
                    break;
                }
            }
            if(flag == 0){    //未找到该道题答题记录
                questionList.setAcNum(0);
                questionList.setSubNum(0);
                questionList.setRate(0.0);
            }
        }
        return list;
    }

    @Override
    public List<QuestionList> listAllQuestionList() {
        List<QuestionList> list = questionListDao.listAllQuestion();
        for(QuestionList questionList : list){
            String anwser = null;
            if(questionList.getQuestionAnswers().contains(",")) {
                //加密后的题目答案数组
                String[] questionAnswers = questionList.getQuestionAnswers().split(",");
                try {
                    //对答案逐个解密
                    for (int i = 0; i < questionAnswers.length; ++i) {
                        anwser = RSA.testDecrypt(RSA.privateKey, questionAnswers[i]);
                        questionAnswers[i] = anwser;
                    }
                    //将解密后的答案数组填回question
                    //将解密后的答案数组填回question
                    String s = Arrays.toString(questionAnswers);
                    questionList.setQuestionAnswers(s.substring(1, s.length()-1));
                } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                        | BadPaddingException | InvalidKeyException | IOException e) {
                    System.out.println("RSA解密失败");
                }
            }
            else{
                try {
                    //对答案逐个解密
                    anwser = RSA.testDecrypt(RSA.privateKey, questionList.getQuestionAnswers());
                } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                        | BadPaddingException | InvalidKeyException | IOException e) {
                    System.out.println("RSA解密失败");
                }
                questionList.setQuestionAnswers(anwser);
            }
        }
        return list;
    }

    @Override
    public List<QuestionList> listQuestionForCompetition() {
        return questionListDao.listQuestionForCompetition();
    }

    @Override
    public List<QuestionList> listQuestionByCompetitionIdAndTypeId(int competitionId,int typeId) {
        return questionListDao.listQuestionByCompetitionIdAndTypeId(competitionId,typeId);
    }

    @Override
    public List<QuestionList> queryQuestionByCompetitionId(int competitionId) {
        return questionListDao.listQuestionByCompetitionId(competitionId);
    }

}
