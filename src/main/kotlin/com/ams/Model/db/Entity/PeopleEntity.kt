package com.ams.Model.db.Entity

import org.jetbrains.exposed.sql.Table

object PeoplesTable: Table(name = "People"){
    val id = integer("id").autoIncrement().primaryKey()
    val RoomId = integer("RoomId").references(RoomsTable.id).nullable()
    val Name = varchar("Name", 255)
    val Position = varchar("Position", 255)
}