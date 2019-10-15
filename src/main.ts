import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './lib/environments/environment';

if(environment.production)
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((err:any) => console.error(err));
