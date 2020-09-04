import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpoints } from '../app.constant';

@Injectable({
    providedIn: 'root'
})

export class VehicleService {
    
    constructor(private httpClient: HttpClient) {}

    getAllVehicles() {
        return this.httpClient.get(ApiEndpoints.VEHICLES);
    }

    getVehicle(userId: number) {
        return this.httpClient.get(ApiEndpoints.VEHICLES + '?userId=' + userId);
    }

    addVehicle(vehicleData: any) {
        return this.httpClient.post(ApiEndpoints.VEHICLES, vehicleData);
    }

    updateVehicle(vehicleData: any) {
        return this.httpClient.put(ApiEndpoints.VEHICLES + '/' + vehicleData.id, vehicleData);
    }

    deleteVehicle(id: any) {
        return this.httpClient.delete(ApiEndpoints.VEHICLES + '/' + id);
    }
}
