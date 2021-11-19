package com.ctfplatform.hznuctf.entity;

public class TeamScoreList {
    private Double totalScore;
    private Integer typeId;
    private String questionType;
    private Double thisTypeScore;

    public Double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Double totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Double getThisTypeScore() {
        return thisTypeScore;
    }

    public void setThisTypeScore(Double thisTypeScore) {
        this.thisTypeScore = thisTypeScore;
    }
}
