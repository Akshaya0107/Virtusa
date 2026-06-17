package com.supplysync.modules.storemanager.mapper;

import com.supplysync.entity.Notification;
import com.supplysync.modules.storemanager.dto.NotificationDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-17T15:38:16+0530",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationDTO toDto(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationDTO notificationDTO = new NotificationDTO();

        notificationDTO.setCreatedAt( notification.getCreatedAt() );
        notificationDTO.setId( notification.getId() );
        notificationDTO.setMessage( notification.getMessage() );
        notificationDTO.setRead( notification.isRead() );
        notificationDTO.setTitle( notification.getTitle() );
        notificationDTO.setType( notification.getType() );

        return notificationDTO;
    }
}
