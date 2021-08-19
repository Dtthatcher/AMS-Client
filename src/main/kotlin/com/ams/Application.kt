package com.ams

import com.ams.Model.db.Routes.apiRoute
import com.ams.Service.bindServices
import io.ktor.server.engine.*
import io.ktor.server.tomcat.*
import com.ams.plugins.*
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.routing.*
import org.kodein.di.ktor.di

fun main(args: Array<String>): Unit = io.ktor.server.tomcat.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    initDB()
    configureSerialization()
    install(StatusPages)
    install(CallLogging)
    install(CORS){
        method(HttpMethod.Options)
        method(HttpMethod.Put)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.Authorization)
        allowCredentials = true
        anyHost()
    }

    di {
        bindServices()
    }

    routing{
        apiRoute()
    }
}