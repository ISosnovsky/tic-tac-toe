const fnArgs = require("fn-args");

module.exports = function() {
	const dependencies: { [name: string]: object } = {};
	const factories: { [name: string]: () => void } = {};
	const diContainer: {
		factory?: (name: string, factory: () => void) => void;
		register?: (name: string, instance: object) => void;
		get?: (name: string) => object;
		inject?: (factory: () => void) => object;
	} = {};

	diContainer.factory = (name: string, factory: () => void) => {
		factories[name] = factory;
	};
	diContainer.register = (name: string, instance: object) => {
		dependencies[name] = instance;
	};
	diContainer.get = (name: string) => {
		if (!dependencies[name]) {
			const factory: () => void = factories[name];
			dependencies[name] = factory && diContainer.inject(factory);

			if (!dependencies[name]) {
				throw new Error("Cannot find module: " + name);
			}
		}
		return dependencies[name];
	};
	diContainer.inject = factory => {
		const args = fnArgs(factory).map((dependency: any) =>
			diContainer.get(dependency)
		);

		return factory.apply(null, args);
	};
	return diContainer;
};
