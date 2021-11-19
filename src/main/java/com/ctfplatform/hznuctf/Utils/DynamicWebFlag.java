package com.ctfplatform.hznuctf.Utils;

public class DynamicWebFlag {
    private String[] containerId = {"345b1dd53397", "6d9e727c5da0", "899a41c67987",
                                    "9bfe19cec248", "812f885d0e24"};
    private String flag = "flag{wr!te_5cript_s0lve_prob1em}";

    public void getDynamicFlag(){
        for(int i = 0; i < containerId.length; ++i){
            int k = 0;
            String id = containerId[i];
            StringBuilder stringBuilder = new StringBuilder(flag);
            for(int j = 0; j < 8; j++){
                int offset = ((int)(Math.random() * 100)) % (id.length() * 2) + 6;
                stringBuilder.insert(offset, id.charAt(j));
            }
            System.out.println(stringBuilder.toString());
        }
    }

    public static void main(String[] args){
        DynamicWebFlag dynamicWebFlag = new DynamicWebFlag();
        dynamicWebFlag.getDynamicFlag();
    }
}
