package com.ams.Model.db.Routes

import io.ktor.routing.Routing
import io.ktor.routing.route

fun Routing.apiRoute() {
    route("/api"){
        Users()
        Rooms()
        Buildings()
        Floors()
        People()
    }
}