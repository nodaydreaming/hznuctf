package com.ctfplatform.hznuctf.entity;

import java.util.Date;

public class GeneralRecord {
    private Integer generalRecordId;
    private Integer userId;
    private Integer questionId;
    private Date answerTime;
    private String answerBody;
    private Integer answerResult;
    private Double answerGetPoint;

    public Integer getGeneralRecordId() {
        return generalRecordId;
    }

    public void setGeneralRecordId(Integer generalRecordId) {
        this.generalRecordId = generalRecordId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Date getAnswerTime() {
        return answerTime;
    }

    public void setAnswerTime(Date answerTime) {
        this.answerTime = answerTime;
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

    public Double getAnswerGetPoint() {
        return answerGetPoint;
    }

    public void setAnswerGetPoint(Double answerGetPoint) {
        this.answerGetPoint = answerGetPoint;
    }
}
