package com.ams.Model.db.Entity

import org.jetbrains.exposed.sql.Table

object BuildingsTable: Table(name = "buildings"){
    val id = integer("id").autoIncrement().primaryKey()

}