package com.ams.Model.db.Routes

import com.ams.Service.BuildingsService
import io.ktor.application.*
import io.ktor.response.*

import io.ktor.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.di

fun Route.Buildings() {
    val buildingsService by di().instance<BuildingsService>()

    route("building") {

        get {
            call.respond(buildingsService.getAllBuildings)
        }
    }
}