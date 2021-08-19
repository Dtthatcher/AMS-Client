package com.ams.Model.db.Entity

import org.jetbrains.exposed.sql.Table

object FloorsTable: Table(name = "floors"){
    val id = integer("id").autoIncrement().primaryKey()
    val FloorNumber = integer("FloorNumber")
    val BuildingNumber = integer("BuildingNumber").references(BuildingsTable.id)
}