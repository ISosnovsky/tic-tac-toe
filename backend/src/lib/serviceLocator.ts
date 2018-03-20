module.exports = function() {
	const dependencies: { name?: string } = {};
	const factories: { name?: string } = {};
	const serviceLocator: {
		factory?: (name: string, factory: object) => void;
		register?: (name: string, instance: object) => void;
		get?: (name: string) => dependencies;
	} = {};

	serviceLocator.factory = function(name: string, factory: object) {
		factories[name] = factory;
	};
	serviceLocator.register = function(name: string, instance: object) {
		dependencies[name] = instance;
	};
	serviceLocator.get = function(name: string) {
		if (!dependencies[name]) {
			const factory = factories[name];
			dependencies[name] = factory && factory(serviceLocator);

			if (!dependencies[name]) {
				throw new Error("Cannot find module: " + name);
			}
		}
		return dependencies[name];
	};
	return serviceLocator;
};
