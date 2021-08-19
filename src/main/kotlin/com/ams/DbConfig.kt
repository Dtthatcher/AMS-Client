package com.ams



import io.ktor.application.*

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.initDB(){
    Database.connect("jdbc:mysql://localhost:3306/ams?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC", driver = "com.mysql.cj.jdbc.Driver",
        user = "AMSLogin", password = "testtest")

//    createTables()

}
//private fun createTables() = transaction {
//    SchemaUtils.create()