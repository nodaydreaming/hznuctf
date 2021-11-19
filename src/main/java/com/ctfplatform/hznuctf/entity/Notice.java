package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Notice {

    //该实体类用于常规端通知显示
    private Integer informationId;  //主键id
    private String adminName;  //管理员姓名
    private String informationTitle;  //通知标题
    private String informationDetail; //通知内容
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date informationCreateTime; //创建时间
    private String informationSummary;//通知摘要
    private Integer forCompetition;



    public Date getInformationCreateTime() {
        return informationCreateTime;
    }

    public void setInformationCreateTime(Date informationCreateTime) {
        this.informationCreateTime = informationCreateTime;
    }

    public Integer getInformationId() {
        return informationId;
    }

    public void setInformationId(Integer informationId) {
        this.informationId = informationId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
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
}
