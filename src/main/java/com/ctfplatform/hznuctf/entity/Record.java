package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Record {

    //对应数据库record
    private Integer recordId;  //记录id
    private Integer competitionId;  //比赛id
    private Integer questionId; //问题id
    private Integer teamId; //队伍id
    private Integer userId; //用户id
    @JsonFormat(pattern = "HH:mm:ss",timezone = "GMT+8")
    private Date answerTime; //回答时间
    private String answerBody; //回答内容
    private Integer answerResult; //判断结果
    private Double answerGetPoint; //得分
    private String recordBody;

    public String getRecordBody() {
        return recordBody;
    }

    public void setRecordBody(String recordBody) {
        this.recordBody = recordBody;
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
