import { registerDecorator, ValidationOptions } from "class-validator";

type ValidationDecoratorOptions = Parameters<typeof registerDecorator>[number];

export const IsTin = (validationOptions?: ValidationOptions) => {
    return function (_object: object, propertyName: string) {
        const registerDecoratorOptions: ValidationDecoratorOptions = {
            name: "isTin",
            target: _object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value: any) {
                    return (
                        typeof value === "string" &&
                        /^[0-9]+$/.test(value) &&
                        (value.length === 9 || value.length === 11)
                    );
                },
            },
        };

        if (validationOptions) {
            registerDecoratorOptions.options = validationOptions;
        }

        registerDecorator(registerDecoratorOptions);
    };
};
