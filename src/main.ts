declare const module: {
    hot: {
        accept: () => void;
        dispose: (callback: () => void | Promise<void>) => void;
    };
};

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { setupGracefulShutdown } from "nestjs-graceful-shutdown";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    setupGracefulShutdown({ app });

    app.useLogger(app.get(Logger));

    const config = new DocumentBuilder()
        .setTitle("Proxied RS.GE")
        .setDescription(
            "A painless proxy API for accessing Georgia's Revenue Service (RS.GE) APIs.",
        )
        .setVersion("0.0.1")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

void bootstrap();
