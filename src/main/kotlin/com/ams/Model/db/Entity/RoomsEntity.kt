package com.ams.Model.db.Entity

import org.jetbrains.exposed.sql.Table

object RoomsTable : Table(name = "Rooms"){
    val id = integer("id").autoIncrement().primaryKey()
    val RoomNumber = integer("RoomNumber")
    val BuildingNumber = integer("BuildingNumber").references(BuildingsTable.id)
    val Available = bool("Available").default(true)
    val FloorId = integer("FloorId").references(FloorsTable.id)
}


