package com.ctfplatform.hznuctf.entity;

public class Competitionadmin {
    private Integer competitionadminId;  //主键id
    private Integer competitionId; //比赛id
    private Integer adminId; //管理员id

    public Integer getCompetitionadminId() {
        return competitionadminId;
    }

    public void setCompetitionadminId(Integer competitionadminId) {
        this.competitionadminId = competitionadminId;
    }

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }
}
