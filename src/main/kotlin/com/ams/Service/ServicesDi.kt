package com.ams.Service

import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.singleton

fun DI.MainBuilder.bindServices() {
    bind<UserService>() with singleton { UserService() }
    bind<RoomsService>() with singleton { RoomsService() }
    bind<BuildingsService>() with singleton { BuildingsService() }
    bind<FloorsService>() with singleton { FloorsService() }
    bind<PeopleService>() with singleton { PeopleService() }
}