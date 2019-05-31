import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { TerraComponentsModule } from './app/terra-components.module';
import { environment } from './environments/environment';

if(environment.production)
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TerraComponentsModule)
                        .catch((err:any) => console.error(err));
