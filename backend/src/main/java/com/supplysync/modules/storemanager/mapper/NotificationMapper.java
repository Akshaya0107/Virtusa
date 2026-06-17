package com.supplysync.modules.storemanager.mapper;

import com.supplysync.modules.storemanager.dto.NotificationDTO;
import com.supplysync.entity.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationDTO toDto(Notification notification);
}
