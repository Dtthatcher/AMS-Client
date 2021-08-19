package com.ams.Service

import com.ams.Model.db.Entity.UserDTO
import com.ams.Model.db.Entity.UserEntity
import org.jetbrains.exposed.sql.transactions.transaction

class UserService {

fun getAllUsers(): Iterable<UserDTO> = transaction {
    UserEntity.all().map(UserEntity::toUserDTO)
    }
}