package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Information;

import java.util.List;

public interface InformationDao {
    List<Information> ListInformation();
    int insertInformation(Information information);
    int updateInformation(Information information);
    int deleteInformation(int informationId);
}
