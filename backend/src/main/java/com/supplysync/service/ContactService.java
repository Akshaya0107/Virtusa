package com.supplysync.service;

import com.supplysync.dto.ContactRequestDto;
import com.supplysync.entity.ContactMessage;
import com.supplysync.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    public void saveMessage(ContactRequestDto request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();
        contactRepository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }
}
