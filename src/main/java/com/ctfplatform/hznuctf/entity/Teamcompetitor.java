package com.ctfplatform.hznuctf.entity;

public class Teamcompetitor {
    private Integer teamcompetitorId; //主键id
    private Integer teamId; //队伍id
    private Integer userId; //用户id
    private Integer userState; //用户状态
    private Double score;

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getTeamcompetitorId() {
        return teamcompetitorId;
    }

    public void setTeamcompetitorId(Integer teamcompetitorId) {
        this.teamcompetitorId = teamcompetitorId;
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

    public Integer getUserState() {
        return userState;
    }

    public void setUserState(Integer userState) {
        this.userState = userState;
    }
}
