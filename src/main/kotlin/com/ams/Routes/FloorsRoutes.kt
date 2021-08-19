package com.ams.Model.db.Routes

import com.ams.Service.FloorsService
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.response.*
import io.ktor.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.di

fun Route.Floors() {
    val floorsService by di().instance<FloorsService>()

    //set route to user
    route("floor") {

        // get all users or empty list
        get {
            call.respond(floorsService.allFloors)
        }
        get("{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw NotFoundException()
            val allFloorsByBuilding = floorsService.getFloorsInBuilding(id)
            call.respond(allFloorsByBuilding)
        }
    }
}