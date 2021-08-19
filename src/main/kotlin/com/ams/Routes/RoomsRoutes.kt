package com.ams.Model.db.Routes

import com.ams.Model.DTO.RoomsDTO
import com.ams.Service.RoomsService
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.di

fun Route.Rooms() {
    val roomsService by di().instance<RoomsService>()

    //set route to Room
    route("room") {

        // get all Rooms or empty list
        get {
            call.respond(roomsService.getRoomsAndFloorNumber())
        }
        get("{building}/{floor}") {
            val building = call.parameters["building"]?.toIntOrNull() ?: throw NotFoundException()
            val floor = call.parameters["floor"]?.toIntOrNull() ?: throw NotFoundException()
            val allRoomsByBuildingAndFloor = roomsService.getRoomsInBuilding(building, floor)
            call.respond(allRoomsByBuildingAndFloor)
        }
        post {
            val addNewRoom = call.receive<RoomsDTO.AddRoomDTO>()
            roomsService.addNewRoom(addNewRoom)
            call.respond(HttpStatusCode.Created)
        }
        put {
            val updateRoomAvailability = call.receive<RoomsDTO.UpdateRoomAvailableDTO>()
            roomsService.updateRoomAvailability(updateRoomAvailability)
            call.respond(HttpStatusCode.Accepted)
        }
        delete("{id}") {
            val deleteRoomById = call.parameters["id"]?.toIntOrNull() ?: throw  NotFoundException()
            roomsService.deleteRoomByRoomId(deleteRoomById)
            call.respond(HttpStatusCode.Accepted)
        }
    }
}