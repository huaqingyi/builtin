import dev from './build/dev';
import build from './build/build';
import component from './build/component';

let config = {};
switch (process.env.NODE_ENV) {
    case 'production':
        config = build;
        break;
    case 'development':
        config = dev;
        break;
    case 'component':
        config = component;
        break;
}

export = config;
