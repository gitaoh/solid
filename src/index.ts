// https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#single-responsibility-principle
// https://www.digitalocean.com/community/tutorials/linux-commands#file-and-directory-commands

/*
*
* Single-Responsibility Principle
* - A class should have one and only one reason to change, meaning that a class should have only one job.
*
* Open-Closed Principle
* - Objects or entities should be open for extension but closed for modification.
*
* Liskov Substitution Principle
* - Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T.
*
* Interface Segregation Principle
* - A client should never be forced to implement an interface that it doesn't use, or clients shouldn't be forced to depend on methods they do not use.
*
* Dependency Inversion Principle
* - Entities must depend on abstractions, not on concretions. It states that the high-level module must not depend on the low-level module, but they should depend on abstractions.
* */

interface ShapeInterface {
    getArea(): number;
}

interface ThreeDimensionalShapeInterface {
    getVolume(): number;
}

class Square implements ShapeInterface {

    side: number;

    constructor(side: number) {
        this.side = side;
    }

    getArea(): number {
        return this.side * this.side;
    }
}

class Circle implements ShapeInterface {

    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class AreaCalculator {

    shapes: any[];

    constructor(shapes: any[]) {
        this.shapes = shapes;
    }

    sum(): number {
        let totalArea = 0;
        for (const shape of this.shapes) {
            totalArea += shape.getArea();
        }
        return totalArea;
    }

    // output(): string {
    //     return `Sum of the areas: ${this.sum()}`;
    // }
}

class SumCalculatorOutputter {
    calculator: AreaCalculator;

    constructor(calculator: AreaCalculator) {
        this.calculator = calculator;
    }

    json(): string {
        return JSON.stringify({
            sum: this.calculator.sum()
        });
    }

    html(): string {
        return `<h1>Sum of the areas: ${this.calculator.sum()}</h1>`;
    }
}

class Cuboid implements ShapeInterface, ThreeDimensionalShapeInterface {
    side: number;

    constructor(side: number) {
        this.side = side;
    }

    getVolume(): number {
        return this.side * this.side * this.side;
    }

    getArea(): number {
        return 6 * (this.side * this.side);
    }
}

class VolumeCalculator extends AreaCalculator {
    constructor(shapes: any[]) {
        super(shapes);
    }

    sum(): number {
        let totalVolume = 0;
        for (const shape of this.shapes) {
            if (shape instanceof Cuboid)
                totalVolume += shape.getVolume();
        }
        return totalVolume;
    }
}

const shapes = [
    new Circle(7),
    new Square(7),
    new Square(14),
    new Circle(14)
]

const areaCalculator = new AreaCalculator(shapes);
const output = new SumCalculatorOutputter(areaCalculator)
console.log(output.json());
console.log(output.html());

const cubes = [
    new Cuboid(7),
    new Cuboid(14)
]

const volumeCalculator = new VolumeCalculator(cubes);
const volume_output = new SumCalculatorOutputter(volumeCalculator)
console.log(volume_output.json());
console.log(volume_output.html());

interface ConnectionInterface {
    connect(): string;
}

class Connection implements ConnectionInterface {
    public connect() {
        return "Database Connected"
    }
}
class PasswordReminder {
    private dbConnection: Connection;

    constructor(dbConnection: Connection) {
        this.dbConnection = dbConnection;
    }

    public remind() {
        return `Password reminder process initiated. Connection status: ${this.dbConnection.connect()}`
    }
}

const connection = new Connection()
const passwordReminder = new PasswordReminder(connection)
console.log(passwordReminder.remind())