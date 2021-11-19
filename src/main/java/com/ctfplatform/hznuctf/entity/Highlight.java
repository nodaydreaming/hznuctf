package com.ctfplatform.hznuctf.entity;

public class Highlight {
    private Integer highlightId;
    private Integer competitionId;
    private String highlightIntro;
    private String image;
    private String imageIntro;
    private Integer forGrade;

    public Integer getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Integer competitionId) {
        this.competitionId = competitionId;
    }

    public String getHighlightIntro() {
        return highlightIntro;
    }

    public void setHighlightIntro(String highlightIntro) {
        this.highlightIntro = highlightIntro;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageIntro() {
        return imageIntro;
    }

    public void setImageIntro(String imageIntro) {
        this.imageIntro = imageIntro;
    }

    public Integer getForGrade() {
        return forGrade;
    }

    public void setForGrade(Integer forGrade) {
        this.forGrade = forGrade;
    }

    public Integer getHighlightId() {
        return highlightId;
    }

    public void setHighlightId(Integer highlightId) {
        this.highlightId = highlightId;
    }
}
