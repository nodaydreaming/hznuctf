package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Notice;

import java.util.List;

public interface NoticeDao {
    List<Notice> listNotice();
    List<Notice> FuzzyQueryNotice(String text);
}
