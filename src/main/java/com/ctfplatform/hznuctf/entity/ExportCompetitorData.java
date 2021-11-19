package com.ctfplatform.hznuctf.entity;

/**
 * @author Tiecheng Jia
 * @date 2020/1/13 18:17
 */
public class ExportCompetitorData {
    private Integer userId;
    private String teamName;
    private String userName;
    private Double score;
    private Double teamPoint;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Double getTeamPoint() {
        return teamPoint;
    }

    public void setTeamPoint(Double teamPoint) {
        this.teamPoint = teamPoint;
    }
}
