import { Injectable } from '@nestjs/common';

@Injectable()
export class CiideService {
    getAppOptions() {
        return {
          options: [
            'Acerca de nosotros',
            'Gestión del conocimiento',
            'Gestión documental del CIIDE',
            'Investigación formativa y formación para la investigación',
            'Relacionamiento externo y proyección social',
            'Ingresar como usuario',
          ],
        };
      }
}
