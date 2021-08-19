package com.ams.Model.DTO

import kotlinx.serialization.Serializable

class PeopleDTO {

    @Serializable
    data class AllPeopleDTO(
        val id: Int? = 0,
        val RoomId: Int?,
        val Name: String,
        val Position: String,
    )

    @Serializable
    data class UpdateRoomIdDTO(
        val id: Int,
        val RoomId: Int?
    )
}