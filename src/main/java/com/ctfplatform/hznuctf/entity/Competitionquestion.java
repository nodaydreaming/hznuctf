package com.ctfplatform.hznuctf.entity;

public class Competitionquestion {
    private Integer competitionquestionId; //主键id
    private Integer competitionId; //比赛id
    private Integer questionId; //问题id
    private Integer isUnlocked; //是否解锁 0锁定 1解锁

    public Integer getIsUnlocked() {
        return isUnlocked;
    }

    public void setIsUnlocked(Integer isUnlocked) {
        this.isUnlocked = isUnlocked;
    }

    public Integer getCompetitionquestionId() {
        return competitionquestionId;
    }

    public void setCompetitionquestionId(Integer competitionquestionId) {
        this.competitionquestionId = competitionquestionId;
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
}
