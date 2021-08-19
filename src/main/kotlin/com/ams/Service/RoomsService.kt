package com.ams.Service

import com.ams.Model.DTO.RoomsDTO
import com.ams.Model.db.Entity.FloorsTable
import com.ams.Model.db.Entity.RoomsTable
import com.ams.Model.db.Mapper.mapToRoomsByBuildingAndFloorDTO
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

class RoomsService {

    fun getRoomsAndFloorNumber(): List<RoomsDTO.RoomsBFDTO> {
        val RoomsBuildingsFloors = transaction {
            (RoomsTable leftJoin FloorsTable)
                .slice(
                    RoomsTable.FloorId,
                    RoomsTable.Available,
                    RoomsTable.id,
                    RoomsTable.RoomNumber,
                    RoomsTable.BuildingNumber,
                    FloorsTable.FloorNumber
                )
                .selectAll().orderBy(RoomsTable.BuildingNumber).orderBy(RoomsTable.FloorId)
                .orderBy(RoomsTable.RoomNumber)
                .map { mapToRoomsByBuildingAndFloorDTO(it) }
        }
        return RoomsBuildingsFloors
    }

    fun getRoomsInBuilding(buildingNum: Int, floorNum: Int): List<RoomsDTO.RoomsBFDTO> {
        val allRoomsInBuilding = transaction {
            (RoomsTable innerJoin FloorsTable).slice(
                RoomsTable.FloorId,
                RoomsTable.Available,
                RoomsTable.id,
                RoomsTable.RoomNumber,
                RoomsTable.BuildingNumber,
                FloorsTable.FloorNumber
            ).select(
                { RoomsTable.BuildingNumber.eq(buildingNum).and { FloorsTable.FloorNumber.eq(floorNum) } }
            ).orderBy(RoomsTable.BuildingNumber).orderBy(RoomsTable.FloorId).orderBy(RoomsTable.RoomNumber)
                .map { mapToRoomsByBuildingAndFloorDTO(it) }
        }
        return allRoomsInBuilding
    }

    fun addNewRoom(roomObj: RoomsDTO.AddRoomDTO) = transaction {
        RoomsTable.insert {
            it[BuildingNumber] = roomObj.BuildingNumber
            it[FloorId] = roomObj.FloorId
            it[RoomNumber] = roomObj.RoomNumber
        }
    }

    fun updateRoomAvailability(isAvailable: RoomsDTO.UpdateRoomAvailableDTO) = transaction {
        RoomsTable.update({ RoomsTable.id eq isAvailable.id }) {
            it[Available] = isAvailable.Available
        }
    }

    fun deleteRoomByRoomId(roomid: Int) = transaction {
        RoomsTable.deleteWhere {RoomsTable.id eq roomid}
    }
}