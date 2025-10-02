package de.ropold.backend.dto;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserBasicInfoTest {

    @Test
    void testUserBasicInfoCreation() {
        UUID id = UUID.randomUUID();
        String username = "testuser";
        String name = "Test User";

        UserBasicInfo userBasicInfo = new UserBasicInfo(id, username, name);

        assertEquals(id, userBasicInfo.id());
        assertEquals(username, userBasicInfo.username());
        assertEquals(name, userBasicInfo.name());
    }
}