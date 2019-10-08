import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

document.addEventListener('touchmove', (event: TouchEvent) => {
  event = event['originalEvent'] || event;
  if (event['scale'] !== 1) {
    event.preventDefault();
  }
}, false);
