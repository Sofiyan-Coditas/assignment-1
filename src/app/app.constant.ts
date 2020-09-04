import { environment } from '../environments/environment';

export class ApiEndpoints {
    static VEHICLES = environment.API_ENDPOINT + '/vehicle';

    static LOGIN = environment.API_ENDPOINT + '/auth/login';

    static REGISTER = environment.API_ENDPOINT + '/auth/register';
}