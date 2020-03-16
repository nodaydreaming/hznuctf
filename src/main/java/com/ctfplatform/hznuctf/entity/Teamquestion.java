package com.ctfplatform.hznuctf.entity;

public class Teamquestion {
    private int teamquestionId;
    private int teamId;
    private int competitionId;
    private int questionId;
    private String questionSource;
    private String questionLink;
    private String questionAnswer;

    public int getTeamquestionId() {
        return teamquestionId;
    }

    public void setTeamquestionId(int teamquestionId) {
        this.teamquestionId = teamquestionId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public int getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(int competitionId) {
        this.competitionId = competitionId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestionSource() {
        return questionSource;
    }

    public void setQuestionSource(String questionSource) {
        this.questionSource = questionSource;
    }

    public String getQuestionLink() {
        return questionLink;
    }

    public void setQuestionLink(String questionLink) {
        this.questionLink = questionLink;
    }

    public String getQuestionAnswer() {
        return questionAnswer;
    }

    public void setQuestionAnswer(String questionAnswer) {
        this.questionAnswer = questionAnswer;
    }
}
