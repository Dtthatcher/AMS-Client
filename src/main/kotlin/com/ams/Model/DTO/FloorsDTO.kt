package com.ams.Model.DTO

import kotlinx.serialization.Serializable

class FloorsDTO {

    @Serializable
    data class SingleFloorDTO(
        val id: Int = 0,
        val FloorNumber: Int,
        val BuildingNumber: Int
    )
}