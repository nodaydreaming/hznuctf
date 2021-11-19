package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
//管理端题目列表
public class Question {
    private Integer questionId;  //题目id
    private String questionTitle; //题目标题
    private Integer questionTypeid; //题目类型id 外键
    private String questionBody; //题目描述
    private String questionResources; //题目资源（一个或多个）
    private String questionScript;//实现动态flag的脚本程序（可为空）
    //web题的链接数组，若数组个数为1，则为单链接web题目，数组个数大于1，为docker实现多链接web题目
    private String questionLinks;
    private String questionAnswers; //题目答案（一个或多个）
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date questionCreatetime; //题目创建时间
    private String questionAuthor; //题目作者
    private Double questionPoint; //题目分值
    private Double questionDecrease; //降分幅度
    private Double questionAdditional; //题目附加分
    private Integer questionLevel; //题目难度
    private Integer toWho; //开放对象   0表示pub, 1表示competition
    private Integer version;

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public Integer getQuestionTypeid() {
        return questionTypeid;
    }

    public void setQuestionTypeid(Integer questionTypeid) {
        this.questionTypeid = questionTypeid;
    }

    public String getQuestionBody() {
        return questionBody;
    }

    public void setQuestionBody(String questionBody) {
        this.questionBody = questionBody;
    }

    public String getQuestionResources() {
        return questionResources;
    }

    public void setQuestionResources(String questionResources) {
        this.questionResources = questionResources;
    }

    public String getQuestionScript() {
        return questionScript;
    }

    public void setQuestionScript(String questionScript) {
        this.questionScript = questionScript;
    }

    public String getQuestionLinks() {
        return questionLinks;
    }

    public void setQuestionLinks(String questionLinks) {
        this.questionLinks = questionLinks;
    }

    public String getQuestionAnswers() {
        return questionAnswers;
    }

    public void setQuestionAnswers(String questionAnswers) {
        this.questionAnswers = questionAnswers;
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

    public Double getQuestionPoint() {
        return questionPoint;
    }

    public void setQuestionPoint(Double questionPoint) {
        this.questionPoint = questionPoint;
    }

    public Double getQuestionDecrease() {
        return questionDecrease;
    }

    public void setQuestionDecrease(Double questionDecrease) {
        this.questionDecrease = questionDecrease;
    }

    public Double getQuestionAdditional() {
        return questionAdditional;
    }

    public void setQuestionAdditional(Double questionAdditional) {
        this.questionAdditional = questionAdditional;
    }

    public Integer getQuestionLevel() {
        return questionLevel;
    }

    public void setQuestionLevel(Integer questionLevel) {
        this.questionLevel = questionLevel;
    }

    public Integer getToWho() {
        return toWho;
    }

    public void setToWho(Integer toWho) {
        this.toWho = toWho;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
