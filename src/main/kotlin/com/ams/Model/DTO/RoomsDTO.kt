package com.ams.Model.DTO

import kotlinx.serialization.Serializable

class RoomsDTO {

    @Serializable
    data class RoomsBFDTO(
        val Id: Int = 0,
        val BuildingNumber: Int,
        val FloorId: Int,
        val FloorNumber: Int,
        val RoomNumber: Int,
        val Available: Boolean = true,
    )

    @Serializable
    data class AddRoomDTO(
        val Id: Int = 0,
        val BuildingNumber: Int,
        val FloorId: Int,
        val RoomNumber: Int
    )

    @Serializable
    data class UpdateRoomAvailableDTO(
        val id: Int,
        val Available: Boolean
    )
}