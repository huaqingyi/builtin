import VueService from '@vue/cli-service/lib/Service';
import { validate } from '@vue/cli-service/lib/options';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { chalk, warn, error, loadModule } from '@vue/cli-shared-utils';

function ensureSlash(config, key) {
    const val = config[key];
    if (typeof val === 'string') {
        config[key] = val.replace(/([^/])$/, '$1/');
    }
}

function removeSlash(config, key) {
    if (typeof config[key] === 'string') {
        config[key] = config[key].replace(/\/$/g, '');
    }
}

export class Service extends VueService {
    public pkg!: any;
    public context!: string;
    public inlineOptions!: any;
    public run!: (...props: any[]) => Promise<any>;

    public constructor(...props: any[]) {
        super(...props);
    }

    public loadUserOptions() {
        // vue.config.c?js
        // tslint:disable-next-line:one-variable-per-declaration
        let fileConfig, pkgConfig, resolved, resolvedFrom;
        const esm = this.pkg.type && this.pkg.type === 'module';

        const possibleConfigPaths = [
            process.env.VUE_CLI_SERVICE_CONFIG_PATH,
            './vue.config.ts',
            './vue.config.js',
            './vue.config.cjs',
        ];

        let fileConfigPath;
        for (const p of possibleConfigPaths) {
            const resolvedPath = p && resolve(this.context, p);
            if (resolvedPath && existsSync(resolvedPath)) {
                fileConfigPath = resolvedPath;
                break;
            }
        }

        if (fileConfigPath) {
            if (esm && fileConfigPath === './vue.config.js') {
                throw new Error(`Please rename ${(
                    chalk.bold('vue.config.js')
                )} to ${chalk.bold('vue.config.cjs')} when ECMAScript modules is enabled`);
            }

            try {
                fileConfig = loadModule(fileConfigPath, this.context);

                if (typeof fileConfig === 'function') {
                    fileConfig = fileConfig();
                }

                if (!fileConfig || typeof fileConfig !== 'object') {
                    // TODO: show throw an Error here, to be fixed in v5
                    error(
                        `Error loading ${chalk.bold(fileConfigPath)}: should export an object or a function that returns object.`,
                    );
                    fileConfig = null;
                }
            } catch (e) {
                error(`Error loading ${chalk.bold(fileConfigPath)}:`);
                throw e;
            }
        }

        // package.vue
        pkgConfig = this.pkg.vue;
        if (pkgConfig && typeof pkgConfig !== 'object') {
            error(
                `Error loading vue-cli config in ${chalk.bold(`package.json`)}: ` +
                `the "vue" field should be an object.`,
            );
            pkgConfig = null;
        }

        if (fileConfig) {
            if (pkgConfig) {
                warn(
                    `"vue" field in package.json ignored ` +
                    `due to presence of ${chalk.bold('vue.config.js')}.`,
                );
                warn(
                    `You should migrate it into ${chalk.bold('vue.config.js')} ` +
                    `and remove it from package.json.`,
                );
            }
            resolved = fileConfig;
            resolvedFrom = 'vue.config.ts';
        } else if (pkgConfig) {
            resolved = pkgConfig;
            resolvedFrom = '"vue" field in package.json';
        } else {
            resolved = this.inlineOptions || {};
            resolvedFrom = 'inline options';
        }

        if (resolved.css && typeof resolved.css.modules !== 'undefined') {
            if (typeof resolved.css.requireModuleExtension !== 'undefined') {
                warn(
                    `You have set both "css.modules" and "css.requireModuleExtension" in ${chalk.bold('vue.config.js')}, ` +
                    `"css.modules" will be ignored in favor of "css.requireModuleExtension".`,
                );
            } else {
                warn(
                    `"css.modules" option in ${chalk.bold('vue.config.js')} ` +
                    `is deprecated now, please use "css.requireModuleExtension" instead.`,
                );
                resolved.css.requireModuleExtension = !resolved.css.modules;
            }
        }

        // normalize some options
        ensureSlash(resolved, 'publicPath');
        if (typeof resolved.publicPath === 'string') {
            resolved.publicPath = resolved.publicPath.replace(/^\.\//, '');
        }
        removeSlash(resolved, 'outputDir');

        // validate options
        validate(resolved, (msg) => {
            error(
                `Invalid options in ${chalk.bold(resolvedFrom)}: ${msg}`,
            );
        });

        return resolved;
    }
}
