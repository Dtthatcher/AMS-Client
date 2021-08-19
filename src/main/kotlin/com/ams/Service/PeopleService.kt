package com.ams.Service

import com.ams.Model.DTO.PeopleDTO
import com.ams.Model.db.Entity.PeoplesTable
import com.ams.Model.db.Mapper.mapAllPeopleDTO
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update


class PeopleService {

    fun getAllPeoples(): List<PeopleDTO.AllPeopleDTO> {
        val getAllPeople = transaction {
            PeoplesTable.slice(PeoplesTable.id,PeoplesTable.RoomId,PeoplesTable.Name,PeoplesTable.Position).selectAll().map { mapAllPeopleDTO(it) }
        }
        return getAllPeople
    }

    fun updatePersonRoomId(updatePerson: PeopleDTO.UpdateRoomIdDTO) = transaction {
        PeoplesTable.update({PeoplesTable.id eq updatePerson.id}) {
            it[RoomId] = updatePerson.RoomId
        }
    }
}

