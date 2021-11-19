package com.ctfplatform.hznuctf.entity;

/**
 * @author Tiecheng Jia
 * @date 2020/1/13 18:39
 */
public class AcQuestion {
    private Integer userId;
    private Integer questionId;
    private Integer competitionId;
    private String questionTitle;
    private Double answerGetPoint;

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
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

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public Double getAnswerGetPoint() {
        return answerGetPoint;
    }

    public void setAnswerGetPoint(Double answerGetPoint) {
        this.answerGetPoint = answerGetPoint;
    }
}
