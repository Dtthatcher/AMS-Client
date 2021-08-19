package com.ams.Model.db.Routes

import com.ams.Model.DTO.PeopleDTO
import com.ams.Service.PeopleService
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.di

fun Route.People() {
    val peopleService by di().instance<PeopleService>()

    route("people"){
        get {
            call.respond(peopleService.getAllPeoples())
        }

        put {
            val updateRoomId = call.receive<PeopleDTO.UpdateRoomIdDTO>()
            peopleService.updatePersonRoomId(updateRoomId)
            call.respond(HttpStatusCode.Accepted)
        }
    }
}