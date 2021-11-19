package com.ctfplatform.hznuctf.entity;

public class Questiontype {

    //题目类型
    private Integer typeId; //主键id
    private String questionType;  //题目类型
    private String typeIntro;   //类型介绍

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getTypeIntro() {
        return typeIntro;
    }

    public void setTypeIntro(String typeIntro) {
        this.typeIntro = typeIntro;
    }
}
