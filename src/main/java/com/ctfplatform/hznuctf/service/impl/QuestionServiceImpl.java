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
import java.util.*;

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
    private TeamquestionDao teamquestionDao;
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
            //加密后的题目答案数组
            String[] questionAnswers = question.getQuestionAnswers().split(", ");
            try{
                //对答案逐个解密
                for(int i = 0; i < questionAnswers.length; ++i) {
                    anwser = RSA.testDecrypt(RSA.privateKey, questionAnswers[i]);
                    questionAnswers[i] = anwser;
                }
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
            //将解密后的答案数组填回question
            String s = Arrays.toString(questionAnswers);
            question.setQuestionAnswers(s.substring(1, s.length()-1));
        }
        return list;
    }

    @Override
    public List<Question> ListQuestionForPub() {
        List<Question> list = questionDao.ListQuestionForPub();
        for(Question question : list){
            question.setQuestionAnswers(null);
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
            question.setQuestionAnswers(null);
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
        String enFlag = question.getQuestionAnswers();
        String answer = null;
        RSA rsa = new RSA();
        try{
            answer = RSA.testDecrypt(RSA.privateKey, enFlag);
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
            modelMap.put("message", "该题资源答案解密失败");
        }
        return modelMap;
    }

    /**
     *  判题
     *  1.是否为web题？
     *  1.1 web题，questionLinks是否是包含一个链接，若只包含一个链接则各个队伍flag一致，
     *      否则查找webQuestionTeam表，找出此组对应链接的答案
     *  1.2 不是web题，判断此题是否运用脚本实现动态flag，满足的话，查找questionTeam找出此组经过脚本处理后题目对应的flag
     *      此外，questionResources包含多个资源链接，可能是多flag题目。
     */
    @Transactional
    @Override
    public Map<String, Object> judgeForCompetition(int questionId, String flag, int userId, int teamId, int competitionId) {
        Logger logger = LoggerFactory.getLogger(getClass());

        User user = userDao.queryUserByUserId(userId);
        Question question = questionDao.queryQuestionById(questionId);
        Teamquestion teamquestion = teamquestionDao.queryByTeamIdAndCompetitionIdAndQuestionId(teamId, competitionId, questionId);

        String questionTitle = question.getQuestionTitle();
        boolean isCorrect = false;
        //逻辑 先判断正确与否
        //一：正确
        //1.1 附加分还有没有
        //1.1.1 有 答过（+ 基础分 不更新队伍）未答过（+基础分和附加分 更新队伍）
        //1.1.2没有 答过（+ 基础分 不更新队伍） 未答过（+ 基础分 更新队伍）

        //二：错误
        //2.1 给0分 不更新队伍
        Map<String, Object> modelMap = new HashMap<>();

        String answer = null;
        try{
            answer = RSA.testDecrypt(RSA.privateKey, teamquestion.getQuestionAnswer());
            if(flag.equals(answer)){
                isCorrect = true;
                modelMap.put("message","答案正确");
                //判断是否答过此题
                List<Record> acQuestionList = recordDao.listAcQuestion(teamId);
                int isAnsweredRight = 0;
                for(Record record : acQuestionList){
                    //equls防止大于128 POJO类型==判断失败
                    if(record.getQuestionId().equals(questionId)){
                        isAnsweredRight = 1;
                    }
                }
                //如果队伍内答对过题目
                if(isAnsweredRight == 1){
                    Record record = new Record();
                    record.setAnswerBody(flag);
                    record.setUserId(userId);
                    record.setTeamId(teamId);
                    record.setCompetitionId(competitionId);
                    record.setAnswerResult(1);
                    record.setAnswerTime(new Date());
                    record.setQuestionId(questionId);
                    record.setAnswerGetPoint(question.getQuestionPoint());
                    record.setRecordBody("此题已经通过，队伍积分不再增加");
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
                    }else{
                        // 如果附加分没有剩余 则更新附加分为0 降分幅度为0
                        newQuestion.setQuestionAdditional(0.0);
                        newQuestion.setQuestionDecrease(0.0);
                    }
                    int effectedNum = questionDao.judgeRightUpdateAdditionalAndDecrease(newQuestion);
                    if(effectedNum > 0){
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
                        record.setRecordBody("恭喜通过此题，继续加油吧！");
                        int effectedNum2 = recordDao.insert(record);
                        if(effectedNum2 > 0){  //添加记录成功
                            int effectedNum3 = teamDao.addTeamPoint(record.getAnswerGetPoint(), teamId);
                            if(effectedNum3 > 0){
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
                                modelMap.put("message", "更新队伍失败");
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
            }
            else{
                //答案错误，判断是否为抄袭答案
                String deFlag = RSA.testEncrypt(RSA.publicKey, flag);
                Teamquestion tq = teamquestionDao.queryByQuestionAnswer(questionId, deFlag);
                if(tq == null) {
                    modelMap.put("message", "答案错误");
                    Record record = new Record();
                    record.setAnswerBody(flag);
                    record.setUserId(userId);
                    record.setTeamId(teamId);
                    record.setCompetitionId(competitionId);
                    record.setAnswerResult(0);
                    record.setAnswerTime(new Date());
                    record.setQuestionId(questionId);
                    record.setAnswerGetPoint(0.00);
                    record.setRecordBody("答案错误。");
                    int effectedNum = recordDao.insert(record);
                    if (effectedNum > 0) {
                    } else {
                        logger.info("[选手账号_昵称_姓名:" + user.getUserAccount() + "_" + user.getUserNickname() + "_" + user.getUserName()
                                + "]添加记录失败");
                        modelMap.put("message", "添加记录失败");
                    }
                }
                else{
                    //team：被抄袭的队伍；flagTeam：抄袭选手所在队伍。
                    Team team = teamDao.queryTeamByTeamId(tq.getTeamId());
                    Team flagTeam = teamDao.queryTeamByTeamId(teamId);
                    User flagUser = userDao.queryUserByUserId(userId);

                    Record record = new Record();
                    record.setAnswerBody(flag);
                    record.setUserId(userId);
                    record.setTeamId(teamId);
                    record.setCompetitionId(competitionId);
                    record.setAnswerResult(0);
                    record.setAnswerTime(new Date());
                    record.setQuestionId(questionId);
                    record.setAnswerGetPoint(0.00);
                    record.setRecordBody("涉嫌抄袭其他队伍答案，答题选手已被封号！");

                    modelMap.put("message", "队伍【" + flagTeam.getTeamName() + "】中成员【" + flagUser.getUserName() + "】涉嫌抄袭队伍【" +
                            team.getTeamName() + "】的答案，抄袭选手已被封号！");
                    //日志记录
                    logger.info("队伍【" + flagTeam.getTeamName() + "】中成员【" + flagUser.getUserName() + "】涉嫌抄袭队伍【" +
                            team.getTeamName() + "】的答案，题目为【" + questionTitle + "】。");
                    int effectedNum = recordDao.insert(record);
                    if (effectedNum > 0) {
                    } else {
                        logger.info("[选手账号_昵称_姓名:" + user.getUserAccount() + "_" + user.getUserNickname() + "_" + user.getUserName()
                                + "]添加记录失败");
                        modelMap.put("message", "添加记录失败");
                    }
                }
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            modelMap.put("message", "该题资源答案解密失败");
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
            question.setQuestionAnswers(null);//模糊查询不给密码噢
        }
        return list;
    }

    @Override
    public List<Question> queryQuestionBytypeId(int typeId) {
        List<Question> list = questionDao.queryQuestionBytypeId(typeId);
        for(Question question : list){
            String anwser = null;
            RSA rsa = new RSA();
            //加密后的题目答案数组
            String[] questionAnswers = question.getQuestionAnswers().split(", ");
            try{
                //对答案逐个解密
                for(int i = 0; i < questionAnswers.length; ++i) {
                    anwser = RSA.testDecrypt(RSA.privateKey, questionAnswers[i]);
                    questionAnswers[i] = anwser;
                }
            } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                    | BadPaddingException | InvalidKeyException | IOException e ) {
                System.out.println("RSA解密失败");
            }
            //将解密后的答案数组填回question
            //将解密后的答案数组填回question
            String s = Arrays.toString(questionAnswers);
            question.setQuestionAnswers(s.substring(1, s.length()-1));
        }
        return list;
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Question question) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        question.setQuestionCreatetime(new Date());
        question.setVersion(1);
        String anwser;
        //RSA rsa = new RSA();
        //加密后的题目答案数组
        String[] questionAnswers = question.getQuestionAnswers().split(",");
        try{
            //对答案逐个加密
            for(int i = 0; i < questionAnswers.length; ++i) {
                if(questionAnswers[i] != null && !questionAnswers[i].equals("")){
                    anwser = RSA.testEncrypt(RSA.publicKey, questionAnswers[i]);
                    questionAnswers[i] = anwser;
                }
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","答案加密失败");
        }
        //将加密后的答案数组填回question
        String s = Arrays.toString(questionAnswers);
        s.replace(" ", "");
        question.setQuestionAnswers(s.substring(1, s.length()-1));
        int effectedNum = questionDao.insertQuestion(question);
        if(effectedNum>0){}
        else{
            modelMap.put("message","增加题目失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> update(Question question) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String anwser;
        RSA rsa = new RSA();
        //加密前的题目答案数组
        String[] questionAnswers = question.getQuestionAnswers().split(", ");
        try{
            //对答案逐个加密
            for(int i = 0; i < questionAnswers.length; ++i) {
                anwser = RSA.testEncrypt(RSA.publicKey, questionAnswers[i]);
                questionAnswers[i] = anwser;
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException | IllegalBlockSizeException
                | BadPaddingException | InvalidKeyException | IOException e ) {
            modelMap.put("message","答案加密失败");
        }
        //将解密后的答案数组填回question
        //将解密后的答案数组填回question
        String s = Arrays.toString(questionAnswers);
        question.setQuestionAnswers(s.substring(1, s.length()-1));
        int effectedNum = questionDao.updateQuestion(question);
        if (effectedNum > 0) {
        } else {
            modelMap.put("message", "更新题目资源失败");
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
