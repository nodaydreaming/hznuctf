package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.Utils.RSA;
import com.ctfplatform.hznuctf.dao.*;
import com.ctfplatform.hznuctf.entity.*;
import com.ctfplatform.hznuctf.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private GeneralRecordDao generalRecordDao;
    @Autowired
    private RecordDao recordDao;
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private TeamcompetitorDao teamcompetitorDao;
    @Autowired
    private UserDao userDao;
    @Override
    public List<Question> ListQuestion() {
        List<Question> list = questionDao.ListQuestion();
        for(Question question : list){
            String anwser = null;
            RSA rsa = new RSA();
            try{
                anwser = RSA.testDecrypt(RSA.publicKey,question.getQuestionAnswer());
                question.setQuestionAnswer(anwser);
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
        }
        return list;
    }

    @Override
    public List<Question> ListQuestionForPub() {
        List<Question> list = questionDao.ListQuestionForPub();
        for(Question question : list){
            question.setQuestionAnswer("0");
        }
        return list;
    }

    @Override
    public List<Question> ListQuestionForCompetition() {
        return questionDao.ListQuestionForCompetition();
    }

    @Override
    public List<Question> ListDoneQuestion(int userId) {
        List<Question> list = questionDao.ListDoneQuestion(userId);
        for(Question question : list){
            question.setQuestionAnswer("0");
        }
        return list;
    }

    @Override
    public Question queryQuestionByQuestionId(int questionId) {
        return questionDao.queryQuestionById(questionId);
    }

    @Override
    public List<Question> ListQuestionByCompetitionId(int competitionid) {
        return questionDao.ListQuestionByCompetitionId(competitionid);
    }
    @Transactional
    @Override
    public Map<String, Object> judge(int questionId,String flag,int userId) {
        Map<String,Object> modelMap = new HashMap<>();
        Question question = questionDao.queryQuestionById(questionId);
        String answer = null;
        RSA rsa = new RSA();
        try{
            answer = RSA.testDecrypt(RSA.publicKey,question.getQuestionAnswer());
            if(flag.equals(answer)){
                GeneralRecord generalRecord = new GeneralRecord();
                generalRecord.setUserId(userId);
                generalRecord.setAnswerResult(1);
                generalRecord.setAnswerBody(flag);
                generalRecord.setAnswerGetPoint(question.getQuestionPoint());
                generalRecord.setAnswerTime(new Date());
                generalRecord.setQuestionId(questionId);
                int effectedNum = generalRecordDao.insertGeneralRecord(generalRecord);
                if(effectedNum>0){
                }
                else{
                    modelMap.put("message","添加记录失败");
                }
            }else{
                GeneralRecord generalRecord = new GeneralRecord();
                generalRecord.setUserId(userId);
                generalRecord.setAnswerResult(0);
                generalRecord.setAnswerBody(flag);
                generalRecord.setAnswerGetPoint(0.00);
                generalRecord.setAnswerTime(new Date());
                generalRecord.setQuestionId(questionId);
                int effectedNum = generalRecordDao.insertGeneralRecord(generalRecord);
                if(effectedNum>0){
                }
                else{
                    modelMap.put("message","添加记录失败");
                }
                modelMap.put("message","答案错误");
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","该题资源答案解密失败");
        }
        return modelMap;
    }
    @Transactional
    @Override
    public Map<String, Object> judgeForCompetition(int questionId, String flag, int userId,int teamId,int competitionId) {
        Logger logger = LoggerFactory.getLogger(getClass());
        User user = userDao.queryUserByUserId(userId);
        String questionTitle = questionDao.queryQuestionById(questionId).getQuestionTitle();
        boolean isCorrect = false;
        //逻辑 先判断正确与否
        //一：正确
        //1.1 附加分还有没有
        //1.1.1 有 答过（+ 基础分 不更新队伍）未答过（+基础分和附加分 更新队伍）
        //1.1.2没有 答过（+ 基础分 不更新队伍） 未答过（+ 基础分 更新队伍）

        //二：错误
        //2.1 给0分 不更新队伍
        Map<String,Object> modelMap = new HashMap<>();
        Question question = questionDao.queryQuestionById(questionId);
        String answer = null;
        RSA rsa = new RSA();
        try{
            answer = RSA.testDecrypt(RSA.publicKey,question.getQuestionAnswer());
            if(flag.equals(answer)){
                isCorrect = true;
                modelMap.put("message","答案正确");
                List<Record> acQuestionList = recordDao.listAcQuestion(teamId);
                int isAnweredRight = 0;
                for(Record record : acQuestionList){
                    //equls防止大于128 POJO类型==判断失败
                    if(record.getQuestionId().equals(questionId)){
                        isAnweredRight = 1;
                    }
                }
                //如果队伍内答对过题目
                if(isAnweredRight==1){
                    Record record = new Record();
                    record.setAnswerBody(flag);
                    record.setUserId(userId);
                    record.setTeamId(teamId);
                    record.setCompetitionId(competitionId);
                    record.setAnswerResult(1);
                    record.setAnswerTime(new Date());
                    record.setQuestionId(questionId);
                    record.setAnswerGetPoint(question.getQuestionPoint());
                    //添加记录成功置0
                    int effectedNum = recordDao.insert(record);
                    if(effectedNum>0){
                    }
                    else{
                        modelMap.put("message","添加记录失败");
                    }
                }else{
                    Question newQuestion = questionDao.queryQuestionById(questionId);
                    //设置新的附加分
                    // 如果附加分还剩余 则更新新的附加分 降分幅度保持不变
                    if (newQuestion.getQuestionAdditional() > 0) {
                        // 新附加分为原附加分-降分幅度
                        newQuestion.setQuestionAdditional(newQuestion.getQuestionAdditional() - newQuestion.getQuestionDecrease());
                        // 降分幅度保持不变
                        newQuestion.setQuestionDecrease(newQuestion.getQuestionDecrease());
                    }else{
                    // 如果附加分没有剩余 则更新附加分为0 降分幅度为0
                        newQuestion.setQuestionAdditional(0.0);
                        newQuestion.setQuestionDecrease(0.0);
                    }
                    int effectedNum = questionDao.judgeRightUpdateAdditionalAndDecrease(newQuestion);
                    if(effectedNum>0){
                        Record record = new Record();
                        record.setAnswerBody(flag);
                        record.setUserId(userId);
                        record.setTeamId(teamId);
                        record.setCompetitionId(competitionId);
                        record.setAnswerResult(1);
                        record.setAnswerTime(new Date());
                        record.setQuestionId(questionId);
                        //得分为基础分+更新后的附加分（本该得的附加分-降分）+ 降分  或者 附加分0 降分幅度0
                        record.setAnswerGetPoint(question.getQuestionPoint()+newQuestion.getQuestionAdditional()+newQuestion.getQuestionDecrease());
                        int effectedNum2 = recordDao.insert(record);
                        if(effectedNum2>0){  //添加记录成功
                            int effectedNum3 = teamDao.addTeamPoint(record.getAnswerGetPoint(),teamId);
                            if(effectedNum3>0){
                                Teamcompetitor teamcompetitor = new Teamcompetitor();
                                teamcompetitor.setTeamId(teamId);
                                teamcompetitor.setUserId(userId);
                                teamcompetitor.setScore(record.getAnswerGetPoint());
                                int effectedNum4 = teamcompetitorDao.updateScore(teamcompetitor);
                                if(effectedNum4>0){
                                }else{
                                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                                    logger.info("[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                                                    +"]更新选手分值失败");
                                    modelMap.put("message","更新选手分值失败");
                                }
                            }else{
                                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                                logger.info("[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                                        +"]更新队伍失败");
                                modelMap.put("message","更新队伍失败");
                            }
                        }else{
                            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                            logger.info("[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                                    +"]添加答题记录失败");
                            modelMap.put("message","添加记录失败");
                        }
                    }else{
                        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                        logger.info("[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                                +"]更新题目附加分失败");
                        modelMap.put("message","更新题目附加分失败");
                    }
                }
            }else{
                modelMap.put("message","答案错误");
                Record record = new Record();
                record.setAnswerBody(flag);
                record.setUserId(userId);
                record.setTeamId(teamId);
                record.setCompetitionId(competitionId);
                record.setAnswerResult(0);
                record.setAnswerTime(new Date());
                record.setQuestionId(questionId);
                record.setAnswerGetPoint(0.00);
                int effectedNum = recordDao.insert(record);
                if(effectedNum>0){
                }
                else{

                    logger.info("[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                            +"]添加记录失败");
                    modelMap.put("message","添加记录失败");
                }
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            modelMap.put("message","该题资源答案解密失败");
            return modelMap;
        }
        // 打印选手输入答案
        logger.info("[答题日志记录]"+"[选手账号_昵称_姓名:"+user.getUserAccount()+"_"+user.getUserNickname()+"_"+user.getUserName()
                +"][答题题目:"+questionTitle+"][提交答案:"+flag+"][答题结果:"+isCorrect+"]");
        return modelMap;
    }


    @Override
    public List<Question> FuzzyQuery(String text) {
        List<Question> list = questionDao.FuzzyQuery(text);
        for(Question question : list){
            String anwser = null;
            question.setQuestionAnswer("你不会知道");//模糊查询不给密码噢
        }
        return list;
    }

    @Override
    public List<Question> queryQuestionBytypeId(int typeId) {
        List<Question> list = questionDao.queryQuestionBytypeId(typeId);
        for(Question question : list){
            String anwser = null;
            RSA rsa = new RSA();
            try{
                anwser = RSA.testDecrypt(RSA.publicKey,question.getQuestionAnswer());
                question.setQuestionAnswer(anwser);
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
        }
        return list;
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Question question) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        question.setQuestionCreatetime(new Date());
        question.setVersion(1);
        RSA rsa = new RSA();
        String anwser = null;
        try {
            anwser = RSA.testEncrypt(RSA.privateKey,question.getQuestionAnswer());
            question.setQuestionAnswer(anwser);
            int effectedNum = questionDao.insertQuestion(question);
            if(effectedNum>0){}
            else{
                modelMap.put("message","增加题目资源失败");
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","答案加密失败");
        }

        return modelMap;
    }

    @Override
    public Map<String, Object> update(Question question) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        RSA rsa = new RSA();
        String anwser = null;
        try {
            anwser = RSA.testEncrypt(RSA.privateKey, question.getQuestionAnswer());
            question.setQuestionAnswer(anwser);
            int effectedNum = questionDao.updateQuestion(question);
            if (effectedNum > 0) {
            } else {
                modelMap.put("message", "更新题目资源失败");
            }
        }catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","答案加密失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> delete(int questionId) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = questionDao.deleteQuestion(questionId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除题目资源失败");
        }
        return modelMap;
    }
}
