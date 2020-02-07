package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class QuestionList {

    //---------该实体类为不对应数据库表 该实体类用于常规端题目页展示
    private Integer questionId;  //题目id
    private String questionTitle; //题目标题
    private String questionType; //题目类型
    private String questionBody; //题目描述
    private String questionResource; //题目资源
    private String questionAnswer; //题目答案
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date questionCreatetime; //题目创建时间
    private String questionAuthor; //题目作者
    private Integer questionPoint; //题目分值
    private Double questionDecrease; //降分幅度
    private Integer questionAdditional; //题目附加分
    private String questionLevel; //题目难度
    private String toWho; //开放对象
    private Integer acNum;    //通过数
    private Integer subNum;   //提交数
    private Double rate;
    private Integer isUnlocked; //是否解锁 0锁定 1解锁

    public Integer getIsUnlocked() {
        return isUnlocked;
    }

    public void setIsUnlocked(Integer isUnlocked) {
        this.isUnlocked = isUnlocked;
    }

    public String getQuestionAnswer() {
        return questionAnswer;
    }

    public void setQuestionAnswer(String questionAnswer) {
        this.questionAnswer = questionAnswer;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getQuestionBody() {
        return questionBody;
    }

    public void setQuestionBody(String questionBody) {
        this.questionBody = questionBody;
    }

    public String getQuestionResource() {
        return questionResource;
    }

    public void setQuestionResource(String questionResource) {
        this.questionResource = questionResource;
    }

    public Date getQuestionCreatetime() {
        return questionCreatetime;
    }

    public void setQuestionCreatetime(Date questionCreatetime) {
        this.questionCreatetime = questionCreatetime;
    }


    public String getQuestionAuthor() {
        return questionAuthor;
    }

    public void setQuestionAuthor(String questionAuthor) {
        this.questionAuthor = questionAuthor;
    }

    public Double getQuestionDecrease() {
        return questionDecrease;
    }

    public void setQuestionDecrease(Double questionDecrease) {
        this.questionDecrease = questionDecrease;
    }

    public Integer getQuestionAdditional() {
        return questionAdditional;
    }

    public void setQuestionAdditional(Integer questionAdditional) {
        this.questionAdditional = questionAdditional;
    }

    public String getQuestionLevel() {
        return questionLevel;
    }

    public void setQuestionLevel(String questionLevel) {
        this.questionLevel = questionLevel;
    }

    public String getToWho() {
        return toWho;
    }

    public void setToWho(String toWho) {
        this.toWho = toWho;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public Integer getQuestionPoint() {
        return questionPoint;
    }

    public void setQuestionPoint(Integer questionPoint) {
        this.questionPoint = questionPoint;
    }

    public Integer getAcNum() {
        return acNum;
    }

    public void setAcNum(Integer acNum) {
        this.acNum = acNum;
    }

    public Integer getSubNum() {
        return subNum;
    }

    public void setSubNum(Integer subNum) {
        this.subNum = subNum;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }
}
