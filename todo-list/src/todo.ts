export class ToDo {
    private static lastUsedId: number = 0;

    private _id: number;
    private _name: string;
    private _done: boolean;

    constructor(name: string) {
        this._id = ToDo.lastUsedId++;
        this._name = name;
        this._done = false;
    }

    get id(): number {
        return this._id;
    }

    get done(): boolean {
        return this._done;
    }

    set done(value: boolean) {
        this._done = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
