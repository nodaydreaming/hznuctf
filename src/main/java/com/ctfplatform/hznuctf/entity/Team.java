package com.ctfplatform.hznuctf.entity;

public class Team {
    private Integer teamId;  //队伍id
    private String teamName; //队名
    private Integer teamCompetitionId;  //比赛id
    private Double teamPoint; //队伍分数
    private Integer teamState; //队伍状态 0正常 1禁赛
    private Integer teamCaptain; //队长id
    private String invitationCode;

    public String getInvitationCode() {
        return invitationCode;
    }

    public void setInvitationCode(String invitationCode) {
        this.invitationCode = invitationCode;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getTeamCompetitionId() {
        return teamCompetitionId;
    }

    public void setTeamCompetitionId(Integer teamCompetitionId) {
        this.teamCompetitionId = teamCompetitionId;
    }

    public Double getTeamPoint() {
        return teamPoint;
    }

    public void setTeamPoint(Double teamPoint) {
        this.teamPoint = teamPoint;
    }

    public Integer getTeamState() {
        return teamState;
    }

    public void setTeamState(Integer teamState) {
        this.teamState = teamState;
    }

    public Integer getTeamCaptain() {
        return teamCaptain;
    }

    public void setTeamCaptain(Integer teamCaptain) {
        this.teamCaptain = teamCaptain;
    }
}
