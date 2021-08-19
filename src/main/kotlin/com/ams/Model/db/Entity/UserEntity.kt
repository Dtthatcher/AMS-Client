package com.ams.Model.db.Entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

//Represents the app_user table in the database
object UserTable: IntIdTable(name = "user") {
    val username = varchar("Username", 40).uniqueIndex()
    val password = varchar("Password", 100)

}

// represents a row in the DB
class UserEntity(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(UserTable) //connects the UserEntity to UserTable Object

    var username by UserTable.username
    var password by UserTable.password

    //convert to dataclass
    fun toUserDTO() = UserDTO(id.value, username, password)
}

// User DTO
@Serializable
data class UserDTO(
    val id: Int = 0,
    val username: String,
    val password: String,
)