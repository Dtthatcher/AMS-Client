package com.ams.Model.db.Routes


import com.ams.Service.UserService
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import org.kodein.di.ktor.di
import org.kodein.di.instance


fun Route.Users() {
    val userService by di().instance<UserService>()

    //set route to user
    route("user") {

        // get all users or empty list
        get {
            call.respond(userService.getAllUsers())
        }
    }
}