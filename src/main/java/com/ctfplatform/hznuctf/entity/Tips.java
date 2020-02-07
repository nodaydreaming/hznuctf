package com.ctfplatform.hznuctf.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Tips {
    //竞赛端赛事内小通知
    private Integer tipsId; //提示id
    private Integer competitionId;  //比赛id
    private String publisher; //发布者
    @JsonFormat(pattern = "MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date time; //时间
    private String content; //内容

    public Integer getTipsId() {
        return tipsId;
    }

    public void setTipsId(Integer tipsId) {
        this.tipsId = tipsId;
    }

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
