package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class TeamRecord {
    private String userName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date answerTime;
    private Integer questionId;
    private String questionType;
    private String answerBody;
    private Integer answerResult;
    private Double answerGetPoint;
    private String recordBody;

    public String getRecordBody() {
        return recordBody;
    }

    public void setRecordBody(String recordBody) {
        this.recordBody = recordBody;
    }

    public Double getAnswerGetPoint() {
        return answerGetPoint;
    }

    public void setAnswerGetPoint(Double answerGetPoint) {
        this.answerGetPoint = answerGetPoint;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getAnswerTime() {
        return answerTime;
    }

    public void setAnswerTime(Date answerTime) {
        this.answerTime = answerTime;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getAnswerBody() {
        return answerBody;
    }

    public void setAnswerBody(String answerBody) {
        this.answerBody = answerBody;
    }

    public Integer getAnswerResult() {
        return answerResult;
    }

    public void setAnswerResult(Integer answerResult) {
        this.answerResult = answerResult;
    }
}
