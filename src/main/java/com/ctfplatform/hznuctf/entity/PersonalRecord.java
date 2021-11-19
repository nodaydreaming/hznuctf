package com.ctfplatform.hznuctf.entity;

public class PersonalRecord {
    //该实体类用于常规端个人信息页通知显示
    private Integer typeId;
    private String questionType;   //题目类型
    private Integer acNum;      //夺旗数
    private Integer subNum;     //提交数
    private Integer thisTypeQuestionNum;     //该类型题目数
    private Double rate;     //该类型通过率 百分比形式
    private Double grade;    //该类型获得分数

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Integer getSubNum() {
        return subNum;
    }

    public void setSubNum(Integer subNum) {
        this.subNum = subNum;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Integer getAcNum() {
        return acNum;
    }

    public void setAcNum(Integer acNum) {
        this.acNum = acNum;
    }

    public Integer getThisTypeQuestionNum() {
        return thisTypeQuestionNum;
    }

    public void setThisTypeQuestionNum(Integer thisTypeQuestionNum) {
        this.thisTypeQuestionNum = thisTypeQuestionNum;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }
}
