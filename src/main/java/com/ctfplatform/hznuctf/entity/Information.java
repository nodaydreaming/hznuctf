package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Information {
    //该实体类对应数据库库表，管理端用
    private Integer informationId;  //主键id
    private Integer adminId;  //管理员id
    private String informationTitle;  //通知标题
    private String informationDetail; //通知内容
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date informationCreatetime; //创建时间
    private String informationSummary;//通知摘要
    private Integer forCompetition;

    public Date getInformationCreatetime() {
        return informationCreatetime;
    }

    public void setInformationCreatetime(Date informationCreatetime) {
        this.informationCreatetime = informationCreatetime;
    }

    public String getInformationSummary() {
        return informationSummary;
    }

    public void setInformationSummary(String informationSummary) {
        this.informationSummary = informationSummary;
    }

    public Integer getForCompetition() {
        return forCompetition;
    }

    public void setForCompetition(Integer forCompetition) {
        this.forCompetition = forCompetition;
    }

    public Integer getInformationId() {
        return informationId;
    }

    public void setInformationId(Integer informationId) {
        this.informationId = informationId;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getInformationTitle() {
        return informationTitle;
    }

    public void setInformationTitle(String informationTitle) {
        this.informationTitle = informationTitle;
    }

    public String getInformationDetail() {
        return informationDetail;
    }

    public void setInformationDetail(String informationDetail) {
        this.informationDetail = informationDetail;
    }

  }
