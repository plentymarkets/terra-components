import { Injectable } from '@angular/core';
import {
    TerraBaseService,
    TerraLoadingSpinnerService
} from '../../../../..';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TerraLiveSearchServiceExample extends TerraBaseService
{
    constructor(http:Http, spinner:TerraLoadingSpinnerService)
    {
        super(spinner, http, 'http://master.login.plentymarkets.com/rest/accounts/contacts');
        this.setAuthorization();

        //this.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
        this.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1MGMxNWI2YWFiNDExNjhiZjA2NDk1NWJiYzkyYzQ0NDRmM2U1Y2IyZjg0ZmJjZDY1ZGIxZDI5MTY2ZTBmYTM5YTM5Y2EwZjAzN2I2MTZkIn0.eyJhdWQiOiIxIiwianRpIjoiZDUwYzE1YjZhYWI0MTE2OGJmMDY0OTU1YmJjOTJjNDQ0NGYzZTVjYjJmODRmYmNkNjVkYjFkMjkxNjZlMGZhMzlhMzljYTBmMDM3YjYxNmQiLCJpYXQiOjE1MzQ4MzIwMjIsIm5iZiI6MTUzNDgzMjAyMiwiZXhwIjoxNTM0OTE4NDIxLCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.aiLu-E2HHa9CNhKcFHD_YVBzhn5mxlRX46tJlJ3ZF-4Zh15X7KjYzo6ArikPMD7cBvRj52za_0b2RY-YfHUO9lQNhz9RbplWqEnbNTKIXQS6lQQNVy5c3CMoz8YKKJZjg8kXpeIdMrUttpZSSYXkpxocBh2-NhO79KdkqR0RK6mazvgVb-K09ZNi7ONkcPPsRsvzkiDh06bJJhN00ArlICXzzRz74LhVoL_nOD3G1_M4AvlDXmyvYlBRob0ETn5oyaPy4p8ArJFYKq8ahyhtXfY0Wi6WH3i8PPRLqiZu-7K5_FOkDd6kjaJlrf8zNEi8U70I-fbIGAuA0ZYWe42iHgRShMU3Be6xwg6Yv_ECSwQRDiW2ZityCE8svNhLQqc07f5JEkJEH9773hk48gD_PUkMTsF_-1GtbvbMliEiM2Ca1y7s89JOz1_mSSQ1vyiwJGEl--FVDZ5SjbkFaVFVjlJUdPQAuCQeh1ZqJZY1ouCAayzZK0dCr758_OX-iUwxaRDbeet2RpDL8RapnKloTm5bLzyybUb6OYjoJNtA7MvX_KDXXrE02_OEvVYjMZRfCeo0EnRoQwD4psmzynacVZF_N7WpSoKWTjUOiWlihSbCH_sl-E-8uOBIdk4CNjR0SLAfYlKOOZsK6cSOHOhw2LnuCqHJj1Doy-AqeClB8rg');
    }

    public getContacts(name:string):Observable<any>
    {
        return this.mapRequest(this.http.get(this.url, {
            headers: this.headers,
            params: {
                name: name
            }
        }));
    }
}
