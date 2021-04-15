import { GFile, Core, Task } from 'gyi';
import minimist from 'minimist';
import { Service } from './build/service';
import webpack from 'webpack';
import config from './build/component';

@GFile
export class GulpFile extends Core {

    public minimist(args: string[]) {
        return minimist(args, {
            boolean: [
                'modern', 'report', 'report-json', 'inline-vue',
                'watch', 'open', 'copy', 'https', 'verbose',
            ],
        });
    }

    @Task({ description: 'build ...' })
    public async build() {
        process.env.NODE_ENV = 'production';
        const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
        const rawArgv = ['build'];
        const args = this.minimist(rawArgv);
        const command = args._[0];
        service.run(command, args, rawArgv).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });
    }

    @Task({ description: '编译 packages ...' })
    public async pack() {
        // process.env.NODE_ENV = 'component';
        // const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
        // const rawArgv = ['build'];
        // const args = this.minimist(rawArgv);
        // const command = args._[0];
        // return await service.run(command, args, rawArgv).catch((err: Error) => {
        //     console.error(err);
        //     process.exit(1);
        // });

        const compiler = webpack(config('production'));
        compiler.run((err: Error) => {
            err && console.error(err);
        });
    }

    @Task({ description: '启动 serve ...' })
    public async serve() {
        process.env.NODE_ENV = 'development';
        const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());
        const rawArgv = ['serve'];
        const args = this.minimist(rawArgv);
        const command = args._[0];
        return await service.run(command, args, rawArgv).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });
    }
}
