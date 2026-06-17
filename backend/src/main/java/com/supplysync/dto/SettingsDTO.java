package com.supplysync.dto;

import lombok.Data;
import java.util.Map;

@Data
public class SettingsDTO {
    private String companyName;
    private String companyAddress;
    private String contactEmail;
    private String currency;
    private String timezone;
    private String logoUrl;
    private Map<String, String> otherSettings;
}
