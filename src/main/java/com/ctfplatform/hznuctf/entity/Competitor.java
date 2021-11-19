package com.ctfplatform.hznuctf.entity;

import java.util.Date;

//用于管理端管理选手使用
public class Competitor {
    private Integer teamcompetitorId; //主键id
    private Integer userId;  //用户id
    private String userAccount; //用户账号
    private String userPassword; //用户密码
    private String userTel; //用户电话
    private String userImage; //用户头像
    private String userName; //用户姓名
    private String userNickname; //用户昵称
    private String userAcademy; //用户学院
    private String userClass; //用户班级
    private String userStudentnumber; //用户学号
    private String userEmail; //用户邮箱
    private Integer userGender; //用户性别
    private Integer teamId;  //队伍id
    private String teamName; //队伍名字
    private Integer teamState; //队伍状态
    private Integer userState;  //选手状态
    private Integer competitionId; //赛事id
    private Date start;  //比赛开始时间
    private Date end;  //比赛结束时间
    private String competitionTitle; //比赛名称
    private Double score;



    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public String getCompetitionTitle() {
        return competitionTitle;
    }

    public void setCompetitionTitle(String competitionTitle) {
        this.competitionTitle = competitionTitle;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public Integer getTeamState() {
        return teamState;
    }

    public void setTeamState(Integer teamState) {
        this.teamState = teamState;
    }

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
    }

    public Integer getTeamcompetitorId() {
        return teamcompetitorId;
    }

    public void setTeamcompetitorId(Integer teamcompetitorId) {
        this.teamcompetitorId = teamcompetitorId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getUserState() {
        return userState;
    }

    public void setUserState(Integer userState) {
        this.userState = userState;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getUserAcademy() {
        return userAcademy;
    }

    public void setUserAcademy(String userAcademy) {
        this.userAcademy = userAcademy;
    }

    public String getUserClass() {
        return userClass;
    }

    public void setUserClass(String userClass) {
        this.userClass = userClass;
    }

    public String getUserStudentnumber() {
        return userStudentnumber;
    }

    public void setUserStudentnumber(String userStudentnumber) {
        this.userStudentnumber = userStudentnumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getUserGender() {
        return userGender;
    }

    public void setUserGender(Integer userGender) {
        this.userGender = userGender;
    }
}
